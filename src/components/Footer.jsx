import { Link } from 'react-router-dom';
import logoImg from '../assets/Logo.jpg';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={logoImg} alt="logo" className="logo-img" />
            </div>
            <p className="footer-tagline">
              Connecting the campus, one found item at a time. The official lost and found portal for modern students.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-link">🌐</a>
              <a href="#" className="social-link">📱</a>
              <a href="#" className="social-link">📧</a>
            </div>
          </div>

          <div className="footer-links-grid">
            <div className="footer-links-group">
              <h4>Platform</h4>
              <ul>
                <li><Link to="/campus">Campus Hub</Link></li>
                <li><Link to="/hostel">Hostel Block</Link></li>
                <li><Link to="/chat">Messages</Link></li>
              </ul>
            </div>
            <div className="footer-links-group">
              <h4>Support</h4>
              <ul>
                <li><Link to="/help">Guidelines</Link></li>
                <li><Link to="/help">Privacy Policy</Link></li>
                <li><Link to="/help">Terms of Use</Link></li>
              </ul>
            </div>
            <div className="footer-links-group">
              <h4>Organization</h4>
              <ul>
                <li><Link to="/">About Us</Link></li>
                <li><Link to="/">Our Vision</Link></li>
                <li><Link to="/help">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} CampusTrace. Made with ❤️ for the student community.</p>
          <div className="footer-status">
            <span className="status-dot"></span>
            System Online
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
