import { COLLEGE_STUDENTS } from '../data/mockDatabase';
import { getUser, setUser, removeUser, getProfile, storage } from './storage';

export const authenticate = (rollNumber, password) => {
  const student = COLLEGE_STUDENTS.find((s) => s.rollNumber === rollNumber);
  if (!student) {
    return { success: false, error: 'Roll number not found in college database.' };
  }

  // Check if user has changed password before
  const storedPassword = storage.get(`password_${rollNumber}`);
  const validPassword = storedPassword || student.password;

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
