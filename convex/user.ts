import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUserByUserId = query({
    args: {
        userId: v.string(),
    },
    handler: async (ctx, {userId}) => {
        const user = await ctx.db
        .query("users")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .first();
        return user;
    }
});

export const getUserByEmail = query({
    args: {
        email: v.string(),
    },
    handler: async (ctx, {email})=>{
        const user = await ctx.db
        .query("users")
        .withIndex("by_email", (q)=>q.eq("email", email))
        .first()
        return user;
    }
})

export const updateUser = mutation({
    args: {
        userId: v.string(),
        name: v.string(),
        email: v.string(),
    },
    handler: async (ctx, {userId, name, email}) => {
        //check if user already exists
        const existingUser = await ctx.db
        .query("users")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .first();

        if(existingUser){
            //update user
            await ctx.db
            .patch(existingUser._id, {
                name,
                email
            });
            return existingUser._id; 
        }

        //create new user
        const newUserId = await ctx.db.insert("users", {
            userId,
            name,
            email,
            stripeConnectId: undefined,
        });
        return newUserId;
    }
})