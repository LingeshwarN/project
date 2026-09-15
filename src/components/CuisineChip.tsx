import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CuisineChipProps {
  name: string;
  selected: boolean;
  onPress: () => void;
  emoji: string;
}

export const CuisineChip: React.FC<CuisineChipProps> = ({ name, selected, onPress, emoji }) => {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        selected ? styles.selectedChip : styles.unselectedChip,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={[styles.text, selected ? styles.selectedText : styles.unselectedText]}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    marginRight: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedChip: {
    backgroundColor: '#FF5200',
  },
  unselectedChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  emoji: {
    marginRight: 6,
    fontSize: 16,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  unselectedText: {
    color: '#333333',
  },
});
