import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getVisibleItems } from '../utils/storage';
import StatsCard from '../components/StatsCard';
import ItemCard from '../components/ItemCard';
import './DashboardPage.css'; // Leverage existing dashboard styles

const AdminPage = () => {
  const { profile, user } = useAuth();
  const navigate = useNavigate();
  // Fetch ALL global items for admin
  const items = getVisibleItems(true);

  const totalLost = items.filter((i) => i.type === 'lost').length;
  const totalFound = items.filter((i) => i.type === 'found').length;
  const claimed = items.filter((i) => i.status === 'claimed' || i.status === 'returned').length;

  const recentItems = items.slice(0, 8); // Showing top 8 recent everywhere

  return (
    <div className="dashboard-page">
      <div className="dashboard-welcome animate-fade-in">
        <div className="welcome-text">
          <h1 className="page-title" style={{ background: 'linear-gradient(135deg, var(--accent-rose), var(--accent-amber))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', width: 'fit-content' }}>
            System Global Dashboard ⚡
          </h1>
          <p className="page-subtitle">
            Overview of the entire college's Lost & Found history and activity.
          </p>
        </div>
        <div className="welcome-actions">
           <button className="btn-secondary" onClick={() => navigate('/admin/actions')} style={{ border: '1px solid var(--accent-rose)', color: 'var(--accent-rose)' }}>
            Go to Actions ⚖️
          </button>
        </div>
      </div>

      <div className="stats-grid animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <StatsCard icon="🔴" label="Total Items Lost" value={totalLost} color="var(--accent-rose)" delay={0.05} />
        <StatsCard icon="🟢" label="Total Items Found" value={totalFound} color="var(--accent-emerald)" delay={0.1} />
        <StatsCard icon="📋" label="Overall Reports" value={items.length} color="var(--primary)" delay={0.15} />
        <StatsCard icon="✅" label="Claimed / Resolved" value={claimed} color="var(--accent-cyan)" delay={0.2} />
      </div>

      <div className="recent-activity-section animate-fade-in" style={{ animationDelay: '0.2s', marginTop: '2rem' }}>
        <div className="section-header">
          <h2 className="section-title">📋 Global Feed</h2>
        </div>

        <div className="dashboard-recent-grid">
          {recentItems.length === 0 ? (
            <div className="empty-state glass-card">
              <div className="empty-state-icon">🔍</div>
              <p className="empty-state-title">No system activity</p>
              <p className="empty-state-text">There are no items recorded in the database.</p>
            </div>
          ) : (
            recentItems.map((item) => (
              <ItemCard key={item.id} item={item} onClick={() => navigate(`/item/${item.id}`)} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
