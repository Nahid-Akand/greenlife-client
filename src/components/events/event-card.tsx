"use client";

import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  UserRound,
  Tag,
  ArrowRight,
} from "lucide-react";
import type { Event } from "@/types";

type EventStatus = "upcoming" | "active" | "completed";

interface EventCardProps {
  event: Event;
  status: EventStatus;
  userJoined?: boolean;
  onJoin?: () => void;
}

export function EventCard({
  event,
  status,
  userJoined = false,
  onJoin,
}: EventCardProps) {
  const formattedDate = new Date(event.dateTime).toLocaleDateString(
    "en-US",
    {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  const statusStyles = {
    upcoming: "bg-blue-100 text-blue-700",
    active: "bg-green-100 text-green-700",
    completed: "bg-gray-200 text-gray-700",
  };

  const statusLabels = {
    upcoming: "Upcoming",
    active: "Active",
    completed: "Completed",
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted">
            <span className="text-muted-foreground">
              No image available
            </span>
          </div>
        )}

        {/* Category */}
        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 text-sm font-semibold backdrop-blur">
          <Tag className="size-4 text-primary" />
          <span>{event.category}</span>
        </div>

        {/* Status */}
        <div
          className={`absolute right-5 top-5 rounded-full px-4 py-2 text-sm font-semibold ${statusStyles[status]}`}
        >
          {statusLabels[status]}
        </div>

        {/* Date */}
        <div className="absolute bottom-4 left-5 flex items-center gap-2 rounded-xl bg-black/80 px-4 py-2 text-sm font-medium text-white backdrop-blur">
          <CalendarDays className="size-4 text-primary" />
          {formattedDate}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="line-clamp-1 text-2xl font-bold">
          {event.title}
        </h3>

        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="size-5 shrink-0 text-primary" />
          <span className="line-clamp-1">{event.location}</span>
        </div>

        <p className="line-clamp-2 min-h-12 text-sm leading-6 text-muted-foreground">
          {event.description}
        </p>

        {/* Organizer */}
        <div className="mt-auto border-t border-border pt-5">
          <div className="flex items-center gap-2 text-sm">
            <UserRound className="size-5 shrink-0 text-primary" />
            <span className="font-medium">
              {event.organizer?.name || "Unknown organizer"}
            </span>
          </div>

          {event.organizer?.email && (
            <p className="mt-2 break-all pl-7 text-xs text-muted-foreground">
              {event.organizer.email}
            </p>
          )}
        </div>

        {/* Join button: Upcoming events only */}
        {status === "upcoming" && (
          <button
            type="button"
            onClick={onJoin}
            disabled={userJoined || !onJoin}
            className="mt-2 w-full rounded-xl border border-primary px-5 py-3 font-semibold text-primary transition-colors hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {userJoined ? "Already Joined" : "Join Event"}
          </button>
        )}

        {/* View Event */}
        <Link
          href={`/events/${event.id}`}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-5 py-4 font-semibold text-primary-foreground transition-colors hover:opacity-90"
        >
          View Event
          <ArrowRight className="size-5" />
        </Link>
      </div>
    </article>
  );
}