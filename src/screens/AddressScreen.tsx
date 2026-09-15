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
  Alert,
} from 'react-native';
import { BackIcon } from '../components/Icons';
import { validateRequired, validatePincode } from '../utils/validators';

interface AddressScreenProps {
  onSave: (address: string) => void;
  onBack: () => void;
}

export const AddressScreen: React.FC<AddressScreenProps> = ({ onSave, onBack }) => {
  const [houseNumber, setHouseNumber] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [addressType, setAddressType] = useState('Home');
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Experiment 6: mandatory delivery fields and the pincode are validated
  // before the address can be saved.
  const handleSave = () => {
    const newErrors: Record<string, string> = {};

    const houseErr = validateRequired(houseNumber, 'House/Flat Number');
    if (houseErr) newErrors.houseNumber = houseErr;

    const streetErr = validateRequired(street, 'Street / Landmark');
    if (streetErr) newErrors.street = streetErr;

    const cityErr = validateRequired(city, 'City');
    if (cityErr) newErrors.city = cityErr;

    const stateErr = validateRequired(state, 'State');
    if (stateErr) newErrors.state = stateErr;

    const pincodeErr = validatePincode(pincode);
    if (pincodeErr) newErrors.pincode = pincodeErr;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    Alert.alert('Address Saved ✅', 'Your delivery address has been saved successfully!');
    onSave(`${houseNumber}, ${street}, ${city}, ${state} - ${pincode} (${addressType})`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.8}>
          <BackIcon size={28} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Address</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

          <View style={styles.inputContainer}>
            <Text style={styles.label}>House/Flat Number</Text>
            <TextInput
              style={[styles.input, errors.houseNumber ? styles.inputError : null]}
              placeholder="e.g. Flat 402, Block A"
              placeholderTextColor="#999"
              value={houseNumber}
              onChangeText={(t) => {
                setHouseNumber(t);
                setErrors((prev) => ({ ...prev, houseNumber: '' }));
              }}
            />
            {errors.houseNumber ? <Text style={styles.errorText}>{errors.houseNumber}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Street / Landmark</Text>
            <TextInput
              style={[styles.input, errors.street ? styles.inputError : null]}
              placeholder="e.g. Springdale Apartments, 12th Main"
              placeholderTextColor="#999"
              value={street}
              onChangeText={(t) => {
                setStreet(t);
                setErrors((prev) => ({ ...prev, street: '' }));
              }}
            />
            {errors.street ? <Text style={styles.errorText}>{errors.street}</Text> : null}
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>City</Text>
              <TextInput
                style={[styles.input, errors.city ? styles.inputError : null]}
                placeholder="Bengaluru"
                placeholderTextColor="#999"
                value={city}
                onChangeText={(t) => {
                  setCity(t);
                  setErrors((prev) => ({ ...prev, city: '' }));
                }}
              />
              {errors.city ? <Text style={styles.errorText}>{errors.city}</Text> : null}
            </View>
            <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>State</Text>
              <TextInput
                style={[styles.input, errors.state ? styles.inputError : null]}
                placeholder="Karnataka"
                placeholderTextColor="#999"
                value={state}
                onChangeText={(t) => {
                  setState(t);
                  setErrors((prev) => ({ ...prev, state: '' }));
                }}
              />
              {errors.state ? <Text style={styles.errorText}>{errors.state}</Text> : null}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Pincode</Text>
            <TextInput
              style={[styles.input, errors.pincode ? styles.inputError : null]}
              placeholder="560038"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              value={pincode}
              onChangeText={(t) => {
                setPincode(t);
                setErrors((prev) => ({ ...prev, pincode: '' }));
              }}
            />
            {errors.pincode ? <Text style={styles.errorText}>{errors.pincode}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address Type</Text>
            <View style={styles.typeContainer}>
              {['Home', 'Work', 'Other'].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[styles.typeChip, addressType === type && styles.typeChipActive]}
                  onPress={() => setAddressType(type)}
                >
                  <Text style={[styles.typeChipText, addressType === type && styles.typeChipTextActive]}>
                    {type === 'Home' ? '🏠 ' : type === 'Work' ? '💼 ' : '📍 '}{type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ flex: 1 }} />

          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleSave}
            activeOpacity={0.85}
          >
            <Text style={styles.saveBtnText}>Save Address</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
  inputContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  inputError: {
    borderColor: '#C62828',
  },
  errorText: {
    color: '#C62828',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  typeChip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    backgroundColor: '#FFF',
  },
  typeChipActive: {
    borderColor: '#FF5200',
    backgroundColor: '#FFF0E6',
  },
  typeChipText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  typeChipTextActive: {
    color: '#FF5200',
    fontWeight: '800',
  },
  saveBtn: {
    backgroundColor: '#FF5200',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#FF5200',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
