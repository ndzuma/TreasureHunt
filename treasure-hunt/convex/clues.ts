import { VString } from "node_modules/convex/dist/cjs-types/values";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAllClues = query({

    handler: async (ctx) => {
        return await ctx.db.query("clues").collect();
    }
});

export const getClueByName = query({
    args: {teamName: v.string()},
    handler: async(ctx,args) => {
        const clue = await ctx.db
            .query("clues")
            .filter((q) => q.eq(q.field("Clue_Name"), args.teamName))
            .first();
        return clue;            
        
    }
});