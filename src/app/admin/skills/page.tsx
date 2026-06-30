"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
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

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon: string | null;
  order: number;
}

const CATEGORIES = ['Frontend', 'Backend', 'Database', 'Deployment', 'Tools', 'Design', 'Other'];

function SortableSkillRow({ skill, onEdit, onDelete }: { skill: Skill, onEdit: (s: Skill) => void, onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: skill.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} className="admin-card" style={{ ...style, display: 'flex', alignItems: 'center', padding: '12px 16px', marginBottom: 8 }}>
      <div {...attributes} {...listeners} style={{ cursor: 'grab', color: 'var(--admin-text-secondary)', marginRight: 16 }}>
        <GripVertical size={16} />
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 32, height: 32, borderRadius: 6, background: 'var(--admin-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
          {skill.icon ? <span dangerouslySetInnerHTML={{ __html: skill.icon }} /> : '🔹'}
        </div>
        <div>
          <div style={{ fontWeight: 500, fontSize: 14 }}>{skill.name}</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        <button className="admin-icon-btn" onClick={() => onEdit(skill)}><Pencil size={14} /></button>
        <button className="admin-icon-btn danger" onClick={() => onDelete(skill.id)}><Trash2 size={14} /></button>
      </div>
    </div>
  );
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState<Partial<Skill>>({ name: "", category: "Frontend", proficiency: 3, icon: "" });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const fetchSkills = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/skills");
      if (res.ok) setSkills(await res.json());
    } catch { toast.error("Failed to load skills"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchSkills(); }, [fetchSkills]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const activeSkill = skills.find(s => s.id === active.id);
      const overSkill = skills.find(s => s.id === over.id);
      if (!activeSkill || !overSkill || activeSkill.category !== overSkill.category) return; // Only reorder within category

      const categorySkills = skills.filter(s => s.category === activeSkill.category);
      const oldIndex = categorySkills.findIndex(p => p.id === active.id);
      const newIndex = categorySkills.findIndex(p => p.id === over.id);
      const newCategoryOrder = arrayMove(categorySkills, oldIndex, newIndex);
      
      const newSkills = [...skills];
      let offset = 0;
      for (let i = 0; i < newSkills.length; i++) {
        if (newSkills[i].category === activeSkill.category) {
          newSkills[i] = newCategoryOrder[offset];
          offset++;
        }
      }
      setSkills(newSkills);

      try {
        await fetch("/api/admin/skills", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newSkills.map((p, index) => ({ id: p.id, order: index })))
        });
      } catch {
        toast.error("Failed to save reorder");
        setSkills(skills);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return toast.error("Name is required");
    setSaving(true);
    try {
      const method = editingSkill ? "PUT" : "POST";
      const url = editingSkill ? `/api/admin/skills/${editingSkill.id}` : "/api/admin/skills";
      const res = await fetch(url, {
        method, headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, order: editingSkill ? editingSkill.order : skills.length })
      });
      if (!res.ok) throw new Error();
      const saved = await res.json();
      if (editingSkill) {
        setSkills(skills.map(p => p.id === saved.id ? saved : p));
        toast.success("Skill updated");
      } else {
        setSkills([...skills, saved]);
        toast.success("Skill added");
      }
      setIsModalOpen(false);
    } catch { toast.error("Failed to save"); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const old = [...skills];
    setSkills(skills.filter(p => p.id !== deleteId));
    setDeleteId(null);
    try {
      const res = await fetch(`/api/admin/skills/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Deleted");
    } catch {
      toast.error("Failed to delete");
      setSkills(old);
    }
  };

  const skillsByCategory = useMemo(() => {
    const grouped = CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat]: [] as Skill[] }), {} as Record<string, Skill[]>);
    skills.forEach(s => {
      if (grouped[s.category]) grouped[s.category].push(s);
      else grouped["Other"].push(s);
    });
    return grouped;
  }, [skills]);

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Skills</h1>
        <button className="admin-btn admin-btn-primary" onClick={() => {
          setEditingSkill(null);
          setFormData({ name: "", category: "Frontend", proficiency: 3, icon: "" });
          setIsModalOpen(true);
        }}>
          <Plus size={16} /> Add Skill
        </button>
      </div>

      {loading ? (
        <div className="admin-loading">Loading...</div>
      ) : skills.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">⚡</div>
          <h3>No skills added</h3>
          <button className="admin-btn admin-btn-primary" onClick={() => setIsModalOpen(true)} style={{ marginTop: 16 }}>
            <Plus size={16} /> Add First Skill
          </button>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          {CATEGORIES.map(category => (
            skillsByCategory[category].length > 0 && (
              <div key={category} style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {category}
                </h3>
                <SortableContext items={skillsByCategory[category]} strategy={verticalListSortingStrategy}>
                  {skillsByCategory[category].map(skill => (
                    <SortableSkillRow key={skill.id} skill={skill} onEdit={s => { setEditingSkill(s); setFormData(s); setIsModalOpen(true); }} onDelete={setDeleteId} />
                  ))}
                </SortableContext>
              </div>
            )
          ))}
        </DndContext>
      )}

      {isModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 400 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3>{editingSkill ? 'Edit Skill' : 'Add Skill'}</h3>
              <button className="admin-icon-btn" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            
            <form onSubmit={handleSave}>
              <div className="admin-field">
                <label>Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. TypeScript" />
              </div>
              <div className="admin-field">
                <label>Category</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="admin-field">
                <label>Icon (SVG Code or Devicon Class)</label>
                <input value={formData.icon || ""} onChange={e => setFormData({...formData, icon: e.target.value})} placeholder="<svg>...</svg> or devicon-typescript-plain" />
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
            <h3>Delete Skill</h3>
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
