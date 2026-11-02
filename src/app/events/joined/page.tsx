"use client";

import { useEvents } from "@/contexts/events-context";
import { useAuth } from "@/contexts/auth-context";
import { EventCard } from "@/components/events/event-card";
import Link from "next/link";

export default function JoinedEventsPage() {
  const { events } = useEvents();
  const { user } = useAuth();

  const joinedEvents = events.filter((e) =>
  (e.attendeeIds ?? []).includes(user?.id ?? "")
);
  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Joined Events</h1>
        <p className="text-muted-foreground">
          Events you&rsquo;ve joined
        </p>
      </div>

      {joinedEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-muted-foreground">You haven&rsquo;t joined any events yet.</p>
          <Link href="/" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            Browse upcoming events
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {joinedEvents.map((event) => (
            <EventCard key={event.id} event={event} userJoined />
          ))}
        </div>
      )}
    </div>
  );
}
