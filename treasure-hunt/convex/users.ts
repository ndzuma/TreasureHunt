import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const getByUsername = query({
  args: { user: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("user"), args.user))
      .first();
    return user;
  },
});

export const loginUser = mutation({
  args: { user: v.string(), user_type: v.string() },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("user"), args.user))
      .first();
    
    if (existingUser) {
      return { success: true, userId: existingUser._id, isNewUser: false };
    }
    
    // Create new user if doesn't exist
    const userId = await ctx.db.insert("users", { 
      user: args.user, 
      user_type: args.user_type 
    });
    
    return { success: true, userId, isNewUser: true };
  },
});

export const joinTeam = mutation({
  args: { 
    userId: v.id("users"),
    teamNumber: v.number() 
  },
  handler: async (ctx, args) => {
    const team = await ctx.db
      .query("teams")
      .filter((q) => q.eq(q.field("Team_Number"), args.teamNumber))
      .first();
    
    if (!team) {
      throw new Error(`Team ${args.teamNumber} does not exist`);
    }
    
    await ctx.db.patch(args.userId, {
      team: args.teamNumber
    });
    
    return { success: true, teamId: team._id };
  },
});

export const joinTeamByName = mutation({
  args: { userId: v.id("users"), teamName: v.string() },
  handler: async (ctx, args) => {
    const team = await ctx.db
      .query("teams")
      .filter((q) => q.eq(q.field("Team_Name"), args.teamName))
      .first();
    
    if (!team) {
      throw new Error(`Team ${args.teamName} does not exist`);
    }
    
    await ctx.db.patch(args.userId, {
      team: team.Team_Number
    });
    
    return { success: true, teamId: team._id, teamNumber: team.Team_Number };
  },
});
