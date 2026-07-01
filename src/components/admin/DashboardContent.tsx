import React from "react";
import Link from "next/link";
import prisma from "@/lib/db";
import { 
  FileText, 
  Rocket, 
  Pencil, 
  Wrench, 
  FolderKanban, 
  Trash2, 
  User, 
  Zap, 
  Briefcase, 
  Plus, 
  ArrowUpRight, 
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { 
  PageEntrance, 
  CountUp, 
  AnimatedActivityRow, 
  SkillProgress, 
  QuickActionButton 
} from "./OverviewClient";

// Helper function to format relative activity timestamp
function formatRelativeTime(dateInput: Date | string) {
  const date = new Date(dateInput);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  
  const timeStr = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  
  if (date.toDateString() === now.toDateString()) {
    return `Today, ${timeStr}`;
  }
  
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${timeStr}`;
  }
  
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.getDate();
  return `${month} ${day}, ${timeStr}`;
}

export default async function DashboardContent() {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [
    totalPosts,
    postsThisMonth,
    activeProjects,
    projectsThisMonth,
    draftPosts,
    totalSkills,
    skillsThisMonth,
    topSkills,
    profile
  ] = await Promise.all([
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { status: "published", publishedAt: { gte: startOfMonth } } }),
    prisma.project.count({ where: { status: "active" } }),
    prisma.project.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.blogPost.count({ where: { status: "draft" } }),
    prisma.skill.count(),
    prisma.skill.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.skill.findMany({
      take: 5,
      orderBy: { proficiency: "desc" },
      select: { name: true, proficiency: true },
    }),
    prisma.profile.findFirst(),
  ]);

  const recentPosts = await prisma.blogPost.findMany({
    take: 5,
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, status: true, updatedAt: true },
  });

  const recentActivity = await prisma.activityLog.findMany({
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  // Formatting date and greeting info
  const name = profile?.name || "Admin";
  const hour = new Date().getHours();
  let greeting = "Good evening";
  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 17) {
    greeting = "Good afternoon";
  }

  const lastLoginDate = profile?.lastLogin ? new Date(profile.lastLogin) : null;
  let lastLoginStr = "Last login: first time";
  if (lastLoginDate) {
    const diffMs = Date.now() - lastLoginDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      lastLoginStr = `Last login: ${diffMins || 1}m ago`;
    } else {
      lastLoginStr = `Last login: ${diffHours}h ago`;
    }
  }

  const d = new Date();
  const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
  const day = d.getDate();
  const monthName = d.toLocaleDateString("en-US", { month: "short" });
  const year = d.getFullYear();
  const currentDateStr = `${weekday}, ${day} ${monthName} ${year}`;

  // Helper mapping for activity feed styles
  const getActivityStyle = (action: string, entityType: string) => {
    if (action === "delete") {
      return {
        bg: "#FEECEC",
        color: "#C9242A",
        icon: Trash2,
      };
    }
    if (entityType === "project") {
      return {
        bg: "#E8F5E9",
        color: "#1B8A3F",
        icon: FolderKanban,
      };
    }
    if (entityType === "skill") {
      return {
        bg: "#F0EEFF",
        color: "#5B3FD9",
        icon: Zap,
      };
    }
    if (entityType === "profile") {
      return {
        bg: "#FEF3E2",
        color: "#B25B00",
        icon: User,
      };
    }
    if (entityType === "experience") {
      return {
        bg: "#F5F5F7",
        color: "#1D1D1F",
        icon: Briefcase,
      };
    }
    return {
      bg: "#E8F1FB",
      color: "#0071E3",
      icon: FileText,
    };
  };

  const getActionDescription = (action: string, entityType: string, title: string) => {
    if (action === "delete") return `Deleted ${entityType} "${title}"`;
    if (action === "publish") return `Post "${title}" published`;
    
    if (action === "create") {
      if (entityType === "post") return `Post "${title}" created`;
      if (entityType === "project") return `Project "${title}" added`;
      if (entityType === "skill") return `Skill "${title}" added`;
      if (entityType === "experience") return `Experience "${title}" added`;
    }
    if (action === "update") {
      if (entityType === "profile") return `Profile updated`;
      return `${entityType.charAt(0).toUpperCase() + entityType.slice(1)} "${title}" updated`;
    }
    return `${action} ${entityType} "${title}"`;
  };

  return (
    <PageEntrance>
      <div className="apple-dashboard-container" style={{ padding: "8px 0" }}>
        
        {/* SECTION 1 — PAGE HEADER */}
        <div className="apple-header-row">
          <div>
            <h1 className="apple-greeting">{greeting}, {name} 👋</h1>
          </div>
          <div className="apple-header-pills">
            <div className="apple-pill-login">{lastLoginStr}</div>
            <div className="apple-pill-date">{currentDateStr}</div>
          </div>
        </div>

        {/* SECTION 2 — STAT CARDS */}
        <div className="apple-stat-grid">
          
          {/* Card A: Total Blog Posts */}
          <div className="apple-stat-card">
            <div className="apple-icon-wrapper" style={{ background: "#E8F1FB", color: "#0071E3" }}>
              <FileText size={18} />
            </div>
            <div className="apple-stat-value">
              <CountUp value={totalPosts} />
            </div>
            <div className="apple-stat-label">Total blog posts</div>
            <div className="apple-stat-delta" style={{ color: postsThisMonth > 0 ? "#1B8A3F" : "#86868B" }}>
              {postsThisMonth > 0 ? <TrendingUp size={12} /> : null}
              {postsThisMonth} this month
            </div>
          </div>

          {/* Card B: Projects */}
          <div className="apple-stat-card">
            <div className="apple-icon-wrapper" style={{ background: "#E8F5E9", color: "#1B8A3F" }}>
              <Rocket size={18} />
            </div>
            <div className="apple-stat-value">
              <CountUp value={activeProjects} />
            </div>
            <div className="apple-stat-label">Active projects</div>
            <div className="apple-stat-delta" style={{ color: projectsThisMonth > 0 ? "#1B8A3F" : "#86868B" }}>
              {projectsThisMonth > 0 ? <TrendingUp size={12} /> : null}
              {projectsThisMonth} new
            </div>
          </div>

          {/* Card C: Drafts Pending */}
          <Link href="/admin/posts?filter=drafts" className="apple-stat-card">
            <div className="apple-icon-wrapper" style={{ background: "#FEF3E2", color: "#B25B00" }}>
              <Pencil size={18} />
            </div>
            <div className="apple-stat-value">
              <CountUp value={draftPosts} />
            </div>
            <div className="apple-stat-label">Drafts pending</div>
            <div className="apple-stat-delta" style={{ color: draftPosts > 0 ? "#B25B00" : "#1B8A3F" }}>
              {draftPosts > 0 ? "Needs attention" : "All clear"}
            </div>
          </Link>

          {/* Card D: Skills Listed */}
          <div className="apple-stat-card">
            <div className="apple-icon-wrapper" style={{ background: "#F0EEFF", color: "#5B3FD9" }}>
              <Wrench size={18} />
            </div>
            <div className="apple-stat-value">
              <CountUp value={totalSkills} />
            </div>
            <div className="apple-stat-label">Skills listed</div>
            <div className="apple-stat-delta" style={{ color: skillsThisMonth > 0 ? "#1B8A3F" : "#86868B" }}>
              {skillsThisMonth > 0 ? <TrendingUp size={12} /> : null}
              {skillsThisMonth} added
            </div>
          </div>

        </div>

        {/* SECTION 3 — RECENT POSTS + ACTIVITY */}
        <div className="apple-two-col-grid">
          
          {/* Left card — Recent blog posts */}
          <div className="apple-card">
            <div className="apple-card-header">
              <h2 className="apple-card-title">Recent blog posts</h2>
              <Link href="/admin/posts" className="apple-card-link">View all &rarr;</Link>
            </div>
            <div className="apple-card-body">
              {recentPosts.length > 0 ? (
                recentPosts.map((post) => (
                  <Link 
                    key={post.id} 
                    href={`/admin/posts/${post.id}`} 
                    className="apple-row apple-row-clickable"
                  >
                    <div className="apple-row-left">
                      <span 
                        className="apple-dot" 
                        style={{ background: post.status === "published" ? "#1B8A3F" : "#B25B00" }} 
                      />
                      <span className="apple-title-text">{post.title}</span>
                    </div>
                    <div className="apple-row-right">
                      <span 
                        className="apple-status-pill"
                        style={{
                          background: post.status === "published" ? "#E8F5E9" : "#FEF3E2",
                          color: post.status === "published" ? "#1B8A3F" : "#B25B00"
                        }}
                      >
                        {post.status}
                      </span>
                      <span className="apple-date-text">
                        {new Date(post.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div style={{ padding: "16px", color: "var(--apple-text-secondary)", fontSize: "12px" }}>
                  No posts found.
                </div>
              )}
            </div>
          </div>

          {/* Right card — Recent activity */}
          <div className="apple-card">
            <div className="apple-card-header">
              <h2 className="apple-card-title">Recent activity</h2>
            </div>
            <div className="apple-card-body" style={{ maxHeight: "310px", overflowY: "auto" }}>
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => {
                  const styleCfg = getActivityStyle(activity.action, activity.entityType);
                  const Icon = styleCfg.icon;
                  return (
                    <AnimatedActivityRow key={activity.id} index={index}>
                      <div className="apple-activity-row">
                        <div 
                          className="apple-activity-icon" 
                          style={{ background: styleCfg.bg, color: styleCfg.color }}
                        >
                          <Icon size={14} />
                        </div>
                        <div className="apple-activity-content">
                          <span className="apple-activity-text">
                            {getActionDescription(activity.action, activity.entityType, activity.entityTitle)}
                          </span>
                          <span className="apple-activity-time">
                            {formatRelativeTime(activity.createdAt)}
                          </span>
                        </div>
                      </div>
                    </AnimatedActivityRow>
                  );
                })
              ) : (
                <div style={{ padding: "16px", color: "var(--apple-text-secondary)", fontSize: "12px" }}>
                  No recent activity found.
                </div>
              )}
            </div>
          </div>

        </div>

        {/* SECTION 4 — TOP SKILLS + QUICK ACTIONS */}
        <div className="apple-two-col-grid" style={{ gridTemplateColumns: "2fr 1fr" }}>
          
          {/* Left card — Top skills */}
          <div className="apple-card">
            <div className="apple-card-header">
              <h2 className="apple-card-title">Top skills</h2>
              <Link href="/admin/skills" className="apple-card-link">Manage &rarr;</Link>
            </div>
            <div className="apple-card-body">
              {topSkills.length > 0 ? (
                topSkills.map((skill, index) => (
                  <div key={skill.name} className="apple-row" style={{ minHeight: "38px" }}>
                    <div style={{ width: "80px", fontSize: "12px", color: "var(--apple-text-primary)", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {skill.name}
                    </div>
                    <SkillProgress percentage={(skill.proficiency / 5) * 100} index={index} />
                    <div style={{ width: "32px", textAlign: "right", fontSize: "11px", color: "var(--apple-text-secondary)" }}>
                      {Math.round((skill.proficiency / 5) * 100)}%
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: "16px", color: "var(--apple-text-secondary)", fontSize: "12px" }}>
                  No skills added yet.
                </div>
              )}
            </div>
          </div>

          {/* Right card — Quick actions */}
          <div className="apple-card">
            <div className="apple-card-header" style={{ borderBottom: "none", paddingBottom: "4px" }}>
              <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--apple-text-secondary)", letterSpacing: "0.5px" }}>QUICK ACTIONS</span>
            </div>
            <div className="apple-quick-grid">
              
              <QuickActionButton href="/admin/posts/new">
                <FileText size={18} />
                <span className="apple-quick-label">New post</span>
              </QuickActionButton>

              <QuickActionButton href="/admin/projects">
                <Rocket size={18} />
                <span className="apple-quick-label">Add project</span>
              </QuickActionButton>

              <QuickActionButton href="/admin/experience">
                <Briefcase size={18} />
                <span className="apple-quick-label">Add experience</span>
              </QuickActionButton>

              <QuickActionButton href="/admin/profile">
                <User size={18} />
                <span className="apple-quick-label">Edit profile</span>
              </QuickActionButton>

            </div>
          </div>

        </div>

      </div>
    </PageEntrance>
  );
}
