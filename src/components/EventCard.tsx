"use client";
import React from "react";
import { Id } from "../../convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { MapPin, DollarSign, Calendar, Loader2, ArrowRight, StarIcon, CalendarDays, Ticket, PencilIcon, Check, XCircle, CircleArrowRight } from "lucide-react";
import { useStorageUrl } from "@/lib/utils";
import Image from "next/image";
import altimage from "../../images/eventAlt.jpg";
import PurchaseTicket from "./PurchaseTicket";

interface cardProps {
  eventId: Id<"events">;
}

const EventCard = ({ eventId }: cardProps) => {
  const { user,isLoaded,isSignedIn } = useUser();
  console.log(isSignedIn??isLoaded??user)
  const router = useRouter();
  const event = useQuery(api.events.getById, { eventId });
  const isPastEvent = event?.eventDate ? event.eventDate < Date.now() : false;
  const isEventOwner = event?.userId === user?.id;
  const availability = useQuery(api.events.getEventAvailablity, { eventId });
  
  const userTicket = useQuery(api.tickets.getUserTicketsForEvent, {
    eventId,
    userId: user?.id || "",
  });

  const queuePosition = useQuery(api.waitingList.getQueuePosition,{
    eventId,
    userId: user?.id || "",
  });

  const imageUrl = useStorageUrl(event?.imageStorageId);

  if (!event) {
    return (
      <div className="w-full max-w-sm h-80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border border-gray-200/50 dark:border-slate-800/50 rounded-2xl flex items-center justify-center shadow-xl">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400 dark:text-slate-600" />
      </div>
    );
  }

  const renderQueuePosition = () => {
    if(!queuePosition || queuePosition.status !== "waiting") return null;
    
      if((availability?.purchasedCount ?? 0) >= (availability?.totalTickets ?? 0)){
        <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
        <span className="text-yellow-700 font-medium flex items-center">
          <Loader2 className="w-5 h-5 mr-2 animate-spin"/>
          You are number {queuePosition.position} in the waiting list
        </span>
      </div>
      }
    
      if(queuePosition.position === 2){
        return (
          <div className="flex flex-collg:flex-row items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-100">
          <div className="flex items-center">
            <CircleArrowRight className="w-5 h-5 text-amber-500 mr-2"/>
          <span className="text-amber-700 font-medium">
            You&apos;re nex in line! (Queue Position:{" "}{queuePosition.position})
          </span>
        </div>
        <div className="flex items-center">
            <Loader2 className="w-5 h-5 mr-2 animate-spin text-amber-500"/>
            <span className="text-amber-700 text-sm">Processing...</span>
        </div>
        </div>
        )
      }

      return(
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center">
            <Loader2 className="w-5 h-5 mr-2 animate-spin text-blue-600"/>
            <span className="text-blue-700">Queue Position</span>
          </div>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 roundd-full font-medium">
            {queuePosition.position}
          </span>
        </div>
      )

  }
  const renderTicketStatus = (() => {
    if(!user) return null;
    if (isEventOwner) {
      return (
        <div className="mt-4">
          <button
          onClick={(e)=>{
            e.stopPropagation();
            router.push(`seller/events/${eventId}/edit`)
          }}
          className="w-full bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 
          text-gray-700 dark:text-gray-200 px-6 py-3 rounded-xl
          font-medium hover:shadow-lg transition-all duration-300
          shadow-md flex items-center justify-center gap-2 group"
          >
            <PencilIcon className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300"/>
            Edit Event
          </button>
        </div>
      );
  }

  if(userTicket){
    return (
      <div className="mt-4 flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-200/50 dark:border-green-800/50 backdrop-blur-sm">
        <div className="flex items-center">
          <Check className="w-5 h-5 text-green-600 dark:text-green-400"/>
          <span className="text-green-700 dark:text-green-300 text-xs font-medium ml-2">
            You have a ticket for this event
          </span>
        </div>
        <button 
        onClick={()=>router.push(`/tickets/${userTicket?._id}`)}
        className="text-xs bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-1 group">
          View Ticket <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300"/>
        </button>
      </div>
    )
  }

  if(queuePosition){
    return (
      <div className="mt-4">
        {queuePosition.status === "offered" && (
          <PurchaseTicket eventId={eventId}/>
        )}
        {renderQueuePosition()}
        {queuePosition.status === "expired" && (
          <div className="p-3 bg-red-50 rounded-lg border border-red-100">
            <span className="text-red-700 font-medium flex items-center">
              <XCircle className="w-5 h-5 mr-2"/>
              Offer expired
            </span>
          </div>
        )}
      </div>
    )
  }

return null;
})
  return (
    <div
      className={`w-full max-w-sm bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm border border-gray-200/50 dark:border-slate-800/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-gray-300/50 dark:hover:border-slate-700/50 hover:-translate-y-1 group
      ${isPastEvent? " cursor-not-allowed opacity-75": "cursor-pointer"}`}
      onClick={() => router.push(`/events/${eventId}`)}
    >
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden">
      {imageUrl ? 
        <Image
          src={imageUrl}
          alt={event.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
        />
      :
      <Image
      src={altimage}
      alt="Event Placeholder"
      width={400}
      height={300}
      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
      />
    }
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"/>
    {/* Floating price badge on image */}
    <div className="absolute top-4 right-4">
      <span className="px-3 py-1.5 text-sm font-bold bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-gray-900 dark:text-white rounded-full shadow-lg">
        ${event.price}
      </span>
    </div>
    </div>

    {/* Event Details */}
    <div className={`p-6 ${imageUrl ? "relative" : ""}`}>
      <div className="flex justify-between items-start">
        {/* Event name and owner badge */}
        <div>
          <div className="flex flex-col justify-between items-start gap-3">
            {isEventOwner && (
              <span className="inline-flex justify-between items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 text-amber-800 dark:text-amber-300 rounded-full shadow-sm">
               <StarIcon size={14}/>
                Your Event
                </span>
                )}
            <h4 className="w-max text-2xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2 line-clamp-2">
              {event.name}
            </h4>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 line-clamp-2">{event.description}</p>
            {isPastEvent && (
              <span className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 text-red-800 dark:text-red-300 rounded-full shadow-sm">
                Past Event
              </span>
            )}
          </div>
        </div>
      </div>
        {/* Event availability */}
        <div className="flex flex-col gap-2 text-right items-end">
              {(availability?.purchasedCount ?? 0) >= (availability?.totalTickets ?? 0) &&
              (
                <span className="w-max px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 text-red-800 dark:text-red-300 rounded-full shadow-sm">Sold Out</span>
              )}
        </div>
        {/* Location of the event */}
        <div className="mt-6 space-y-3 flex flex-col justify-end">
              <div className="flex items-center text-gray-500 group/item hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
                <div className="p-2 bg-gray-100 dark:bg-slate-800 rounded-lg group-hover/item:bg-gray-200 dark:group-hover/item:bg-slate-700 transition-colors duration-200">
                  <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {event.location}
                </span>
              </div>
              {/* Date of the Event */}
              <div className="flex items-center text-gray-500 group/item hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
                <div className="p-2 bg-gray-100 dark:bg-slate-800 rounded-lg group-hover/item:bg-gray-200 dark:group-hover/item:bg-slate-700 transition-colors duration-200">
                  <CalendarDays className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                {new Date(event.eventDate).toLocaleDateString()}{" "}
                {isPastEvent && <span className="text-red-500">(Event Ended)</span>}
                </span>
              </div>
              {/* Ticket Details */}
              <div className="flex items-center text-gray-500 group/item hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
                <div className="p-2 bg-gray-100 dark:bg-slate-800 rounded-lg group-hover/item:bg-gray-200 dark:group-hover/item:bg-slate-700 transition-colors duration-200">
                  <Ticket className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <span className="font-bold text-gray-900 dark:text-white">{(availability?.totalTickets || 0) - (availability?.purchasedCount || 0)}</span>/{availability?.totalTickets} Available
                  {isPastEvent && ((availability?.activeOffers ?? 0) > 0) && (
                    <span className="text-amber-600 dark:text-amber-400 text-sm ml-2 font-semibold">
                      {availability?.activeOffers}{" "}
                      {availability?.activeOffers === 1 ? "buyer" : "buyers"} waiting
                    </span>
                  )}
                </span>
              </div>
              <div onClick={(e)=> e.stopPropagation()}>
                {!isPastEvent && renderTicketStatus()}
              </div>
        </div>
    </div>
  
  </div>
  );
};

export default EventCard;