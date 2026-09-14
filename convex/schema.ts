import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  todoTasks: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    ownerId: v.id("users"),
    deadline: v.number(),
    status: v.union(
      v.literal("todo"),
      v.literal("in-progress"),
      v.literal("completed"),
    ),
  })
    .index("by_owner", ["ownerId"])
    .index("by_status", ["status"])
    .index("by_deadline", ["deadline"]),
});
