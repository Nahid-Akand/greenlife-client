"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Globe,
  ShieldCheck,
  Users,
  Mail,
  MapPin,
  Phone,
  X,
  Share2,
} from "lucide-react";

export function BannerSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1522021249310-2e13093fce31?w=1920&q=80"
          alt="Community volunteers"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#064e3b]/80 to-[#064e3b]/90" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 lg:py-40 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-100 text-xs font-semibold uppercase tracking-wider mb-6">
          Community Service • Social Development
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
          Building Stronger<br />
          Communities Together
        </h1>
        <p className="text-lg sm:text-xl text-green-100/90 max-w-2xl mx-auto mb-10 leading-relaxed">
          Create, join, and track social service events in your local area. From
          winter clothes distribution to health camps, make an impact where it
          matters most.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/events/create">
            <Button className="w-full sm:w-auto bg-white text-[#064e3b] hover:bg-green-100 shadow-lg px-8 py-3 text-lg font-semibold">
              Create an Event
            </Button>
          </Link>
          <Button
            variant="outline"
            className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 shadow-lg px-8 py-3 text-lg font-semibold"
          >
            Explore Events
          </Button>
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  const features = [
    {
      icon: Calendar,
      title: "Create Events",
      description:
        "Organize social service events and invite your community to join.",
    },
    {
      icon: Users,
      title: "Join Events",
      description:
        "Discover upcoming events near you and sign up to volunteer.",
    },
    {
      icon: ShieldCheck,
      title: "Track Participation",
      description:
        "Manage your created events and see who has joined.",
    },
    {
      icon: Globe,
      title: "Local Impact",
      description:
        "Connect with neighbors and make a difference in your area.",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#064e3b] mb-4">Why GreenLife?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to organize and participate in community
            service events.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-green-100 text-green-700 flex items-center justify-center mb-4">
                <feature.icon className="size-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GallerySection() {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1593046629742-6ed59bae3737?w=600&q=80",
      alt: "Food distribution volunteers",
    },
    {
      src: "https://images.unsplash.com/photo-1584813542357-0a6e6f63b58b?w=600&q=80",
      alt: "Medical camp volunteers",
    },
    {
      src: "https://images.unsplash.com/photo-1573496359142-b8d87736a5a3?w=600&q=80",
      alt: "Clothing donation drive",
    },
    {
      src: "https://images.unsplash.com/photo-1517482608252-e8c89768e16a?w=600&q=80",
      alt: "Community cleanup",
    },
    {
      src: "https://images.unsplash.com/photo-1544620348-c4fd4a3d5957?w=600&q=80",
      alt: "Education support",
    },
    {
      src: "https://images.unsplash.com/photo-1529165617452-baab3108ec35?w=600&q=80",
      alt: "Relief distribution",
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#064e3b] mb-4">In Action</h2>
          <p className="text-muted-foreground">
            Moments from community service events across the city.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, idx) => (
            <div
              key={idx}
              className="aspect-square rounded-xl overflow-hidden border border-border bg-card"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NewsletterSection() {
  return (
    <section className="py-16 bg-[#064e3b]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-2xl bg-white/[5] p-8 sm:p-12 border border-white/10 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Connected
          </h2>
          <p className="text-green-100/80 mb-8 max-w-lg mx-auto">
            Subscribe to our newsletter to get updates on upcoming community
            service events and volunteering opportunities.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 justify-center items-center" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 sm:w-96 px-5 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/50 focus:ring-2 focus:ring-green-400 focus:outline-none transition-colors"
            />
            <Button className="px-8 py-3 text-lg font-semibold bg-white text-[#064e3b] hover:bg-green-100">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export function FooterSection() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Upcoming Events", href: "/" },
    { label: "Create Event", href: "/events/create" },
    { label: "Manage Events", href: "/events/manage" },
    { label: "Joined Events", href: "/events/joined" },
  ];

  const socialLinks = [
    { label: "X (Twitter)", icon: X, href: "#" },
    { label: "Share", icon: Share2, href: "#" },
    { label: "Email", icon: Mail, href: "#" },
  ];

  return (
    <footer className="bg-[#064e3b] text-white border-t border-[#115e59]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-400 text-[#064e3b]">
                <span className="font-bold text-sm">G</span>
              </div>
              <span className="text-xl font-bold tracking-tight">
                GreenLife
              </span>
            </div>
            <p className="text-green-100/70 text-sm leading-relaxed max-w-xs">
              Building stronger communities through social service events.
              Connect, volunteer, and make a local impact together.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
                  title={social.label}
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-green-300 mb-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-green-100/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-green-300 mb-2">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm text-green-100/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <MapPin className="size-4 mt-0.5 text-green-400 flex-shrink-0" />
                <p className="max-w-xs">
                  Mirpur 10, Dhaka, Bangladesh
                </p>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-green-400 flex-shrink-0" />
                <p>+880 1700-000000</p>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-green-400 flex-shrink-0" />
                <p>hello@greenlife.org</p>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-green-300 mb-2">
              Newsletter
            </h3>
            <p className="text-sm text-green-100/80 mb-4">
              Get the latest community events in your inbox.
            </p>
            <form
              className="flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 rounded-lg text-sm border border-white/20 bg-white/10 text-white placeholder-white/50 focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
              <Button size="sm" className="px-4 bg-white text-[#064e3b] hover:bg-green-100">
                Join
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-green-100/60">
          <p>
            © {new Date().getFullYear()} GreenLife. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Community-driven social development platform
          </p>
        </div>
      </div>
    </footer>
  );
}
