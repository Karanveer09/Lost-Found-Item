import { getCategoryIcon, formatDate, truncateText } from '../utils/helpers';
import { getProfile } from '../utils/storage';
import './ItemCard.css';

const ItemCard = ({ item, onClick }) => {
  const reporter = getProfile(item.reportedBy);

  return (
    <div className={`item-card glass-card ${item.type}`} onClick={() => onClick?.(item)} id={`item-card-${item.id}`}>
      <div className="item-card-header">
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
    </div>
  );
};

export default ItemCard;
