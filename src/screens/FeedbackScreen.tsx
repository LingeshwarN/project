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
  Switch,
  Alert
} from 'react-native';
import { BackIcon } from '../components/Icons';
import { validateRequired, validateRating } from '../utils/validators';

interface FeedbackScreenProps {
  onSubmit: () => void;
  onBack: () => void;
}

export const FeedbackScreen: React.FC<FeedbackScreenProps> = ({ onSubmit, onBack }) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [suggestions, setSuggestions] = useState('');
  const [recommend, setRecommend] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Experiment 6: the name must be entered and a rating selected before
  // the feedback can be submitted.
  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};

    const nameErr = validateRequired(name, 'Name');
    if (nameErr) newErrors.name = nameErr;

    const ratingErr = validateRating(rating);
    if (ratingErr) newErrors.rating = ratingErr;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    Alert.alert('Feedback Submitted ✅', 'Thank you! Your feedback has been received.');
    onSubmit();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.8}>
          <BackIcon size={28} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rate Your Experience</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Your Name</Text>
            <TextInput
              style={[styles.input, errors.name ? styles.inputError : null]}
              placeholder="e.g. John Doe"
              placeholderTextColor="#999"
              value={name}
              onChangeText={(t) => {
                setName(t);
                setErrors((prev) => ({ ...prev, name: '' }));
              }}
            />
            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
          </View>

          <Text style={styles.sectionTitle}>How was the food?</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                style={styles.starBtn}
                onPress={() => {
                  setRating(star);
                  setErrors((prev) => ({ ...prev, rating: '' }));
                }}
                activeOpacity={0.7}
              >
                <Text style={[styles.starIcon, rating >= star && styles.starIconActive]}>
                  {rating >= star ? '★' : '☆'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.rating ? <Text style={styles.errorText}>{errors.rating}</Text> : null}
          <Text style={styles.ratingText}>
            {rating === 0 ? 'Select a rating' : rating === 1 ? 'Poor' : rating === 2 ? 'Fair' : rating === 3 ? 'Good' : rating === 4 ? 'Very Good' : 'Excellent'}
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Suggestions / Comments</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Tell us what you liked or how we can improve..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              value={suggestions}
              onChangeText={setSuggestions}
            />
          </View>

          <View style={styles.switchContainer}>
            <View style={styles.switchTextContainer}>
              <Text style={styles.switchTitle}>Recommend to a friend?</Text>
              <Text style={styles.switchSub}>Would you suggest Food Express to others?</Text>
            </View>
            <Switch
              value={recommend}
              onValueChange={setRecommend}
              trackColor={{ false: '#767577', true: '#FF9E71' }}
              thumbColor={recommend ? '#FF5200' : '#f4f3f4'}
            />
          </View>

          <View style={{ flex: 1 }} />

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
            <Text style={styles.submitBtnText}>Submit Feedback</Text>
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
    marginBottom: 16,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  starBtn: {
    padding: 4,
  },
  starIcon: {
    fontSize: 40,
    color: '#DDD',
  },
  starIconActive: {
    color: '#FFB800',
  },
  ratingText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 24,
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    marginBottom: 20,
  },
  switchTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  switchTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
  },
  switchSub: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  submitBtn: {
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
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
