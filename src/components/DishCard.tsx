import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Dish } from '../data/mockData';
import { StarIcon } from './Icons';

const { width } = Dimensions.get('window');
const cardWidth = (width - 44) / 2;

interface DishCardProps {
  dish: Dish;
  onPress: () => void;
  onAddToCart: () => void;
  isFlagged: boolean;
  onToggleFlag: () => void;
}

export const DishCard: React.FC<DishCardProps> = ({
  dish,
  onPress,
  onAddToCart,
  isFlagged,
  onToggleFlag
}) => {
  const ratingPercent = Math.round(dish.rating * 20);

  const getSpiceColor = () => {
    switch (dish.spiceLevel) {
      case 'Hot': return '#C62828';
      case 'Medium': return '#EF6C00';
      default: return '#2E7D32';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.95}>
      {/* Top visual block */}
      <View style={[styles.visualBlock, { backgroundColor: dish.color }]}>
        <Image source={{ uri: dish.imageUrl }} style={styles.image} />
        
        {/* Rating Badge Overlaid */}
        <View style={styles.ratingBadge}>
          <StarIcon size={10} color="#FF9F00" />
          <Text style={styles.ratingText}>{ratingPercent}%</Text>
        </View>

        {/* Flag Deal Icon Button */}
        <TouchableOpacity style={styles.flagBtn} onPress={onToggleFlag} activeOpacity={0.7}>
          <Text style={[styles.flagIcon, { color: isFlagged ? '#FF5200' : '#888' }]}>
            {isFlagged ? '★' : '☆'}
          </Text>
        </TouchableOpacity>

        {/* Flash discount banner overlay */}
        {dish.isFlashDeal && (
          <View style={styles.flashOverlay}>
            <Text style={styles.flashText}>{dish.discountPercent}% OFF</Text>
          </View>
        )}
      </View>

      {/* Info Container */}
      <View style={styles.infoBlock}>
        <Text style={styles.name} numberOfLines={1}>{dish.name}</Text>
        <Text style={styles.restaurantText} numberOfLines={1}>📍 {dish.restaurantName}</Text>
        
        {/* Spice Level Indicator */}
        <View style={styles.metaRow}>
          <View style={[styles.spiceBadge, { borderColor: getSpiceColor() }]}>
            <Text style={[styles.spiceText, { color: getSpiceColor() }]}>{dish.spiceLevel}</Text>
          </View>
          <Text style={styles.cuisineText}>{dish.cuisine}</Text>
        </View>

        {/* Craving Indicator */}
        <View style={styles.cravingRow}>
          <Text style={styles.cravingLabel}>Craving:</Text>
          <Text style={styles.cravingVal}>{dish.cravingScore}%</Text>
        </View>

        {/* Price & Action button */}
        <View style={styles.bottomRow}>
          <Text style={styles.price}>₹{dish.price}</Text>
          <TouchableOpacity style={styles.addButton} onPress={onAddToCart} activeOpacity={0.8}>
            <Text style={styles.addBtnText}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: cardWidth,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  visualBlock: {
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  emoji: {
    fontSize: 48,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#333',
    marginLeft: 2,
  },
  flagBtn: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  flagIcon: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  flashOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#C62828',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  flashText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '900',
  },
  infoBlock: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '800',
    color: '#222',
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  spiceBadge: {
    borderWidth: 1.2,
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 4,
  },
  spiceText: {
    fontSize: 8,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  cuisineText: {
    fontSize: 10,
    color: '#777',
    fontWeight: '600',
  },
  cravingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF9F6',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginBottom: 8,
  },
  cravingLabel: {
    fontSize: 9,
    color: '#666',
    fontWeight: '700',
    marginRight: 4,
  },
  cravingVal: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FF5200',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  price: {
    fontSize: 15,
    fontWeight: '900',
    color: '#111',
  },
  addButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  addBtnText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '900',
  },
  restaurantText: {
    fontSize: 10,
    color: '#FF5200',
    fontWeight: '700',
    marginBottom: 4,
  },
});
