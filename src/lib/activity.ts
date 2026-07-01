import prisma from "./db";

export type EntityType = "post" | "project" | "skill" | "experience" | "profile";

export async function logActivity(
  action: string,
  entityType: EntityType,
  entityTitle: string
) {
  try {
    await prisma.activityLog.create({
      data: {
        action,
        entityType,
        entityTitle,
      },
    });
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
}
