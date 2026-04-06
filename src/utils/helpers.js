import { CATEGORIES } from '../data/mockDatabase';

export const generateId = () => {
  return 'item-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
};

export const generateChatId = () => {
  return 'chat-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
};

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
};

export const formatTime = (dateStr) => {
  return new Date(dateStr).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getCategoryIcon = (categoryId) => {
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  return cat ? cat.icon : '📦';
};

export const getCategoryLabel = (categoryId) => {
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  return cat ? cat.label : 'Others';
};

export const truncateText = (text, maxLen = 100) => {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + '…';
};

export const getStatusColor = (status) => {
  const colors = {
    open: 'var(--status-open)',
    claimed: 'var(--status-claimed)',
    returned: 'var(--status-returned)',
    expired: 'var(--status-expired)',
  };
  return colors[status] || colors.open;
};

export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
