
"use client";

import { useState } from "react";
import Link from "next/link";
import { useEvents } from "@/contexts/events-context";
import { useAuth } from "@/contexts/auth-context";
import { EventCard } from "@/components/events/event-card";
import type { Event } from "@/types";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Eye,
  Pencil,
  Plus,
  Trash2,
  X,
  MapPin,
  Loader2,
  Sparkles,
} from "lucide-react";

const categories = [
  "Donation",
  "Cleanup",
  "Plantation",
  "Winter Relief",
  "Food Drive",
  "Health Camp",
  "Education",
];

function formatDateTime(value: string) {
  const date = new Date(value);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
}

export default function ManagePage() {
  const { events, isLoading, deleteEvent, updateEvent } = useEvents();
  const { user } = useAuth();

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    dateTime: "",
    category: "",
    imageUrl: "",
  });

  const myEvents = events.filter(
    (event) => event.organizerId === user?.id
  );

  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setMessage("");

    setForm({
      title: event.title,
      description: event.description,
      location: event.location,
      dateTime: formatDateTime(event.dateTime),
      category: event.category,
      imageUrl: event.imageUrl,
    });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedEvent) return;

    setIsSaving(true);
    setMessage("");

    try {
      await updateEvent(selectedEvent.id, {
        ...form,
        dateTime: new Date(form.dateTime).toISOString(),
      });

      setSelectedEvent(null);
      setMessage("Event updated successfully!");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Failed to update event."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (event: Event) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${event.title}"?`
    );

    if (!confirmed) return;

    try {
      await deleteEvent(event.id);
      setMessage("Event deleted successfully!");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Failed to delete event."
      );
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="size-9 animate-spin text-emerald-600" />
          <p className="text-sm font-medium text-zinc-500">
            Loading your events...
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

        {/* Page header */}
        <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-800 px-6 py-9 text-white shadow-lg sm:px-10 sm:py-12">
          <div className="absolute -right-12 -top-20 size-64 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute -bottom-24 right-1/3 size-56 rounded-full bg-emerald-400/10 blur-2xl" />

          <div className="relative z-10 flex flex-col justify-between gap-7 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-emerald-100">
                <Sparkles className="size-3.5" />
                Your community impact
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Manage Your Events
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-emerald-100/85 sm:text-base">
                Keep your community initiatives organized. View, update, and
                manage the events you have created.
              </p>
            </div>

            <Link
              href="/events/create"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-900 shadow-md transition hover:-translate-y-0.5 hover:bg-emerald-50"
            >
              <Plus className="size-4" />
              Create New Event
            </Link>
          </div>
        </section>

        {/* Summary cards */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
              <CalendarDays className="size-6" />
            </div>
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Events Created
              </p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                {myEvents.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex size-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
              <MapPin className="size-6" />
            </div>
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Community Initiatives
              </p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                {myEvents.length}
              </p>
            </div>
          </div>
        </section>

        {/* Feedback message */}
        {message && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
            <CheckCircle2 className="size-5 shrink-0" />
            {message}
            <button
              onClick={() => setMessage("")}
              className="ml-auto rounded-md p-1 hover:bg-emerald-100 dark:hover:bg-emerald-900"
              aria-label="Dismiss message"
            >
              <X className="size-4" />
            </button>
          </div>
        )}

        {/* Events section heading */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              Your Events
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Manage all the events you have organized.
            </p>
          </div>

          <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            {myEvents.length} {myEvents.length === 1 ? "Event" : "Events"}
          </span>
        </div>

        {/* Events list */}
        {myEvents.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-300 bg-white px-6 py-16 text-center dark:border-zinc-700 dark:bg-zinc-900">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
              <CalendarDays className="size-8" />
            </div>

            <h3 className="mt-5 text-xl font-bold text-zinc-900 dark:text-white">
              No events created yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Start making a difference in your community by organizing your
              first event.
            </p>

            <Link
              href="/events/create"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              <Plus className="size-4" />
              Create Your First Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {myEvents.map((event) => (
              <div
                key={event.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
              >
                <EventCard event={event} showJoinButton={false} />

                <div className="mt-auto grid grid-cols-3 gap-2 border-t border-zinc-100 p-3 dark:border-zinc-800">
                  <Link
                    href={`/events/${event.id}`}
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-zinc-100 px-2 py-2.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                  >
                    <Eye className="size-4" />
                    View
                  </Link>

                  <button
                    onClick={() => handleEdit(event)}
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-blue-50 px-2 py-2.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 dark:bg-blue-950/50 dark:text-blue-300 dark:hover:bg-blue-900"
                  >
                    <Pencil className="size-4" />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(event)}
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-red-50 px-2 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 dark:bg-red-950/50 dark:text-red-300 dark:hover:bg-red-900"
                  >
                    <Trash2 className="size-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Event Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedEvent(null);
          }}
        >
          <div className="my-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
            {/* Modal header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-emerald-950 to-emerald-800 px-6 py-5 text-white sm:px-8">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-200">
                  Event management
                </p>
                <h2 className="mt-1 text-2xl font-bold">Edit Event</h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
                aria-label="Close edit form"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-5 p-6 sm:p-8">
              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                  Event Title
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  placeholder="Enter your event title"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                  Description
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Describe your event and its purpose..."
                  className="w-full resize-y rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                    Location
                  </label>
                  <input
                    required
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    placeholder="Event location"
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                    Category
                  </label>
                  <select
                    required
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  >
                    {!categories.includes(form.category) && (
                      <option value={form.category}>{form.category}</option>
                    )}
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                  Date and Time
                </label>
                <input
                  required
                  type="datetime-local"
                  value={form.dateTime}
                  onChange={(e) =>
                    setForm({ ...form, dateTime: e.target.value })
                  }
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                  Image URL
                </label>
                <input
                  required
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) =>
                    setForm({ ...form, imageUrl: e.target.value })
                  }
                  placeholder="https://example.com/event-image.jpg"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              {/* Modal actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-zinc-100 pt-5 dark:border-zinc-800 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="rounded-xl border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="size-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
