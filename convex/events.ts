import { error } from "console";
import {query, mutation} from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { TICKET_STATUS, WAITING_LIST_STATUS } from "./constants";

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
        const event = await ctx.db.get(eventId);
        if(!event) throw new Error("Event Not found");

        // count the purchased tickets
        const tickets = await ctx.db
          .query("tickets")
          .withIndex("by_event", (q) => q.eq("eventId", eventId))
          .collect();
        
        const purchasedCount = tickets.filter(
          (t) =>
            t.status === TICKET_STATUS.VALID || t.status === TICKET_STATUS.USED
        ).length;

        //count current valid offers
        const activeOffers= await ctx.db
        .query("waitingList")
        .withIndex("by_event_status", (q) =>
            q.eq("eventId", eventId).eq("status", WAITING_LIST_STATUS.OFFERED)
        )
        .collect()
        .then((entries)=> entries.filter(e=> (e.offerExpiresAt ?? 0) > Date.now()).length);

        const totalReservedTickets = await(purchasedCount) + activeOffers;
        return {
            isSoldOut: totalReservedTickets >= event.totalTickets,
            totalTickets: event.totalTickets,
            purchasedCount,
            activeOffers,
            availableTickets: Math.max(0, event.totalTickets - totalReservedTickets)
        };
    },
});