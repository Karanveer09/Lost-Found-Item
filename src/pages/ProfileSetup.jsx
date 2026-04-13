import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DEPARTMENTS, YEARS, HOSTELS } from '../data/mockDatabase';
import './ProfileSetup.css';

const ProfileSetup = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [hostel, setHostel] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  
  // Internal sub-steps (1 = Basic, 2 = Hostel)
  const [formStep, setFormStep] = useState(1);

  const handleNext = () => {
    if (formStep === 1) {
      if (!name.trim() || !department || !year) {
        setError('Please fill all required basic information.');
        return;
      }
      setError('');
      setFormStep(2);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hostel) {
      setError('Please select your hostel status.');
      return;
    }

    const isHosteler = !hostel.includes('Day Scholar');
    if (isHosteler && !roomNumber.trim()) {
      setError('Please enter your room number.');
      return;
    }

    updateProfile({
      name: name.trim(),
      department,
      year,
      hostel,
      roomNumber: isHosteler ? roomNumber.trim() : '',
      phone: phone.trim(),
      setupComplete: true,
      createdAt: new Date().toISOString(),
    });

    navigate('/dashboard');
  };

  const isHosteler = hostel && !hostel.includes('Day Scholar');

  return (
    <div className="profile-setup-page">
      <div className="login-bg">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-grid"></div>
      </div>

      <div className="profile-setup-container animate-fade-in-up">
        
        {/* Back to Login Button */}
        <button className="back-to-login-btn" onClick={logout} title="Cancel and return to login screen">
          <span className="btn-arrow">←</span> Back to Login
        </button>
        
        {/* Global Journey Stepper */}
        <div className="global-journey-stepper">
          <div className="macro-step completed">
            <div className="macro-step-icon">✓</div>
            <span className="macro-step-text">Login</span>
          </div>
          <div className="macro-connector completed"></div>
          
          <div className="macro-step current">
            <div className="macro-step-icon">2</div>
            <span className="macro-step-text">Profile Setup</span>
          </div>
          <div className="macro-connector"></div>
          
          <div className="macro-step upcoming">
            <div className="macro-step-icon">3</div>
            <span className="macro-step-text">Dashboard</span>
          </div>
        </div>

        <div className="setup-header">
          <h1 className="setup-title">Complete Your Profile</h1>
          <p className="setup-subtitle">Just a few details to get your CampusTrace account ready.</p>
        </div>

        <form onSubmit={handleSubmit} className="setup-form">
          {error && <div className="login-error animate-scale-in"><span>⚠️</span> {error}</div>}

          {/* Sub-step indicator */}
          <div className="sub-step-indicator">
            <div className={`sub-step-pill ${formStep === 1 ? 'active' : formStep > 1 ? 'completed' : ''}`}>
               {formStep > 1 ? '✓ Basic Info' : '1. Basic Info'}
            </div>
            <div className="sub-step-line"></div>
            <div className={`sub-step-pill ${formStep === 2 ? 'active' : ''}`}>
               2. Stay Details
            </div>
          </div>

          {formStep === 1 && (
            <div className="form-step animate-fade-in">
              <div className="form-group grid-full">
                <label className="input-label">Full Name *</label>
                <div className="input-with-icon">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="input-label">Department *</label>
                  <div className="input-with-icon">
                    <span className="input-icon">📚</span>
                    <select className="input-field" value={department} onChange={(e) => setDepartment(e.target.value)}>
                      <option value="">Select Dept.</option>
                      {DEPARTMENTS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="input-label">Year *</label>
                  <div className="input-with-icon">
                    <span className="input-icon">🎓</span>
                    <select className="input-field" value={year} onChange={(e) => setYear(e.target.value)}>
                      <option value="">Select Year</option>
                      {YEARS.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group grid-full">
                <label className="input-label">Phone Number (Optional)</label>
                <div className="input-with-icon">
                  <span className="input-icon">📱</span>
                  <input
                    type="tel"
                    className="input-field"
                    placeholder="10-digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={10}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-primary full-width-btn" onClick={handleNext}>
                  <span>Continue</span> <span className="btn-arrow">→</span>
                </button>
              </div>
            </div>
          )}

          {formStep === 2 && (
            <div className="form-step animate-fade-in">
              <div className="form-group grid-full">
                <label className="input-label">Accommodation Status *</label>
                <div className="input-with-icon">
                  <span className="input-icon">🏢</span>
                  <select className="input-field select-lg" value={hostel} onChange={(e) => {
                    setHostel(e.target.value);
                    if (e.target.value.includes('Day Scholar')) {
                      setRoomNumber('');
                    }
                  }}>
                    <option value="">Select where you stay</option>
                    {HOSTELS.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>
              </div>

              {isHosteler && (
                <div className="form-group grid-full animate-fade-in">
                  <label className="input-label">Room Number *</label>
                  <div className="input-with-icon">
                    <span className="input-icon">🚪</span>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g. Block A, Room 204"
                      value={roomNumber}
                      onChange={(e) => setRoomNumber(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="form-actions split-actions">
                <button type="button" className="btn-secondary" onClick={() => setFormStep(1)}>
                  <span className="btn-arrow">←</span> <span>Back</span>
                </button>
                <button type="submit" className="btn-primary">
                  <span>Enter Dashboard</span> <span className="btn-icon">🚀</span>
                </button>
              </div>
            </div>
          )}
        </form>

        <div className="setup-footer">
          <p className="setup-roll">Logged in via roll number: <span className="highlight-roll">{user?.rollNumber}</span></p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
