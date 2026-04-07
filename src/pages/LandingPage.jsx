import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItems } from '../utils/storage';
import ItemCard from '../components/ItemCard';
import Footer from '../components/Footer';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const items = getItems().slice(0, 3); 
  const revealRefs = useRef([]);
  revealRefs.current = [];
  
  const [activeFaq, setActiveFaq] = useState(null);

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const faqs = [
    {
      question: "How do I verify if an item belongs to me?",
      answer: "We use a secure in-app chat system. When you find an item that looks like yours, you can message the finder. They will ask specific questions (like a wallpaper description or a unique mark) that only the owner would know before arranging a handover."
    },
    {
      question: "Is my roll number safe on this platform?",
      answer: "Yes, absolutely. Your roll number is only used for authentication and is not publicly displayed. Only verified students of the campus can access the platform."
    },
    {
      question: "What should I do if I find a high-value item?",
      answer: "For high-value items like laptops or expensive jewelry, we recommend reporting it here first, then handing it over to the official Campus Security office. You can update your post to mention that the item is now with security."
    },
    {
      question: "Can I report items found in the hostel?",
      answer: "Yes! We have a dedicated 'Hostel Block' section specifically for items found in residential areas, corridors, and mess halls."
    }
  ];

  const testimonials = [
    {
      name: "Arjun Mehta",
      role: "3rd Year, CSE",
      content: "I lost my lab records just two days before the internal exam. I was devastated until someone posted them here within an hour. Saved my semester!",
      avatar: "👨‍💻"
    },
    {
      name: "Sneha Kapoor",
      role: "2nd Year, Design",
      content: "Found my AirPods in the canteen through CampusTrace. The chat verification gave me peace of mind that I was meeting the right person.",
      avatar: "🎨"
    },
    {
      name: "Rohan Das",
      role: "Hostel Block B",
      content: "Returned a wallet I found in the corridor. It felt great to help a fellow hosteller, and the process was so quick and professional.",
      avatar: "🏫"
    }
  ];

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

      {/* Success Stories */}
      <section className="testimonials-section" ref={addToRefs}>
        <div className="section-header">
          <h2 className="section-title">Verified Recoveries</h2>
          <p className="section-subtitle">Real stories from our campus community.</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, idx) => (
            <div className="testimonial-card" key={idx}>
              <div className="testimonial-avatar">{t.avatar}</div>
              <p className="testimonial-content">"{t.content}"</p>
              <div className="testimonial-author">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </div>
          ))}
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

      {/* FAQ Section */}
      <section className="faq-section" ref={addToRefs}>
        <div className="section-header">
          <h2 className="section-title">Common Questions</h2>
          <p className="section-subtitle">Everything you need to know about the platform.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`faq-item ${activeFaq === idx ? 'active' : ''}`}
              onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                <span className="faq-icon">{activeFaq === idx ? '−' : '+'}</span>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
