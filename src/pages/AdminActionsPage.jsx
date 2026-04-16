import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';
import { getVisibleItems, deleteItem, getSuspendedUsers, toggleSuspendUser, getProfile } from '../utils/storage';
import { COLLEGE_STUDENTS } from '../data/mockDatabase';
import { formatDate } from '../utils/helpers';
import './AdminPage.css';

const AdminActionsPage = () => {
  const [activeTab, setActiveTab] = useState('items'); // 'items' or 'users'
  const [items, setItemsList] = useState([]);
  const [usersInfo, setUsersInfo] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Load all items (true = isAdmin bypasses 30-day filter)
    setItemsList(getVisibleItems(true));

    // Load users (mix college students, fake profiles, and suspended status)
    const suspendedMap = getSuspendedUsers();
    const studentsData = COLLEGE_STUDENTS.map(student => {
      const prof = getProfile(student.rollNumber);
      return {
        rollNumber: student.rollNumber,
        name: prof?.name || '—',
        department: prof?.department || '—',
        isSuspended: !!suspendedMap[student.rollNumber]
      };
    });
    setUsersInfo(studentsData);
  };

  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDeleteItem = (id) => {
    setItemToDelete(id);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteItem(itemToDelete);
      loadData();
      toast.success('Item deleted successfully.');
      setItemToDelete(null);
    }
  };

  const cancelDelete = () => {
    setItemToDelete(null);
  };

  const handleToggleSuspend = (rollNumber) => {
    const isSuspendedNow = toggleSuspendUser(rollNumber);
    loadData();
    if (isSuspendedNow) {
      toast.error(`User ${rollNumber} suspended.`);
    } else {
      toast.success(`User ${rollNumber} access restored.`);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header animate-fade-in">
        <h1 className="admin-title">⚡ Admin Control Panel</h1>
        <p className="admin-subtitle">Manage system users and review all historical items</p>
      </div>

      <div className="admin-tabs animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <button 
          className={`admin-tab ${activeTab === 'items' ? 'active' : ''}`}
          onClick={() => setActiveTab('items')}
        >
          📋 Manage Items ({items.length})
        </button>
        <button 
          className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 Manage Users ({usersInfo.length})
        </button>
      </div>

      <div className="admin-content animate-fade-in" style={{ animationDelay: '0.2s' }}>
        {activeTab === 'items' && (
          <div className="admin-card glass-card">
            <h2>All System Items</h2>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Title</th>
                    <th>Reporter</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 ? (
                    <tr><td colSpan="6" className="text-center">No items found.</td></tr>
                  ) : items.map((item) => (
                    <tr key={item.id}>
                      <td data-label="ID" className="admin-id-col" title={item.id}>{item.id.substring(0,8)}...</td>
                      <td data-label="Type">
                        <span className={`admin-badge admin-badge-${item.type}`}>{item.type}</span>
                      </td>
                      <td data-label="Title">{item.title}</td>
                      <td data-label="Reporter">{item.reportedBy}</td>
                      <td data-label="Date">{formatDate(item.reportedAt || item.date)}</td>
                      <td data-label="Actions">
                        <button 
                          className="admin-btn admin-btn-danger"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="admin-card glass-card">
            <h2>User Database</h2>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Roll Number</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {usersInfo.map((u) => (
                    <tr key={u.rollNumber}>
                      <td data-label="Roll Number">{u.rollNumber}</td>
                      <td data-label="Name">{u.name}</td>
                      <td data-label="Department">{u.department}</td>
                      <td data-label="Status">
                        {u.isSuspended ? (
                          <span className="admin-badge admin-badge-suspended">Suspended</span>
                        ) : (
                          <span className="admin-badge admin-badge-active">Active</span>
                        )}
                      </td>
                      <td data-label="Actions">
                        <button 
                          className={`admin-btn ${u.isSuspended ? 'admin-btn-success' : 'admin-btn-warning'}`}
                          onClick={() => handleToggleSuspend(u.rollNumber)}
                        >
                          {u.isSuspended ? 'Restore' : 'Suspend'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {itemToDelete && createPortal(
        <div className="admin-delete-modal-overlay" onClick={cancelDelete}>
          <div className="admin-delete-modal glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">⚠️</div>
            <h3>Delete this report?</h3>
            <p>This action is permanent and cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={cancelDelete}>Cancel</button>
              <button className="btn-primary modal-confirm-btn" onClick={confirmDelete}>Confirm Delete</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default AdminActionsPage;
