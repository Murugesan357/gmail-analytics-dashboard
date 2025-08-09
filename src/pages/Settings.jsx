import '../styles/styles.css';

const SettingsView = () => (
  <div id="settingsView" className="view">
    <div className="view-header">
      <h2>Settings</h2>
      <p>Manage your Gmail connection and application preferences</p>
    </div>

    <div className="settings-content">
      <div className="setting-section">
        <h3>OAuth Connection</h3>
        <div className="oauth-status">
          <div className="status-indicator connected">
            <div className="status-dot"></div>
            <span>Connected to Gmail</span>
          </div>
          <p>Account: john.doe@gmail.com</p>
          <button className="btn btn--outline">Disconnect</button>
        </div>
      </div>

      <div className="setting-section">
        <h3>Preferences</h3>
        <div className="preference-item">
          <label className="form-label">
            <input type="checkbox" defaultChecked /> Enable auto-tagging
          </label>
        </div>
        <div className="preference-item">
          <label className="form-label">
            <input type="checkbox" defaultChecked /> Email notifications
          </label>
        </div>
        <div className="preference-item">
          <label className="form-label">
            <input type="checkbox" /> Dark mode
          </label>
        </div>
      </div>
    </div>
  </div>
);

export default SettingsView;
