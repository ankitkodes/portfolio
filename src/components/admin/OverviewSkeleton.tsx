import React from "react";

export default function OverviewSkeleton() {
  return (
    <div className="apple-dashboard-container apple-shimmer" style={{ padding: "8px 0" }}>
      {/* Header Skeleton */}
      <div className="apple-header-row" style={{ marginBottom: "24px" }}>
        <div style={{ width: "240px", height: "24px", background: "var(--apple-divider)", borderRadius: "6px" }} />
        <div className="apple-header-pills">
          <div style={{ width: "120px", height: "22px", background: "var(--apple-divider)", borderRadius: "20px" }} />
          <div style={{ width: "120px", height: "22px", background: "var(--apple-divider)", borderRadius: "20px" }} />
        </div>
      </div>

      {/* Stat Cards Skeleton */}
      <div className="apple-stat-grid" style={{ marginBottom: "20px" }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="apple-stat-card" style={{ height: "120px", justifyContent: "space-between" }}>
            <div style={{ width: "32px", height: "32px", background: "var(--apple-divider)", borderRadius: "8px" }} />
            <div style={{ width: "80px", height: "28px", background: "var(--apple-divider)", borderRadius: "6px" }} />
            <div style={{ width: "100px", height: "14px", background: "var(--apple-divider)", borderRadius: "4px" }} />
            <div style={{ width: "60px", height: "12px", background: "var(--apple-divider)", borderRadius: "4px" }} />
          </div>
        ))}
      </div>

      {/* Main Grid: Recent Posts & Activity */}
      <div className="apple-two-col-grid" style={{ marginBottom: "20px" }}>
        {/* Left card */}
        <div className="apple-card" style={{ minHeight: "260px" }}>
          <div className="apple-card-header">
            <div style={{ width: "140px", height: "16px", background: "var(--apple-divider)", borderRadius: "4px" }} />
            <div style={{ width: "60px", height: "14px", background: "var(--apple-divider)", borderRadius: "4px" }} />
          </div>
          <div className="apple-card-body" style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--apple-divider)" }} />
                <div style={{ flex: 1, height: "14px", background: "var(--apple-divider)", borderRadius: "4px" }} />
                <div style={{ width: "50px", height: "14px", background: "var(--apple-divider)", borderRadius: "4px" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Right card */}
        <div className="apple-card" style={{ minHeight: "260px" }}>
          <div className="apple-card-header">
            <div style={{ width: "120px", height: "16px", background: "var(--apple-divider)", borderRadius: "4px" }} />
          </div>
          <div className="apple-card-body" style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "28px", height: "28px", background: "var(--apple-divider)", borderRadius: "8px" }} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ width: "80%", height: "12px", background: "var(--apple-divider)", borderRadius: "4px" }} />
                  <div style={{ width: "40%", height: "10px", background: "var(--apple-divider)", borderRadius: "4px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills & Quick Actions */}
      <div className="apple-two-col-grid">
        {/* Left card */}
        <div className="apple-card" style={{ minHeight: "240px" }}>
          <div className="apple-card-header">
            <div style={{ width: "100px", height: "16px", background: "var(--apple-divider)", borderRadius: "4px" }} />
            <div style={{ width: "60px", height: "14px", background: "var(--apple-divider)", borderRadius: "4px" }} />
          </div>
          <div className="apple-card-body" style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "80px", height: "14px", background: "var(--apple-divider)", borderRadius: "4px" }} />
                <div style={{ flex: 1, height: "4px", background: "var(--apple-divider)", borderRadius: "4px" }} />
                <div style={{ width: "30px", height: "12px", background: "var(--apple-divider)", borderRadius: "4px" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Right card */}
        <div className="apple-card" style={{ minHeight: "240px" }}>
          <div className="apple-card-header">
            <div style={{ width: "120px", height: "16px", background: "var(--apple-divider)", borderRadius: "4px" }} />
          </div>
          <div className="apple-quick-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{ height: "68px", background: "var(--apple-divider)", borderRadius: "10px" }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
