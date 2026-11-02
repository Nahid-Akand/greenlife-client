"use client";

import { BannerSection, FeaturesSection, GallerySection, NewsletterSection, FooterSection } from "@/components/sections";
import { RecentEventsSection } from "@/components/sections/recent-events";
import { useEvents } from "@/contexts/events-context";

export default function HomePage() {
  const { isLoading } = useEvents();

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <BannerSection />
      <FeaturesSection />
      <RecentEventsSection />
      <GallerySection />
      <NewsletterSection />
      <FooterSection />
    </div>
  );
}
