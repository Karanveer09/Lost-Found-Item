import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, profile, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Overview';
    if (path === '/campus') return 'Campus Exploration';
    if (path === '/hostel') return 'Hostel Block';
    if (path === '/chat') return 'Messages';
    if (path === '/help') return 'Guidelines';
    if (path === '/profile') return 'My Profile';
    if (path.startsWith('/item/')) return 'Detailed View';
    return 'CampusTrace';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="breadcrumb-pill">
          <span className="breadcrumb-dot"></span>
          <span className="navbar-page-title">{getPageTitle()}</span>
        </div>
      </div>
      
      <div className="navbar-right">
        <div className="navbar-date">
          {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </div>
        
        <div className="navbar-actions">
          <button className="nav-btn-icon" onClick={() => navigate('/help')} title="Help">
            <span>🛡️</span>
          </button>
          
          <div className="profile-wrapper" onClick={() => setShowUserMenu(!showUserMenu)}>
            <div className="navbar-avatar">
              {profile?.name ? profile.name.charAt(0).toUpperCase() : '?'}
            </div>
            {showUserMenu && (
              <>
                <div className="menu-backdrop" onClick={() => setShowUserMenu(false)} />
                <div className="user-dropdown animate-scale-in">
                  <div className="dropdown-header">
                    <p className="dropdown-name">{profile?.name || 'Student'}</p>
                    <p className="dropdown-email">{user?.rollNumber}</p>
                  </div>
                  <div className="dropdown-divider" />
                  <button className="dropdown-item" onClick={() => navigate('/profile')}>
                    <span className="item-icon">👤</span> 
                    <span>Account Profile</span>
                  </button>
                  <button className="dropdown-item" onClick={() => navigate('/chat')}>
                    <span className="item-icon">💬</span> 
                    <span>My Messages</span>
                  </button>
                  <div className="dropdown-divider" />
                  <button className="dropdown-item logout" onClick={handleLogout}>
                    <span className="item-icon">🚪</span> 
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
