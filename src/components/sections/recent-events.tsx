
"use client";

import Link from "next/link";
import { EventCard } from "@/components/events/event-card";
import { useEvents } from "@/contexts/events-context";
import { useAuth } from "@/contexts/auth-context";

export function RecentEventsSection() {
  const { events, joinEvent } = useEvents();
  const { user } = useAuth();

  const upcoming = events
    .filter((event) => new Date(event.dateTime).getTime() > Date.now())
    .sort(
      (a, b) =>
        new Date(a.dateTime).getTime() -
        new Date(b.dateTime).getTime()
    )
    .slice(0, 6);

  const handleJoin = async (eventId: string) => {
    if (!user?.id) {
      alert("Please log in to join this event.");
      return;
    }

    try {
      await joinEvent(eventId);
      alert("Successfully joined the event!");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to join event."
      );
    }
  };

  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold text-[#064e3b] dark:text-emerald-400">
              Recent Upcoming Events
            </h2>
            <p className="text-muted-foreground">
              Community service events happening near you
            </p>
          </div>

          <Link
            href="/events"
            className="text-sm font-medium text-[#064e3b] hover:underline dark:text-emerald-400"
          >
            View all events →
          </Link>
        </div>

        {upcoming.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-muted-foreground">
              No upcoming events scheduled yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => {
              const userJoined = Boolean(
                user?.id &&
                (event.attendeeIds ?? []).includes(user.id)
              );

              return (
                <EventCard
                  key={event.id}
                  event={event}
                  status="upcoming"
                  userJoined={userJoined}
                  onJoin={() => handleJoin(event.id)}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
