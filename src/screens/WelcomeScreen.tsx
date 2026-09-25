import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Animated-like Custom Logo */}
        <View style={styles.logoOuter}>
          <View style={styles.logoMiddle}>
            <View style={styles.logoInner}>
              <Text style={styles.logoEmoji}>🚀</Text>
            </View>
          </View>
        </View>

        <Text style={styles.title}>FOOD EXPRESS</Text>
        
        <View style={styles.taglineBox}>
          <Text style={styles.tagline}>Order Fast, Eat Fresh</Text>
        </View>

        <Text style={styles.description}>
          Discover healthy, mouth-watering dishes from premium cuisines and track your deliveries in real-time.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={onGetStarted} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  logoOuter: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFF0E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  logoMiddle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#FFE0CC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF5200',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#FF5200',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  logoEmoji: {
    fontSize: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#111',
    letterSpacing: 2,
  },
  taglineBox: {
    backgroundColor: '#FFF0E6',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  tagline: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF5200',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  footer: {
    paddingBottom: 40,
  },
  button: {
    backgroundColor: '#FF5200',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    elevation: 4,
    shadowColor: '#FF5200',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
  },
});
