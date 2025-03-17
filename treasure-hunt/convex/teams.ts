import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("teams").collect();
  },
});

export const getByNumber = query({
  args: { teamNumber: v.number() },
  handler: async (ctx, args) => {
    const team = await ctx.db
      .query("teams")
      .filter((q) => q.eq(q.field("Team_Number"), args.teamNumber))
      .first();
    return team;
  },
});

export const getNextTeamNumber = query({
  handler: async (ctx) => {
    const teams = await ctx.db.query("teams").collect();
    
    if (teams.length === 0) {
      return 1;
    }
    
    // Find the highest team number and add 1
    const highestTeamNumber = Math.max(...teams.map(team => team.Team_Number));
    return highestTeamNumber + 1;
  },
});

export const createTeam = mutation({
  args: {
    teamName: v.string(),
    creatorId: v.id("users")
  },
  handler: async (ctx, args) => {
    const teams = await ctx.db.query("teams").collect();
    let nextTeamNumber = 1;
    if (teams.length > 0) {
      const highestTeamNumber = Math.max(...teams.map(team => team.Team_Number));
      nextTeamNumber = highestTeamNumber + 1;
    }
    
    const teamId = await ctx.db.insert("teams", {
      Team_Number: nextTeamNumber,
      Team_Name: args.teamName,
      Score: 0,
      Time: 0,
      Clue1: 0,
      Clue2: 0,
      Clue3: 0,
      Clue4: 0,
      Clue5: 0,
      Clue6: 0,
      Clue7: 0,
      Clue8: 0,
      Clue9: 0,
      Clue10: 0,
      Clue11: 0,
      Clue12: 0,
      Clue13: 0,
      Clue14: 0
    });
    
    await ctx.db.patch(args.creatorId, {
      team: nextTeamNumber
    });
    
    return { success: true, teamId, teamNumber: nextTeamNumber };
  },
});

export const updateClue = mutation({
  args: {
    teamNumber: v.number(),
    clueNumber: v.number(),
    value: v.number()
  },
  handler: async (ctx, args) => {
    const { teamNumber, clueNumber, value } = args;
    
    const team = await ctx.db
      .query("teams")
      .filter((q) => q.eq(q.field("Team_Number"), teamNumber))
      .first();
    
    if (!team) {
      throw new Error(`Team ${teamNumber} does not exist`);
    }
    
    if (clueNumber < 1 || clueNumber > 14) {
      throw new Error("Invalid clue number. Must be between 1 and 14.");
    }
    
    const updateField = `Clue${clueNumber}`;
    await ctx.db.patch(team._id, { [updateField]: value });
    
    const updatedTeam = await ctx.db.get(team._id);
    const clueFields = [
      updatedTeam.Clue1, updatedTeam.Clue2, updatedTeam.Clue3, updatedTeam.Clue4,
      updatedTeam.Clue5, updatedTeam.Clue6, updatedTeam.Clue7, updatedTeam.Clue8,
      updatedTeam.Clue9, updatedTeam.Clue10, updatedTeam.Clue11, updatedTeam.Clue12,
      updatedTeam.Clue13, updatedTeam.Clue14
    ];
    
    const newScore = clueFields.reduce((acc, val) => acc + (val || 0), 0);
    
    await ctx.db.patch(team._id, { Score: newScore });
    
    return { success: true, newScore };
  },
});

export const updateTime = mutation({
  args: { teamNumber: v.number(), time: v.number() },
  handler: async (ctx, args) => {
    const team = await ctx.db
      .query("teams")
      .filter((q) => q.eq(q.field("Team_Number"), args.teamNumber))
      .first();
    
    if (!team) {
      throw new Error(`Team ${args.teamNumber} does not exist`);
    }
    
    await ctx.db.patch(team._id, { Time: args.time });
    
    return { success: true };
  }
});