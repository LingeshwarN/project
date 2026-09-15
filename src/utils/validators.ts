/**
 * Shared validation utility functions for Experiment 6.
 * Each function returns an error message string, or empty string if valid.
 */

/** Full Name: only alphabetic characters, not empty */
export const validateFullName = (name: string): string => {
  if (!name.trim()) return 'Full Name is required.';
  // Prompt says "should contain only alphabetic characters"
  if (!/^[a-zA-Z]+$/.test(name.trim().replace(/\s/g, ''))) return 'Full Name must contain only alphabetic characters.';
  return '';
};

/** Mobile Number: exactly 10 digits */
export const validateMobile = (mobile: string): string => {
  if (!mobile.trim()) return 'Mobile Number is required.';
  const digitsOnly = mobile.replace(/\D/g, '');
  if (digitsOnly.length !== 10) return 'Mobile Number must contain exactly 10 digits.';
  return '';
};

/** Email: standard email format */
export const validateEmail = (email: string): string => {
  if (!email.trim()) return 'Email Address is required.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) return 'Please enter a valid email address.';
  return '';
};

/** Password: ≥ 8 chars, 1 uppercase, 1 lowercase, 1 digit */
export const validatePassword = (password: string): string => {
  if (!password) return 'Password is required.';
  if (password.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least 1 uppercase letter.';
  if (!/[a-z]/.test(password)) return 'Password must contain at least 1 lowercase letter.';
  if (!/[0-9]/.test(password)) return 'Password must contain at least 1 digit.';
  return '';
};

/** Confirm Password: must match password */
export const validateConfirmPassword = (password: string, confirmPassword: string): string => {
  if (!confirmPassword) return 'Confirm Password is required.';
  if (password !== confirmPassword) return 'Passwords do not match.';
  return '';
};

/** Pincode: 6-digit numeric value */
export const validatePincode = (pincode: string): string => {
  if (!pincode.trim()) return 'Pincode is required.';
  if (!/^\d{6}$/.test(pincode.trim())) return 'Pincode must be a valid 6-digit number.';
  return '';
};

/** Generic not-empty check */
export const validateRequired = (value: string, fieldName: string): string => {
  if (!value || (typeof value === 'string' && !value.trim())) return `${fieldName} is required.`;
  return '';
};

/** Terms Acceptance */
export const validateTerms = (accepted: boolean): string => {
  if (!accepted) return 'You must accept the Terms and Conditions.';
  return '';
};

/** Rating Selection */
export const validateRating = (rating: number): string => {
  if (rating === 0) return 'Please select a rating before submitting.';
  return '';
};
