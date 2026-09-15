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
  Alert,
} from 'react-native';
import { BackIcon } from '../components/Icons';
import { validateFullName, validateMobile, validateEmail } from '../utils/validators';

// Experiment 5: profile picture options. Tapping the avatar opens a picker;
// the chosen emoji is stored temporarily in state (no validation applied).
const AVATAR_OPTIONS = ['🧑', '👩', '🧑‍💻', '👩‍🍳', '🦸', '🧑‍🎤', '🐼', '🦊'];

interface EditProfileScreenProps {
  onSave: (data: { fullName: string; phoneNumber: string; email: string }) => void;
  onBack: () => void;
  initialEmail?: string;
  initialName?: string;
  initialPhone?: string;
}

export const EditProfileScreen: React.FC<EditProfileScreenProps> = ({
  onSave,
  onBack,
  initialEmail = '',
  initialName = '',
  initialPhone = ''
}) => {
  const [fullName, setFullName] = useState(initialName || initialEmail.split('@')[0] || 'Gourmet Explorer');
  const [phoneNumber, setPhoneNumber] = useState(initialPhone || '9876543210');
  const [email, setEmail] = useState(initialEmail);
  const [avatar, setAvatar] = useState('🧑');
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Experiment 6: all mandatory fields are validated before changes can be saved.
  const handleSave = () => {
    const newErrors: Record<string, string> = {};

    const fullNameErr = validateFullName(fullName);
    if (fullNameErr) newErrors.fullName = fullNameErr;

    const phoneErr = validateMobile(phoneNumber);
    if (phoneErr) newErrors.phoneNumber = phoneErr;

    const emailErr = validateEmail(email);
    if (emailErr) newErrors.email = emailErr;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    Alert.alert('Profile Updated ✅', 'Your changes have been saved successfully!');
    onSave({ fullName, phoneNumber, email });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.8}>
          <BackIcon size={28} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

          <View style={styles.avatarSection}>
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={() => setShowAvatarPicker(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.avatarText}>{avatar}</Text>
              <View style={styles.editAvatarBadge}>
                <Text style={styles.editAvatarBadgeText}>✎</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.avatarHelpText}>Tap to change profile picture</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={[styles.input, errors.fullName ? styles.inputError : null]}
              placeholder="Your Full Name"
              placeholderTextColor="#999"
              value={fullName}
              onChangeText={(t) => {
                setFullName(t);
                setErrors((prev) => ({ ...prev, fullName: '' }));
              }}
            />
            {errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={[styles.input, errors.phoneNumber ? styles.inputError : null]}
              placeholder="Your Phone Number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={(t) => {
                setPhoneNumber(t);
                setErrors((prev) => ({ ...prev, phoneNumber: '' }));
              }}
            />
            {errors.phoneNumber ? <Text style={styles.errorText}>{errors.phoneNumber}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={[styles.input, errors.email ? styles.inputError : null]}
              placeholder="Your Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                setErrors((prev) => ({ ...prev, email: '' }));
              }}
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>

          <View style={{ flex: 1 }} />

          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleSave}
            activeOpacity={0.85}
          >
            <Text style={styles.saveBtnText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Profile picture picker — selection stored in state only */}
      <Modal visible={showAvatarPicker} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Profile Picture</Text>
            <View style={styles.avatarGrid}>
              {AVATAR_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[styles.avatarOption, avatar === option && styles.avatarOptionActive]}
                  onPress={() => {
                    setAvatar(option);
                    setShowAvatarPicker(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.avatarOptionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.modalCancelBtn}
              onPress={() => setShowAvatarPicker(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
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
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FF5200',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#FF5200',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    position: 'relative',
  },
  avatarText: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: '900',
  },
  editAvatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF5200',
  },
  editAvatarBadgeText: {
    fontSize: 16,
    color: '#FF5200',
  },
  avatarHelpText: {
    marginTop: 12,
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
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
  inputError: {
    borderColor: '#C62828',
  },
  errorText: {
    color: '#C62828',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  saveBtn: {
    backgroundColor: '#FF5200',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
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
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
    marginBottom: 20,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  avatarOption: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#E2E2E2',
    backgroundColor: '#FAF9F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarOptionActive: {
    borderColor: '#FF5200',
    backgroundColor: '#FFF0E6',
  },
  avatarOptionText: {
    fontSize: 28,
  },
  modalCancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
  modalCancelText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '700',
  },
});
