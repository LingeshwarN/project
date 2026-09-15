import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchProfileData } from '../api/foodApi';
import { getStoredJson, saveStoredJson, STORAGE_KEYS } from '../utils/storage';

export interface UserProfile {
  email: string;
  name: string;
  phone: string;
  address: string;
}

interface UserContextType {
  user: UserProfile | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
}

const defaultProfile: UserProfile = {
  email: 'user@foodexpress.com',
  name: 'Food Explorer',
  phone: '+91 98765 43210',
  address: 'Flat 402, Springdale Apartments, Indiranagar, Bengaluru - 560038',
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const restoreUser = async () => {
      const savedUser = await getStoredJson<UserProfile | null>(STORAGE_KEYS.user, null);
      if (savedUser) {
        setUser(savedUser);
      }
    };

    restoreUser();
  }, []);

  useEffect(() => {
    if (user) {
      saveStoredJson(STORAGE_KEYS.user, user);
    } else {
      saveStoredJson(STORAGE_KEYS.user, null);
    }
  }, [user]);

  const login = async (email: string) => {
    const remoteProfile = await fetchProfileData(email);
    const nextUser: UserProfile = {
      email: remoteProfile.email || email,
      name: remoteProfile.name || email.split('@')[0],
      phone: remoteProfile.phone || defaultProfile.phone,
      address: remoteProfile.address || defaultProfile.address,
    };

    setUser(nextUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
