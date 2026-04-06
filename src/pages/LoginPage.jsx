import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!rollNumber.trim() || !password.trim()) {
      setError('Please enter both roll number and password.');
      return;
    }

    setLoading(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    const result = login(rollNumber.trim(), password);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* Left Side: Comforting Quote & Branding */}
        <div className="login-info-panel">
          <div className="abstract-design">
            <div className="shape circle-1"></div>
            <div className="shape circle-2"></div>
            <div className="shape dots-1"></div>
            <div className="shape dots-2"></div>
          </div>
          
          <div className="login-brand">
            <span className="brand-logo">🔍</span>
            <span className="brand-text">CampusTrace</span>
          </div>
          
          <div className="quote-container">
            <h2 className="comfort-quote">
              Lost Something On Campus? <br /> Let's Help You Find It
            </h2>
            <div className="quote-divider"></div>
            <p className="quote-sub">
              Searched every corner of campus? Don't stress! Post, search, or report lost and found items in minutes. Reconnect with what matters.
            </p>
          </div>
          
          <div className="panel-footer">
            <div className="footer-stat">
              <span className="stat-num">500+</span>
              <span className="stat-label">Items Found</span>
            </div>
            <div className="footer-stat">
              <span className="stat-num">2k+</span>
              <span className="stat-label">Verified Users</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="login-form-panel">
          <div className="form-header">
            <h1 className="form-title">Welcome back!</h1>
            <p className="form-subtitle">Enter your roll number to access your account.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div className="login-error animate-scale-in">
                <span>⚠️</span> {error}
              </div>
            )}

            <div className="form-group">
              <label className="input-label" htmlFor="rollNumber">Roll Number</label>
              <div className="input-wrapper">
                <span className="input-icon">🎓</span>
                <input
                  id="rollNumber"
                  type="text"
                  className="input-field with-icon"
                  placeholder="e.g., 2024001"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            <div className="form-group">
              <label className="input-label" htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="input-field with-icon"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary login-btn" disabled={loading}>
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            </button>

            <div className="login-hint">
              <p>🔐 Only registered college students can access this platform.</p>
              <p className="hint-small">Demo: 2024001 — 2024050 | Pass: college123</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
