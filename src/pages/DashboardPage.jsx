import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getItems } from '../utils/storage';
import { formatDate, getCategoryIcon } from '../utils/helpers';
import StatsCard from '../components/StatsCard';
import ItemCard from '../components/ItemCard';
import './DashboardPage.css';
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const { profile, user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/api/items")
    .then((res) => res.json())
    .then((data) => setItems(data))
    .catch((err) => console.error(err));
}, []);
 console.log(items);
  const totalLost = items.filter((i) => i.type === 'lost').length;
  const totalFound = items.filter((i) => i.type === 'found').length;
  const myReports = items.filter((i) => i.reportedBy === user?.rollNumber).length;
  const claimed = items.filter((i) => i.status === 'claimed' || i.status === 'returned').length;

  const recentItems = items.slice(0, 6);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-welcome animate-fade-in">
        <div className="welcome-text">
          <h1 className="page-title">
            {getGreeting()}, {profile?.name?.split(' ')[0] || 'Student'}! 👋
          </h1>
          <p className="page-subtitle">
            Welcome to your college's official Lost & Found portal.
          </p>
        </div>
        <div className="welcome-actions">
          <button className="btn-primary report-main-btn" onClick={() => navigate('/campus', { state: { openModal: true } })}>
            <span className="btn-icon">⚡</span>
            <span>Report Item</span>
          </button>
        </div>
      </div>

      <div className="module-explorer-grid animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="explorer-card campus-module" onClick={() => navigate('/campus')}>
          <div className="module-icon-bg">🏫</div>
          <div className="module-content">
            <h3>Campus Hub</h3>
            <p>Classrooms, Library, Labs, Canteen</p>
          </div>
          <span className="explore-arrow">→</span>
        </div>
        <div className="explorer-card hostel-module" onClick={() => navigate('/hostel')}>
          <div className="module-icon-bg">🏢</div>
          <div className="module-content">
            <h3>Hostel Block</h3>
            <p>Rooms, Mess, Common Areas</p>
          </div>
          <span className="explore-arrow">→</span>
        </div>
      </div>

      <div className="stats-grid">
        <StatsCard icon="🔴" label="Items Lost" value={totalLost} color="var(--accent-rose)" delay={0.05} />
        <StatsCard icon="🟢" label="Items Found" value={totalFound} color="var(--accent-emerald)" delay={0.1} />
        <StatsCard icon="📋" label="My Reports" value={myReports} color="var(--primary)" delay={0.15} />
        <StatsCard icon="✅" label="Claimed / Returned" value={claimed} color="var(--accent-cyan)" delay={0.2} />
      </div>

      <div className="recent-activity-section animate-fade-in" style={{ animationDelay: '0.25s' }}>
        <div className="section-header">
          <h2 className="section-title">📋 Recent Activity</h2>
          <div className="header-actions">
            <button className="btn-secondary view-all-btn" onClick={() => navigate('/campus')}>
              View All Activity →
            </button>
          </div>
        </div>

        <div className="dashboard-recent-grid">
          {recentItems.length === 0 ? (
            <div className="empty-state glass-card">
              <div className="empty-state-icon">🔍</div>
              <p className="empty-state-title">No recent activities</p>
              <p className="empty-state-text">Be the first to report a lost or found item!</p>
            </div>
          ) : (
            recentItems.map((item) => (
              <ItemCard key={item.id} item={item} onClick={() => navigate(`/item/${item.id}`)} />
            ))
          )}
        </div>
      </div>
      
      <div className="quick-actions-banner glass-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="banner-content">
          <h3>Need help reporting or claiming?</h3>
          <p>Read our guidelines on privacy and smooth item verification.</p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/help')}>
          Read Guidelines
        </button>
      </div>

    </div>
  );
};

export default DashboardPage;
