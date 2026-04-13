import { useState } from 'react';
import { createPortal } from 'react-dom';
import { getCategoryIcon, formatDate, truncateText } from '../utils/helpers';
import { getProfile, deleteItem } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import './ItemCard.css';

const ItemCard = ({ item, onClick }) => {
  const reporter = getProfile(item.reportedBy);
  const { isAdmin } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);
  
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  const confirmDelete = (e) => {
    e.stopPropagation();
    deleteItem(item.id);
    window.location.reload();
  };

  const cancelDelete = (e) => {
    e.stopPropagation();
    setShowConfirm(false);
  };

  return (
    <div className={`item-card glass-card ${item.type}`} onClick={() => onClick?.(item)} id={`item-card-${item.id}`}>
      <div className="item-card-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.8rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <div className="item-card-type-badge">
            <span className={`badge badge-${item.type}`}>
              {item.type === 'lost' ? '🔴 Lost' : '🟢 Found'}
            </span>
            <span className={`badge badge-${item.status}`}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </span>
          </div>
          <span className="item-card-time">{formatDate(item.reportedAt)}</span>
        </div>
        
        {isAdmin && (
          <button 
            className="admin-card-delete-btn"
            onClick={handleDeleteClick} 
            title="Delete specific item"
            style={{ margin: 0 }}
          >
            Delete Item
          </button>
        )}
      </div>

      {item.image && (
        <div className="item-card-image">
          <img src={item.image} alt={item.title} />
        </div>
      )}

      <div className="item-card-body">
        <div className="item-card-category">
          <span className="item-card-category-icon">{getCategoryIcon(item.category)}</span>
          <span className="item-card-category-label">{item.category}</span>
        </div>
        <h3 className="item-card-title">{item.title}</h3>
        <p className="item-card-desc">{truncateText(item.description, 120)}</p>
      </div>

      <div className="item-card-footer">
        <div className="item-card-location">
          <span>📍</span>
          <span>{item.location}</span>
        </div>
        <div className="item-card-reporter">
          <div className="item-card-reporter-avatar">
            {reporter?.name ? reporter.name.charAt(0) : '?'}
          </div>
          <span>{reporter?.name || item.reportedBy}</span>
        </div>
      </div>

      {showConfirm && createPortal(
        <div className="admin-delete-modal-overlay" onClick={cancelDelete}>
          <div className="admin-delete-modal glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">⚠️</div>
            <h3>Delete this report?</h3>
            <p>This action is permanent and cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={cancelDelete}>Cancel</button>
              <button className="btn-primary modal-confirm-btn" onClick={confirmDelete}>Confirm Delete</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ItemCard;
