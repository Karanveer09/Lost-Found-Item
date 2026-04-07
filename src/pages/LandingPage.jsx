import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItems } from '../utils/storage';
import ItemCard from '../components/ItemCard';
import Footer from '../components/Footer';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const items = getItems().slice(0, 3); // Get 3 most recent items
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((el) => observer.observe(el));

    return () => {
      revealRefs.current.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <div className="hero-wrapper">
        <section className="hero-section" ref={addToRefs}>
          <div className="hero-content animate-fade-in-up">
            <div className="hero-badge">✨ Official Campus Portal</div>
            <h1 className="hero-title">
              Lost it? Found it? <br />
              <span className="text-white">Trace it.</span>
            </h1>
            <p className="hero-subtitle">
              The definitive platform for the student community to recover lost belongings 
              and return found items with ease and security.
            </p>
            <div className="hero-cta">
              <button className="btn-primary btn-xl btn-white" onClick={() => navigate('/campus')}>
                Get Started Now
              </button>
              <button className="btn-secondary btn-xl btn-outline-white" onClick={() => {
                   const aboutSection = document.getElementById('about');
                   aboutSection?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Learn More
              </button>
            </div>
          </div>
          <div className="hero-visual animate-float">
            <div className="visual-card lost">
              <span className="icon">🔍</span>
              <p>Lost My Keys</p>
            </div>
            <div className="visual-card found">
              <span className="icon">✨</span>
              <p>Found a Wallet</p>
            </div>
            <div className="visual-card chat">
              <span className="icon">💬</span>
              <p>Verify Item</p>
            </div>
          </div>
        </section>
      </div>

      {/* Action Section */}
      <section className="action-section" ref={addToRefs}>
        <div className="section-header">
          <h2 className="section-title">Where did it happen?</h2>
          <p className="section-subtitle">Choose the relevant hub to start your search or report.</p>
        </div>
        <div className="action-grid">
          <div className="action-card campus" onClick={() => navigate('/campus')}>
            <div className="action-icon">🏫</div>
            <div className="action-content">
              <h3>Campus Hub</h3>
              <p>Academic blocks, libraries, labs, and common grounds.</p>
              <span className="action-link">Explore Hub →</span>
            </div>
          </div>
          <div className="action-card hostel" onClick={() => navigate('/hostel')}>
            <div className="action-icon">🏢</div>
            <div className="action-content">
              <h3>Hostel Block</h3>
              <p>Residential areas, mess halls, and room corridors.</p>
              <span className="action-link">Explore Block →</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="activity-section" ref={addToRefs}>
        <div className="section-header">
          <h2 className="section-title">Recent Discoveries</h2>
          <p className="section-subtitle">Stay updated with the latest reported items across the campus.</p>
        </div>
        <div className="landing-items-grid">
          {items.length > 0 ? (
            items.map((item) => (
              <ItemCard key={item.id} item={item} onClick={() => navigate(`/item/${item.id}`)} />
            ))
          ) : (
            <div className="empty-activity glass-card">
              <p>No items reported yet. Be the first to help!</p>
            </div>
          )}
        </div>
        <div className="view-more-container">
          <button className="btn-secondary" onClick={() => navigate('/campus')}>
            View All Activities
          </button>
        </div>
      </section>

      {/* About Us / Vision */}
      <section id="about" className="about-section" ref={addToRefs}>
        <div className="about-grid">
          <div className="about-text">
            <div className="about-tag">OUR VISION</div>
            <h2 className="section-title">Redefining Campus Assistance</h2>
            <p>
              CampusTrace was born out of a simple necessity: to bridge the gap between 
              a lost item and its rightful owner. In a bustling college environment, 
              items often go missing, leading to stress and loss of valuable property.
            </p>
            <div className="vision-features">
              <div className="feature">
                <span className="feature-icon">🛡️</span>
                <div className="feature-text">
                  <h4>Secure Verification</h4>
                  <p>In-app chat system to confirm ownership before handover.</p>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">⚡</span>
                <div className="feature-text">
                  <h4>Real-time Alerts</h4>
                  <p>Instant visibility of reported items across the platform.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="about-visual">
             <div className="vision-card glass-card">
                <h3>Why CampusTrace?</h3>
                <ul className="why-list">
                    <li>✅ Dedicated categories for Campus & Hostel</li>
                    <li>✅ Secure roll-number based authentication</li>
                    <li>✅ Direct communication with finders</li>
                    <li>✅ Professional and fast user interface</li>
                </ul>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
