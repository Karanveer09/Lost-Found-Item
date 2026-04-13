import { COLLEGE_STUDENTS, ADMIN_USERS } from '../data/mockDatabase';
import { getUser, setUser, removeUser, getProfile, storage, isUserSuspended } from './storage';

export const authenticate = (rollNumber, password) => {
  if (isUserSuspended(rollNumber)) {
    return { success: false, error: 'Your account has been suspended by an administrator.' };
  }

  // Check if it is an admin
  const admin = ADMIN_USERS.find((a) => a.rollNumber === rollNumber);
  if (admin) {
    if (password !== admin.password) return { success: false, error: 'Incorrect admin password.' };
    const user = { rollNumber, isAdmin: true, loggedInAt: new Date().toISOString() };
    setUser(user);
    return { success: true, user };
  }

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

  const user = { rollNumber, isAdmin: false, loggedInAt: new Date().toISOString() };
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
  const admin = ADMIN_USERS.find((a) => a.rollNumber === rollNumber);
  if (admin) return true;

  const profile = getProfile(rollNumber);
  return profile && profile.name && profile.department && profile.year;
};

export const isAuthenticated = () => {
  return !!getUser();
};
