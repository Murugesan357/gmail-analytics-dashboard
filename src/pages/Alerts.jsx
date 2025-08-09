import { useState } from 'react';
import '../styles/styles.css';

const AlertsView = () => {
  const initialRules = [
    {
      id: 1,
      name: "Important Boss Emails",
      description: "Notify when emails from manager@company.com are unread for more than 2 hours",
      active: true,
      type: "sender",
      condition: "manager@company.com",
      action: "notification"
    },
    {
      id: 2,
      name: "Invoice Alerts",
      description: "Highlight emails containing the word 'invoice' in subject or body",
      active: true,
      type: "keyword",
      condition: "invoice",
      action: "highlight"
    },
    {
      id: 3,
      name: "Travel Bookings",
      description: "Auto-tag and prioritize travel-related emails",
      active: false,
      type: "category",
      condition: "travel",
      action: "auto-tag"
    }
  ];

  const [rules, setRules] = useState(initialRules);
  const [showForm, setShowForm] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "keyword",
    condition: "",
    action: "highlight",
    active: true
  });

  const handleDeleteRule = (ruleId) => {
    setRules(prev => prev.filter(rule => rule.id !== ruleId));
  };

  const handleToggleRule = (ruleId) => {
    setRules(prev =>
      prev.map(rule =>
        rule.id === ruleId ? { ...rule, active: !rule.active } : rule
      )
    );
  };

  const handleEditRule = (rule) => {
    setEditingRule(rule);
    setFormData(rule);
    setShowForm(true);
  };

  const handleCreateNewRule = () => {
    setEditingRule(null);
    setFormData({
      name: "",
      description: "",
      type: "keyword",
      condition: "",
      action: "highlight",
      active: true
    });
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingRule) {
      // Edit existing rule
      setRules(prev =>
        prev.map(rule =>
          rule.id === editingRule.id ? { ...formData, id: editingRule.id } : rule
        )
      );
    } else {
      // Add new rule
      const newRule = { ...formData, id: Date.now() };
      setRules(prev => [...prev, newRule]);
    }
    setShowForm(false);
  };

  return (
    <div id="alertsView" className="view">
      <div className="view-header">
        <h2>Email Alerts & Rules</h2>
        <p>Create custom rules and alerts for important emails</p>
        <button className="btn btn--primary" onClick={handleCreateNewRule}>
          Create New Rule
        </button>
      </div>

      <div className="rules-list" id="rulesList">
        {rules.map(rule =>
          <div key={rule.id} className="rule-card">
            <div className="rule-header">
              <div className="rule-name">{rule.name}</div>
              <div className={`rule-status ${rule.active ? 'active' : ''}`}>
                {rule.active ? 'Active' : 'Inactive'}
              </div>
            </div>
            <div className="rule-description">{rule.description}</div>
            <div className="rule-actions">
              <button className="btn btn--sm btn--outline" onClick={() => handleEditRule(rule)}>Edit</button>
              <button
                className={`btn btn--sm ${rule.active ? 'btn--secondary' : 'btn--primary'}`}
                onClick={() => handleToggleRule(rule.id)}
              >
                {rule.active ? 'Disable' : 'Enable'}
              </button>
              <button className="btn btn--sm btn--outline" onClick={() => handleDeleteRule(rule.id)}>
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editingRule ? 'Edit Rule' : 'Create New Rule'}</h3>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Rule Name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleFormChange}
                required
              ></textarea>

              <select name="type" value={formData.type} onChange={handleFormChange}>
                <option value="sender">Sender</option>
                <option value="keyword">Keyword</option>
                <option value="category">Category</option>
              </select>

              <input
                type="text"
                name="condition"
                placeholder="Condition (e.g. email, keyword)"
                value={formData.condition}
                onChange={handleFormChange}
                required
              />

              <select name="action" value={formData.action} onChange={handleFormChange}>
                <option value="notification">Notification</option>
                <option value="highlight">Highlight</option>
                <option value="auto-tag">Auto Tag</option>
              </select>

              <div className="checkbox-row">
                <label htmlFor="active">Active</label>
                <input type="checkbox" id="active" name="active" checked={formData.active} onChange={handleFormChange} />
              </div>

              <div className="button-row">
                <button type="submit" className="btn btn--primary">
                    {editingRule ? 'Update Rule' : 'Add Rule'}
                </button>
                <button type="button" className="btn btn--outline" onClick={() => setShowForm(false)}>
                    Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertsView;
