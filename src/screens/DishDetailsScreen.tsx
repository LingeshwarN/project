import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Platform, Image, Alert } from 'react-native';
import { Dish } from '../data/mockData';
import { BackIcon, StarIcon } from '../components/Icons';
import { MeterBadge } from '../components/MeterBadge';
import { useCart } from '../context/CartContext';

interface DishDetailsScreenProps {
  dish: Dish;
  onBack: () => void;
  onAddToCart: (dish: Dish) => void;
}

export const DishDetailsScreen: React.FC<DishDetailsScreenProps> = ({ dish, onBack, onAddToCart }) => {
  const isVeg = dish.cuisine === 'Desserts' || dish.cuisine === 'Italian' || dish.name.includes('Paneer') || dish.name.includes('Fries') || dish.name.includes('Dim Sum');
  
  const { dishRatings, rateDish, favoriteDishIds, toggleFavorite, theme } = useCart();
  const [localRating, setLocalRating] = useState(dishRatings[dish.id] || 0);
  const isFavorite = favoriteDishIds.includes(dish.id);

  useEffect(() => {
    if (localRating > 0 && localRating !== dishRatings[dish.id]) {
      rateDish(dish.id, localRating);
      Alert.alert('Gourmet Rating', `Thank you for rating "${dish.name}" ${localRating} stars! ⭐`);
    }
  }, [localRating]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.8}>
          <BackIcon size={28} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dish Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={[styles.favoriteButton, theme === 'dark' && styles.favoriteButtonDark, isFavorite && styles.favoriteButtonActive]}
          onPress={() => {
            toggleFavorite(dish.id);
            Alert.alert(isFavorite ? 'Removed from favorites' : 'Saved to favorites', `${dish.name} ${isFavorite ? 'was removed from your favorites.' : 'was added to your favorites.'}`);
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.favoriteText}>{isFavorite ? '♥' : '♡'}</Text>
        </TouchableOpacity>
        {/* Colorful Presentation Box */}
        <View style={[styles.visualContainer, { backgroundColor: dish.color }]}>
          <Image source={{ uri: dish.imageUrl }} style={styles.image} />
        </View>

        {/* Dish title & meta details */}
        <View style={styles.detailsContainer}>
          <View style={styles.titleRow}>
            {/* Veg/Nonveg indicator */}
            <View style={[styles.indicator, { borderColor: isVeg ? '#2E7D32' : '#C62828' }]}>
              <View style={[styles.indicatorDot, { backgroundColor: isVeg ? '#2E7D32' : '#C62828' }]} />
            </View>
            <Text style={styles.cuisineText}>{dish.cuisine}</Text>
          </View>

          <Text style={styles.name}>{dish.name}</Text>
          <Text style={styles.restaurantText}>📍 {dish.restaurantName}</Text>
          <Text style={styles.price}>₹{dish.price}</Text>

          {/* Rating and Delivery timing info */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <StarIcon size={16} color="#FF9F00" />
              <Text style={styles.metaText}>{dish.rating} Rating</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.metaItem}>
              <Text style={styles.metaLabelText}>⏱ Delivery:</Text>
              <Text style={styles.metaText}>{dish.deliveryTime}</Text>
            </View>
          </View>

          <Text style={styles.sectionHeading}>Description</Text>
          <Text style={styles.description}>{dish.description}</Text>

          {/* Interactive Rating Row */}
          <Text style={styles.sectionHeading}>Rate this Dish</Text>
          <View style={styles.ratingStarsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setLocalRating(star)}
                style={styles.starButton}
                activeOpacity={0.7}
              >
                <StarIcon size={28} color={star <= localRating ? '#FF9F00' : '#DDD'} />
              </TouchableOpacity>
            ))}
            {localRating > 0 && (
              <Text style={styles.ratingStarsLabel}>{localRating} / 5 Stars</Text>
            )}
          </View>

          {/* Craving Meter and Spice Tags */}
          <View style={styles.metricsBox}>
            <Text style={styles.sectionHeading}>Gourmet Indicators</Text>
            
            {/* Craving Meter badge */}
            <MeterBadge value={dish.cravingScore} label="Craving Meter" type="craving" />
            
            {/* Value Calculator badge */}
            <MeterBadge value={dish.healthScore} label="Value Score" type="health" />

            <View style={styles.spiceRow}>
              <Text style={styles.spiceLabel}>Spice Profile:</Text>
              <View style={[styles.spiceTag, { backgroundColor: dish.spiceLevel === 'Hot' ? '#FFEBEE' : dish.spiceLevel === 'Medium' ? '#FFF3E0' : '#E8F5E9' }]}>
                <Text style={[styles.spiceText, { color: dish.spiceLevel === 'Hot' ? '#C62828' : dish.spiceLevel === 'Medium' ? '#EF6C00' : '#2E7D32' }]}>
                  {dish.spiceLevel} Heat
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Cart Actions Panel */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton} onPress={() => onAddToCart(dish)} activeOpacity={0.85}>
          <Text style={styles.addButtonText}>Add to Cart • ₹{dish.price}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  favoriteButton: {
    position: 'absolute',
    top: 18,
    right: 18,
    zIndex: 2,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  favoriteButtonDark: {
    backgroundColor: 'rgba(18,18,18,0.8)',
  },
  favoriteButtonActive: {
    backgroundColor: '#FFEBEE',
  },
  favoriteText: {
    color: '#FF5200',
    fontSize: 20,
    fontWeight: '900',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
  },
  placeholder: {
    width: 36,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  visualContainer: {
    width: '100%',
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  giantEmoji: {
    fontSize: 100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  indicator: {
    width: 14,
    height: 14,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  cuisineText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  name: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111',
    marginBottom: 6,
  },
  price: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FF5200',
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF9F6',
    padding: 12,
    borderRadius: 12,
    marginBottom: 24,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginLeft: 5,
  },
  metaLabelText: {
    fontSize: 13,
    color: '#777',
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#222',
    marginBottom: 8,
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    marginBottom: 24,
  },
  metricsBox: {
    backgroundColor: '#FAF9F6',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0EFEA',
  },
  spiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#ECECE7',
  },
  spiceLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
    marginRight: 8,
  },
  spiceTag: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
  },
  spiceText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
  },
  addButton: {
    backgroundColor: '#FF5200',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#FF5200',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  ratingStarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  starButton: {
    marginRight: 8,
  },
  ratingStarsLabel: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '700',
    color: '#FF5200',
  },
  restaurantText: {
    fontSize: 14,
    color: '#FF5200',
    fontWeight: '700',
    marginBottom: 10,
  },
});
