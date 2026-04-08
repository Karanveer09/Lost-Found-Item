import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getChats } from '../utils/storage';
import logoImg from '../assets/Logo.jpg';
import './Sidebar.css';

const navItems = [
  { path: '/', label: 'Home', icon: '✨' },
  { path: '/dashboard', label: 'History', icon: '🏠' },
  { path: '/campus', label: 'Campus', icon: '🏫' },
  { path: '/hostel', label: 'Hostel', icon: '🏢' },
  { path: '/chat', label: 'Messages', icon: '💬' },
  { path: '/help', label: 'Guidelines', icon: '🛡️' },
];

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { profile, logout } = useAuth();
  const chats = getChats();
  const unreadCount = chats?.filter(c => c.unread)?.length || 0;

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'show' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo" onClick={() => navigate('/')}>
            <img src={logoImg} alt="logo" className="logo-img" />
          </div>
          
          <button className="sidebar-toggle-close" onClick={onClose} aria-label="Close Sidebar">
             <span className="hamburger-line"></span>
             <span className="hamburger-line"></span>
             <span className="hamburger-line"></span>
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <span className="section-label">MAIN NAVIGATION</span>
            <div className="nav-links">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  {item.path === '/chat' && unreadCount > 0 && (
                    <span className="nav-badge">{unreadCount}</span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="profile-btn-container" onClick={() => navigate('/profile')}>
            <div className="profile-mini-card">
              <div className="profile-avatar">
                {profile?.name ? profile.name.charAt(0).toUpperCase() : '?'}
              </div>
              <div className="profile-info">
                <span className="profile-name">{profile?.name || 'Student'}</span>
                <span className="profile-status">View Profile</span>
              </div>
              <span className="profile-arrow">→</span>
            </div>
          </div>
          
          <button className="sidebar-logout" onClick={logout}>
            <span className="logout-icon">🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Nav */}
      <nav className="mobile-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
          >
            <span className="mobile-icon">{item.icon}</span>
            <span className="mobile-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
