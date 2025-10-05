import {query, mutation} from "./_generated/server";
import { ConvexError, v } from "convex/values";

// Get all non-cancelled events
export const get = query({
    args:{},
    handler: async (ctx) => {
        return await ctx.db.query("events")
        .filter((q)=>q.eq(q.field("is_cancelled"), undefined))
        .collect();
    }
})