"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, FileText, FolderKanban, Briefcase,
  Zap, User, Settings, ExternalLink, LogOut, Menu, X, Sun, Moon,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { useTheme } from "@/component/ThemeProvider";

const navItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Blog Posts", href: "/admin/posts", icon: FileText },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Experience", href: "/admin/experience", icon: Briefcase },
  { label: "Skills", href: "/admin/skills", icon: Zap },
  { label: "Profile", href: "/admin/profile", icon: User },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Load initial collapsed state on mount
  useEffect(() => {
    const saved = localStorage.getItem("admin-sidebar-collapsed");
    if (saved === "true") {
      setIsCollapsed(true);
      document.body.classList.add("admin-collapsed");
    } else {
      document.body.classList.remove("admin-collapsed");
    }
  }, []);

  if (pathname === "/admin/login") return null;

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  const toggleCollapse = () => {
    const nextCollapsed = !isCollapsed;
    setIsCollapsed(nextCollapsed);
    localStorage.setItem("admin-sidebar-collapsed", String(nextCollapsed));
    if (nextCollapsed) {
      document.body.classList.add("admin-collapsed");
    } else {
      document.body.classList.remove("admin-collapsed");
    }
  };

  return (
    <>
      <button
        className="admin-mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {mobileOpen && (
        <div className="admin-sidebar-overlay" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`admin-sidebar ${mobileOpen ? "open" : ""} ${isCollapsed ? "collapsed" : ""}`}>
        <div className="admin-sidebar-top">
          <div className="admin-sidebar-brand">
            <div className="admin-sidebar-avatar"><span>A</span></div>
            <div className="admin-sidebar-user">
              <span className="admin-sidebar-name">Admin</span>
              <span className="admin-sidebar-badge">Owner</span>
            </div>
          </div>
          <button 
            className="admin-sidebar-collapse-btn" 
            onClick={toggleCollapse}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <nav className="admin-sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-sidebar-link ${isActive(item.href) ? "active" : ""}`}
                onClick={() => setMobileOpen(false)}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon size={18} /><span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar-bottom">
          <button 
            className="admin-sidebar-link" 
            onClick={toggleTheme}
            title={isCollapsed ? (theme === "light" ? "Dark Mode" : "Light Mode") : undefined}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
          </button>
          <Link 
            href="/" 
            target="_blank" 
            className="admin-sidebar-link admin-sidebar-portfolio"
            title={isCollapsed ? "View Portfolio" : undefined}
          >
            <ExternalLink size={18} /><span>View Portfolio →</span>
          </Link>
          <button 
            className="admin-sidebar-link admin-sidebar-logout" 
            onClick={handleLogout}
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut size={18} /><span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
