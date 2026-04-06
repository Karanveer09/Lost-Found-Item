import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addContactSubmission } from '../utils/storage';
import './HelpSupportPage.css';

const HelpSupportPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('guidelines');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmitContact = (e) => {
    e.preventDefault();
    if (!name.trim() || !subject.trim() || !message.trim()) {
      setError('Please fill all fields.');
      return;
    }

    addContactSubmission({
      id: 'contact-' + Date.now(),
      rollNumber: user?.rollNumber,
      name: name.trim(),
      subject: subject.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    });

    setSubmitted(true);
    setName('');
    setSubject('');
    setMessage('');
    setError('');
  };

  return (
    <div className="help-page">
      <div className="page-header animate-fade-in">
        <h1 className="page-title">❓ Help & Support</h1>
        <p className="page-subtitle">Guidelines, contact us, and frequently asked questions</p>
      </div>

      <div className="tabs animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <button className={`tab ${activeTab === 'guidelines' ? 'active' : ''}`} onClick={() => setActiveTab('guidelines')}>
          📖 Pickup Guidelines
        </button>
        <button className={`tab ${activeTab === 'contact' ? 'active' : ''}`} onClick={() => setActiveTab('contact')}>
          📞 Contact Us
        </button>
      </div>

      {activeTab === 'guidelines' && (
        <div className="guidelines-content animate-fade-in" style={{ animationDelay: '0.15s' }}>
          {/* Privacy Warning - MOST IMPORTANT - Full Width */}
          <div className="guideline-card critical-warning">
            <div className="critical-header">
              <span className="critical-icon">🚨</span>
              <h3>Privacy & Security — MUST READ</h3>
            </div>
            <div className="guideline-body">
              <div className="critical-alert">
                <span>⚠️</span>
                <div>
                  <strong>Strict Warning Regarding Personal Documents</strong>
                  <p>If you find any personal documents such as Aadhaar, ID cards, or Passports, <strong>DO NOT</strong> upload photos showing full details.</p>
                </div>
              </div>
              <ul className="guideline-list-two-col">
                <li><span className="list-icon">🔴</span> <span><strong>DO NOT</strong> reveal address or phone numbers.</span></li>
                <li><span className="list-icon">🔴</span> <span><strong>DO NOT</strong> share ID numbers in chat.</span></li>
                <li><span className="list-icon">🟢</span> <span><strong>DO</strong> blur sensitive info before uploading.</span></li>
                <li><span className="list-icon">🟢</span> <span><strong>DO</strong> verify via descriptive questions.</span></li>
              </ul>
            </div>
          </div>

          <div className="guidelines-grid">
            {/* How to Report */}
            <div className="guideline-card-compact">
              <div className="card-icon">📋</div>
              <h3>How to Report</h3>
              <ul className="step-list">
                <li>Select <strong>Campus</strong> or <strong>Hostel</strong>.</li>
                <li>Click <strong>"Report Item"</strong>.</li>
                <li>Describe distinguishing marks.</li>
                <li>Upload an obscured photo.</li>
              </ul>
            </div>

            {/* How to Claim */}
            <div className="guideline-card-compact">
              <div className="card-icon">🙋</div>
              <h3>How to Claim</h3>
              <ul className="step-list">
                <li>Browse <strong>Found Items</strong>.</li>
                <li>Click <strong>"Claim Item"</strong> to chat.</li>
                <li>Provide proof (marks/serial#).</li>
                <li>Finder marks as <strong>"Returned"</strong>.</li>
              </ul>
            </div>

            {/* Verification Tips */}
            <div className="guideline-card-compact">
              <div className="card-icon">✅</div>
              <h3>Verification Tips</h3>
              <ul className="step-list">
                <li>Ask for unique item damage.</li>
                <li>Ask about lock screen wallpapers.</li>
                <li>Ask about inner pocket contents.</li>
                <li>Meet only in <strong>Public Areas</strong>.</li>
              </ul>
            </div>

            {/* Prevention Tips */}
            <div className="guideline-card-compact">
              <div className="card-icon">🛡️</div>
              <h3>Prevention Tips</h3>
              <ul className="step-list">
                <li>Label items with Roll Number.</li>
                <li>Use distinctive tags or cases.</li>
                <li>Zip your pockets in the library.</li>
                <li>Don't leave items unattended.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'contact' && (
        <div className="contact-wrapper animate-fade-in" style={{ animationDelay: '0.15s' }}>
          <div className="contact-container">
            {/* Contact Sidebar */}
            <div className="contact-sidebar">
              <div className="sidebar-section">
                <h4>📞 Support Desk</h4>
                <p>Available Mon - Fri</p>
                <p className="contact-detail">9:00 AM - 5:00 PM</p>
              </div>
              <div className="sidebar-section">
                <h4>📧 Email Us</h4>
                <p className="contact-detail">support@campustrace.edu</p>
              </div>
              <div className="sidebar-section highlight">
                <h4>⚡ Quick Response</h4>
                <p>We typically respond within 24 hours to all student queries.</p>
              </div>
            </div>

            {/* Form Section */}
            <div className="contact-form-section">
              <h3 className="contact-title">Send a Message</h3>
              
              {submitted ? (
                <div className="submit-success-box animate-scale-in">
                  <span className="success-icon">✅</span>
                  <h4>Message Sent!</h4>
                  <p>Our team will look into your request soon.</p>
                  <button className="btn-secondary" onClick={() => setSubmitted(false)}>
                    New Support Ticket
                  </button>
                </div>
              ) : (
                <form className="contact-form-layout" onSubmit={handleSubmitContact}>
                  {error && <div className="form-error-alert">{error}</div>}

                  <div className="form-row">
                    <div className="form-group flex-1">
                      <label className="input-label">FullName</label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-group flex-1">
                      <label className="input-label">Roll Number</label>
                      <input
                        type="text"
                        className="input-field"
                        value={user?.rollNumber || ''}
                        disabled
                        style={{ opacity: 0.6 }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="input-label">Subject</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g., Issues with chat"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="input-label">Description</label>
                    <textarea
                      className="input-field textarea"
                      placeholder="Tell us what happened..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <button type="submit" className="btn-primary full-width-btn">
                    <span>Forward to Support</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpSupportPage;
