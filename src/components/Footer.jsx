import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-icon">✨</span>
              <span className="logo-name">CampusTrace</span>
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
                <li><a href="/campus">Campus Hub</a></li>
                <li><a href="/hostel">Hostel Block</a></li>
                <li><a href="/chat">Messages</a></li>
              </ul>
            </div>
            <div className="footer-links-group">
              <h4>Support</h4>
              <ul>
                <li><a href="/help">Guidelines</a></li>
                <li><a href="/help">Privacy Policy</a></li>
                <li><a href="/help">Terms of Use</a></li>
              </ul>
            </div>
            <div className="footer-links-group">
              <h4>Organization</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#vision">Our Vision</a></li>
                <li><a href="#">Contact</a></li>
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
