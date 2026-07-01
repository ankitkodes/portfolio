"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useTheme } from "@/component/ThemeProvider";
import dynamic from "next/dynamic";
import { ArrowLeft, Save, Upload, Eye } from "lucide-react";
import toast from "react-hot-toast";

const Editor = dynamic(() => import("@/components/admin/BlockNoteEditor"), { ssr: false });

// Helper to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export default function PostEditorPage() {
  const router = useRouter();
  const params = useParams();
  const isNew = params.id === "new";

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [status, setStatus] = useState("draft");
  const [coverImage, setCoverImage] = useState("");
  const [featured, setFeatured] = useState(false);
  const [slug, setSlug] = useState("");

  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [loaded, setLoaded] = useState(isNew);
  const [wordCount, setWordCount] = useState(0);
  const { theme } = useTheme();

  const [content, setContent] = useState<any[]>([]);

  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const savePost = useCallback(async (auto = false) => {
    if (!title.trim()) { if (!auto) toast.error("Title is required"); return; }
    setSaving(true);
    setSaveStatus("Saving...");
    try {
      const body = {
        title, excerpt, tags, status, coverImage, featured,
        content: content,
      };
      const url = isNew ? "/api/admin/posts" : `/api/admin/posts/${params.id}`;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      setSaveStatus("Saved");
      if (!auto) toast.success("Post saved");
      if (data.slug) setSlug(data.slug);
      if (isNew && data.id) router.replace(`/admin/posts/${data.id}`);
    } catch (err) {
      setSaveStatus("Error");
      if (!auto) toast.error(err instanceof Error ? err.message : "Save failed");
    } finally { setSaving(false); }
  }, [title, excerpt, tags, status, coverImage, featured, content, isNew, params.id, router, setSlug]);

  const scheduleAutoSave = useCallback(() => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => savePost(true), 30000);
  }, [savePost]);

  // Load existing post
  useEffect(() => {
    if (isNew || loaded) return;
    fetch(`/api/admin/posts/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setTitle(data.title || "");
        setExcerpt(data.excerpt || "");
        setTags(data.tags || []);
        setStatus(data.status || "draft");
        setCoverImage(data.coverImage || "");
        setFeatured(data.featured || false);
        setSlug(data.slug || "");

        if (data.content && Array.isArray(data.content)) {
          setContent(data.content);
        }
        setLoaded(true);
      })
      .catch(() => toast.error("Failed to load post"));
  }, [isNew, params.id, loaded, setSlug]);

  const handleEditorChange = (blocks: any[]) => {
    setContent(blocks);
    scheduleAutoSave();

    // Calculate word count
    let text = "";
    blocks.forEach((block: any) => {
      if (block.content && Array.isArray(block.content)) {
        block.content.forEach((inline: any) => {
          if (inline.type === "text") text += inline.text + " ";
        });
      }
    });
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) { setTags([...tags, t]); }
    setTagInput("");
  };

  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  if (!loaded) return <div className="admin-loading">Loading editor...</div>;

  return (
    <div className="admin-editor-page-wrapper">
      <div className="admin-page-header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/admin/posts" className="admin-icon-btn"><ArrowLeft size={16} /></Link>
          <h1 className="admin-page-title">{isNew ? "New Post" : "Edit Post"}</h1>
          {saveStatus && <span style={{ fontSize: 13, color: "var(--admin-text-secondary)" }}>{saveStatus}</span>}
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, cursor: "pointer", userSelect: "none", color: "var(--admin-text-secondary)" }}>
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => { setFeatured(e.target.checked); scheduleAutoSave(); }}
              style={{ cursor: "pointer" }}
            />
            ⭐ Pin to Home
          </label>
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); scheduleAutoSave(); }}
            className="admin-editor-status-select"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          {slug && (
            <a
              href={`/blog/${slug}?preview=true`}
              target="_blank"
              rel="noopener noreferrer"
              className="admin-btn admin-btn-secondary"
              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <Eye size={16} /> Preview
            </a>
          )}
          <button className="admin-btn admin-btn-primary" onClick={() => savePost(false)} disabled={saving}>
            <Save size={16} /> {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="admin-editor-card">
        {coverImage && (
          <div className="admin-editor-cover-preview">
            <img src={coverImage} alt="Cover" />
          </div>
        )}

        <div className="admin-editor-cover-input-group">
          <div style={{ display: "flex", gap: 12 }}>
            <input
              value={coverImage}
              onChange={(e) => { setCoverImage(e.target.value); scheduleAutoSave(); }}
              placeholder="Add cover image URL..."
              className="admin-editor-cover-url"
            />
            <label className="admin-btn admin-btn-secondary admin-editor-upload-btn">
              <Upload size={16} style={{ marginRight: 6 }} /> Upload
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={async (e) => {
                  if (e.target.files && e.target.files[0]) {
                    try {
                      const base64 = await fileToBase64(e.target.files[0]);
                      setCoverImage(base64);
                      scheduleAutoSave();
                    } catch {
                      toast.error("Failed to upload image");
                    }
                  }
                }}
              />
            </label>
          </div>
        </div>

        <input
          className="admin-editor-title"
          value={title}
          onChange={(e) => { setTitle(e.target.value); scheduleAutoSave(); }}
          placeholder="Post title..."
        />

        <textarea
          className="admin-editor-excerpt"
          value={excerpt}
          onChange={(e) => { setExcerpt(e.target.value); scheduleAutoSave(); }}
          placeholder="Write a brief excerpt..."
          rows={2}
        />

        <div className="admin-editor-divider" />

        <div className="admin-editor-body">
          <Editor initialContent={content} onChange={handleEditorChange} theme={theme === "dark" ? "dark" : "light"} />
        </div>

        <div className="admin-editor-footer">
          <div className="admin-editor-stats">
            <span>{wordCount} words</span>
            <span>{readTime} min read</span>
          </div>
          <div className="admin-editor-tags-add">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              placeholder="Add tag..."
              className="admin-editor-tag-input"
            />
          </div>
        </div>
        {tags.length > 0 && (
          <div className="admin-editor-tags-list">
            {tags.map((t) => (
              <span key={t} className="admin-editor-tag-chip">
                {t}
                <button
                  onClick={() => { setTags(tags.filter((x) => x !== t)); scheduleAutoSave(); }}
                  className="admin-editor-tag-remove"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
