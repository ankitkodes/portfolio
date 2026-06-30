"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, Search, Pencil, Trash2, Eye } from "lucide-react";
import toast from "react-hot-toast";

interface Post {
  id: string;
  title: string;
  slug: string;
  status: string;
  tags: string[];
  readTime: number;
  updatedAt: string;
  featured: boolean;
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [showBulkDelete, setShowBulkDelete] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/posts");
      const data = await res.json();
      setPosts(data);
    } catch { toast.error("Failed to load posts"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`/api/admin/posts/${deleteId}`, { method: "DELETE" });
      setPosts((p) => p.filter((x) => x.id !== deleteId));
      setSelected((s) => s.filter((id) => id !== deleteId));
      toast.success("Post deleted");
    } catch { toast.error("Failed to delete"); }
    setDeleteId(null);
  };

  const handleBulkDelete = async () => {
    if (selected.length === 0) return;
    try {
      await Promise.all(selected.map((id) => 
        fetch(`/api/admin/posts/${id}`, { method: "DELETE" })
      ));
      setPosts((p) => p.filter((x) => !selected.includes(x.id)));
      setSelected([]);
      toast.success(`${selected.length} posts deleted`);
    } catch { toast.error("Failed to delete posts"); }
    setShowBulkDelete(false);
  };

  const toggleSelectAll = () => {
    if (selected.length === filtered.length) {
      setSelected([]);
    } else {
      setSelected(filtered.map((p) => p.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => 
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filtered = posts.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Blog Posts</h1>
        <Link href="/admin/posts/new" className="admin-btn admin-btn-primary">
          <Plus size={16} /> New Post
        </Link>
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div className="admin-search">
            <Search size={16} />
            <input placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="admin-tabs" style={{ borderBottom: "none", marginBottom: 0 }}>
            {["all", "published", "draft"].map((t) => (
              <button key={t} className={`admin-tab ${filter === t ? "active" : ""}`} onClick={() => setFilter(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {selected.length > 0 && (
          <button className="admin-btn admin-btn-danger" onClick={() => setShowBulkDelete(true)}>
            <Trash2 size={16} /> Delete Selected ({selected.length})
          </button>
        )}
      </div>

      {loading ? (
        <div className="admin-loading">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">📝</div>
          <h3>No posts yet</h3>
          <p>Create your first blog post to get started.</p>
          <Link href="/admin/posts/new" className="admin-btn admin-btn-primary">
            <Plus size={16} /> Create Post
          </Link>
        </div>
      ) : (
        <div className="admin-card" style={{ padding: 0 }}>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: 40 }}>
                    <input 
                      type="checkbox" 
                      checked={filtered.length > 0 && selected.length === filtered.length}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Tags</th>
                  <th>Read Time</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((post) => (
                  <tr key={post.id} className={selected.includes(post.id) ? "selected" : ""}>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selected.includes(post.id)}
                        onChange={() => toggleSelect(post.id)}
                      />
                    </td>
                    <td style={{ fontWeight: 500 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {post.title}
                        {post.featured && (
                          <span className="admin-badge admin-badge-published" style={{ backgroundColor: "#f59e0b", color: "#fff", display: "inline-flex", gap: 4, alignItems: "center", fontSize: "11px", padding: "2px 6px" }}>
                            ⭐ Pinned
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className={`admin-badge admin-badge-${post.status}`}>
                        {post.status}
                      </span>
                    </td>
                    <td>
                      <div className="admin-tags">
                        {post.tags.slice(0, 3).map((t) => (
                          <span key={t} className="admin-tag">{t}</span>
                        ))}
                      </div>
                    </td>
                    <td>{post.readTime} min</td>
                    <td>{new Date(post.updatedAt).toLocaleDateString()}</td>
                    <td>
                      <div style={{ display: "flex", gap: 4 }}>
                        <Link href={`/admin/posts/${post.id}`} className="admin-icon-btn" title="Edit">
                          <Pencil size={14} />
                        </Link>
                        <Link href={`/blog/${post.slug}`} target="_blank" className="admin-icon-btn" title="Preview">
                          <Eye size={14} />
                        </Link>
                        <button className="admin-icon-btn danger" title="Delete" onClick={() => setDeleteId(post.id)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="admin-modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Post</h3>
            <p>Are you sure? This action cannot be undone.</p>
            <div className="admin-modal-actions">
              <button className="admin-btn admin-btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="admin-btn admin-btn-danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {showBulkDelete && (
        <div className="admin-modal-overlay" onClick={() => setShowBulkDelete(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete {selected.length} Posts</h3>
            <p>Are you sure? This action cannot be undone.</p>
            <div className="admin-modal-actions">
              <button className="admin-btn admin-btn-secondary" onClick={() => setShowBulkDelete(false)}>Cancel</button>
              <button className="admin-btn admin-btn-danger" onClick={handleBulkDelete}>Delete All</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
