import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MeterBadgeProps {
  value: number; // 0 to 100
  label: string;
  type: 'health' | 'craving';
}

export const MeterBadge: React.FC<MeterBadgeProps> = ({ value, label, type }) => {
  // Determine color based on value and type
  const getColors = () => {
    if (type === 'health') {
      if (value >= 75) return { bg: '#E8F5E9', text: '#2E7D32', label: 'Super Healthy' };
      if (value >= 50) return { bg: '#FFF3E0', text: '#EF6C00', label: 'Balanced' };
      return { bg: '#FFEBEE', text: '#C62828', label: 'Indulgent' };
    } else {
      if (value >= 90) return { bg: '#FFF8E1', text: '#FF8F00', label: 'Extreme Craving' };
      if (value >= 70) return { bg: '#FCE4EC', text: '#C2185B', label: 'High Demand' };
      return { bg: '#E1F5FE', text: '#0277BD', label: 'Satisfying' };
    }
  };

  const colors = getColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.labelText, { color: colors.text }]}>{label}</Text>
        <Text style={[styles.valueText, { color: colors.text }]}>{value}%</Text>
      </View>
      <View style={styles.track}>
        <View 
          style={[
            styles.fill, 
            { 
              width: `${value}%`, 
              backgroundColor: colors.text 
            }
          ]} 
        />
      </View>
      <Text style={styles.descText}>{colors.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 12,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  labelText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  valueText: {
    fontSize: 14,
    fontWeight: '800',
  },
  track: {
    height: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
  descText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '500',
  },
});
