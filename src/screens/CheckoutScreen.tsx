import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  Alert
} from 'react-native';
import { BackIcon } from '../components/Icons';
import { CartItem } from '../context/CartContext';
import { validateRequired } from '../utils/validators';

interface CheckoutScreenProps {
  onPlaceOrder: () => void;
  onCancel: () => void;
  cartTotal: number;
  cartItems?: CartItem[];
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ onPlaceOrder, onCancel, cartTotal, cartItems = [] }) => {
  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMode, setPaymentMode] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Experiment 6: a payment mode and delivery address must be selected before
  // the order can be placed.
  const handlePlaceOrder = () => {
    const newErrors: Record<string, string> = {};

    const nameErr = validateRequired(customerName, 'Customer Name');
    if (nameErr) newErrors.customerName = nameErr;

    const addressErr = validateRequired(deliveryAddress, 'Delivery Address');
    if (addressErr) newErrors.deliveryAddress = addressErr;

    if (!paymentMode) newErrors.paymentMode = 'Please select a payment mode.';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setShowSuccessModal(true);
  };

  const handleOrderConfirmed = () => {
    setShowSuccessModal(false);
    Alert.alert('Order Confirmed ✅', 'Your order has been placed successfully!');
    onPlaceOrder();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onCancel} activeOpacity={0.8}>
          <BackIcon size={28} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

          <Text style={styles.sectionTitle}>Delivery Details</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Customer Name</Text>
            <TextInput
              style={[styles.input, errors.customerName ? styles.inputError : null]}
              placeholder="Your Full Name"
              placeholderTextColor="#999"
              value={customerName}
              onChangeText={(t) => {
                setCustomerName(t);
                setErrors((prev) => ({ ...prev, customerName: '' }));
              }}
            />
            {errors.customerName ? <Text style={styles.errorText}>{errors.customerName}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Delivery Address</Text>
            <TextInput
              style={[styles.input, styles.textArea, errors.deliveryAddress ? styles.inputError : null]}
              placeholder="Enter full delivery address"
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
              value={deliveryAddress}
              onChangeText={(t) => {
                setDeliveryAddress(t);
                setErrors((prev) => ({ ...prev, deliveryAddress: '' }));
              }}
            />
            {errors.deliveryAddress ? (
              <Text style={styles.errorText}>{errors.deliveryAddress}</Text>
            ) : null}
          </View>

          <Text style={styles.sectionTitle}>Payment Mode</Text>
          <View style={styles.paymentContainer}>
            {['Credit Card', 'UPI', 'Cash on Delivery'].map((mode) => (
              <TouchableOpacity
                key={mode}
                style={[styles.paymentChip, paymentMode === mode && styles.paymentChipActive]}
                onPress={() => {
                  setPaymentMode(mode);
                  setErrors((prev) => ({ ...prev, paymentMode: '' }));
                }}
              >
                <Text style={[styles.paymentChipText, paymentMode === mode && styles.paymentChipTextActive]}>
                  {mode === 'Credit Card' ? '💳 ' : mode === 'UPI' ? '📱 ' : '💵 '}{mode}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.paymentMode ? <Text style={styles.errorText}>{errors.paymentMode}</Text> : null}

          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryCard}>
            {/* Itemized list of dishes currently in the cart */}
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item) => (
                  <View key={item.dish.id} style={styles.summaryRow}>
                    <Text style={styles.summaryItem} numberOfLines={1}>
                      {item.dish.name} × {item.quantity}
                    </Text>
                    <Text style={styles.summaryItemPrice}>₹{item.dish.price * item.quantity}</Text>
                  </View>
                ))}
                <View style={styles.divider} />
              </>
            ) : (
              <Text style={styles.summarySub}>No items in your cart yet.</Text>
            )}
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Amount to Pay</Text>
              <Text style={styles.summaryValue}>₹{cartTotal}</Text>
            </View>
            <Text style={styles.summarySub}>Includes taxes and delivery fees.</Text>
          </View>

          <View style={{ flex: 1 }} />

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onCancel} activeOpacity={0.8}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.placeBtn} onPress={handlePlaceOrder} activeOpacity={0.85}>
              <Text style={styles.placeBtnText}>Place Order</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* Success Modal Simulation */}
      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.successEmoji}>🎉</Text>
            <Text style={styles.successTitle}>Order Placed!</Text>
            <Text style={styles.successSub}>
              Your food from Food Express is being prepared. Grab your fork!
            </Text>
            <TouchableOpacity style={styles.trackBtn} onPress={handleOrderConfirmed} activeOpacity={0.8}>
              <Text style={styles.trackBtnText}>Track Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
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
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FF5200',
    marginBottom: 16,
    marginTop: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#E2E2E2',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#111',
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#C62828',
  },
  errorText: {
    color: '#C62828',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  paymentContainer: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 24,
  },
  paymentChip: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E2E2',
    backgroundColor: '#FFF',
  },
  paymentChipActive: {
    borderColor: '#FF5200',
    backgroundColor: '#FFF0E6',
  },
  paymentChipText: {
    fontSize: 15,
    color: '#444',
    fontWeight: '600',
  },
  paymentChipTextActive: {
    color: '#FF5200',
    fontWeight: '800',
  },
  summaryCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FF5200',
  },
  summaryItem: {
    flex: 1,
    fontSize: 13,
    color: '#555',
    fontWeight: '600',
    marginRight: 8,
  },
  summaryItemPrice: {
    fontSize: 13,
    color: '#333',
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 10,
  },
  summarySub: {
    fontSize: 12,
    color: '#777',
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 20,
    marginBottom: 10,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#CCC',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    color: '#555',
    fontSize: 16,
    fontWeight: '800',
  },
  placeBtn: {
    flex: 2,
    backgroundColor: '#FF5200',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#FF5200',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  placeBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  successEmoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111',
    marginBottom: 10,
  },
  successSub: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  trackBtn: {
    backgroundColor: '#FF5200',
    paddingVertical: 14,
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
  },
  trackBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
