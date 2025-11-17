
import {query, mutation} from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const getUrl = query({
    args: {
        storageId: v.id("_storage")
    },
    handler: async (ctx, {storageId})=>{
        return await ctx.storage.getUrl(storageId);
    }
})