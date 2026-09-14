import { query, mutation, type MutationCtx } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { getCurrentUser } from "./users";
import type { Id } from "./_generated/dataModel";

/**
 * Make sure the current user matches the task's owner/creator
 */
async function checkUserAndTask(ctx: MutationCtx, todoTaskId: Id<"todoTasks">) {
  const user = await getCurrentUser(ctx);
  const todoTask = await ctx.db.get(todoTaskId);
  if (todoTask === null) {
    throw new ConvexError("Task not found");
  }
  if (todoTask.ownerId !== user._id) {
    throw new ConvexError("Not authorized to do this");
  }
}

/**
 * Display all todo tasks from the current user
 */
export const list = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    return await ctx.db
      .query("todoTasks")
      .withIndex("by_owner", (q) => q.eq("ownerId", user._id))
      .collect();
  },
});

/**
 * Create a new todo task
 */
export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    deadline: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    await ctx.db.insert("todoTasks", {
      name: args.name,
      description: args.description,
      ownerId: user._id,
      deadline: args.deadline,
      status: "todo",
    });
  },
});

/**
 * Update the status of a todo task
 */
export const updateStatus = mutation({
  args: {
    id: v.id("todoTasks"),
    status: v.union(
      v.literal("todo"),
      v.literal("in-progress"),
      v.literal("completed"),
    ),
  },
  handler: async (ctx, args) => {
    await checkUserAndTask(ctx, args.id);
    await ctx.db.patch(args.id, { status: args.status });
  },
});

/**
 * Delete a todo task
 */
export const remove = mutation({
  args: {
    id: v.id("todoTasks"),
  },
  handler: async (ctx, args) => {
    await checkUserAndTask(ctx, args.id);
    await ctx.db.delete(args.id);
  },
});
