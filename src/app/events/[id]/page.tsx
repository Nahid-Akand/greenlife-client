
"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { useEvents } from "@/contexts/events-context";
import { useAuth } from "@/contexts/auth-context";

import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Users,
  Tag,
  UserRound,
  CheckCircle2,
  LogIn,
  Loader2,
  Heart,
  Share2,
  Clock,
} from "lucide-react";

import type { Event } from "@/types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

function DetailContent({
  event,
  user,
}: {
  event: Event;
  user: { id: string } | null;
}) {
  const { joinEvent, leaveEvent } = useEvents();

  const [attendeeIds, setAttendeeIds] = useState<string[]>(
    () => event.attendeeIds ?? []
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const isJoined = !!user && attendeeIds.includes(user.id);

  const date = event.dateTime ? new Date(event.dateTime) : null;
  const validDate = date && !Number.isNaN(date.getTime());

  const formattedDate = validDate
    ? date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date not available";

  const formattedTime = validDate
    ? date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Time not available";

  const handleToggle = async () => {
    if (!user || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError("");

      if (isJoined) {
        await leaveEvent(event.id);
        setAttendeeIds((prev) =>
          prev.filter((id) => id !== user.id)
        );
      } else {
        await joinEvent(event.id);
        setAttendeeIds((prev) =>
          prev.includes(user.id) ? prev : [...prev, user.id]
        );
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Unable to copy the event link.");
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8 dark:bg-zinc-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Navigation */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-600 transition hover:border-emerald-300 hover:text-emerald-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:text-emerald-400"
          >
            <ArrowLeft className="size-4" />
            Back to Events
          </Link>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <Share2 className="size-4" />
            {copied ? "Link Copied!" : "Share Event"}
          </button>
        </div>

        {/* Hero image */}
        <section className="relative mb-8 h-[280px] overflow-hidden rounded-3xl bg-zinc-200 shadow-lg sm:h-[400px] lg:h-[460px] dark:bg-zinc-800">
          <Image
            src={event.imageUrl || "/placeholder-event.png"}
            alt={event.title || "Event image"}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

          <div className="absolute left-5 top-5 flex flex-wrap gap-2 sm:left-8 sm:top-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/95 px-4 py-2 text-xs font-bold text-emerald-900 shadow-lg">
              <Tag className="size-4" />
              {event.category}
            </span>

            <span className="rounded-full border border-white/20 bg-black/50 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
              Community Event
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
            <div className="max-w-3xl">
              <p className="mb-3 flex items-center gap-2 text-sm font-medium text-emerald-200">
                <Heart className="size-4" />
                Make a difference together
              </p>

              <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                {event.title}
              </h1>

              <p className="mt-3 flex items-center gap-2 text-sm text-white/85 sm:text-base">
                <MapPin className="size-5 shrink-0 text-emerald-300" />
                {event.location}
              </p>
            </div>
          </div>
        </section>

        {/* Main content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left content */}
          <div className="space-y-7 lg:col-span-2">
            {/* About */}
            <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  <Heart className="size-5" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                    About This Event
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Learn more about this initiative
                  </p>
                </div>
              </div>

              <p className="whitespace-pre-line text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                {event.description}
              </p>
            </section>

            {/* Event information */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-white">
                Event Information
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    <CalendarDays className="size-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                      Event Date
                    </p>
                    <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-white">
                      {formattedDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                    <Clock className="size-5" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                      Starting Time
                    </p>
                    <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-white">
                      {formattedTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                    <Users className="size-5" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                      Participants
                    </p>
                    <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-white">
                      {attendeeIds.length} people joined
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
                    <MapPin className="size-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                      Location
                    </p>
                    <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-white">
                      {event.location}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Organizer */}
            <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="mb-4 text-lg font-bold text-zinc-900 dark:text-white">
                Event Organizer
              </h2>

              <div className="flex items-center gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  <UserRound className="size-7" />
                </div>

                <div className="min-w-0">
                  <p className="font-semibold text-zinc-900 dark:text-white">
                    {event.organizer?.name || "Community Organizer"}
                  </p>

                  {event.organizer?.email && (
                    <p className="mt-1 break-all text-sm text-zinc-500 dark:text-zinc-400">
                      {event.organizer.email}
                    </p>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Right sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              {/* Join card */}
              <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <div className="bg-gradient-to-br from-emerald-950 to-emerald-800 p-6 text-white">
                  <p className="text-sm font-medium text-emerald-200">
                    Be part of the change
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    Join This Event
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-emerald-100/80">
                    Your participation can make a meaningful difference in
                    the community.
                  </p>
                </div>

                <div className="p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      Participants joined
                    </span>

                    <span className="text-xl font-bold text-zinc-900 dark:text-white">
                      {attendeeIds.length}
                    </span>
                  </div>

                  {user ? (
                    <button
                      type="button"
                      onClick={handleToggle}
                      disabled={isSubmitting}
                      className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                        isJoined
                          ? "border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-emerald-700 text-white hover:bg-emerald-800"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Please wait...
                        </>
                      ) : isJoined ? (
                        <>
                          <CheckCircle2 className="size-4" />
                          Leave Event
                        </>
                      ) : (
                        <>
                          <Heart className="size-4" />
                          Join Event
                        </>
                      )}
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
                    >
                      <LogIn className="size-4" />
                      Sign In to Join
                    </Link>
                  )}

                  {error && (
                    <p className="mt-4 rounded-lg bg-red-50 p-3 text-center text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
                      {error}
                    </p>
                  )}

                  {isJoined && (
                    <p className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="size-4" />
                      You are participating in this event.
                    </p>
                  )}

                  {!user && (
                    <p className="mt-4 text-center text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                      Sign in to become a participant in this event.
                    </p>
                  )}
                </div>
              </section>

              {/* Location card */}
              <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                    <MapPin className="size-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                      Event Location
                    </p>
                    <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-white">
                      {event.location}
                    </p>
                  </div>
                </div>
              </section>

              <Link
                href="/events"
                className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                <ArrowLeft className="size-4" />
                Explore More Events
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function EventDetailContent() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { events, isLoading } = useEvents();
  const { user } = useAuth();

  const [event, setEvent] = useState<Event | null>(null);
  const [loadingEvent, setLoadingEvent] = useState(true);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    async function fetchEvent() {
      try {
        setLoadingEvent(true);

        const existingEvent = events.find(
          (item) => item.id === id
        );

        if (existingEvent) {
          if (!cancelled) setEvent(existingEvent);
          return;
        }

        const response = await fetch(
          `${API_URL}/events/${encodeURIComponent(id)}`,
          { credentials: "include" }
        );

        if (!response.ok) {
          throw new Error("Event not found");
        }

        const data = await response.json();

        if (!data.event) {
          throw new Error("Event not found");
        }

        const backendEvent = data.event;

        if (!cancelled) {
          setEvent({
            ...backendEvent,
            id: backendEvent.id || backendEvent._id,
            attendeeIds:
              backendEvent.attendeeIds ??
              backendEvent.participants ??
              [],
          });
        }
      } catch (error) {
        console.error("Failed to load event:", error);
        if (!cancelled) setEvent(null);
      } finally {
        if (!cancelled) setLoadingEvent(false);
      }
    }

    fetchEvent();

    return () => {
      cancelled = true;
    };
  }, [id, events]);

  if (isLoading || loadingEvent) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="size-9 animate-spin text-emerald-600" />
          <p className="text-sm font-medium text-zinc-500">
            Loading event details...
          </p>
        </div>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 text-center dark:bg-zinc-950">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
          <CalendarDays className="size-8" />
        </div>

        <h2 className="mt-5 text-2xl font-bold text-zinc-900 dark:text-white">
          Event not found
        </h2>

        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          This event may have been removed or is no longer available.
        </p>

        <Link
          href="/events"
          className="mt-6 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          Back to All Events
        </Link>
      </main>
    );
  }

  return (
    <DetailContent
      key={event.id}
      event={event}
      user={user}
    />
  );
}

export default function EventDetailPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
          <Loader2 className="size-9 animate-spin text-emerald-600" />
        </main>
      }
    >
      <EventDetailContent />
    </Suspense>
  );
}
