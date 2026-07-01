export const dynamic = "force-dynamic";

import React, { Suspense } from "react";
import DashboardContent from "@/components/admin/DashboardContent";
import OverviewSkeleton from "@/components/admin/OverviewSkeleton";

export default function AdminOverviewPage() {
  return (
    <Suspense fallback={<OverviewSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
