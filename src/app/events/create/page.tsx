
"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useEvents } from "@/contexts/events-context";
import { EventForm } from "@/components/events/event-form";
import type { EventFormValues } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Sparkles,
  CalendarDays,
  HeartHandshake,
} from "lucide-react";

export default function CreateEventPage() {
  const { user, isLoading } = useAuth();
  const { createEvent } = useEvents();
  const router = useRouter();

  // Wait for the backend session check before redirecting.
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  const handleSave = async (values: EventFormValues) => {
    if (!user) {
      router.replace("/login");
      return;
    }

    try {
      await createEvent({
        ...values,
        organizerId: user.id,
      });

      router.push("/events");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to create event"
      );
    }
  };

  // Show loading while checking authentication.
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 size-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
          <p className="text-sm font-medium">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  // Avoid rendering the form for logged-out users.
  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/events/manage"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-emerald-600 hover:no-underline dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <ArrowLeft className="size-4" />
          Back to Manage Events
        </Link>

        <div className="mb-8 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
            <Sparkles className="size-4" />
            Social Service Drive
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 transition-colors dark:text-white sm:text-4xl lg:text-5xl">
            Create a Community Event
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
            Organize a local relief effort, environmental cleanup, or
            community support drive. Bring people together and make
            a positive difference.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-none">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <HeartHandshake className="size-5" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Make an Impact
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Bring your community together.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-none">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
              <CalendarDays className="size-5" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Plan Your Event
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Set a date, location, and event details.
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
          <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800 sm:px-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Event Information
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Provide the necessary information to publish your event.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <EventForm onSave={handleSave} />
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-500">
          Every small action can create a meaningful change in our community.
        </p>
      </div>
    </main>
  );
}
