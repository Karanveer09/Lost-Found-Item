import './AdminGuidelinesPage.css';
import './HelpSupportPage.css'; // fallback text colors

const AdminGuidelinesPage = () => {
  return (
    <div className="help-page admin-guidelines-container">
      <div className="page-header animate-fade-in">
        <h1 className="page-title" style={{ color: 'var(--accent-rose)', fontWeight: 'bold' }}>
          📖 Official Admin Guidelines
        </h1>
        <p className="page-subtitle">Strict operating procedures and rule enforcement policies for system moderators.</p>
      </div>

      <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        
        {/* Panel Overview Section */}
        <div className="guidelines-overview">
          <h2 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>⚡</span> How The System Panel Works
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: '1.5' }}>
            The CampusTrace Admin Panel is a streamlined, read-only surveillance interface with global moderation controls. 
            You are granted complete oversight over all campus activity with the power to intervene when necessary.
          </p>

          <div className="overview-grid">
            <div className="overview-item">
              <h4>📊 Global Dashboard</h4>
              <p>Provides a macroscopic view of system health and all-time item statistics across the entire database.</p>
            </div>
            <div className="overview-item">
              <h4>⚖️ Take Actions</h4>
              <p>Your primary control hub. Use this to permanently erase fraudulent items or toggle user account suspensions.</p>
            </div>
            <div className="overview-item">
              <h4>👁️ Monitor Hubs</h4>
              <p>Campus, Hostel, and Chat hubs operate in read-only mode. Admin posting, claiming, or direct chatting is hard-disabled.</p>
            </div>
          </div>
        </div>

        {/* Rules Grid */}
        <h2 style={{ color: 'var(--accent-rose)', marginTop: '2.5rem', marginBottom: '0.5rem', fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: '0.5rem' }}>
          <span>🛑</span> Mandatory Moderation Rules
        </h2>
        
        <div className="rules-grid">
          
          <div className="rule-card">
            <div className="rule-icon">🗣️</div>
            <h3 className="rule-title">1. Zero Tolerance for Chat Abuse</h3>
            <p className="rule-description">
              Monitor the Chat Hub regularly. You have global access to all peer-to-peer conversations. If any user is found using derogatory language, bullying, or attempting to extort monetary rewards for found items.
            </p>
            <div className="rule-action-box">
              <span className="rule-action-label">Required Action</span>
              <div className="rule-action-text">Immediately navigate to <em>Take Actions</em> and <strong>Suspend</strong> the offending user's account indefinitely.</div>
            </div>
          </div>

          <div className="rule-card">
            <div className="rule-icon">🔒</div>
            <h3 className="rule-title">2. Protection of Privacy</h3>
            <p className="rule-description">
              Users are strictly prohibited from posting highly sensitive information (e.g., exact home addresses, unverified financial details, credit card numbers, phone numbers) in public item descriptions or chats.
            </p>
            <div className="rule-action-box">
              <span className="rule-action-label">Required Action</span>
              <div className="rule-action-text">Use the <strong>Delete</strong> button on the item card to purge the post. If done maliciously, <strong>Suspend</strong> the user.</div>
            </div>
          </div>

          <div className="rule-card">
            <div className="rule-icon">🗑️</div>
            <h3 className="rule-title">3. Dealing with Spam & False Claims</h3>
            <p className="rule-description">
              Users who repeatedly post fake missing items (spamming images, troll titles) or users who randomly attempt to claim items that do not belong to them disrupt the system ecosystem.
            </p>
            <div className="rule-action-box">
              <span className="rule-action-label">Required Action</span>
              <div className="rule-action-text">Purge the fake items via the <strong>Delete</strong> button. Repeat offenders must be immediately put under <strong>Suspension</strong>.</div>
            </div>
          </div>

          <div className="rule-card">
            <div className="rule-icon">⚖️</div>
            <h3 className="rule-title">4. Maintain Protocol Neutrality</h3>
            <p className="rule-description">
              Admins must maintain strict neutrality. You are mechanically blocked from claiming found items or responding directly to user claims via the Admin account to prevent power abuse.
            </p>
            <div className="rule-action-box">
              <span className="rule-action-label">Required Action</span>
              <div className="rule-action-text">If you find an item personally, log out of the Admin panel and use a verified student/staff standard account to process it.</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminGuidelinesPage;
