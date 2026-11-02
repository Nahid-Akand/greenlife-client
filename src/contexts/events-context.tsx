"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Event } from "@/types";
import { useAuth } from "@/contexts/auth-context";

type NewEventValues = Omit<
  Event,
  "id" | "attendeeIds" | "createdAt" | "organizerId"
> & {
  organizerId: string;
};

type EventsContextType = {
  events: Event[];
  createEvent: (values: NewEventValues) => Promise<void>;
  joinEvent: (eventId: string) => Promise<void>;
  leaveEvent: (eventId: string) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  updateEvent: (id: string, values: Partial<Event>) => Promise<void>;
  getEventById: (id: string) => Event | undefined;
  isLoading: boolean;
  loadEvents: () => Promise<void>;
};

const EventsContext = createContext<EventsContextType | undefined>(
  undefined
);

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export function EventsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Normalize event data received from the backend
  const normalizeEvent = (event: Event): Event => ({
    ...event,
    attendeeIds: event.attendeeIds ?? [],
    volunteers: event.volunteers ?? [],
    guidelines: event.guidelines ?? [],
  });

  // Load events from MongoDB through the backend
  const loadEvents = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/events`, {
        credentials: "include",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load events");
      }

      const data = await response.json();

      setEvents((data.events || []).map(normalizeEvent));
    } catch (error) {
      console.error("Loading events failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  // Create event
  const createEvent = useCallback(
    async (values: NewEventValues) => {
      const response = await fetch(`${API_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create event");
      }

      await loadEvents();
    },
    [loadEvents]
  );

  // Join event
  const joinEvent = useCallback(
    async (eventId: string) => {
      if (!user?.id) {
        throw new Error("Please login first");
      }

      const response = await fetch(
        `${API_URL}/events/${eventId}/join`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to join event");
      }

      await loadEvents();
    },
    [user?.id, loadEvents]
  );

  // Leave event
  const leaveEvent = useCallback(
    async (eventId: string) => {
      if (!user?.id) {
        throw new Error("Please login first");
      }

      const response = await fetch(
        `${API_URL}/events/${eventId}/join`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to leave event");
      }

      await loadEvents();
    },
    [user?.id, loadEvents]
  );

  // Delete event from MongoDB
  const deleteEvent = useCallback(
    async (eventId: string) => {
      const response = await fetch(
        `${API_URL}/events/${eventId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete event");
      }

      await loadEvents();
    },
    [loadEvents]
  );

  // Update event in MongoDB
  const updateEvent = useCallback(
    async (id: string, values: Partial<Event>) => {
      const response = await fetch(`${API_URL}/events/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update event");
      }

      await loadEvents();
    },
    [loadEvents]
  );

  // Get a single event from the currently loaded events
  const getEventById = useCallback(
    (id: string) => {
      return events.find((event) => event.id === id);
    },
    [events]
  );

  const value: EventsContextType = {
    events,
    createEvent,
    joinEvent,
    leaveEvent,
    deleteEvent,
    updateEvent,
    getEventById,
    isLoading,
    loadEvents,
  };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);

  if (!context) {
    throw new Error(
      "useEvents must be used within an EventsProvider"
    );
  }

  return context;
}