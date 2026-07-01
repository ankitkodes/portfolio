"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// 1. Page Entrance Fade-In Wrapper
export function PageEntrance({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div 
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 300ms ease-out, transform 300ms ease-out",
      }}
    >
      {children}
    </div>
  );
}

// 2. CountUp Component
export function CountUp({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const hasAnimated = sessionStorage.getItem("admin_overview_animated");
    if (hasAnimated) {
      setDisplayValue(value);
      return;
    }

    let start = 0;
    const end = value;
    if (end === 0) {
      setDisplayValue(0);
      return;
    }
    const duration = 800;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const currentVal = Math.floor(start + ease * (end - start));
      
      setDisplayValue(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(end);
        sessionStorage.setItem("admin_overview_animated", "true");
      }
    }

    requestAnimationFrame(animate);
  }, [value]);

  return <span>{displayValue}</span>;
}

// 3. Staggered Animated Activity Row
export function AnimatedActivityRow({ children, index }: { children: React.ReactNode; index: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, index * 50);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div 
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      {children}
    </div>
  );
}

// 4. Staggered Skill Progress Bar
export function SkillProgress({ percentage, index }: { percentage: number; index: number }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(percentage);
    }, 100 + index * 100);

    return () => clearTimeout(timer);
  }, [percentage, index]);

  return (
    <div style={{ flex: 1, height: "4px", background: "var(--apple-divider)", borderRadius: "4px", overflow: "hidden" }}>
      <div 
        style={{ 
          width: `${width}%`, 
          height: "100%", 
          background: "var(--apple-accent)", 
          transition: "width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          borderRadius: "4px"
        }} 
      />
    </div>
  );
}

// 5. Scale Down on Click Quick Action Button
export function QuickActionButton({ href, children }: { href: string; children: React.ReactNode }) {
  const [pressed, setPressed] = useState(false);

  const isExternal = href.startsWith("http") || href.startsWith("https") || href === "/";

  const style: React.CSSProperties = {
    background: "var(--apple-btn-bg)",
    border: "var(--apple-card-border)",
    borderRadius: "10px",
    padding: "14px 8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    cursor: "pointer",
    transition: "background 0.15s ease, transform 0.1s ease",
    transform: pressed ? "scale(0.97)" : "scale(1)",
    textDecoration: "none",
    color: "var(--apple-text-primary)",
    width: "100%",
  };

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={style}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        className="apple-quick-btn"
      >
        {children}
      </a>
    );
  }

  return (
    <Link 
      href={href}
      style={style}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      className="apple-quick-btn"
    >
      {children}
    </Link>
  );
}
