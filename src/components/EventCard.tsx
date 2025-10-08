"use client";
import React from "react";
import { Id } from "../../convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface cardProps {
  eventId: Id<"events">;
}

const EventCard = ({eventId}:cardProps) => {
  const { user } = useUser();
  const router = useRouter();
  const event = useQuery(api.events.getById, { eventId });
  return (
  <div>
    <h2>{event?.name}</h2>
    <p>{event?.description}</p>
    <p>Location: {event?.location}</p>
    <p>Price: ${event?.price}</p>
  </div>);
};

export default EventCard;
