/**
 * Simulated JWT Authentication Service for Experiment 6.
 * Uses AsyncStorage to persist a fake JWT token.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

// base64 helpers available in the RN runtime (Hermes) but not in some TS lib configs
declare const btoa: (input: string) => string;
declare const atob: (input: string) => string;

const TOKEN_KEY = 'FOOD_EXPRESS_JWT_TOKEN';

// Fallback storage for environments where native AsyncStorage is null (e.g. missing native build)
let inMemoryToken: string | null = null;

const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch {
    return inMemoryToken;
  }
};

const setAuthToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch {
    inMemoryToken = token;
  }
};

const removeAuthToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch {
    inMemoryToken = null;
  }
};

interface DecodedToken {
  email: string;
  iat: number;  // issued at (timestamp in ms)
  exp: number;  // expiry (timestamp in ms)
}

/**
 * Simulates a JWT login.
 * Accepts any valid email + password that passes strength requirements.
 * Generates a fake JWT-like token and stores it.
 */
export const simulateLogin = async (email: string, _password: string): Promise<{ success: boolean; token?: string; error?: string }> => {
  try {
    // Simulate server delay
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));

    // Build a fake JWT payload
    const now = Date.now();
    const payload: DecodedToken = {
      email,
      iat: now,
      exp: now + 24 * 60 * 60 * 1000, // 24 hours expiry
    };

    // Encode as base64 to mimic a JWT structure (header.payload.signature)
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const body = btoa(JSON.stringify(payload));
    const signature = btoa(`simulated-signature-${now}`);
    const token = `${header}.${body}.${signature}`;

    // Store the token
    await setAuthToken(token);

    console.log('[AuthService] JWT token generated and stored successfully.');
    return { success: true, token };
  } catch (error) {
    console.error('[AuthService] Login failed:', error);
    return { success: false, error: 'Authentication failed. Please try again.' };
  }
};

/**
 * Reads the stored token and checks its validity.
 * Returns the decoded user info if valid, or null if expired/missing.
 */
export const getStoredToken = async (): Promise<{ email: string } | null> => {
  try {
    const token = await getAuthToken();
    if (!token) {
      console.log('[AuthService] No stored token found.');
      return null;
    }

    // Decode the payload (second segment)
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.log('[AuthService] Invalid token format.');
      await removeAuthToken();
      return null;
    }

    const payload: DecodedToken = JSON.parse(atob(parts[1]));

    // Check expiry
    if (Date.now() > payload.exp) {
      console.log('[AuthService] Token has expired. Clearing session.');
      await removeAuthToken();
      return null;
    }

    console.log('[AuthService] Valid session found for:', payload.email);
    return { email: payload.email };
  } catch {
    // Silencing log error for missing native module to avoid console clutter in prototype
    return inMemoryToken ? { email: 'user@foodexpress.com' } : null;
  }
};

/**
 * Removes the stored JWT token (logout).
 */
export const simulateLogout = async (): Promise<void> => {
  try {
    await removeAuthToken();
    console.log('[AuthService] Token cleared. User logged out.');
  } catch (error) {
    console.error('[AuthService] Error during logout:', error);
  }
};
