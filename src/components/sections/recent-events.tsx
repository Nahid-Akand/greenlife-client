"use client";

import Link from "next/link";
import { EventCard } from "@/components/events/event-card";
import { useEvents } from "@/contexts/events-context";

export function RecentEventsSection() {
  const { events } = useEvents();

  // Sort upcoming events by dateTime ascending and limit to 6.
  // With a MongoDB backend this would be:
  //   db.events.find({ dateTime: { $gte: now } }).sort({ dateTime: 1 }).limit(6)
  const upcoming = events
    .slice()
    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
    .slice(0, 6);

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-[#064e3b] mb-2">
              Recent Upcoming Events
            </h2>
            <p className="text-muted-foreground">
              Community service events happening near you
            </p>
          </div>
          <Link
            href="/events"
            className="text-sm font-medium text-[#064e3b] hover:underline"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
