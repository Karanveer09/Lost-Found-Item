import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVisibleItems } from '../utils/storage';
import { CATEGORIES, HOSTELS } from '../data/mockDatabase';
import { useAuth } from '../context/AuthContext';
import ItemCard from '../components/ItemCard';
import ItemModal from '../components/ItemModal';
import './CampusPage.css';

const HostelPage = () => {
  const { isAdmin, profile } = useAuth();
  const navigate = useNavigate();
  const [items, setItemsList] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [hostelFilter, setHostelFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    const all = getVisibleItems(isAdmin).filter((i) => i.module === 'hostel');
    setItemsList(all);
  };

  const filteredItems = items.filter((item) => {
    if (activeTab !== 'all' && item.type !== activeTab) return false;
    if (categoryFilter && item.category !== categoryFilter) return false;
    if (hostelFilter && item.hostel !== hostelFilter) return false;
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

  const hostelsForFilter = HOSTELS.filter((h) => !h.includes('Day Scholar'));

  return (
    <div className="hostel-page">
      <div className="page-header animate-fade-in">
        <div>
          {isAdmin ? (
            <h1 className="page-title" style={{ color: 'var(--accent-rose)', fontWeight: 'bold' }}>🏠 Hostel Monitoring</h1>
          ) : (
            <h1 className="page-title">🏠 Hostel Lost & Found</h1>
          )}
          <p className="page-subtitle">
            {isAdmin ? 'Monitor and moderate all items lost in hostels' : 'Report and find items lost in hostels'}
          </p>
        </div>
        {!isAdmin && !profile?.hostel?.includes('Day Scholar') && (
          <button className="btn-primary report-btn" onClick={() => setShowModal(true)}>
            <span>+</span>
            <span>Report Item</span>
          </button>
        )}
      </div>

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
              placeholder="Search in hostels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>
          <div className="select-wrapper">
            <span className="select-icon">🏢</span>
            <select
              className="hostel-select"
              value={hostelFilter}
              onChange={(e) => setHostelFilter(e.target.value)}
            >
              <option value="">All Hostels</option>
              {hostelsForFilter.map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
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

      <div className="items-grid stagger-children">
        {filteredItems.length === 0 ? (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
            <div className="empty-state-icon">🏠</div>
            <h3 className="empty-state-title">No hostel items found</h3>
            <p className="empty-state-text">
              {searchQuery || categoryFilter || hostelFilter
                ? 'Try adjusting your filters.'
                : 'No hostel items reported yet.'}
            </p>
            {!isAdmin && !profile?.hostel?.includes('Day Scholar') && (
              <button className="btn-primary" onClick={() => setShowModal(true)} style={{ marginTop: '1rem' }}>
                <span>Report an Item</span>
              </button>
            )}
            {profile?.hostel?.includes('Day Scholar') && (
              <p className="day-scholar-note" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '1rem' }}>
                ℹ️ Day Scholars can view items but cannot post in the Hostel Hub.
              </p>
            )}
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
        module="hostel"
        onItemAdded={loadItems}
      />
    </div>
  );
};

export default HostelPage;
