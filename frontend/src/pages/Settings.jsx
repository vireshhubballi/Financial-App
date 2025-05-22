import React, { useState } from "react";
import { financialService } from "../utils/financialService";
import "./Settings.css"; // Style accordingly

const Settings = () => {
  const [email, setEmail] = useState("");
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("INR");
  const [region, setRegion] = useState("India");
  const [reminders, setReminders] = useState(true);
  const [aiTips, setAiTips] = useState(true);
  const [twoFA, setTwoFA] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activityLogs, setActivityLogs] = useState([
    "Logged in at 10:30 AM",
    "Updated settings at 11:00 AM",
    "Added new investment at 11:15 AM",
  ]); // Placeholder activity logs, replace with actual backend data
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("theme", theme);
    formData.append("language", language);
    formData.append("currency", currency);
    formData.append("region", region);
    formData.append("reminders", reminders);
    formData.append("aiTips", aiTips);
    formData.append("twoFA", twoFA);
    try {
      await financialService.updateSettings(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error updating settings", err);
    }
  };

  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      // Call backend to change password
      financialService.changePassword(password, newPassword).then(() => {
        alert("Password updated successfully!");
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
      });
    } else {
      alert("Passwords do not match!");
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      financialService.deleteAccount().then(() => {
        alert("Account deleted.");
      });
    }
  };

  const handleExportData = () => {
    // Placeholder for data export functionality
    alert("Data exported as CSV!");
  };

  return (
    <div className="settings-wrapper">
      <h2>⚙️ User Settings</h2>

      {/* Account Section */}
      <div className="settings-card">
        <h3>👤 Account</h3>
        <label>Email Notifications:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      {/* Preferences Section */}
      <div className="settings-card">
        <h3>🎨 Preferences</h3>
        <div className="setting-row">
          <span>Theme:</span>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">☀️ Light</option>
            <option value="dark">🌙 Dark</option>
          </select>
        </div>
        <div className="setting-row">
          <span>Language:</span>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="es">Spanish</option>
          </select>
        </div>
        <div className="setting-row">
          <span>Currency:</span>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <div className="setting-row">
          <span>Region:</span>
          <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} />
        </div>
      </div>

      {/* Security Section */}
      <div className="settings-card">
        <h3>🔒 Security</h3>
        <div className="toggle-row">
          <label>2FA:</label>
          <input type="checkbox" checked={twoFA} onChange={() => setTwoFA(!twoFA)} />
        </div>
        <div>
          <h4>Change Password</h4>
          <input 
            type="password" 
            placeholder="Current Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="New Password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Confirm New Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
          <button onClick={handleChangePassword}>Change Password</button>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="settings-card">
        <h3>🔔 Notifications</h3>
        <div className="toggle-row">
          <label>Budget Reminders:</label>
          <input type="checkbox" checked={reminders} onChange={() => setReminders(!reminders)} />
        </div>
        <div className="toggle-row">
          <label>AI Tips:</label>
          <input type="checkbox" checked={aiTips} onChange={() => setAiTips(!aiTips)} />
        </div>
      </div>

      {/* Export Data */}
      <div className="settings-card">
        <h3>💾 Data Management</h3>
        <button onClick={handleExportData}>Export Data as CSV</button>
      </div>

      {/* Save Button */}
      <div className="settings-actions">
        <button onClick={handleSave}>💾 Save Settings</button>
        {success && <p className="success-msg">✅ Settings updated successfully!</p>}
      </div>

      {/* Activity Logs Section */}
      <div className="settings-card">
        <h3>📜 Activity Logs</h3>
        <ul className="activity-logs">
          {activityLogs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>

      {/* Danger Zone */}
      <div className="danger-zone">
        <h3>⚠️ Danger Zone</h3>
        <button className="delete-btn" onClick={handleDeleteAccount}>
          Delete My Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
