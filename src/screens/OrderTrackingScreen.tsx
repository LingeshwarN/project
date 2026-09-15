import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { BackIcon } from '../components/Icons';

interface OrderTrackingScreenProps {
  hasActiveOrder: boolean;
  onBackToHome: () => void;
}

export const OrderTrackingScreen: React.FC<OrderTrackingScreenProps> = ({ hasActiveOrder, onBackToHome }) => {
  const [step, setStep] = useState(0);

  // Auto-progress simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev < 3) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 4500); // Progress every 4.5 seconds

    return () => clearInterval(timer);
  }, []);

  const steps = [
    { title: 'Order Confirmed', desc: 'Food Express has received your order.', time: 'Just now', emoji: '✅' },
    { title: 'Kitchen Preparing', desc: 'The chef is prepping fresh ingredients.', time: 'Est. 2 mins ago', emoji: '🍳' },
    { title: 'Out for Delivery', desc: 'Our delivery partner is rushing to you.', time: 'In progress', emoji: '🛵' },
    { title: 'Arrived at Doorstep', desc: 'Enjoy your warm and fresh meal!', time: 'Delivered', emoji: '😋' },
  ];

  if (!hasActiveOrder) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Live Delivery Status</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🛵</Text>
          <Text style={styles.emptyTitle}>No Active Deliveries</Text>
          <Text style={styles.emptySubtitle}>You don't have any orders in transit right now. Head over to the home menu to order delicious dishes!</Text>
          <TouchableOpacity style={styles.shopBtn} onPress={onBackToHome} activeOpacity={0.8}>
            <Text style={styles.shopBtnText}>Browse Dishes</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header bar */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Live Delivery Status</Text>
      </View>

      <View style={styles.visualBanner}>
        <Text style={styles.riderEmoji}>🛵</Text>
        <Text style={styles.etaTitle}>Arriving in 25-35 Mins</Text>
        <Text style={styles.restaurantName}>Ordering from Food Express Kitchen</Text>
      </View>

      <View style={styles.timelineContainer}>
        {steps.map((item, idx) => {
          const isDone = idx <= step;
          const isCurrent = idx === step;

          return (
            <View key={idx} style={styles.stepRow}>
              {/* Timeline graphic connector */}
              <View style={styles.connectorCol}>
                <View
                  style={[
                    styles.dot,
                    isDone ? styles.dotDone : styles.dotPending,
                    isCurrent && styles.dotCurrent,
                  ]}
                >
                  {isDone && <Text style={styles.dotCheck}>✓</Text>}
                </View>
                {idx < steps.length - 1 && (
                  <View style={[styles.line, idx < step ? styles.lineDone : styles.linePending]} />
                )}
              </View>

              {/* Status details */}
              <View style={styles.statusContent}>
                <View style={styles.statusTitleRow}>
                  <Text style={[styles.statusTitle, isDone ? styles.textDone : styles.textPending]}>
                    {item.emoji} {item.title}
                  </Text>
                  <Text style={styles.statusTime}>{item.time}</Text>
                </View>
                <Text style={styles.statusDesc}>{item.desc}</Text>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.footer}>
        {step < 3 ? (
          <View style={styles.preparingBox}>
            <ActivityIndicator size="small" color="#FF5200" style={{ marginRight: 10 }} />
            <Text style={styles.preparingText}>Simulating Live Delivery Status...</Text>
          </View>
        ) : (
          <Text style={styles.enjoyText}>🎉 Food Delivered! Rate your meal.</Text>
        )}
        <TouchableOpacity style={styles.homeBtn} onPress={onBackToHome} activeOpacity={0.8}>
          <Text style={styles.homeBtnText}>Back to Home Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  header: {
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
  },
  visualBanner: {
    backgroundColor: '#FF5200',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  riderEmoji: {
    fontSize: 60,
    marginBottom: 8,
  },
  etaTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  restaurantName: {
    fontSize: 13,
    color: '#FFE0CC',
    marginTop: 4,
    fontWeight: '600',
  },
  timelineContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 20,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    flex: 1,
  },
  stepRow: {
    flexDirection: 'row',
    height: 70,
  },
  connectorCol: {
    alignItems: 'center',
    marginRight: 16,
  },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotDone: {
    backgroundColor: '#2E7D32',
  },
  dotPending: {
    backgroundColor: '#E0E0E0',
  },
  dotCurrent: {
    backgroundColor: '#FF5200',
    borderWidth: 2,
    borderColor: '#FFE0CC',
  },
  dotCheck: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  line: {
    width: 2,
    flex: 1,
    marginVertical: 4,
  },
  lineDone: {
    backgroundColor: '#2E7D32',
  },
  linePending: {
    backgroundColor: '#E0E0E0',
  },
  statusContent: {
    flex: 1,
  },
  statusTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  textDone: {
    color: '#111',
  },
  textPending: {
    color: '#999',
  },
  statusTime: {
    fontSize: 11,
    color: '#999',
  },
  statusDesc: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
    lineHeight: 16,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  preparingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  preparingText: {
    fontSize: 13,
    color: '#FF5200',
    fontWeight: '700',
  },
  enjoyText: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
  },
  homeBtn: {
    backgroundColor: '#FF5200',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  homeBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#FFFFFF',
  },
  emptyEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#222',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  shopBtn: {
    backgroundColor: '#FF5200',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 10,
  },
  shopBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
