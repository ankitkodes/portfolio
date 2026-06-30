import prisma from "@/lib/db";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { status: "active" },
    orderBy: [
      { featured: "desc" },
      { order: "asc" }
    ]
  });

  return (
    <div className="v2-container" style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
      <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 16 }}>Projects</h1>
      <p style={{ fontSize: 18, color: "var(--text-muted)", marginBottom: 64, maxWidth: 600 }}>
        A collection of my recent work, side projects, and open-source contributions.
      </p>

      {projects.length === 0 ? (
        <p style={{ color: "var(--text-muted)" }}>No projects published yet.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 32 }}>
          {projects.map(project => (
            <div key={project.id} style={{ 
              display: "flex", 
              flexDirection: "column",
              background: "var(--surface)", 
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid var(--border)",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}>
              <div style={{ 
                height: 200, 
                background: project.coverImage ? `url(${project.coverImage}) center/cover` : "var(--border)",
                display: "flex",
                alignItems: "flex-end",
                padding: 16,
                position: "relative"
              }}>
                {project.featured && (
                  <span style={{ position: "absolute", top: 16, right: 16, background: "var(--accent)", color: "#fff", fontSize: 12, fontWeight: 600, padding: "4px 8px", borderRadius: 12 }}>
                    Featured
                  </span>
                )}
              </div>
              <div style={{ padding: 24, flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{project.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 20, flex: 1, lineHeight: 1.6 }}>
                  {project.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
                  {project.techStack.map(tech => (
                    <span key={tech} style={{ 
                      fontSize: 12, 
                      padding: "4px 10px", 
                      background: "var(--border)", 
                      borderRadius: 20,
                      color: "var(--text-muted)"
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 500, color: "var(--accent)", textDecoration: "none" }}>
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 500, color: "var(--text-primary)", textDecoration: "none" }}>
                      <Github size={16} /> Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
