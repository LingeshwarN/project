import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ComboMeal } from '../data/mockData';

interface ComboCardProps {
  combo: ComboMeal;
  onAddToCart: () => void;
}

export const ComboCard: React.FC<ComboCardProps> = ({ combo, onAddToCart }) => {
  const getSpiceColor = () => {
    switch (combo.spiceLevel) {
      case 'Hot': return '#C62828';
      case 'Medium': return '#EF6C00';
      default: return '#2E7D32';
    }
  };

  return (
    <View style={styles.card}>
      <View style={[styles.visualContainer, { backgroundColor: combo.color }]}>
        <Image source={{ uri: combo.imageUrl }} style={styles.image} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>{combo.name}</Text>
        
        <View style={styles.metaRow}>
          <Text style={styles.coverageText}>Cuisines: {combo.cuisineCoverage}</Text>
        </View>

        <View style={styles.detailsRow}>
          <Text style={styles.detailText}>⏱ {combo.prepTime}</Text>
          <Text style={styles.bullet}>•</Text>
          <Text style={[styles.detailText, { color: getSpiceColor(), fontWeight: '700' }]}>
            {combo.spiceLevel} Heat
          </Text>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.detailText}>🔥 {combo.ordersCount}+ ordered</Text>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>₹{combo.price}</Text>
          <TouchableOpacity style={styles.addButton} onPress={onAddToCart} activeOpacity={0.8}>
            <Text style={styles.addButtonText}>ADD COMBO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  visualContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  emoji: {
    fontSize: 36,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111',
    marginBottom: 2,
  },
  metaRow: {
    marginBottom: 4,
  },
  coverageText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '600',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 11,
    color: '#555',
    fontWeight: '500',
  },
  bullet: {
    fontSize: 12,
    color: '#CCC',
    marginHorizontal: 6,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FF5200',
  },
  addButton: {
    backgroundColor: '#FF5200',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
  },
});
