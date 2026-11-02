"use client";

import { useState } from "react";
import Link from "next/link";
import { EventCard } from "@/components/events/event-card";
import { useEvents } from "@/contexts/events-context";
import { useAuth } from "@/contexts/auth-context";
import { ArrowLeft } from "lucide-react";

const categories = [
  "All",
  "Donation",
  "Cleanup",
  "Plantation",
  "Winter Relief",
  "Food Drive",
  "Health Camp",
  "Education",
];

type EventStatus = "upcoming" | "active" | "completed";

const MAX_EVENTS = 6;

export default function AllEventsPage() {
  const { events, isLoading, joinEvent } = useEvents();
  const { user } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter(
          (event) =>
            event.category.toLowerCase() ===
            selectedCategory.toLowerCase()
        );

  const now = Date.now();

  const getEventStatus = (
    dateTime: string,
    endDateTime: string
  ): EventStatus => {
    const start = new Date(dateTime).getTime();
    const end = new Date(endDateTime).getTime();

    if (now < start) return "upcoming";
    if (now <= end) return "active";
    return "completed";
  };

  const upcomingEvents = filteredEvents
    .filter(
      (event) =>
        getEventStatus(event.dateTime, event.endDateTime) === "upcoming"
    )
    .sort(
      (a, b) =>
        new Date(a.dateTime).getTime() -
        new Date(b.dateTime).getTime()
    );

  const activeEvents = filteredEvents
    .filter(
      (event) =>
        getEventStatus(event.dateTime, event.endDateTime) === "active"
    )
    .sort(
      (a, b) =>
        new Date(a.dateTime).getTime() -
        new Date(b.dateTime).getTime()
    );

  const completedEvents = filteredEvents
    .filter(
      (event) =>
        getEventStatus(event.dateTime, event.endDateTime) === "completed"
    )
    .sort(
      (a, b) =>
        new Date(b.dateTime).getTime() -
        new Date(a.dateTime).getTime()
    );

  const handleJoin = async (eventId: string) => {
    try {
      await joinEvent(eventId);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to join event"
      );
    }
  };

  if (isLoading) {
    return (
      <div className="bg-background py-20 text-center text-foreground">
        Loading events...
      </div>
    );
  }

  const renderSection = (
    title: string,
    description: string,
    sectionEvents: typeof events,
    status: EventStatus
  ) => {
    const displayedEvents = sectionEvents.slice(0, MAX_EVENTS);

    return (
      <section className="mb-14">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#064e3b] dark:text-emerald-400">
            {title}
            <span className="ml-3 text-base font-medium text-muted-foreground">
              ({sectionEvents.length})
            </span>
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        {sectionEvents.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border bg-card py-10 text-center text-muted-foreground">
            No {title.toLowerCase()} events found.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayedEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  status={status}
                  userJoined={
                    user?.id
                      ? event.attendeeIds.includes(user.id)
                      : false
                  }
                  onJoin={() => handleJoin(event.id)}
                />
              ))}
            </div>

            {sectionEvents.length > MAX_EVENTS && (
              <p className="mt-5 text-center text-sm text-muted-foreground">
                Showing {MAX_EVENTS} of {sectionEvents.length} events.
              </p>
            )}
          </>
        )}
      </section>
    );
  };

  return (
    <main className="min-h-screen bg-background py-16 text-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>

        <div className="mb-10">
          <h1 className="mb-2 text-3xl font-bold text-[#064e3b] dark:text-emerald-400">
            All Community Events
          </h1>

          <p className="text-muted-foreground">
            Explore and participate in community service events.
          </p>

          <p className="mt-3 text-sm font-medium text-primary">
            {filteredEvents.length} events available
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "border-[#064e3b] bg-[#064e3b] text-white dark:border-emerald-500 dark:bg-emerald-600 dark:text-white"
                  : "border-border bg-card text-muted-foreground hover:border-[#064e3b] hover:text-[#064e3b] dark:hover:border-emerald-500 dark:hover:text-emerald-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredEvents.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">
            No events found in this category.
          </p>
        ) : (
          <>
            {renderSection(
              "Upcoming Events",
              "Events that haven't started yet. You can join these events.",
              upcomingEvents,
              "upcoming"
            )}

            {renderSection(
              "Active Events",
              "Events that are currently in progress.",
              activeEvents,
              "active"
            )}

            {renderSection(
              "Completed Events",
              "Events that have already ended.",
              completedEvents,
              "completed"
            )}
          </>
        )}
      </div>
    </main>
  );
}