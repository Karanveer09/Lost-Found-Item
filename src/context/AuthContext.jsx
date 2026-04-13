import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, isProfileComplete, logout as authLogout, authenticate } from '../utils/auth';
import { getProfile, setProfile as saveProfile, getItems, setItems } from '../utils/storage';
import { DEMO_ITEMS } from '../data/mockDatabase';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfileState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const current = getCurrentUser();
    if (current) {
      setUser(current);
      if (current.isAdmin) {
        setProfileState({ name: 'System Admin', department: 'Administration', year: 'Staff' });
      } else {
        const prof = getProfile(current.rollNumber);
        if (prof) setProfileState(prof);
      }
    }
    // Seed demo items if none exist
    if (getItems().length === 0) {
      setItems(DEMO_ITEMS);
    }
    setLoading(false);
  }, []);

  const login = (rollNumber, password) => {
    const result = authenticate(rollNumber, password);
    if (result.success) {
      setUser(result.user);
      if (result.user.isAdmin) {
        setProfileState({ name: 'System Admin', department: 'Administration', year: 'Staff' });
      } else {
        const prof = getProfile(rollNumber);
        if (prof) setProfileState(prof);
      }
    }
    return result;
  };

  const logout = () => {
    authLogout();
    setUser(null);
    setProfileState(null);
  };

  const updateProfile = (profileData) => {
    if (!user || user.isAdmin) return;
    const updated = { ...profile, ...profileData };
    saveProfile(user.rollNumber, updated);
    setProfileState(updated);
  };

  const hasProfile = user ? isProfileComplete(user.rollNumber) : false;
  const isAdmin = user?.isAdmin || false;

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, logout, updateProfile, hasProfile, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

