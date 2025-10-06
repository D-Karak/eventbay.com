"use client";
import React from 'react'
import { Id } from '../../convex/_generated/dataModel'
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useQuery } from 'convex/react';

interface cardProps {
    eventId: Id<"events">
}

const EventCard = (eventId:cardProps) => {
    const { user } = useUser();
    const router = useRouter();
    const event = useQuery(api.events.getById, [eventId]);
  return (
    <div>

    </div>
  )
}

export default EventCard