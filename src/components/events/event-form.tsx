
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import type { EventFormValues, Event } from "@/types";
import {
  CalendarDays,
  MapPin,
  Image as ImageIcon,
  Type,
  AlignLeft,
  Sparkles,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

const eventTypes = [
  "Donation",
  "Cleanup",
  "Plantation",
  "Winter Relief",
  "Food Drive",
  "Health Camp",
  "Education",
];

export function EventForm({
  event,
  onSave,
}: {
  event?: Event;
  onSave: (values: EventFormValues) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isCustomCategory =
    !!event?.category && !eventTypes.includes(event.category);

  const [isCustom, setIsCustom] = useState(isCustomCategory);

  const [values, setValues] = useState<EventFormValues>({
    title: event?.title ?? "",
    description: event?.description ?? "",
    location: event?.location ?? "",
    dateTime: event?.dateTime ?? "",
    endDateTime: event?.endDateTime ?? "",
    category: event?.category ?? "",
    imageUrl: event?.imageUrl ?? "",
  });

  const updateValue = (key: keyof EventFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));

    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }

    // Clear end-time error when either date changes.
    if (key === "dateTime" || key === "endDateTime") {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.endDateTime;
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};

    if (!values.title.trim()) {
      next.title = "Event title is required";
    }

    if (!values.description.trim()) {
      next.description = "Description is required";
    }

    if (!values.location.trim()) {
      next.location = "Location is required";
    }

    if (!values.dateTime) {
      next.dateTime = "Event start date is required";
    } else if (
      new Date(values.dateTime).getTime() < Date.now() - 60000
    ) {
      next.dateTime = "Please select today or a future date";
    }

    if (!values.endDateTime) {
      next.endDateTime = "Event end date and time are required";
    } else if (
      values.dateTime &&
      new Date(values.endDateTime).getTime() <=
        new Date(values.dateTime).getTime()
    ) {
      next.endDateTime = "End time must be after the start time";
    }

    if (!values.category.trim()) {
      next.category = "Please select an event type";
    }

    if (!values.imageUrl.trim()) {
      next.imageUrl = "Image URL is required";
    } else {
      try {
        const url = new URL(values.imageUrl);

        if (!["http:", "https:"].includes(url.protocol)) {
          next.imageUrl = "Please enter a valid image URL";
        }
      } catch {
        next.imageUrl = "Please enter a valid image URL";
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    onSave(values);
  };

  const inputClass =
    "h-12 w-full rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950/70 dark:text-white dark:placeholder:text-slate-500";

  const labelClass =
    "text-sm font-semibold text-slate-800 dark:text-slate-200";

  const errorClass = "text-xs font-medium text-red-600 dark:text-rose-400";

  const iconClass =
    "absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500 dark:text-slate-400";

  const photoPresets = [
    {
      name: "Winter Clothes",
      url: "https://images.unsplash.com/photo-1544923246-77307dd654cb",
    },
    {
      name: "Blanket Relief",
      url: "https://images.unsplash.com/photo-1483664852095-d6cc6870702d",
    },
    {
      name: "Cleanup",
      url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
    },
    {
      name: "Tree Plantation",
      url: "https://images.unsplash.com/photo-1448375240586-882707db888b",
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {/* Introduction */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
          <Sparkles className="size-4" />
          Event Information
        </div>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Tell us about your event
        </h2>

        <p className="text-sm text-slate-600 dark:text-slate-400">
          Fill in the details below to share your initiative with the community.
        </p>
      </div>

      {/* Event Title */}
      <div className="space-y-2">
        <Label htmlFor="title" className={labelClass}>
          Event Title <span className="text-red-600 dark:text-rose-400">*</span>
        </Label>

        <div className="relative">
          <Type className={iconClass} />

          <Input
            id="title"
            placeholder="e.g. Winter Clothes Distribution"
            value={values.title}
            onChange={(e) => updateValue("title", e.target.value)}
            className={`${inputClass} pl-12`}
          />
        </div>

        {errors.title && <p className={errorClass}>{errors.title}</p>}
      </div>

      {/* Event Type */}
      <div className="space-y-2">
        <Label htmlFor="category" className={labelClass}>
          Event Type <span className="text-red-600 dark:text-rose-400">*</span>
        </Label>

        <div className="relative">
          <select
            id="category"
            value={isCustom ? "Other" : values.category}
            onChange={(e) => {
              const selected = e.target.value;

              if (selected === "Other") {
                setIsCustom(true);
                updateValue("category", "");
              } else {
                setIsCustom(false);
                updateValue("category", selected);
              }
            }}
            className={`${inputClass} appearance-none px-4 pr-10 outline-none`}
          >
            <option value="" disabled>
              Select event type
            </option>

            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}

            <option value="Other">Other / Custom</option>
          </select>

          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
        </div>

        {isCustom && (
          <Input
            id="customCategory"
            placeholder="Enter your custom event type"
            value={values.category}
            onChange={(e) => updateValue("category", e.target.value)}
            className={inputClass}
          />
        )}

        {errors.category && (
          <p className={errorClass}>{errors.category}</p>
        )}
      </div>

      {/* Start and End Date */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Start Date */}
        <div className="space-y-2">
          <Label htmlFor="dateTime" className={labelClass}>
            Event Start Date & Time{" "}
            <span className="text-red-600 dark:text-rose-400">*</span>
          </Label>

          <div className="relative">
            <CalendarDays className={iconClass} />

            <Input
              id="dateTime"
              type="datetime-local"
              value={values.dateTime}
              onChange={(e) => updateValue("dateTime", e.target.value)}
              className={`${inputClass} pl-12 [color-scheme:light] dark:[color-scheme:dark]`}
            />
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Choose today or a future date.
          </p>

          {errors.dateTime && (
            <p className={errorClass}>{errors.dateTime}</p>
          )}
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <Label htmlFor="endDateTime" className={labelClass}>
            Event End Date & Time{" "}
            <span className="text-red-600 dark:text-rose-400">*</span>
          </Label>

          <div className="relative">
            <CalendarDays className={iconClass} />

            <Input
              id="endDateTime"
              type="datetime-local"
              min={values.dateTime || undefined}
              value={values.endDateTime}
              onChange={(e) => updateValue("endDateTime", e.target.value)}
              className={`${inputClass} pl-12 [color-scheme:light] dark:[color-scheme:dark]`}
            />
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Must be later than the event start time.
          </p>

          {errors.endDateTime && (
            <p className={errorClass}>{errors.endDateTime}</p>
          )}
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location" className={labelClass}>
          Event Location <span className="text-red-600 dark:text-rose-400">*</span>
        </Label>

        <div className="relative">
          <MapPin className={iconClass} />

          <Input
            id="location"
            placeholder="e.g. Mirpur 10, Dhaka"
            value={values.location}
            onChange={(e) => updateValue("location", e.target.value)}
            className={`${inputClass} pl-12`}
          />
        </div>

        {errors.location && (
          <p className={errorClass}>{errors.location}</p>
        )}
      </div>

      {/* Image URL */}
      <div className="space-y-3">
        <Label htmlFor="imageUrl" className={labelClass}>
          Thumbnail Image URL{" "}
          <span className="text-red-600 dark:text-rose-400">*</span>
        </Label>

        <div className="relative">
          <ImageIcon className={iconClass} />

          <Input
            id="imageUrl"
            type="url"
            placeholder="https://images.unsplash.com/..."
            value={values.imageUrl}
            onChange={(e) => updateValue("imageUrl", e.target.value)}
            className={`${inputClass} pl-12`}
          />
        </div>

        {errors.imageUrl && (
          <p className={errorClass}>{errors.imageUrl}</p>
        )}

        {/* Image Presets */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-xs">
          <span className="text-slate-500 dark:text-slate-400">
            Quick photo presets:
          </span>

          {photoPresets.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => updateValue("imageUrl", preset.url)}
              className="font-medium text-emerald-700 transition-colors hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Image Preview */}
        {values.imageUrl && (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-950">
            <img
              key={values.imageUrl}
              src={values.imageUrl}
              alt="Event thumbnail preview"
              className="h-44 w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className={labelClass}>
          Event Description{" "}
          <span className="text-red-600 dark:text-rose-400">*</span>
        </Label>

        <div className="relative">
          <AlignLeft className="absolute left-4 top-4 size-5 text-slate-500 dark:text-slate-400" />

          <textarea
            id="description"
            rows={5}
            placeholder="Describe your event, its purpose, activities, and how people can participate..."
            value={values.description}
            onChange={(e) => updateValue("description", e.target.value)}
            className="w-full resize-y rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950/70 dark:text-white dark:placeholder:text-slate-500"
          />
        </div>

        {errors.description && (
          <p className={errorClass}>{errors.description}</p>
        )}
      </div>

      {/* Submit */}
      <div className="border-t border-slate-200 pt-6 dark:border-slate-800">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full rounded-xl bg-emerald-600 font-semibold text-white shadow-lg shadow-emerald-600/10 transition-all hover:bg-emerald-700 disabled:opacity-60 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 md:w-auto md:min-w-52"
        >
          {isSubmitting ? (
            "Saving..."
          ) : (
            <>
              {event ? "Update Event" : "Create Event"}
              <ArrowRight className="ml-2 size-4" />
            </>
          )}
        </Button>

        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          Fields marked with * are required.
        </p>
      </div>
    </form>
  );
}
