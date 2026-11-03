
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { EventCard } from "@/components/events/event-card";
import { useEvents } from "@/contexts/events-context";
import { useAuth } from "@/contexts/auth-context";
import {
  ArrowLeft,
  Search,
  X,
  CalendarDays,
  SlidersHorizontal,
} from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNow(Date.now());
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Search by event title only + category filter
  const filteredEvents = events.filter((event) => {
    const matchesSearch = (event.title ?? "")
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      event.category?.toLowerCase() ===
        selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const getEventStatus = (
    dateTime: string,
    endDateTime: string
  ): EventStatus => {
    if (now === null) return "upcoming";

    const start = new Date(dateTime).getTime();
    const end = new Date(endDateTime).getTime();

    if (now < start) return "upcoming";
    if (now <= end) return "active";

    return "completed";
  };

  const upcomingEvents = filteredEvents
    .filter(
      (event) =>
        getEventStatus(event.dateTime, event.endDateTime) ===
        "upcoming"
    )
    .sort(
      (a, b) =>
        new Date(a.dateTime).getTime() -
        new Date(b.dateTime).getTime()
    );

  const activeEvents = filteredEvents
    .filter(
      (event) =>
        getEventStatus(event.dateTime, event.endDateTime) ===
        "active"
    )
    .sort(
      (a, b) =>
        new Date(a.dateTime).getTime() -
        new Date(b.dateTime).getTime()
    );

  const completedEvents = filteredEvents
    .filter(
      (event) =>
        getEventStatus(event.dateTime, event.endDateTime) ===
        "completed"
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

  if (isLoading || now === null) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="mx-auto mb-4 size-9 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
          <p className="text-sm font-medium text-muted-foreground">
            Loading community events...
          </p>
        </div>
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
          <div className="rounded-2xl border border-dashed border-border bg-card px-4 py-12 text-center">
            <CalendarDays className="mx-auto mb-3 size-8 text-muted-foreground/60" />
            <p className="font-medium text-foreground">
              No {title.toLowerCase()} events found.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try another event name or category.
            </p>
          </div>
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
                      ? event.attendeeIds?.includes(user.id) ?? false
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
    <main className="min-h-screen bg-background py-10 text-foreground sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Back Navigation */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>

        {/* Page Heading */}
        <div className="mb-9">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
            <CalendarDays className="size-4" />
            Community Activities
          </div>

          <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-[#064e3b] dark:text-emerald-400 sm:text-4xl">
            All Community Events
          </h1>

          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Discover meaningful community activities, connect with
            volunteers, and participate in making a positive impact.
          </p>

          <p className="mt-4 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            {filteredEvents.length} of {events.length} events available
          </p>
        </div>

        {/* Search and Category Filters */}
        <div className="mb-10 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-2">
            <SlidersHorizontal className="size-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="font-semibold text-foreground">
              Find Your Event
            </h2>
          </div>

          {/* Search by Event Name */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events by name..."
              aria-label="Search events by name"
              className="h-13 w-full rounded-xl border border-border bg-background pl-12 pr-12 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Filter by category
            </p>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "border-emerald-700 bg-emerald-700 text-white shadow-sm dark:border-emerald-600 dark:bg-emerald-600"
                      : "border-border bg-background text-muted-foreground hover:border-emerald-600 hover:text-emerald-700 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Event Results */}
        {filteredEvents.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card px-5 py-16 text-center">
            <Search className="mx-auto mb-4 size-10 text-muted-foreground/50" />

            <h2 className="text-xl font-bold text-foreground">
              No events found
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
            Don&apos;t have any events? Try a different event name.
              Try a different keyword or category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-6 rounded-full bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
            >
              Clear All Filters
            </button>
          </div>
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
