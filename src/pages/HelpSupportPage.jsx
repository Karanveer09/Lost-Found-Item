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

      <div className="tabs animate-fade-in" style={{ animationDelay: '0.1s', maxWidth: '400px' }}>
        <button className={`tab ${activeTab === 'guidelines' ? 'active' : ''}`} onClick={() => setActiveTab('guidelines')}>
          📖 Guidelines
        </button>
        <button className={`tab ${activeTab === 'contact' ? 'active' : ''}`} onClick={() => setActiveTab('contact')}>
          📞 Contact Us
        </button>
      </div>

      {activeTab === 'guidelines' && (
        <div className="guidelines-content animate-fade-in" style={{ animationDelay: '0.15s' }}>
          {/* Privacy Warning - MOST IMPORTANT */}
          <div className="guideline-card critical glass-card">
            <div className="guideline-icon critical-icon">🚨</div>
            <h3>Privacy & Security — MUST READ</h3>
            <div className="guideline-body">
              <div className="critical-alert">
                <span>⚠️</span>
                <div>
                  <strong>Strict Warning Regarding Personal Documents</strong>
                  <p>If you find any personal documents such as <strong>Aadhaar Card, Passport, PAN Card, Driving License, Voter ID, or any government-issued identity document</strong>, you <strong>MUST NOT</strong> upload photos showing full details.</p>
                </div>
              </div>
              <ul className="guideline-list">
                <li>
                  <span className="list-icon">🔴</span>
                  <span><strong>DO NOT</strong> post full photos of Aadhaar, Passport, PAN Card, or any ID.</span>
                </li>
                <li>
                  <span className="list-icon">🔴</span>
                  <span><strong>DO NOT</strong> reveal the person's address, phone number, date of birth, or ID number.</span>
                </li>
                <li>
                  <span className="list-icon">🔴</span>
                  <span><strong>DO NOT</strong> share personal document details in chat with unverified people.</span>
                </li>
                <li>
                  <span className="list-icon">🟢</span>
                  <span><strong>DO</strong> blur or hide sensitive information before uploading any photo.</span>
                </li>
                <li>
                  <span className="list-icon">🟢</span>
                  <span><strong>DO</strong> mention only the type of document (e.g., "Found an Aadhaar Card") without revealing details.</span>
                </li>
                <li>
                  <span className="list-icon">🟢</span>
                  <span><strong>DO</strong> verify the owner through chat by asking them to describe the document.</span>
                </li>
              </ul>
              <div className="critical-consequence">
                <strong>⚡ Consequences:</strong> Any student found uploading full personal document details will face <strong>strict disciplinary action</strong> including potential suspension of account access and referral to college authorities.
              </div>
            </div>
          </div>

          {/* How to Report */}
          <div className="guideline-card glass-card">
            <div className="guideline-icon">📋</div>
            <h3>How to Report an Item</h3>
            <div className="guideline-body">
              <ol className="numbered-list">
                <li>Go to <strong>Campus</strong> or <strong>Hostel</strong> section based on where the item was lost/found.</li>
                <li>Click the <strong>"Report Item"</strong> button.</li>
                <li>Select whether you <strong>lost</strong> or <strong>found</strong> an item.</li>
                <li>Fill in the details — be as descriptive as possible (color, brand, distinguishing marks).</li>
                <li>Upload a photo if available (follow privacy guidelines for documents).</li>
                <li>Submit the report. Your item will appear on the listings.</li>
              </ol>
            </div>
          </div>

          {/* How to Claim */}
          <div className="guideline-card glass-card">
            <div className="guideline-icon">🙋</div>
            <h3>How to Claim an Item</h3>
            <div className="guideline-body">
              <ol className="numbered-list">
                <li>Browse the <strong>Found Items</strong> list to find your item.</li>
                <li>Click on the item card to view full details.</li>
                <li>Click <strong>"This is mine — Claim Item"</strong> to initiate a chat.</li>
                <li>In the chat, the finder may ask verification questions (brand, color, marks, etc.).</li>
                <li>Once both parties are satisfied, the finder marks the item as <strong>"Returned"</strong>.</li>
              </ol>
            </div>
          </div>

          {/* Verification Tips */}
          <div className="guideline-card glass-card">
            <div className="guideline-icon">✅</div>
            <h3>Verification Tips for Finders</h3>
            <div className="guideline-body">
              <ul className="guideline-list">
                <li><span className="list-icon">💡</span><span>Ask the claimer to describe the item without giving them details first.</span></li>
                <li><span className="list-icon">💡</span><span>Ask about specific marks, stickers, or damage on the item.</span></li>
                <li><span className="list-icon">💡</span><span>For electronics, ask about the wallpaper, case color, or lock screen.</span></li>
                <li><span className="list-icon">💡</span><span>For bags/wallets, ask what's inside without revealing contents.</span></li>
                <li><span className="list-icon">💡</span><span>Meet in a public place on campus to hand over the item.</span></li>
              </ul>
            </div>
          </div>

          {/* Prevention Tips */}
          <div className="guideline-card glass-card">
            <div className="guideline-icon">🛡️</div>
            <h3>Tips to Prevent Losing Items</h3>
            <div className="guideline-body">
              <ul className="guideline-list">
                <li><span className="list-icon">📌</span><span>Label your belongings with your name and roll number.</span></li>
                <li><span className="list-icon">📌</span><span>Use a distinctive phone case or bag tag to easily identify your items.</span></li>
                <li><span className="list-icon">📌</span><span>Always double-check your belongings before leaving classrooms, canteen, or library.</span></li>
                <li><span className="list-icon">📌</span><span>Keep valuable items in zippered pockets or locked bags.</span></li>
                <li><span className="list-icon">📌</span><span>Avoid leaving items unattended, even briefly.</span></li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'contact' && (
        <div className="contact-content animate-fade-in" style={{ animationDelay: '0.15s' }}>
          <div className="contact-card glass-card">
            <h3 className="contact-title">📞 Get in Touch</h3>
            <p className="contact-subtitle">
              Have questions, feedback, or need assistance? Fill out the form below.
            </p>

            {submitted ? (
              <div className="submit-success animate-scale-in">
                <span className="success-icon">✅</span>
                <h4>Message Sent Successfully!</h4>
                <p>We'll get back to you shortly. Thank you for reaching out.</p>
                <button className="btn-secondary" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmitContact}>
                {error && <div className="form-error">{error}</div>}

                <div className="form-group">
                  <label className="input-label">Your Name *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Subject *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="What's this about?"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Message *</label>
                  <textarea
                    className="input-field textarea"
                    placeholder="Describe your concern in detail..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Roll Number</label>
                  <input
                    type="text"
                    className="input-field"
                    value={user?.rollNumber || ''}
                    disabled
                    style={{ opacity: 0.6 }}
                  />
                </div>

                <button type="submit" className="btn-primary submit-btn">
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpSupportPage;
