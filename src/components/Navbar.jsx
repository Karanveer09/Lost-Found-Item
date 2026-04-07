import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/Logo.jpg';
import './Navbar.css';

const Navbar = () => {
  const { user, profile, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Home';
    if (path === '/dashboard') return 'Activity Overview';
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
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <div className="navbar-logo" onClick={() => navigate('/')}>
            <img src={logoImg} alt="logo" className="logo-img" />
          </div>
        </div>

        <div className="navbar-center">
          <div className="nav-links-horizontal">
            <button 
              className={`nav-link-btn ${location.pathname === '/' ? 'active' : ''}`} 
              onClick={() => navigate('/')}
            >
              Home
            </button>
            <button 
              className={`nav-link-btn ${location.pathname === '/campus' ? 'active' : ''}`} 
              onClick={() => navigate('/campus')}
            >
              Campus Hub
            </button>
            <button 
              className={`nav-link-btn ${location.pathname === '/hostel' ? 'active' : ''}`} 
              onClick={() => navigate('/hostel')}
            >
              Hostel Block
            </button>
            <button 
              className={`nav-link-btn ${location.pathname === '/dashboard' ? 'active' : ''}`} 
              onClick={() => navigate('/dashboard')}
            >
              History
            </button>
            <button 
              className={`nav-link-btn ${location.pathname === '/help' ? 'active' : ''}`} 
              onClick={() => navigate('/help')}
            >
              Guidelines
            </button>
          </div>
        </div>
        
        <div className="navbar-right">
          <div className="navbar-actions">
            <div className="profile-wrapper" onClick={() => setShowUserMenu(!showUserMenu)}>
              <div className="navbar-avatar-wrapper">
                <div className="navbar-avatar">
                  {profile?.name ? profile.name.charAt(0).toUpperCase() : '?'}
                </div>
                <span className="navbar-user-name">{profile?.name?.split(' ')[0] || 'Me'}</span>
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
      </div>
    </nav>
  );
};

export default Navbar;
