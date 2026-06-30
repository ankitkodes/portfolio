export default function AdminSettingsPage() {
  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Settings</h1>
      </div>
      <div className="admin-card">
        <h3 className="admin-card-title">Application Settings</h3>
        <p style={{ fontSize: 14, color: "#6E6E73", marginTop: 8 }}>
          Settings configuration coming soon. Use environment variables to configure admin credentials, database connection, and other options.
        </p>
      </div>
    </div>
  );
}
