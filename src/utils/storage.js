// localStorage wrapper for CampusTrace

const STORAGE_PREFIX = 'campustrace_';

export const storage = {
  get(key) {
    try {
      const data = localStorage.getItem(STORAGE_PREFIX + key);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  remove(key) {
    localStorage.removeItem(STORAGE_PREFIX + key);
  },

  clear() {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(STORAGE_PREFIX))
      .forEach((k) => localStorage.removeItem(k));
  },
};

// Specific storage helpers
export const getUser = () => storage.get('currentUser');
export const setUser = (user) => storage.set('currentUser', user);
export const removeUser = () => storage.remove('currentUser');

export const getProfile = (rollNumber) => storage.get(`profile_${rollNumber}`);
export const setProfile = (rollNumber, profile) => storage.set(`profile_${rollNumber}`, profile);

export const getItems = () => storage.get('items') || [];
export const setItems = (items) => storage.set('items', items);
export const addItem = (item) => {
  const items = getItems();
  items.unshift(item);
  setItems(items);
  return item;
};
export const updateItem = (id, updates) => {
  const items = getItems();
  const idx = items.findIndex((i) => i.id === id);
  if (idx !== -1) {
    items[idx] = { ...items[idx], ...updates };
    setItems(items);
    return items[idx];
  }
  return null;
};

export const getChats = () => storage.get('chats') || [];
export const setChats = (chats) => storage.set('chats', chats);
export const getChatMessages = (chatId) => storage.get(`chat_messages_${chatId}`) || [];
export const setChatMessages = (chatId, messages) => storage.set(`chat_messages_${chatId}`, messages);
export const addChatMessage = (chatId, message) => {
  const messages = getChatMessages(chatId);
  messages.push(message);
  setChatMessages(chatId, messages);
  return messages;
};

export const getContactSubmissions = () => storage.get('contactSubmissions') || [];
export const addContactSubmission = (submission) => {
  const subs = getContactSubmissions();
  subs.unshift(submission);
  storage.set('contactSubmissions', subs);
};
