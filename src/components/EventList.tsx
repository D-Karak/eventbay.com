"use client";
import { Loader2Icon, Calendar } from "lucide-react";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
const EventList = () => {
  const events = useQuery(api.events.get); //fetch all non-cancelled events
  // console.log(events)
  if (!events)
    return (
      <div className="flex items-center justify-center min-h-[500px] animate-spin text-primary">
        <Loader2Icon />
      </div>
    );
    //split into upcoming and past events
  const upcomingEvents = events
    .filter((e) => e.eventDate > Date.now())
    .sort((a, b) => a.eventDate - b.eventDate);
    //past events 
  const pastEvents = events
    .filter((e) => e.eventDate >= Date.now())
    .sort((a, b) => a.eventDate - b.eventDate);

  return(
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Upcoming Events</h1>
          <p className="text-gray-600 mt-2">Explore and book tickets for exciting events happening near you.</p>
        </div>

        <div className="bg-white px-4 py-2 rounded-md shadow-md border border-gray-200">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="text-primary font-medium">
              {upcomingEvents.length} Upcoming Events
            </span>
          </div>

          </div>
        </div>
      </div>
  )
};

export default EventList;
