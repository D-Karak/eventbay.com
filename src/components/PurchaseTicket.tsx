"use client"
import { useState } from 'react'
import {useUser} from '@clerk/nextjs'
import {api} from '../../convex/_generated/api'
import React, { useEffect } from 'react'
import { Id } from '../../convex/_generated/dataModel'
import { useRouter } from 'next/router'
import { useQuery } from 'convex/react'

const PurchaseTicket = (eventId:{eventId:Id<"events">}) => {
  const {user} = useUser()
  const router = useRouter()
  const queuePosition = useQuery(api.waitingList.getQueuePosition, {
    eventId : eventId.eventId,
    userId: user?.id || "",
  }
  )
  const [timeRemaining, setTimeRemaining] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const offerExpiresAt = queuePosition?.offerExpiresAt ?? 0;
  const isExpired = Date.now() > offerExpiresAt;

  useEffect(() => {
    const calculateTimeRemaining = () => {
      if(isExpired) {
        setTimeRemaining('Offer expired');
        return;
      }
      const now = Date.now();
      const remaining = offerExpiresAt - now;
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60)); // this will show the time like 4m 30s
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
      setTimeRemaining(`${minutes}m ${seconds}s`);
    }
    
  }, [offerExpiresAt, isExpired]);

  return (
    <div>PurchaseTicket</div>
  )
}

export default PurchaseTicket