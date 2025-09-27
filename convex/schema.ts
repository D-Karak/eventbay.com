import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
// Event Organizer creates an event
    events: defineTable({
    name: v.string(),              // Event name
    description: v.string(),       // Event details
    location: v.string(),          // Where it happens
    eventDate: v.number(),         // Unix timestamp
    price: v.number(),             // Ticket price
    totalTickets: v.number(),      // How many tickets available
    userId: v.string(),            // Who created the event (Clerk ID)
    imageStorageId: v.optional(v.id("_storage")), // Event image
    is_cancelled: v.optional(v.boolean()),        // If event is cancelled
}),
// Customer buys ticket
    tickets: defineTable({
    eventId: v.id("events"),       // Which event this ticket is for
    userId: v.string(),            // Who bought the ticket (Clerk ID)
    purchasedAt: v.number(),       // When they bought it (timestamp)
    status: v.union(               // Current ticket status
        v.literal("valid"),        // Can be used
        v.literal("used"),         // Already scanned/used
        v.literal("returned"),     // Refunded
        v.literal("cancelled"),    // Cancelled by system/admin
    ),
    paymentIntentId: v.string(),   // Stripe payment ID
    amount: v.optional(v.number()), // How much they paid
})
    // Indices to find tickets by event, user, and payment intent ID 
    .index("by_event", ["eventId"])
    .index("by_user", ["userId"])
    .index("by_user_event", ["userId", "eventId"])
    .index("by_payment_intent", ["paymentIntentId"]),

// User joins waiting list for sold-out event
    waitingList: defineTable({
    eventId: v.id("events"),       // Which event
    userId: v.string(),             // User's email
    status: v.union(               // Current status
        v.literal("waiting"),      // Waiting for ticket
        v.literal("offered"),      // offered ticket
        v.literal("purchased"),    // Purchased ticket
        v.literal("expired"),      // Offer expired
    ),
    offerExpiresAt: v.optional(v.number()), // When offer expires
})
    // Indices to find waitlist entries by event, user, and status
    .index("by_event_status", ["eventId", "status"]) // active offers 
    .index("by_user_event", ["userId", "eventId"])   //lookup if user on waitlist
    .index("by_user", ["userId"]),                  // all waitlist entries for user

// User profile synced from Clerk
    users: defineTable({
        name: v.string(),          // Full name
        email: v.string(),         // Email address
        userId: v.string(),       // Clerk user ID
        stripeConnectId: v.optional(v.string()), // Stripe customer ID
    })
    .index("by_userId", ["userId"])
    .index("by_email", ["email"]),
});