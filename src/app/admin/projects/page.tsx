"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Archive, Link as LinkIcon, GripVertical, Image as ImageIcon, Upload } from "lucide-react";
import toast from "react-hot-toast";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { fileToBase64 } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string | null;
  techStack: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  coverImage: string | null;
  featured: boolean;
  status: string;
  order: number;
}

function SortableProjectCard({ 
  project, 
  onEdit, 
  onDelete, 
  onToggleStatus 
}: { 
  project: Project, 
  onEdit: (p: Project) => void, 
  onDelete: (id: string) => void,
  onToggleStatus: (p: Project) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="admin-project-card">
      <div 
        className="admin-project-card-img" 
        style={{ 
          backgroundImage: project.coverImage ? `url(${project.coverImage})` : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--admin-hover)',
          position: 'relative'
        }}
      >
        {!project.coverImage && <ImageIcon size={32} style={{ opacity: 0.2 }} />}
        <div 
          {...attributes} 
          {...listeners} 
          style={{ position: 'absolute', top: 8, right: 8, background: 'var(--admin-surface)', borderRadius: '4px', padding: '4px', cursor: 'grab' }}
          className="admin-shadow-sm"
        >
          <GripVertical size={16} style={{ color: 'var(--admin-text-secondary)' }} />
        </div>
      </div>
      <div className="admin-project-card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 className="admin-project-card-title">{project.title}</h3>
          {project.featured && <span className="admin-badge admin-badge-active" style={{ zoom: 0.8 }}>Featured</span>}
        </div>
        <p style={{ fontSize: 13, color: 'var(--admin-text-secondary)', marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {project.description}
        </p>
        <div className="admin-tags" style={{ marginBottom: 16 }}>
          {project.techStack.slice(0, 3).map(t => (
            <span key={t} className="admin-tag">{t}</span>
          ))}
          {project.techStack.length > 3 && (
            <span className="admin-tag">+{project.techStack.length - 3}</span>
          )}
        </div>
        <div className="admin-project-card-actions">
          <button className="admin-btn admin-btn-secondary" style={{ flex: 1, padding: '6px' }} onClick={() => onEdit(project)}>
            <Pencil size={14} /> Edit
          </button>
          <button className="admin-btn admin-btn-secondary" style={{ padding: '6px' }} onClick={() => onToggleStatus(project)} title={project.status === 'active' ? 'Archive' : 'Unarchive'}>
            <Archive size={14} style={{ color: project.status === 'archived' ? 'var(--admin-accent)' : 'inherit' }} />
          </button>
          <button className="admin-btn admin-btn-danger" style={{ padding: '6px' }} onClick={() => onDelete(project.id)}>
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "", description: "", longDescription: "", liveUrl: "", githubUrl: "", techStack: [], featured: false, status: "active", coverImage: null
  });
  const [techInput, setTechInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/projects");
      if (res.ok) setProjects(await res.json());
    } catch { toast.error("Failed to load projects"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = projects.findIndex(p => p.id === active.id);
      const newIndex = projects.findIndex(p => p.id === over.id);
      const newOrder = arrayMove(projects, oldIndex, newIndex);
      
      // Optimistic update
      setProjects(newOrder);

      try {
        const payload = newOrder.map((p, index) => ({ id: p.id, order: index }));
        await fetch("/api/admin/projects", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } catch {
        toast.error("Failed to save reorder");
        setProjects(projects); // revert
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return toast.error("Title and Description are required");
    setSaving(true);
    try {
      const method = editingProject ? "PUT" : "POST";
      const url = editingProject ? `/api/admin/projects/${editingProject.id}` : "/api/admin/projects";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, order: editingProject ? editingProject.order : projects.length })
      });
      if (!res.ok) throw new Error("Failed to save");
      
      const saved = await res.json();
      if (editingProject) {
        setProjects(projects.map(p => p.id === saved.id ? saved : p));
        toast.success("Project updated");
      } else {
        setProjects([...projects, saved]);
        toast.success("Project created");
      }
      setIsModalOpen(false);
    } catch {
      toast.error("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const oldProjects = [...projects];
    // Optimistic delete
    setProjects(projects.filter(p => p.id !== deleteId));
    setDeleteId(null);
    try {
      const res = await fetch(`/api/admin/projects/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Project deleted");
    } catch {
      toast.error("Failed to delete project");
      setProjects(oldProjects); // revert
    }
  };

  const handleToggleStatus = async (p: Project) => {
    const newStatus = p.status === 'active' ? 'archived' : 'active';
    const oldProjects = [...projects];
    setProjects(projects.map(proj => proj.id === p.id ? { ...proj, status: newStatus } : proj));
    try {
      const res = await fetch(`/api/admin/projects/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...p, status: newStatus })
      });
      if (!res.ok) throw new Error();
      toast.success(`Project ${newStatus}`);
    } catch {
      toast.error("Failed to update status");
      setProjects(oldProjects);
    }
  };

  const addTech = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault();
      if (!formData.techStack?.includes(techInput.trim())) {
        setFormData({ ...formData, techStack: [...(formData.techStack || []), techInput.trim()] });
      }
      setTechInput("");
    }
  };

  const removeTech = (t: string) => {
    setFormData({ ...formData, techStack: (formData.techStack || []).filter(tech => tech !== t) });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.loading("Uploading image...", { id: "upload" });
      try {
        const base64 = await fileToBase64(file);
        setFormData({ ...formData, coverImage: base64 });
        toast.success("Image uploaded", { id: "upload" });
      } catch {
        toast.error("Failed to upload image", { id: "upload" });
      }
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Projects</h1>
        <button className="admin-btn admin-btn-primary" onClick={() => {
          setEditingProject(null);
          setFormData({ title: "", description: "", longDescription: "", liveUrl: "", githubUrl: "", techStack: [], featured: false, status: "active", coverImage: null });
          setIsModalOpen(true);
        }}>
          <Plus size={16} /> New Project
        </button>
      </div>

      {loading ? (
        <div className="admin-loading">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">🚀</div>
          <h3>No projects yet</h3>
          <p>Showcase your work by adding a project.</p>
          <button className="admin-btn admin-btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Create Project
          </button>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={projects} strategy={rectSortingStrategy}>
            <div className="admin-project-grid">
              {projects.map((project) => (
                <SortableProjectCard 
                  key={project.id} 
                  project={project} 
                  onEdit={(p) => { setEditingProject(p); setFormData(p); setIsModalOpen(true); }}
                  onDelete={(id) => setDeleteId(id)}
                  onToggleStatus={handleToggleStatus}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {isModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 600, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3>{editingProject ? 'Edit Project' : 'New Project'}</h3>
              <button className="admin-icon-btn" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            
            <form onSubmit={handleSave}>
              <div className="admin-field">
                <label>Title</label>
                <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Portfolio Website" />
              </div>
              <div className="admin-field">
                <label>Short Description (for cards)</label>
                <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={2} placeholder="Brief summary of the project" />
              </div>
              <div className="admin-field">
                <label>Tech Stack (Press Enter to add)</label>
                <input value={techInput} onChange={e => setTechInput(e.target.value)} onKeyDown={addTech} placeholder="e.g. Next.js, React, Tailwind..." />
                <div className="admin-tags" style={{ marginTop: 8 }}>
                  {formData.techStack?.map(t => (
                    <span key={t} className="admin-tag">
                      {t} <button type="button" onClick={() => removeTech(t)}>✕</button>
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <div className="admin-field" style={{ flex: 1 }}>
                  <label>Live URL</label>
                  <input value={formData.liveUrl || ""} onChange={e => setFormData({...formData, liveUrl: e.target.value})} placeholder="https://..." />
                </div>
                <div className="admin-field" style={{ flex: 1 }}>
                  <label>GitHub URL</label>
                  <input value={formData.githubUrl || ""} onChange={e => setFormData({...formData, githubUrl: e.target.value})} placeholder="https://github.com/..." />
                </div>
              </div>
              <div className="admin-field">
                <label>Cover Image</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <label className="admin-btn admin-btn-secondary" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <Upload size={16} /> Choose Image
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                  </label>
                  {formData.coverImage && (
                    <span style={{ fontSize: 13, color: 'var(--admin-text-secondary)' }}>Image uploaded successfully</span>
                  )}
                </div>
                {formData.coverImage && (
                  <div style={{ marginTop: 8, height: 120, width: '100%', backgroundImage: `url(${formData.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 8 }} />
                )}
              </div>
              <div className="admin-field" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" id="featured" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} style={{ width: 'auto' }} />
                <label htmlFor="featured" style={{ margin: 0, cursor: 'pointer' }}>Featured Project (shows up first)</label>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="admin-modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <h3>Delete Project</h3>
            <p>Are you sure? This action cannot be undone.</p>
            <div className="admin-modal-actions">
              <button className="admin-btn admin-btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="admin-btn admin-btn-danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
