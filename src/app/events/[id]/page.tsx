
"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEvents } from "@/contexts/events-context";
import { useAuth } from "@/contexts/auth-context";
import { Calendar, MapPin, Users, Tag } from "lucide-react";
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
    event.attendeeIds ?? []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isJoined = !!user && attendeeIds.includes(user.id);

  useEffect(() => {
    setAttendeeIds(event.attendeeIds ?? []);
  }, [event.attendeeIds]);

  const handleToggle = async () => {
    if (!user) return;

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

  return (
    <div className="min-h-screen bg-zinc-50 py-8 px-4 sm:px-6 lg:px-8">
      <Link
        href="/events"
        className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-muted-foreground hover:text-primary hover:no-underline"
      >
        <span className="size-4">←</span> Back to events
      </Link>

      <div className="max-w-3xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Event Image */}
        <div className="relative h-64 rounded-xl overflow-hidden border border-border bg-card">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-background/90 backdrop-blur text-xs font-medium">
            <Tag className="size-3" />
            {event.category}
          </div>
        </div>

        {/* Event Information */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{event.title}</h1>

            <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1.5">
              <MapPin className="size-4" />
              {event.location}
            </p>
          </div>

          {/* Date and Attendees */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
              <Calendar className="size-5 text-muted-foreground" />

              <div>
                <p className="text-sm font-medium">
                  {new Date(event.dateTime).toLocaleDateString(
                    undefined,
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>

                <p className="text-sm text-muted-foreground">
                  {new Date(event.dateTime).toLocaleTimeString(
                    undefined,
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
              <Users className="size-5 text-muted-foreground" />

              <div>
                <p className="text-sm font-medium">
                  {attendeeIds.length} joined
                </p>

                <p className="text-sm text-muted-foreground">
                  {event.category}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 rounded-lg bg-card border border-border">
            <h3 className="text-sm font-semibold mb-2">
              Description
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Join / Leave Button */}
          <Button
            onClick={handleToggle}
            className="w-full"
            disabled={!user || isSubmitting}
          >
            {isSubmitting
              ? "Please wait..."
              : isJoined
                ? "Leave Event"
                : "Join Event"}
          </Button>

          {error && (
            <p className="text-sm text-center text-red-500">
              {error}
            </p>
          )}

          {!user && (
            <p className="text-sm text-center text-muted-foreground">
              <Link
                href="/login"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>{" "}
              to join this event.
            </p>
          )}
        </div>
      </div>
    </div>
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
    let cancelled = false;

    async function fetchEvent() {
      try {
        setLoadingEvent(true);

        const existingEvent = events.find((item) => item.id === id);

        if (existingEvent) {
          if (!cancelled) setEvent(existingEvent);
          return;
        }

        const response = await fetch(`${API_URL}/events/${id}`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Event not found");
        }

        const data = await response.json();

        if (!cancelled) {
          setEvent({
            ...data.event,
            attendeeIds: data.event.attendeeIds ?? [],
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
      <div className="flex min-h-screen items-center justify-center">
        Loading event...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Event not found</h2>
        <Link href="/events" className="text-primary hover:underline">
          Back to all events
        </Link>
      </div>
    );
  }

  return <DetailContent event={event} user={user} />;
}

export default function EventDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading event...
        </div>
      }
    >
      <EventDetailContent />
    </Suspense>
  );
}
