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
//get event by id
export const getById = query({
    args: {eventId: v.id("events")},
    handler: async (ctx, {eventId}) => {
        const event = await ctx.db.get(eventId);
        if(!event){
            throw new ConvexError("Event not found or has been cancelled");
        }
        return event;
    }
})

//count how many tecket purchased
export const getEventAvailablity = query({
    args: {eventId: v.id("events")},
    handler: async (ctx, {eventId})=>{
        const event = await ctx.db.get(eventId)
    }
})