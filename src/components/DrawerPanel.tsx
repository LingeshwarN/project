import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.75;

interface DrawerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: 'home' | 'profile' | 'cart' | 'tracking' | 'welcome' | 'feedback') => void;
  onLogout: () => void;
}

export const DrawerPanel: React.FC<DrawerPanelProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onLogout
}) => {
  if (!isOpen) return null;

  const handleDrawerItemPress = (label: string, action?: () => void) => {
    onClose();
    if (action) {
      action();
    } else {
      Alert.alert('Sidebar Option', `You clicked on "${label}". Flash Deals and Special Plans are ready in this prototype!`);
    }
  };

  const drawerItems = [
    { label: '🕒 Order History', action: () => onNavigate('profile') },
    { label: '⚡ Flash Deals', action: () => onNavigate('home') },
    { label: '🔖 Saved Recipes', labelDesc: 'Favorites' },
    { label: '📅 Weekly Meal Plan', labelDesc: 'Diet Care' },
    { label: '⚙️ Settings', labelDesc: 'Account configuration' },
    { label: '📝 Provide Feedback', action: () => onNavigate('feedback') },
    { label: '❓ Help & Support', labelDesc: '24/7 Chat' },
  ];

  return (
    <View style={styles.overlay}>
      {/* Tap outside backdrop to close */}
      <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
      
      {/* Sliding Panel */}
      <View style={styles.drawer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Food Express</Text>
          <Text style={styles.headerSubtitle}>Deliciousness Delivered</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {drawerItems.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.itemRow}
              onPress={() => handleDrawerItemPress(item.label, item.action)}
              activeOpacity={0.8}
            >
              <Text style={styles.itemLabel}>{item.label}</Text>
              {item.labelDesc && <Text style={styles.itemDesc}>{item.labelDesc}</Text>}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.logoutBtn} onPress={onLogout} activeOpacity={0.85}>
            <Text style={styles.logoutText}>🚪 Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.8}>
            <Text style={styles.closeText}>Close Drawer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  drawer: {
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: '#FFFFFF',
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: '#FF5200',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#FFE0CC',
    fontWeight: '600',
    marginTop: 4,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  itemRow: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
  },
  itemDesc: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  logoutBtn: {
    backgroundColor: '#FFEBEE',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  logoutText: {
    color: '#C62828',
    fontSize: 14,
    fontWeight: '800',
  },
  closeBtn: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  closeText: {
    color: '#888',
    fontSize: 13,
    fontWeight: '700',
  },
});
