
"use client";

import Link from "next/link";
import { useEvents } from "@/contexts/events-context";
import { useAuth } from "@/contexts/auth-context";
import { EventCard } from "@/components/events/event-card";
import {
  ArrowLeft,
  CalendarDays,
  Heart,
  Search,
  Sparkles,
  Users,
} from "lucide-react";

export default function JoinedEventsPage() {
  const { events, isLoading } = useEvents();
  const { user } = useAuth();

  const joinedEvents = events.filter((event) =>
    (event.attendeeIds ?? []).includes(user?.id ?? "")
  );

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <div className="size-9 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-700" />
          <p className="text-sm font-medium text-zinc-500">
            Loading your joined events...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8 dark:bg-zinc-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back navigation */}
        <Link
          href="/"
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-600 transition hover:border-emerald-300 hover:text-emerald-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:text-emerald-400"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>

        {/* Hero header */}
        <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-800 px-6 py-9 text-white shadow-lg sm:px-10 sm:py-12">
          <div className="absolute -right-12 -top-20 size-64 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute -bottom-24 right-1/3 size-56 rounded-full bg-emerald-400/10 blur-2xl" />

          <div className="relative z-10 flex flex-col justify-between gap-7 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-emerald-100">
                <Heart className="size-3.5" />
                Your community journey
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Joined Events
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-emerald-100/85 sm:text-base">
                Every small contribution creates a bigger impact. Explore
                the events you have joined and continue making a difference.
              </p>
            </div>

            <Link
              href="/events"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-900 shadow-md transition hover:-translate-y-0.5 hover:bg-emerald-50"
            >
              <Search className="size-4" />
              Explore Events
            </Link>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-9 grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
              <CalendarDays className="size-6" />
            </div>

            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Events Joined
              </p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                {joinedEvents.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex size-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400">
              <Users className="size-6" />
            </div>

            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Community Participation
              </p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                {joinedEvents.length}
              </p>
            </div>
          </div>
        </section>

        {/* Event section heading */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              Your Participations
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              All the community events you are part of.
            </p>
          </div>

          <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            {joinedEvents.length}{" "}
            {joinedEvents.length === 1 ? "Event" : "Events"}
          </span>
        </div>

        {/* Joined event cards */}
        {joinedEvents.length === 0 ? (
          <section className="rounded-3xl border border-dashed border-zinc-300 bg-white px-6 py-16 text-center dark:border-zinc-700 dark:bg-zinc-900">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
              <Heart className="size-8" />
            </div>

            <h3 className="mt-5 text-xl font-bold text-zinc-900 dark:text-white">
              No joined events yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              You have not joined any community events yet. Discover
              initiatives that matter to you and become part of something
              meaningful.
            </p>

            <Link
              href="/events"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              <Sparkles className="size-4" />
              Discover Events
            </Link>
          </section>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {joinedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                userJoined
                showJoinButton={false}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
