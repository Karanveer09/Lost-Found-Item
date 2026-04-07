import { COLLEGE_STUDENTS } from '../data/mockDatabase';
import { getUser, setUser, removeUser, getProfile, storage } from './storage';

export const authenticate = (rollNumber, password) => {
  const roll = Number(rollNumber);

  if (roll < 2331000 || roll > 2331299) {
    return { success: false, error: 'Roll number not found in college database.' };
  }

  const storedPassword = storage.get(`password_${rollNumber}`);
  const validPassword = storedPassword || 'college123';


  if (password !== validPassword) {
    return { success: false, error: 'Incorrect password.' };
  }

  const user = { rollNumber, loggedInAt: new Date().toISOString() };
  setUser(user);

  return { success: true, user };
};

export const logout = () => {
  removeUser();
};

export const getCurrentUser = () => {
  return getUser();
};

export const isProfileComplete = (rollNumber) => {
  const profile = getProfile(rollNumber);
  return profile && profile.name && profile.department && profile.year;
};

export const isAuthenticated = () => {
  return !!getUser();
};
