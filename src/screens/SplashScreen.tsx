import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';

interface SplashScreenProps {
  onAutoTransition: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onAutoTransition }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onAutoTransition();
    }, 2500); // 2.5 seconds auto-transition
    return () => clearTimeout(timer);
  }, [onAutoTransition]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Stylized custom vector logo layout */}
        <View style={styles.logoOuter}>
          <View style={styles.logoInner}>
            <Text style={styles.logoEmoji}>🚀</Text>
          </View>
        </View>
        
        <Text style={styles.title}>FOOD EXPRESS</Text>
        <Text style={styles.tagline}>Order Fast, Eat Fresh</Text>
      </View>
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#FF5200" />
        <Text style={styles.loadingText}>Initializing Fast Delivery...</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFF0E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF5200',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#FF5200',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logoEmoji: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF5200',
    letterSpacing: 1,
    marginTop: 6,
  },
  footer: {
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 11,
    color: '#888',
    fontWeight: '600',
    marginTop: 8,
    letterSpacing: 0.5,
  },
});
