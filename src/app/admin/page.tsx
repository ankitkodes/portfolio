export const dynamic = "force-dynamic";
import prisma from "@/lib/db";
import { FileText, FolderKanban, Zap, Briefcase } from "lucide-react";

async function getStats() {
  try {
    const [posts, published, projects, skills, experiences] = await Promise.all([
      prisma.blogPost.count(),
      prisma.blogPost.count({ where: { status: "published" } }),
      prisma.project.count(),
      prisma.skill.count(),
      prisma.experience.count(),
    ]);
    return { posts, published, drafts: posts - published, projects, skills, experiences };
  } catch {
    return { posts: 0, published: 0, drafts: 0, projects: 0, skills: 0, experiences: 0 };
  }
}

export default async function AdminOverviewPage() {
  const stats = await getStats();

  const cards = [
    { label: "Total Posts", value: stats.posts, sub: `${stats.published} published · ${stats.drafts} drafts`, icon: FileText },
    { label: "Projects", value: stats.projects, sub: "Total projects", icon: FolderKanban },
    { label: "Skills", value: stats.skills, sub: "Across categories", icon: Zap },
    { label: "Experience", value: stats.experiences, sub: "Positions", icon: Briefcase },
  ];

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Overview</h1>
      </div>
      <div className="admin-stats-grid">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="admin-stat-card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span className="admin-stat-label">{card.label}</span>
                <Icon size={18} style={{ color: "var(--admin-text-secondary)" }} />
              </div>
              <div className="admin-stat-value">{card.value}</div>
              <div className="admin-stat-sub">{card.sub}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
