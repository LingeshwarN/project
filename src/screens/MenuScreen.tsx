import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useCart } from '../context/CartContext';
import { DISHES, CUISINES, Dish } from '../data/mockData';
import { DishCard } from '../components/DishCard';
import { SearchIcon } from '../components/Icons';
import { fetchDishAndCategoryData } from '../api/foodApi';

interface MenuScreenProps {
  onSelectDish: (dish: Dish) => void;
  onAddToCart: (dish: Dish) => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({ onSelectDish, onAddToCart }) => {
  const {
    flaggedDeals,
    toggleFlashDealFlag,
    selectedCuisine,
    setSelectedCuisine,
    searchQuery,
    setSearchQuery,
  } = useCart();

  const [vegOnly, setVegOnly] = useState(false);
  const [menuDishes, setMenuDishes] = useState<Dish[]>(DISHES);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadMenuData = async () => {
      setIsLoading(true);
      setErrorMessage('');
      try {
        const data = await fetchDishAndCategoryData();
        setMenuDishes(data.dishes);
      } catch {
        setErrorMessage('Unable to load full menu right now.');
        setMenuDishes(DISHES);
      } finally {
        setIsLoading(false);
      }
    };
    loadMenuData();
  }, []);

  // Helper to determine if a dish is veg
  const isVegDish = (dish: Dish) => {
    return (
      dish.cuisine === 'Desserts' ||
      dish.cuisine === 'Italian' ||
      dish.name.includes('Paneer') ||
      dish.name.includes('Fries') ||
      dish.name.includes('Dim Sum') ||
      dish.name.includes('Dhokla') ||
      dish.name.includes('Khandvi') ||
      dish.name.includes('Thepla') ||
      dish.name.includes('Veg') ||
      dish.name.includes('Poha') ||
      dish.name.includes('Idli') ||
      dish.name.includes('Dosa') ||
      dish.name.includes('Pongal') ||
      dish.name.includes('Sambar')
    );
  };

  // Filter dishes based on search query, cuisine selection, and veg filter
  const filteredDishes = useMemo(() => {
    return menuDishes.filter((dish) => {
      const matchesSearch =
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.restaurantName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCuisine = selectedCuisine ? dish.cuisine === selectedCuisine : true;
      const matchesVeg = vegOnly ? isVegDish(dish) : true;

      return matchesSearch && matchesCuisine && matchesVeg;
    });
  }, [menuDishes, searchQuery, selectedCuisine, vegOnly]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Menu Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Full Menu Book</Text>
        <Text style={styles.headerSub}>{menuDishes.length} Authenic Dishes</Text>
      </View>

      {/* Filter / Controls Panel */}
      <View style={styles.controlsPanel}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchIcon size={18} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search within full menu..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Veg Only Toggle and Reset Buttons */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.filterChip, vegOnly && styles.activeFilterChip]}
            onPress={() => setVegOnly(!vegOnly)}
            activeOpacity={0.8}
          >
            <View style={[styles.vegIndicatorBorder, { borderColor: vegOnly ? '#FFF' : '#2E7D32' }]}>
              <View style={[styles.vegIndicatorDot, { backgroundColor: vegOnly ? '#FFF' : '#2E7D32' }]} />
            </View>
            <Text style={[styles.filterText, vegOnly && styles.activeFilterText]}>Veg Only</Text>
          </TouchableOpacity>

          {/* Cuisine Chips scroll inline */}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={CUISINES}
            keyExtractor={(item) => String(item)}
            contentContainerStyle={styles.cuisineListContent}
            renderItem={({ item }) => {
              const isSelected = selectedCuisine === item;
              return (
                <TouchableOpacity
                  style={[styles.cuisineChip, isSelected && styles.activeCuisineChip]}
                  onPress={() => setSelectedCuisine(isSelected ? null : item)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.cuisineChipText, isSelected && styles.activeCuisineChipText]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF5200" />
          <Text style={styles.loadingText}>Loading full menu...</Text>
        </View>
      ) : errorMessage ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => {
            setErrorMessage('');
            setIsLoading(true);
            fetchDishAndCategoryData().then((data) => setMenuDishes(data.dishes)).catch(() => {
              Alert.alert('Load failed', 'The menu could not be refreshed right now.');
              setMenuDishes(DISHES);
            }).finally(() => setIsLoading(false));
          }}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : filteredDishes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>🍳 No dishes match your menu filters</Text>
        </View>
      ) : (
        <FlatList
          data={filteredDishes}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.gridContent}
          columnWrapperStyle={styles.gridColumnWrapper}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          renderItem={({ item }) => (
            <DishCard
              dish={item}
              onPress={() => onSelectDish(item)}
              onAddToCart={() => onAddToCart(item)}
              isFlagged={flaggedDeals.includes(item.id)}
              onToggleFlag={() => toggleFlashDealFlag(item)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FF5200',
  },
  headerSub: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    marginTop: 2,
  },
  controlsPanel: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 10 : 4,
    marginTop: 8,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111',
    marginLeft: 6,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
  },
  activeFilterChip: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  vegIndicatorBorder: {
    width: 12,
    height: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  vegIndicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  filterText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#444',
  },
  activeFilterText: {
    color: '#FFF',
  },
  cuisineListContent: {
    paddingLeft: 4,
  },
  cuisineChip: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 6,
  },
  activeCuisineChip: {
    backgroundColor: '#FF5200',
    borderColor: '#FF5200',
  },
  cuisineChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#444',
  },
  activeCuisineChipText: {
    color: '#FFF',
  },
  gridContent: {
    padding: 12,
    paddingBottom: 40,
  },
  gridColumnWrapper: {
    justifyContent: 'space-between',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  loadingText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  errorText: {
    color: '#B3261E',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: '#FF5200',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  retryText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  emptyText: {
    fontSize: 14,
    color: '#777',
    fontWeight: '600',
  },
});
