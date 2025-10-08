"use client";
import { Loader2Icon, Calendar, Key, Ticket } from "lucide-react";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import EventCard from "./EventCard";
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
    .filter((e) => e.eventDate <= Date.now())
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

        {/* upcoming events grid */}
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {upcomingEvents.map((event) => (
              <EventCard key={event._id} eventId={event._id} />
            ))}
          </div>
        ) : (
          <div className="bg-secondary rounded-lg p-12 text-center mb-12">
            <Ticket className="w-12 h-12 text-secondary mx-auto mb-4"/>
            <h3 className="text-lg font-medium text-gray-900">No upcoming events</h3>
            <p className="text-secondary mt-1">Check back later for new events</p>
          </div>

        )
  //    //past events section
      }
      {pastEvents.length > 0 && ( 
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">Past Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <EventCard key={event._id} eventId={event._id} />
            ))}
          </div>
        </div>
      )
      //if no past events, do not render anything
}
    </div>
  )
};

export default EventList;
