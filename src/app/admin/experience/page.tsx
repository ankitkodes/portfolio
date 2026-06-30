"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, GripVertical, Image as ImageIcon, Upload } from "lucide-react";
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
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { fileToBase64 } from "@/lib/utils";

interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string[];
  techUsed: string[];
  logo: string | null;
  order: number;
}

function SortableExpCard({ exp, onEdit, onDelete }: { exp: Experience, onEdit: (e: Experience) => void, onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: exp.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} className="admin-card" style={{ ...style, display: 'flex', gap: 16, alignItems: 'flex-start', padding: 16 }}>
      <div {...attributes} {...listeners} style={{ cursor: 'grab', color: 'var(--admin-text-secondary)', marginTop: 8 }}>
        <GripVertical size={20} />
      </div>
      <div style={{ width: 48, height: 48, borderRadius: 8, background: 'var(--admin-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
        {exp.logo ? <img src={exp.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <ImageIcon size={24} style={{ opacity: 0.3 }} />}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 600 }}>{exp.role}</h3>
            <div style={{ color: 'var(--admin-accent)', fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{exp.company}</div>
            <div style={{ color: 'var(--admin-text-secondary)', fontSize: 13, marginBottom: 8 }}>
              {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="admin-icon-btn" onClick={() => onEdit(exp)}><Pencil size={16} /></button>
            <button className="admin-icon-btn danger" onClick={() => onDelete(exp.id)}><Trash2 size={16} /></button>
          </div>
        </div>
        {exp.description.length > 0 && (
          <ul style={{ margin: '0 0 12px', paddingLeft: 16, fontSize: 14, color: 'var(--admin-text)', lineHeight: 1.6 }}>
            {exp.description.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        )}
        <div className="admin-tags">
          {exp.techUsed.map(t => <span key={t} className="admin-tag">{t}</span>)}
        </div>
      </div>
    </div>
  );
}

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [formData, setFormData] = useState<Partial<Experience>>({
    company: "", role: "", startDate: "", endDate: "", current: false, description: [], techUsed: [], logo: null
  });
  const [descInput, setDescInput] = useState("");
  const [techInput, setTechInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const fetchExp = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/experience");
      if (res.ok) setExperiences(await res.json());
    } catch { toast.error("Failed to load experience"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchExp(); }, [fetchExp]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = experiences.findIndex(p => p.id === active.id);
      const newIndex = experiences.findIndex(p => p.id === over.id);
      const newOrder = arrayMove(experiences, oldIndex, newIndex);
      setExperiences(newOrder);

      try {
        await fetch("/api/admin/experience", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newOrder.map((p, index) => ({ id: p.id, order: index })))
        });
      } catch {
        toast.error("Failed to save reorder");
        setExperiences(experiences);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company || !formData.role || !formData.startDate) return toast.error("Required fields missing");
    setSaving(true);
    try {
      const method = editingExp ? "PUT" : "POST";
      const url = editingExp ? `/api/admin/experience/${editingExp.id}` : "/api/admin/experience";
      const res = await fetch(url, {
        method, headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, order: editingExp ? editingExp.order : experiences.length })
      });
      if (!res.ok) throw new Error();
      const saved = await res.json();
      if (editingExp) {
        setExperiences(experiences.map(p => p.id === saved.id ? saved : p));
        toast.success("Experience updated");
      } else {
        setExperiences([...experiences, saved]);
        toast.success("Experience added");
      }
      setIsModalOpen(false);
    } catch { toast.error("Failed to save"); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const old = [...experiences];
    setExperiences(experiences.filter(p => p.id !== deleteId));
    setDeleteId(null);
    try {
      const res = await fetch(`/api/admin/experience/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Deleted");
    } catch {
      toast.error("Failed to delete");
      setExperiences(old);
    }
  };

  const addDesc = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && descInput.trim()) {
      e.preventDefault();
      setFormData({ ...formData, description: [...(formData.description || []), descInput.trim()] });
      setDescInput("");
    }
  };
  const removeDesc = (i: number) => {
    setFormData({ ...formData, description: formData.description?.filter((_, index) => index !== i) });
  };

  const addTech = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault();
      if (!formData.techUsed?.includes(techInput.trim())) {
        setFormData({ ...formData, techUsed: [...(formData.techUsed || []), techInput.trim()] });
      }
      setTechInput("");
    }
  };
  const removeTech = (t: string) => setFormData({ ...formData, techUsed: formData.techUsed?.filter(x => x !== t) });

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Experience</h1>
        <button className="admin-btn admin-btn-primary" onClick={() => {
          setEditingExp(null);
          setFormData({ company: "", role: "", startDate: "", endDate: "", current: false, description: [], techUsed: [], logo: null });
          setIsModalOpen(true);
        }}>
          <Plus size={16} /> Add Experience
        </button>
      </div>

      {loading ? (
        <div className="admin-loading">Loading...</div>
      ) : experiences.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">💼</div>
          <h3>No experience added</h3>
          <button className="admin-btn admin-btn-primary" onClick={() => setIsModalOpen(true)} style={{ marginTop: 16 }}>
            <Plus size={16} /> Add First Experience
          </button>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={experiences} strategy={verticalListSortingStrategy}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {experiences.map((exp) => (
                <SortableExpCard key={exp.id} exp={exp} onEdit={(e) => { setEditingExp(e); setFormData(e); setIsModalOpen(true); }} onDelete={setDeleteId} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {isModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 600, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3>{editingExp ? 'Edit Experience' : 'Add Experience'}</h3>
              <button className="admin-icon-btn" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            
            <form onSubmit={handleSave}>
              <div style={{ display: 'flex', gap: 16 }}>
                <div className="admin-field" style={{ flex: 1 }}>
                  <label>Role / Title</label>
                  <input required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} placeholder="e.g. Software Engineer" />
                </div>
                <div className="admin-field" style={{ flex: 1 }}>
                  <label>Company</label>
                  <input required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} placeholder="e.g. Acme Corp" />
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div className="admin-field" style={{ flex: 1 }}>
                  <label>Start Date</label>
                  <input required value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} placeholder="e.g. Jan 2022" />
                </div>
                <div className="admin-field" style={{ flex: 1 }}>
                  <label>End Date</label>
                  <input value={formData.endDate || ""} onChange={e => setFormData({...formData, endDate: e.target.value})} placeholder="e.g. Present" disabled={formData.current} />
                  <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <input type="checkbox" id="current" checked={formData.current} onChange={e => setFormData({...formData, current: e.target.checked, endDate: e.target.checked ? null : formData.endDate})} />
                    <label htmlFor="current" style={{ margin: 0 }}>I currently work here</label>
                  </div>
                </div>
              </div>

              <div className="admin-field">
                <label>Description Points (Press Enter to add)</label>
                <input value={descInput} onChange={e => setDescInput(e.target.value)} onKeyDown={addDesc} placeholder="Developed a new feature..." />
                <ul style={{ paddingLeft: 20, margin: '12px 0 0', fontSize: 14 }}>
                  {formData.description?.map((d, i) => (
                    <li key={i} style={{ marginBottom: 4 }}>
                      {d} <button type="button" onClick={() => removeDesc(i)} style={{ color: '#FF3B30', background: 'none', border: 'none', cursor: 'pointer', marginLeft: 8 }}>✕</button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="admin-field">
                <label>Tech Used (Press Enter to add)</label>
                <input value={techInput} onChange={e => setTechInput(e.target.value)} onKeyDown={addTech} placeholder="e.g. React, Node.js" />
                <div className="admin-tags" style={{ marginTop: 8 }}>
                  {formData.techUsed?.map(t => (
                    <span key={t} className="admin-tag">
                      {t} <button type="button" onClick={() => removeTech(t)}>✕</button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="admin-field">
                <label>Company Logo</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <label className="admin-btn admin-btn-secondary" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <Upload size={16} /> Choose Logo
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={async e => {
                      if (e.target.files?.[0]) {
                        const b64 = await fileToBase64(e.target.files[0]);
                        setFormData({...formData, logo: b64});
                      }
                    }} />
                  </label>
                  {formData.logo && <span style={{ fontSize: 13, color: 'var(--admin-text-secondary)' }}>Logo uploaded successfully</span>}
                </div>
                {formData.logo && <img src={formData.logo} alt="" style={{ height: 48, marginTop: 8, borderRadius: 8 }} />}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="admin-modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <h3>Delete Experience</h3>
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
