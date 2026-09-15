import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface IconProps {
  size?: number;
  color?: string;
}

export const ProfileIcon: React.FC<IconProps> = ({ size = 48, color = '#FF5200' }) => {
  return (
    <View style={[styles.profileContainer, { width: size, height: size, borderColor: color, borderRadius: size / 2 }]}>
      <View style={[styles.profileHead, { width: size * 0.4, height: size * 0.4, backgroundColor: color, borderRadius: (size * 0.4) / 2 }]} />
      <View style={[styles.profileBody, { width: size * 0.7, height: size * 0.35, backgroundColor: color, borderTopLeftRadius: size * 0.35, borderTopRightRadius: size * 0.35 }]} />
    </View>
  );
};

export const SearchIcon: React.FC<IconProps> = ({ size = 20, color = '#666' }) => {
  const ringSize = size * 0.7;
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <View style={[styles.searchRing, { width: ringSize, height: ringSize, borderColor: color, borderWidth: 2, borderRadius: ringSize / 2 }]} />
      <View style={[styles.searchHandle, { backgroundColor: color, height: size * 0.4, width: 2, transform: [{ rotate: '-45deg' }, { translateY: size * 0.3 }] }]} />
    </View>
  );
};

export const StarIcon: React.FC<IconProps> = ({ size = 16, color = '#FFD700' }) => {
  return (
    <Text style={{ fontSize: size, color }}>★</Text>
  );
};

export const HomeIcon: React.FC<IconProps> = ({ size = 24, color = '#666' }) => {
  return (
    <View style={[styles.homeContainer, { width: size, height: size }]}>
      <View style={[styles.homeRoof, { borderBottomColor: color, borderLeftWidth: size / 2, borderRightWidth: size / 2, borderBottomWidth: size * 0.45 }]} />
      <View style={[styles.homeBody, { backgroundColor: color, width: size * 0.8, height: size * 0.55 }]} />
    </View>
  );
};

export const CartIcon: React.FC<IconProps> = ({ size = 24, color = '#666' }) => {
  return (
    <View style={[styles.cartContainer, { width: size, height: size }]}>
      <View style={[styles.cartBasket, { borderColor: color, borderWidth: 2, width: size * 0.8, height: size * 0.6, borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }]} />
      <View style={[styles.cartHandle, { borderColor: color, borderWidth: 2, width: size * 0.4, height: size * 0.3, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomWidth: 0 }]} />
    </View>
  );
};

export const ChevronRightIcon: React.FC<IconProps> = ({ size = 18, color = '#666' }) => {
  return (
    <Text style={{ fontSize: size, color, fontWeight: 'bold' }}>›</Text>
  );
};

export const BackIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => {
  return (
    <Text style={{ fontSize: size, color, fontWeight: 'bold', paddingHorizontal: 5 }}>‹</Text>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileHead: {
    marginBottom: 2,
  },
  profileBody: {
    opacity: 0.8,
  },
  searchRing: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  searchHandle: {
    position: 'absolute',
    bottom: 2,
    right: 2,
  },
  homeContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  homeRoof: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  homeBody: {
    marginTop: -1,
  },
  cartContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cartBasket: {
    position: 'absolute',
    bottom: 0,
  },
  cartHandle: {
    position: 'absolute',
    top: 1,
  },
});
