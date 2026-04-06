import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DEPARTMENTS, YEARS, HOSTELS } from '../data/mockDatabase';
import './ProfileSetup.css';

const ProfileSetup = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [hostel, setHostel] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step === 1) {
      if (!name.trim() || !department || !year) {
        setError('Please fill all required fields.');
        return;
      }
      setError('');
      setStep(2);
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
        <div className="setup-header">
          <h1 className="setup-title">👋 Welcome, Student!</h1>
          <p className="setup-subtitle">Let's set up your profile to get started</p>
          <div className="setup-steps">
            <div className={`setup-step ${step >= 1 ? 'active' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">Basic Info</span>
            </div>
            <div className="step-connector"></div>
            <div className={`setup-step ${step >= 2 ? 'active' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Hostel Details</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="setup-form">
          {error && <div className="login-error animate-scale-in"><span>⚠️</span> {error}</div>}

          {step === 1 && (
            <div className="form-step animate-fade-in">
              <div className="form-group">
                <label className="input-label">Full Name *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label className="input-label">Department *</label>
                <select className="input-field" value={department} onChange={(e) => setDepartment(e.target.value)}>
                  <option value="">Select department</option>
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="input-label">Year *</label>
                <select className="input-field" value={year} onChange={(e) => setYear(e.target.value)}>
                  <option value="">Select year</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="input-label">Phone Number</label>
                <input
                  type="tel"
                  className="input-field"
                  placeholder="e.g., 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={10}
                />
              </div>

              <button type="button" className="btn-primary login-btn" onClick={handleNext}>
                <span>Continue →</span>
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="form-step animate-fade-in">
              <div className="form-group">
                <label className="input-label">Hostel *</label>
                <select className="input-field" value={hostel} onChange={(e) => setHostel(e.target.value)}>
                  <option value="">Select hostel status</option>
                  {HOSTELS.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>

              {isHosteler && (
                <div className="form-group animate-fade-in">
                  <label className="input-label">Room Number *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g., 204"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                  />
                </div>
              )}

              <div className="setup-actions">
                <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
                  ← Back
                </button>
                <button type="submit" className="btn-primary">
                  <span>Complete Setup ✓</span>
                </button>
              </div>
            </div>
          )}
        </form>

        <p className="setup-roll">Logged in as: <strong>{user?.rollNumber}</strong></p>
      </div>
    </div>
  );
};

export default ProfileSetup;
