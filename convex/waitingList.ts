import { query, mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { WAITING_LIST_STATUS } from "./constants";

export const getQueuePosition = query({
  args: {
    eventId: v.id("events"),
    userId: v.string(),
  },
  handler: async (ctx, { eventId, userId }) => {
    const waitingListEntry = await ctx.db
      .query("waitingList")
      .withIndex("by_user_event", (q) =>
        q.eq("userId", userId).eq("eventId", eventId)
      )
      .filter((q) => q.neq(q.field("status"), WAITING_LIST_STATUS.EXPIRED))
      .first();

    if (!waitingListEntry) {
      return null; // User is not on the waiting list
    }

    const peopleAhead = await ctx.db
          .query("waitingList")
          .withIndex("by_event_status", (q) => q.eq("eventId", eventId))
          .filter((q) =>
            q.and(
              q.lt(q.field("_creationTime"), waitingListEntry._creationTime),
              q.or(
                q.eq(q.field("status"), WAITING_LIST_STATUS.WAITING),
                q.eq(q.field("status"), WAITING_LIST_STATUS.OFFERED)
              )
            )
          )
          .collect()
          .then((results) => results.length);

        return {
          ...waitingListEntry,
          position: peopleAhead + 1,
        }; // Position is number of people ahead plus one for the user themselves
      },
    });
