"use client";
import {useUser} from "@clerk/nextjs"
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect } from "react";
import { uptime } from "process";
const syncUserWithConvex = () => {
    const {user} = useUser();
    // const updatUser=useMutation(api.users.updateUser())

    useEffect(() => {
        if(!user) return;
        const syncUser=async()=>{
            try{
                await updateUser({
                    userid:user.id,
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