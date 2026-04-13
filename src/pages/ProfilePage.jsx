import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { DEPARTMENTS, YEARS, HOSTELS } from '../data/mockDatabase';
import { getVisibleItems } from '../utils/storage';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, profile, updateProfile, isAdmin } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile?.name || '');
  const [department, setDepartment] = useState(profile?.department || '');
  const [year, setYear] = useState(profile?.year || '');
  const [hostel, setHostel] = useState(profile?.hostel || '');
  const [roomNumber, setRoomNumber] = useState(profile?.roomNumber || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [saved, setSaved] = useState(false);
  const [myStats, setMyStats] = useState({ lost: 0, found: 0, total: 0 });

  useEffect(() => {
    const allItems = getVisibleItems(isAdmin);
    const myItems = allItems.filter((i) => i.reportedBy === user?.rollNumber);
    setMyStats({
      lost: myItems.filter((i) => i.type === 'lost').length,
      found: myItems.filter((i) => i.type === 'found').length,
      total: myItems.length
    });
  }, [user?.rollNumber, isAdmin]);

  // Sync local state when profile loads/changes
  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setDepartment(profile.department || '');
      setYear(profile.year || '');
      setHostel(profile.hostel || '');
      setRoomNumber(profile.roomNumber || '');
      setPhone(profile.phone || '');
    }
  }, [profile]);

  const handleSave = () => {
    updateProfile({
      name: name.trim(),
      department,
      year,
      hostel,
      roomNumber: roomNumber.trim(),
      phone: phone.trim(),
    });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const isHosteler = hostel && !hostel.includes('Day Scholar');

  return (
    <div className="profile-page">
      <div className="page-header animate-fade-in">
        <h1 className="page-title">👤 My Profile</h1>
        <p className="page-subtitle">Your account information and activity</p>
      </div>

      <div className="profile-grid">
        {/* Profile Card */}
        <div className="profile-card glass-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="profile-card-header">
            <div className="profile-avatar-large">
              {isAdmin ? '🛡️' : (profile?.name ? profile.name.charAt(0).toUpperCase() : '?')}
            </div>
            <h2 className="profile-name">
              {isAdmin ? (profile?.name || 'Dr. Arthur Pendelton') : (profile?.name || 'Student')}
            </h2>
            <span className="profile-roll">{isAdmin ? (profile?.department || 'Director of Operations') : user?.rollNumber}</span>
            <div className="profile-tags">
              {!isAdmin && (
                <>
                  <span className="profile-tag">{profile?.department || 'No Department'}</span>
                  <span className="profile-tag">{profile?.year || 'No Year'}</span>
                </>
              )}
            </div>
          </div>

          {!isAdmin && (
            <div className="profile-stats-row">
              <div className="profile-stat">
                <span className="profile-stat-value">{myStats.lost}</span>
                <span className="profile-stat-label">Lost Reports</span>
              </div>
              <div className="profile-stat-divider" />
              <div className="profile-stat">
                <span className="profile-stat-value">{myStats.found}</span>
                <span className="profile-stat-label">Found Reports</span>
              </div>
              <div className="profile-stat-divider" />
              <div className="profile-stat">
                <span className="profile-stat-value">{myStats.total}</span>
                <span className="profile-stat-label">Total</span>
              </div>
            </div>
          )}
        </div>

        {/* Edit Profile */}
        <div className="profile-edit glass-card animate-fade-in" style={{ animationDelay: '0.15s' }}>
          <div className="profile-edit-header">
            <h3>Profile Details</h3>
            {!editing ? (
              <button className="btn-secondary" onClick={() => setEditing(true)} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                ✏️ Edit
              </button>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-secondary" onClick={() => setEditing(false)} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                  Cancel
                </button>
                <button className="btn-primary" onClick={handleSave} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                  <span>Save</span>
                </button>
              </div>
            )}
          </div>

          {saved && (
            <div className="save-success animate-scale-in">✅ Profile updated successfully!</div>
          )}

          <div className="profile-fields">
            <div className="profile-field">
              <label className="input-label">Full Name</label>
              {editing ? (
                <input type="text" className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
              ) : (
                <span className="field-value">{profile?.name || '—'}</span>
              )}
            </div>

            <div className="profile-field">
              <label className="input-label">Roll Number</label>
              <span className="field-value">{user?.rollNumber}</span>
            </div>

            <div className="info-item">
              <span className="info-label">{isAdmin ? 'Office Location / Base' : 'Hosteler Status'}</span>
              <span className="info-value">
                {isAdmin ? (profile?.hostel || 'Main Administrative Block') : (isHosteler ? `Yes - ${profile?.hostel}` : 'Day Scholar')}
              </span>
            </div>

            <div className="profile-field">
              <label className="input-label">Department</label>
              {editing ? (
                <select className="input-field" value={department} onChange={(e) => setDepartment(e.target.value)}>
                  <option value="">Select</option>
                  {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              ) : (
                <span className="field-value">{profile?.department || '—'}</span>
              )}
            </div>

            <div className="profile-field">
              <label className="input-label">Year</label>
              {editing ? (
                <select className="input-field" value={year} onChange={(e) => setYear(e.target.value)}>
                  <option value="">Select</option>
                  {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              ) : (
                <span className="field-value">{profile?.year || '—'}</span>
              )}
            </div>

            <div className="profile-field">
              <label className="input-label">Hostel</label>
              {editing ? (
                isAdmin ? (
                  <input
                    type="text"
                    className="input-field"
                    value={hostel}
                    onChange={(e) => setHostel(e.target.value)}
                    placeholder="e.g. Office of the Director"
                  />
                ) : (
                  <select 
                    className="input-field" 
                    value={hostel} 
                    onChange={(e) => setHostel(e.target.value)}
                  >
                    <option value="">Select where you stay</option>
                    {HOSTELS.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                )
              ) : (
                <span className="field-value">{profile?.hostel || '—'}</span>
              )}
            </div>

            {isHosteler && (
              <div className="profile-field">
                <label className="input-label">Room Number</label>
                {editing ? (
                  <input type="text" className="input-field" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} />
                ) : (
                  <span className="field-value">{profile?.roomNumber || '—'}</span>
                )}
              </div>
            )}

            <div className="profile-field">
              <label className="input-label">Phone</label>
              {editing ? (
                <input type="tel" className="input-field" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={10} />
              ) : (
                <span className="field-value">{profile?.phone || '—'}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
