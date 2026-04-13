import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getChats, setChats, getChatMessages, addChatMessage, getProfile, updateItem } from '../utils/storage';
import { formatDate, formatTime } from '../utils/helpers';
import './ChatPage.css';

const ChatPage = () => {
  const { user, isAdmin } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [chats, setChatsList] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    let allChats = getChats();
    // Only admins see all chats, users only see theirs
    if (!isAdmin) {
      allChats = allChats.filter(c => c.claimerId === user?.rollNumber || c.reporterId === user?.rollNumber);
    }
    setChatsList(allChats);

    const chatIdParam = searchParams.get('chatId');
    if (chatIdParam) {
      setActiveChatId(chatIdParam);
    } else if (allChats.length > 0) {
      setActiveChatId(allChats[0].id);
    }
  }, [searchParams, isAdmin, user?.rollNumber]);

  useEffect(() => {
    if (activeChatId) {
      const msgs = getChatMessages(activeChatId);
      if (msgs.length === 0) {
        // Add initial message
        const chat = chats.find((c) => c.id === activeChatId);
        if (chat) {
          const initial = {
            id: 'msg-initial',
            senderId: chat.claimerId,
            text: chat.lastMessage,
            timestamp: chat.createdAt,
          };
          addChatMessage(activeChatId, initial);
          setMessages([initial]);
        }
      } else {
        setMessages(msgs);
      }

      // Mark as read
      const updatedChats = chats.map((c) =>
        c.id === activeChatId ? { ...c, unread: false } : c
      );
      setChats(updatedChats);
      setChatsList(updatedChats);
    }
  }, [activeChatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const activeChat = chats.find((c) => c.id === activeChatId);
  const otherPersonId = activeChat
    ? isAdmin ? activeChat.reporterId : (activeChat.reporterId === user?.rollNumber ? activeChat.claimerId : activeChat.reporterId)
    : null;
  const otherPerson = otherPersonId ? getProfile(otherPersonId) : null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChatId) return;

    const msg = {
      id: 'msg-' + Date.now(),
      senderId: user.rollNumber,
      text: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    const updated = addChatMessage(activeChatId, msg);
    setMessages(updated);
    setNewMessage('');

    // Update chat last message
    const updatedChats = chats.map((c) =>
      c.id === activeChatId
        ? { ...c, lastMessage: msg.text, lastMessageAt: msg.timestamp }
        : c
    );
    setChats(updatedChats);
    setChatsList(updatedChats);
  };

  const handleMarkReturned = () => {
    if (!activeChat) return;
    updateItem(activeChat.itemId, { status: 'returned' });
    const updatedChats = chats.map((c) =>
      c.id === activeChatId ? { ...c, status: 'resolved' } : c
    );
    setChats(updatedChats);
    setChatsList(updatedChats);

    const systemMsg = {
      id: 'msg-system-' + Date.now(),
      senderId: 'system',
      text: '✅ Item has been marked as returned! This case is now closed.',
      timestamp: new Date().toISOString(),
    };
    const updated = addChatMessage(activeChatId, systemMsg);
    setMessages(updated);
  };

  return (
    <div className="chat-page">
      <div className="page-header animate-fade-in">
        <h1 className="page-title">💬 Messages</h1>
        <p className="page-subtitle">Chat with claimers and finders to verify items</p>
      </div>

      <div className="chat-container glass-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
        {/* Chat List */}
        <div className={`chat-list ${activeChatId ? 'hide-mobile' : ''}`}>
          <div className="chat-list-header">
            <h3>Conversations</h3>
            <span className="chat-count">{chats.length}</span>
          </div>
          {chats.length === 0 ? (
            <div className="empty-state" style={{ padding: '2rem 1rem' }}>
              <p className="empty-state-text" style={{ fontSize: '0.82rem' }}>
                No conversations yet. Claim or respond to an item to start chatting!
              </p>
            </div>
          ) : (
            <div className="chat-items">
              {chats.map((chat) => {
                const otherId = isAdmin ? chat.reporterId : (chat.reporterId === user?.rollNumber ? chat.claimerId : chat.reporterId);
                const otherProf = getProfile(otherId);
                return (
                  <div
                    key={chat.id}
                    className={`chat-item ${activeChatId === chat.id ? 'active' : ''} ${chat.unread ? 'unread' : ''}`}
                    onClick={() => {
                      setActiveChatId(chat.id);
                      setSearchParams({ chatId: chat.id });
                    }}
                  >
                    <div className="chat-item-avatar">
                      {otherProf?.name ? otherProf.name.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div className="chat-item-info">
                      <div className="chat-item-top">
                        <span className="chat-item-name">{otherProf?.name || otherId}</span>
                        <span className="chat-item-time">{formatDate(chat.lastMessageAt)}</span>
                      </div>
                      <span className="chat-item-subject">
                        {chat.itemType === 'found' ? '🟢' : '🔴'} {chat.itemTitle}
                      </span>
                      <span className="chat-item-preview">{chat.lastMessage}</span>
                    </div>
                    {chat.unread && <div className="unread-dot" />}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Chat Window */}
        <div className={`chat-window ${!activeChatId ? 'hide-mobile' : ''}`}>
          {activeChat ? (
            <>
              <div className="chat-window-header">
                <button className="back-to-list" onClick={() => setActiveChatId(null)}>←</button>
                <div className="chat-window-avatar">
                  {otherPerson?.name ? otherPerson.name.charAt(0).toUpperCase() : '?'}
                </div>
                <div className="chat-window-info">
                  <span className="chat-window-name">{otherPerson?.name || otherPersonId}</span>
                  <span className="chat-window-item">
                    {activeChat.itemType === 'found' ? '🟢' : '🔴'} {activeChat.itemTitle}
                  </span>
                </div>
                {activeChat.status !== 'resolved' && !isAdmin && (
                  <button className="btn-success mark-returned-btn" onClick={handleMarkReturned}>
                    <span>✅ Mark Returned</span>
                  </button>
                )}
              </div>

              <div className="chat-messages">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`chat-bubble ${
                      msg.senderId === 'system'
                        ? 'system'
                        : msg.senderId === user?.rollNumber
                        ? 'sent'
                        : 'received'
                    }`}
                  >
                    <div className="bubble-content">
                      <p>{msg.text}</p>
                      <span className="bubble-time">{formatTime(msg.timestamp)}</span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {activeChat.status !== 'resolved' && !isAdmin && (
                <form className="chat-input-area" onSubmit={handleSend}>
                  <input
                    type="text"
                    className="input-field chat-input"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    autoFocus
                  />
                  <button type="submit" className="btn-primary send-btn" disabled={!newMessage.trim()}>
                    <span>➤</span>
                  </button>
                </form>
              )}
            </>
          ) : (
            <div className="no-chat-selected">
              <div className="no-chat-icon">💬</div>
              <h3>Select a conversation</h3>
              <p>Choose a chat from the list to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
