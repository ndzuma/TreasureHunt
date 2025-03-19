import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    user: v.string(),
    user_type: v.string(),
    team: v.optional(v.number())
  }),
  teams: defineTable({
    Team_Number: v.number(),
    Team_Name: v.string(),
    Score: v.number(),
    Time: v.number(),
    StartTime: v.optional(v.number()),
    EndTime: v.optional(v.number()),
    In_Progress: v.boolean(),
    Clue1: v.optional(v.number()),
    Clue2: v.optional(v.number()),
    Clue3: v.optional(v.number()),
    Clue4: v.optional(v.number()),
    Clue5: v.optional(v.number()),
    Clue6: v.optional(v.number()),
    Clue7: v.optional(v.number()),
    Clue8: v.optional(v.number()),
    Clue9: v.optional(v.number()),
    Clue10: v.optional(v.number()),
    Clue11: v.optional(v.number()),
    Clue12: v.optional(v.number()),
    Clue13: v.optional(v.number()),
    Clue14: v.optional(v.number()),
  }),
  clues: defineTable({
    Clue_Number: v.number(),
    Clue_Name: v.string(),
    Clue_Text: v.string(),
    Code: v.string(),
  }),
});