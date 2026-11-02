
"use client";

import { useState } from "react";
import Link from "next/link";
import { useEvents } from "@/contexts/events-context";
import { useAuth } from "@/contexts/auth-context";
import { EventCard } from "@/components/events/event-card";
import type { Event } from "@/types";
import {
  ArrowLeft,
  Eye,
  Pencil,
  Trash2,
  X,
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
    return <div className="py-20 text-center">Loading events...</div>;
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold">Manage Events</h1>
          <p className="mt-2 text-muted-foreground">
            View, edit, and delete events you have created.
          </p>
          <p className="mt-3 text-sm font-medium text-primary">
            {myEvents.length} events created
          </p>
        </div>

        {message && (
          <p className="mb-6 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
            {message}
          </p>
        )}

        {myEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-muted-foreground">
              You haven't created any events yet.
            </p>

            <Link
              href="/events/create"
              className="mt-4 text-sm font-medium text-primary hover:underline"
            >
              Create your first event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {myEvents.map((event) => (
              <div
                key={event.id}
                className="flex flex-col overflow-hidden rounded-xl border bg-white"
              >
                <EventCard event={event} />

                <div className="mt-auto grid grid-cols-3 gap-2 border-t p-3">
                  <Link
                    href={`/events/${event.id}`}
                    className="flex items-center justify-center gap-1 rounded-lg bg-zinc-100 px-2 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-200"
                  >
                    <Eye className="size-4" />
                    View Details
                  </Link>

                  <button
                    onClick={() => handleEdit(event)}
                    className="flex items-center justify-center gap-1 rounded-lg bg-blue-50 px-2 py-2 text-xs font-medium text-blue-700 hover:bg-blue-100"
                  >
                    <Pencil className="size-4" />
                    Edit Details
                  </button>

                  <button
                    onClick={() => handleDelete(event)}
                    className="flex items-center justify-center gap-1 rounded-lg bg-red-50 px-2 py-2 text-xs font-medium text-red-600 hover:bg-red-100"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-auto w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Edit Event</h2>

              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="rounded-full p-2 hover:bg-zinc-100"
                aria-label="Close edit form"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Event Title
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Description
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Location
                  </label>
                  <input
                    required
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Category
                  </label>
                  <select
                    required
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Date and Time
                </label>
                <input
                  required
                  type="datetime-local"
                  value={form.dateTime}
                  onChange={(e) =>
                    setForm({ ...form, dateTime: e.target.value })
                  }
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Image URL
                </label>
                <input
                  required
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) =>
                    setForm({ ...form, imageUrl: e.target.value })
                  }
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="rounded-lg border px-5 py-2 text-sm font-medium hover:bg-zinc-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-lg bg-[#064e3b] px-5 py-2 text-sm font-medium text-white hover:bg-[#065f46] disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
