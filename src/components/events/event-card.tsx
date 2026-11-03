
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  MapPin,
  UserRound,
  Tag,
  ArrowRight,
  CheckCircle2,
  ImageIcon,
} from "lucide-react";

import type { Event } from "@/types";

type EventStatus = "upcoming" | "active" | "completed";

interface EventCardProps {
  event: Event;
  status?: EventStatus;
  userJoined?: boolean;
  onJoin?: () => void;
  showJoinButton?: boolean;
}

export function EventCard({
  event,
  status = "upcoming",
  userJoined = false,
  onJoin,
  showJoinButton = true,
}: EventCardProps) {
  const date = event.dateTime ? new Date(event.dateTime) : null;

  const formattedDate =
    date && !Number.isNaN(date.getTime())
      ? date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "Date not available";

  const statusStyles: Record<EventStatus, string> = {
    upcoming:
      "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:ring-blue-900",
    active:
      "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-900",
    completed:
      "bg-zinc-100 text-zinc-600 ring-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700",
  };

  const statusLabels: Record<EventStatus, string> = {
    upcoming: "Upcoming",
    active: "Active",
    completed: "Completed",
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-900">
      {/* Event image */}
      <div className="relative h-56 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={event.title || "Event image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-400">
            <div className="text-center">
              <ImageIcon className="mx-auto size-10" />
              <p className="mt-2 text-sm">No image available</p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

        {/* Category */}
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/95 px-3 py-1.5 text-xs font-semibold text-emerald-900 shadow-sm backdrop-blur">
          <Tag className="size-3.5" />
          {event.category}
        </div>

        {/* Status */}
        <div
          className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${statusStyles[status]}`}
        >
          {statusLabels[status]}
        </div>

        {/* Date */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-black/65 px-3 py-2 text-xs font-medium text-white backdrop-blur-md">
          <CalendarDays className="size-4 text-emerald-300" />
          {formattedDate}
        </div>
      </div>

      {/* Event content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="line-clamp-1 text-xl font-bold tracking-tight text-zinc-900 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
          {event.title}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <MapPin className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span className="line-clamp-1">{event.location}</span>
        </div>

        <p className="mt-4 line-clamp-2 min-h-12 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
          {event.description}
        </p>

        {/* Organizer */}
        <div className="mt-auto border-t border-zinc-100 pt-4 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
              <UserRound className="size-4" />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                Organized by
              </p>
              <p className="truncate text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                {event.organizer?.name || "Unknown organizer"}
              </p>
            </div>
          </div>
        </div>

        {/* Join button */}
        {showJoinButton && status === "upcoming" && (
          <button
            type="button"
            onClick={onJoin}
            disabled={userJoined || !onJoin}
            className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
              userJoined
                ? "cursor-not-allowed border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300"
                : "border-emerald-700 text-emerald-800 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-emerald-600 dark:text-emerald-400 dark:hover:bg-emerald-950"
            }`}
          >
            {userJoined ? (
              <>
                <CheckCircle2 className="size-4" />
                Already Joined
              </>
            ) : (
              "Join Event"
            )}
          </button>
        )}

        {/* View event */}
        <Link
          href={`/events/${event.id}`}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600"
        >
          View Event
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
