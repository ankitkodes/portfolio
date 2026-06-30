import prisma from "@/lib/db";

export const revalidate = 60;

const CATEGORIES = ['Frontend', 'Backend', 'Database', 'Deployment', 'Tools', 'Design', 'Other'];

export default async function AboutPage() {
  const [profile, experiences, skills] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.experience.findMany({ orderBy: { order: "asc" } }),
    prisma.skill.findMany({ orderBy: { order: "asc" } })
  ]);

  const skillsByCategory = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = skills.filter(s => s.category === cat);
    return acc;
  }, {} as Record<string, typeof skills>);
  
  // Add 'Other' category mapping for skills not in the main predefined categories
  skillsByCategory['Other'] = [
    ...skillsByCategory['Other'], 
    ...skills.filter(s => !CATEGORIES.includes(s.category))
  ];

  return (
    <div className="v2-container" style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
      
      {/* --- HERO PROFILE --- */}
      {profile && (
        <div style={{ marginBottom: 80, display: "flex", gap: 40, alignItems: "center", flexWrap: "wrap" }}>
          {profile.profileImage && (
            <img 
              src={profile.profileImage} 
              alt={profile.name} 
              style={{ width: 160, height: 160, borderRadius: "50%", objectFit: "cover", border: "4px solid var(--border)" }} 
            />
          )}
          <div style={{ flex: 1, minWidth: 300 }}>
            <h1 style={{ fontSize: 48, fontWeight: 700, margin: "0 0 8px" }}>{profile.name}</h1>
            <p style={{ fontSize: 22, color: "var(--accent)", margin: "0 0 24px", fontWeight: 500 }}>{profile.tagline}</p>
            <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.8, margin: "0 0 24px" }}>
              {profile.bio}
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              {profile.resumeUrl && (
                <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="v2-btn" style={{ background: "var(--text-primary)", color: "var(--bg)", padding: "10px 24px", borderRadius: 8, textDecoration: "none", fontWeight: 500 }}>
                  View Resume
                </a>
              )}
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="v2-btn" style={{ background: "var(--border)", color: "var(--text-primary)", padding: "10px 24px", borderRadius: 8, textDecoration: "none", fontWeight: 500 }}>
                  Contact Me
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- EXPERIENCE TIMELINE --- */}
      {experiences.length > 0 && (
        <div style={{ marginBottom: 80 }}>
          <h2 style={{ fontSize: 32, fontWeight: 600, marginBottom: 40 }}>Experience</h2>
          <div style={{ position: "relative", paddingLeft: 24 }}>
            {/* Vertical Line */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: "var(--border)" }} />
            
            {experiences.map((exp, i) => (
              <div key={exp.id} style={{ position: "relative", marginBottom: i === experiences.length - 1 ? 0 : 48 }}>
                {/* Timeline Dot */}
                <div style={{ 
                  position: "absolute", left: -31, top: 4, width: 16, height: 16, 
                  borderRadius: "50%", background: exp.current ? "var(--accent)" : "var(--border)",
                  border: "4px solid var(--bg)"
                }} />
                
                <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
                  {exp.logo && (
                    <div style={{ width: 56, height: 56, borderRadius: 12, background: "var(--border)", overflow: "hidden", flexShrink: 0, border: "1px solid var(--border)" }}>
                      <img src={exp.logo} alt={exp.company} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 250 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                      <h3 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>{exp.role}</h3>
                      <span style={{ fontSize: 14, color: "var(--text-muted)", background: "var(--border)", padding: "4px 12px", borderRadius: 20 }}>
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <div style={{ fontSize: 16, color: "var(--accent)", fontWeight: 500, marginBottom: 16 }}>{exp.company}</div>
                    
                    {exp.description.length > 0 && (
                      <ul style={{ paddingLeft: 18, color: "var(--text-muted)", fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
                        {exp.description.map((d, index) => <li key={index} style={{ marginBottom: 6 }}>{d}</li>)}
                      </ul>
                    )}
                    
                    {exp.techUsed.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {exp.techUsed.map(t => (
                          <span key={t} style={{ fontSize: 12, padding: "4px 10px", background: "rgba(0,113,227,0.1)", color: "var(--accent)", borderRadius: 6, fontWeight: 500 }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- SKILLS --- */}
      {skills.length > 0 && (
        <div>
          <h2 style={{ fontSize: 32, fontWeight: 600, marginBottom: 40 }}>Skills & Expertise</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {CATEGORIES.map(category => (
              skillsByCategory[category].length > 0 && (
                <div key={category}>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 20px" }}>
                    {category}
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
                    {skillsByCategory[category].map(skill => (
                      <div key={skill.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }}>
                        {skill.icon ? (
                          <div style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }} dangerouslySetInnerHTML={{ __html: skill.icon }} />
                        ) : (
                          <div style={{ width: 24, height: 24, background: "var(--border)", borderRadius: 4 }} />
                        )}
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 15, fontWeight: 500 }}>{skill.name}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
