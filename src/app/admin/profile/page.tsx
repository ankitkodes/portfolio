"use client";

import { useState, useEffect } from "react";
import { Save, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import { fileToBase64 } from "@/lib/utils";

export default function AdminProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "", tagline: "", bio: "", profileImage: "", resumeUrl: "",
    email: "", github: "", linkedin: "", twitter: ""
  });

  useEffect(() => {
    fetch("/api/admin/profile")
      .then(res => res.json())
      .then(data => {
        if (data && data.name) setFormData(data);
      })
      .catch(() => toast.error("Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error();
      toast.success("Profile saved");
    } catch {
      toast.error("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.loading("Uploading image...", { id: "upload" });
      try {
        const base64 = await fileToBase64(file);
        setFormData({ ...formData, profileImage: base64 });
        toast.success("Image uploaded", { id: "upload" });
      } catch {
        toast.error("Failed to upload image", { id: "upload" });
      }
    }
  };

  if (loading) return <div className="admin-loading">Loading profile...</div>;

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Profile Settings</h1>
        <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
          <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div style={{ maxWidth: 800 }}>
        <form onSubmit={handleSave} className="admin-card">
          <h3 className="admin-card-title" style={{ marginBottom: 24 }}>Basic Information</h3>
          
          <div style={{ display: 'flex', gap: 32, marginBottom: 24 }}>
            <div>
              <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'var(--admin-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
                {formData.profileImage ? (
                  <img src={formData.profileImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <ImageIcon size={32} style={{ color: 'var(--admin-text-secondary)', opacity: 0.5 }} />
                )}
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
              </div>
              <div style={{ textAlign: 'center', marginTop: 8, fontSize: 12, color: 'var(--admin-text-secondary)' }}>Click to change</div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="admin-field" style={{ marginBottom: 0 }}>
                <label>Full Name</label>
                <input required value={formData.name || ""} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Your Name" />
              </div>
              <div className="admin-field" style={{ marginBottom: 0 }}>
                <label>Tagline</label>
                <input value={formData.tagline || ""} onChange={e => setFormData({...formData, tagline: e.target.value})} placeholder="e.g. Full Stack Developer & Designer" />
              </div>
            </div>
          </div>

          <div className="admin-field">
            <label>Bio (Rich text placeholder)</label>
            <textarea value={formData.bio || ""} onChange={e => setFormData({...formData, bio: e.target.value})} rows={5} placeholder="Write a brief introduction about yourself..." />
          </div>

          <div className="admin-field">
            <label>Resume URL</label>
            <input value={formData.resumeUrl || ""} onChange={e => setFormData({...formData, resumeUrl: e.target.value})} placeholder="https://..." />
          </div>

          <div className="admin-editor-divider" style={{ margin: '32px 0' }} />

          <h3 className="admin-card-title" style={{ marginBottom: 24 }}>Social Links</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="admin-field">
              <label>Email Address</label>
              <input type="email" value={formData.email || ""} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="hello@example.com" />
            </div>
            <div className="admin-field">
              <label>GitHub</label>
              <input value={formData.github || ""} onChange={e => setFormData({...formData, github: e.target.value})} placeholder="https://github.com/username" />
            </div>
            <div className="admin-field">
              <label>LinkedIn</label>
              <input value={formData.linkedin || ""} onChange={e => setFormData({...formData, linkedin: e.target.value})} placeholder="https://linkedin.com/in/username" />
            </div>
            <div className="admin-field">
              <label>Twitter / X</label>
              <input value={formData.twitter || ""} onChange={e => setFormData({...formData, twitter: e.target.value})} placeholder="https://twitter.com/username" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
