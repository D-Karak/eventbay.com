"use client";
import React from "react";
import { Id } from "../../convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { MapPin, DollarSign, Calendar, Loader2, ArrowRight } from "lucide-react";

interface cardProps {
  eventId: Id<"events">;
}

const EventCard = ({ eventId }: cardProps) => {
  const { user } = useUser();
  const router = useRouter();
  const event = useQuery(api.events.getById, { eventId });
  const availability = useQuery(api.events.getEventAvailablity, { eventId });
  
  const userTicket = useQuery(api.tickets.getUserTicketsForEvent, {
    eventId,
    userId: user?.id || "",
  });

  const queuePosition = useQuery(api.waitingList.getQueuePosition,{
    eventId,
    userId: user?.id || "",
  });

  if (!event) {
    return (
      <div className="w-full max-w-sm h-80 bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400 dark:text-slate-600" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 hover:border-gray-300 dark:hover:border-slate-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-slate-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {event.name}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {event.description}
        </p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-foreground/50 flex-shrink-0" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {event.location}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <DollarSign className="w-5 h-5 text-foreground/50 flex-shrink-0" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            ${event.price}
          </span>
        </div>

        {event.eventDate && (
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-foreground/50 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {new Date(event.eventDate).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 flex gap-2">
        <button
          onClick={() => router.push(`/events/${eventId}`)}
          className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200"
        >
          Details
        </button>
        <button
          onClick={() => router.push(`/events/${eventId}/register`)}
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          Register
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default EventCard;