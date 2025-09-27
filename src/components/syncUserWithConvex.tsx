"use client";
import {useUser} from "@clerk/nextjs"
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect } from "react";
const syncUserWithConvex = () => {
    const {user} = useUser();
    //this is how to call convex mutation in react which is useMutation hook use for calling mutation, mutation is used for creating, updating, deleting data
    const updateUser=useMutation(api.user.updateUser)

    useEffect(() => {
        if(!user) return;
        const syncUser=async()=>{
            try{
                await updateUser({
                    userId:user.id,
                    email:user.emailAddresses[0]?.emailAddress||"",
                    name:user.fullName||""
                })
            }catch(err){
                console.error("Failed to sync user with Convex",err);
            }   
            }
            syncUser();
    },[user,updateUser])
  return null
}

export default syncUserWithConvex