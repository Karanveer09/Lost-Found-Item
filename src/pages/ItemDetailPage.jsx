import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getVisibleItems, updateItem, getChats, setChats, getProfile } from '../utils/storage';
import { formatDate, getCategoryIcon, getCategoryLabel, generateChatId } from '../utils/helpers';
import './ItemDetailPage.css';

const ItemDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const items = getVisibleItems(isAdmin);
    const found = items.find((i) => i.id === id);
    setItem(found);
  }, [id]);

  if (!item) {
    return (
      <div className="item-detail-page">
        <div className="empty-state">
          <div className="empty-state-icon">❌</div>
          <h3 className="empty-state-title">Item not found</h3>
          <button className="btn-primary" onClick={() => navigate(-1)} style={{ marginTop: '1rem' }}>
            <span>Go Back</span>
          </button>
        </div>
      </div>
    );
  }

  const reporter = getProfile(item.reportedBy);
  const isOwner = item.reportedBy === user?.rollNumber;

  const handleClaim = () => {
    // Check if chat already exists
    const chats = getChats();
    const existingChat = chats.find(
      (c) => c.itemId === item.id && (c.claimerId === user.rollNumber || c.reporterId === user.rollNumber)
    );

    if (existingChat) {
      navigate(`/chats?chatId=${existingChat.id}`);
      return;
    }

    // Create new chat
    const chatId = generateChatId();
    const newChat = {
      id: chatId,
      itemId: item.id,
      itemTitle: item.title,
      itemType: item.type,
      reporterId: item.reportedBy,
      reporterName: reporter?.name || item.reportedBy,
      claimerId: user.rollNumber,
      claimerName: getProfile(user.rollNumber)?.name || user.rollNumber,
      createdAt: new Date().toISOString(),
      lastMessage: item.type === 'found'
        ? 'Hi! I believe this is my item.'
        : 'Hi! I think I found your item.',
      lastMessageAt: new Date().toISOString(),
      status: 'active',
      unread: true,
    };

    const updatedChats = [newChat, ...chats];
    setChats(updatedChats);

    // Update item status
    updateItem(item.id, { status: 'claimed', claimedBy: user.rollNumber });

    navigate(`/chats?chatId=${chatId}`);
  };

  return (
    <div className="item-detail-page animate-fade-in">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="item-detail-card glass-card">
        <div className="item-detail-header">
          <div className="detail-badges">
            <span className={`badge badge-${item.type}`}>
              {item.type === 'lost' ? '🔴 Lost Item' : '🟢 Found Item'}
            </span>
            <span className={`badge badge-${item.status}`}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </span>
          </div>
        </div>

        {item.image && (
          <div className="item-detail-image">
            <img src={item.image} alt={item.title} />
          </div>
        )}

        <h1 className="item-detail-title">{item.title}</h1>

        <div className="item-detail-meta">
          <div className="meta-item">
            <span className="meta-icon">{getCategoryIcon(item.category)}</span>
            <span>{getCategoryLabel(item.category)}</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">📍</span>
            <span>{item.location}</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">📅</span>
            <span>{item.date}</span>
          </div>
          {item.hostel && (
            <div className="meta-item">
              <span className="meta-icon">🏠</span>
              <span>{item.hostel}</span>
            </div>
          )}
          <div className="meta-item">
            <span className="meta-icon">🕐</span>
            <span>Reported {formatDate(item.reportedAt)}</span>
          </div>
        </div>

        <div className="item-detail-description">
          <h3>Description</h3>
          <p>{item.description}</p>
        </div>

        <div className="item-detail-reporter glass-card">
          <div className="reporter-avatar">
            {reporter?.name ? reporter.name.charAt(0).toUpperCase() : '?'}
          </div>
          <div className="reporter-info">
            <span className="reporter-name">{reporter?.name || item.reportedBy}</span>
            <span className="reporter-dept">
              {reporter?.department || 'Unknown'} · {reporter?.year || ''}
            </span>
          </div>
          <span className="reporter-label">Reported by</span>
        </div>

        {!isOwner && item.status === 'open' && !isAdmin && (
          <div className="item-detail-actions">
            {item.type === 'found' ? (
              <button className="btn-primary claim-btn" onClick={handleClaim}>
                <span>🙋 This is mine — Claim Item</span>
              </button>
            ) : (
              <button className="btn-success claim-btn" onClick={handleClaim}>
                <span>🔍 I found this — Respond</span>
              </button>
            )}
          </div>
        )}

        {item.status === 'claimed' && (
          <div className="claimed-notice">
            <span>💬</span>
            <p>This item has been claimed. Verification is in progress via chat.</p>
          </div>
        )}

        {item.status === 'returned' && (
          <div className="returned-notice">
            <span>✅</span>
            <p>This item has been verified and returned to its owner.</p>
          </div>
        )}

        {isOwner && (
          <div className="owner-notice">
            <span>📝</span>
            <p>This is your report. You'll be notified when someone claims or responds to it.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetailPage;
