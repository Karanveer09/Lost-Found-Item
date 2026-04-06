import { useState } from 'react';
import { CATEGORIES, CAMPUS_LOCATIONS, HOSTEL_LOCATIONS, HOSTELS } from '../data/mockDatabase';
import { useAuth } from '../context/AuthContext';
import { addItem } from '../utils/storage';
import { generateId, fileToBase64 } from '../utils/helpers';
import './ItemModal.css';

const ItemModal = ({ isOpen, onClose, module, onItemAdded }) => {
  const { user } = useAuth();
  const [type, setType] = useState('found');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [hostel, setHostel] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const locations = module === 'hostel' ? HOSTEL_LOCATIONS : CAMPUS_LOCATIONS;
  const hostelsForModule = HOSTELS.filter(h => !h.includes('Day Scholar'));

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image must be smaller than 5MB');
        return;
      }
      const base64 = await fileToBase64(file);
      setImage(base64);
      setImagePreview(base64);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !description.trim() || !category || !location || !date) {
      setError('Please fill in all required fields.');
      return;
    }

    if (module === 'hostel' && !hostel) {
      setError('Please select a hostel.');
      return;
    }

    setSubmitting(true);

    const newItem = {
      id: generateId(),
      type,
      module,
      title: title.trim(),
      description: description.trim(),
      category,
      location,
      hostel: module === 'hostel' ? hostel : undefined,
      date,
      status: 'open',
      reportedBy: user.rollNumber,
      reportedAt: new Date().toISOString(),
      image,
    };

    addItem(newItem);

    setTimeout(() => {
      setSubmitting(false);
      onItemAdded?.(newItem);
      resetForm();
      onClose();
    }, 500);
  };

  const resetForm = () => {
    setType('found');
    setTitle('');
    setDescription('');
    setCategory('');
    setLocation('');
    setHostel('');
    setDate(new Date().toISOString().split('T')[0]);
    setImage(null);
    setImagePreview(null);
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content item-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {type === 'lost' ? '🔴 Report Lost Item' : '🟢 Report Found Item'}
          </h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="item-form">
          {/* Type Toggle */}
          <div className="type-toggle">
            <button
              type="button"
              className={`type-btn ${type === 'lost' ? 'active lost' : ''}`}
              onClick={() => setType('lost')}
            >
              🔴 I Lost Something
            </button>
            <button
              type="button"
              className={`type-btn ${type === 'found' ? 'active found' : ''}`}
              onClick={() => setType('found')}
            >
              🟢 I Found Something
            </button>
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="form-group">
            <label className="input-label">Title *</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g., Black HP Laptop Charger"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
            />
          </div>

          <div className="form-group">
            <label className="input-label">Description *</label>
            <textarea
              className="input-field textarea"
              placeholder="Describe the item in detail — color, brand, distinguishing marks, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              maxLength={500}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="input-label">Category *</label>
              <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="input-label">Date *</label>
              <input
                type="date"
                className="input-field"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {module === 'hostel' && (
            <div className="form-group">
              <label className="input-label">Hostel *</label>
              <select className="input-field" value={hostel} onChange={(e) => setHostel(e.target.value)}>
                <option value="">Select hostel</option>
                {hostelsForModule.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label className="input-label">
              {type === 'lost' ? 'Last Seen Location' : 'Where Found'} *
            </label>
            <select className="input-field" value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">Select location</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="input-label">Photo (optional)</label>
            <div className={`file-upload-container ${imagePreview ? 'has-image' : ''}`}>
              {imagePreview ? (
                <div className="image-preview-wrapper animate-scale-in">
                  <img src={imagePreview} alt="Preview" className="upload-preview-img" />
                  <button 
                    type="button" 
                    className="remove-upload-btn" 
                    onClick={(e) => { 
                      e.stopPropagation();
                      setImage(null); 
                      setImagePreview(null); 
                    }}
                    title="Remove Photo"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="drag-drop-zone">
                  <input 
                    type="file" 
                    id="file-upload"
                    accept="image/*" 
                    onChange={handleImageChange} 
                    hidden 
                  />
                  <div className="upload-icon-container">
                    <span className="cloud-icon">☁️</span>
                  </div>
                  <div className="upload-text-content">
                    <p className="upload-main-text">Choose a file or drag & drop it here</p>
                    <p className="upload-sub-text">JPEG, PNG formats up to 5MB</p>
                  </div>
                  <label htmlFor="file-upload" className="browse-btn">
                    Browse File
                  </label>
                </div>
              )}
            </div>
          </div>

          {category === 'documents' && (
            <div className="privacy-warning">
              <span className="warning-icon">⚠️</span>
              <div>
                <strong>Privacy Warning!</strong>
                <p>If you found personal documents (Aadhaar, Passport, PAN, etc.), do NOT upload photos showing full details. Hide/blur sensitive info like address, phone number, and ID numbers. <strong>Violation may result in disciplinary action.</strong></p>
              </div>
            </div>
          )}

          <button type="submit" className="btn-primary submit-btn" disabled={submitting}>
            <span>{submitting ? 'Submitting...' : type === 'lost' ? 'Report Lost Item' : 'Report Found Item'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItemModal;
