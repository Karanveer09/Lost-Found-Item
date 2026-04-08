import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getItems } from '../utils/storage';
import { CATEGORIES } from '../data/mockDatabase';
import ItemCard from '../components/ItemCard';
import ItemModal from '../components/ItemModal';
import './CampusPage.css';

const CampusPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [items, setItemsList] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadItems();
    if (location.state?.openModal) {
      setShowModal(true);
    }
  }, [location.state]);

  const loadItems = () => {
    const all = getItems().filter((i) => i.module === 'campus');
    setItemsList(all);
  };

  const filteredItems = items.filter((item) => {
    if (activeTab !== 'all' && item.type !== activeTab) return false;
    if (categoryFilter && item.category !== categoryFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="campus-page">
      <div className="page-header animate-fade-in">
        <div>
          <h1 className="page-title">🏫 Campus Lost & Found</h1>
          <p className="page-subtitle">Report and find items lost on campus</p>
        </div>
        <button className="btn-primary report-btn" onClick={() => setShowModal(true)}>
          <span>+</span>
          <span>Report Item</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="filter-section animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="tabs">
          <button className={`tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
            📋 All Items
          </button>
          <button className={`tab ${activeTab === 'lost' ? 'active' : ''}`} onClick={() => setActiveTab('lost')}>
            🔴 Lost
          </button>
          <button className={`tab ${activeTab === 'found' ? 'active' : ''}`} onClick={() => setActiveTab('found')}>
            🟢 Found
          </button>
        </div>

        <div className="filter-bar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search items by title, location or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>
          <div className="select-wrapper">
            <span className="select-icon">📁</span>
            <select
              className="category-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="items-grid stagger-children">
        {filteredItems.length === 0 ? (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
            <div className="empty-state-icon">🔍</div>
            <h3 className="empty-state-title">No items found</h3>
            <p className="empty-state-text">
              {searchQuery || categoryFilter
                ? 'Try adjusting your filters or search query.'
                : 'No items have been reported yet. Be the first!'}
            </p>
            <button className="btn-primary" onClick={() => setShowModal(true)} style={{ marginTop: '1rem' }}>
              <span>Report an Item</span>
            </button>
          </div>
        ) : (
          filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} onClick={() => navigate(`/item/${item.id}`)} />
          ))
        )}
      </div>

      <ItemModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        module="campus"
        onItemAdded={loadItems}
      />
    </div>
  );
};

export default CampusPage;
