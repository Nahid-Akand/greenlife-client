
"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  ArrowRight,
  Heart,
  Leaf,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

// ==========================================
// BANNER SECTION
// ==========================================

export function BannerSection() {
  return (
    <section className="relative isolate overflow-hidden bg-emerald-50 dark:bg-[#061a13]">
      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1522021249310-2e13093fce31?w=1920&q=85"
          alt="Community volunteers"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Background Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-950/90 via-emerald-900/80 to-green-950/85 dark:from-[#020c08]/95 dark:via-[#052719]/90 dark:to-[#020c08]/95" />

      {/* Decorative Glow */}
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 size-80 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 -z-10 size-96 rounded-full bg-green-300/20 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-2 lg:px-8 lg:py-36">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-100 shadow-lg backdrop-blur-md">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-300 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-green-400" />
            </span>
            Community Service • Social Development
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            Small Actions,
            <br />
            <span className="bg-gradient-to-r from-emerald-200 via-green-300 to-lime-200 bg-clip-text text-transparent">
              Big Changes.
            </span>
            <br />
            Stronger Communities.
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-emerald-50/90 sm:text-lg lg:mx-0">
            Bring people together to make a real difference. Discover local
            initiatives, organize meaningful events, and turn your good
            intentions into community impact.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Link href="/events/create">
              <Button className="h-13 w-full rounded-full bg-emerald-400 px-8 text-base font-bold text-emerald-950 shadow-xl shadow-emerald-950/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-300 sm:w-auto">
                Create an Event
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </Link>

            <Link href="/events">
              <Button
                variant="outline"
                className="h-13 w-full rounded-full border-white/40 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white/20 hover:text-white sm:w-auto"
              >
                Explore Events
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-emerald-50/90 lg:justify-start">
            <div className="flex items-center gap-2">
              <Users className="size-5 text-emerald-300" />
              <span>Community Driven</span>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-emerald-300" />
              <span>Meaningful Impact</span>
            </div>

            <div className="flex items-center gap-2">
              <Globe className="size-5 text-emerald-300" />
              <span>Local Initiatives</span>
            </div>
          </div>
        </div>

        {/* Right Visual Card */}
        <div className="relative mx-auto w-full max-w-md lg:ml-auto">
          <div className="absolute -inset-5 rounded-[2rem] bg-emerald-400/20 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/25 bg-white/10 p-3 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="relative overflow-hidden rounded-[1.5rem]">
              <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=900&q=85"
                alt="Volunteers making a positive community impact"
                className="h-72 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-80"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                  Together We Can
                </p>
                <h2 className="text-2xl font-bold">
                  Make Every Action Count.
                </h2>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 px-3 py-5 text-white">
              <div>
                <p className="text-sm font-semibold">
                  Be Part of Something Good
                </p>
                <p className="mt-1 text-xs text-emerald-100/75">
                  Connect. Volunteer. Make a difference.
                </p>
              </div>

              <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-emerald-400/20">
                <Globe className="size-6 text-emerald-200" />
              </div>
            </div>
          </div>

          <div className="absolute -right-5 -top-5 flex size-14 items-center justify-center rounded-2xl border border-white/30 bg-emerald-400 text-emerald-950 shadow-xl sm:-right-7">
            <Leaf className="size-7" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// FEATURES SECTION
// ==========================================

export function FeaturesSection() {
  const features = [
    {
      icon: Calendar,
      title: "Create Events",
      description:
        "Organize social service events and invite your community to join.",
      color:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-400",
    },
    {
      icon: Users,
      title: "Join Events",
      description:
        "Discover upcoming events near you and sign up to volunteer.",
      color:
        "bg-blue-100 text-blue-700 dark:bg-blue-400/15 dark:text-blue-400",
    },
    {
      icon: ShieldCheck,
      title: "Track Participation",
      description:
        "Manage your created events and see who has joined.",
      color:
        "bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-400",
    },
    {
      icon: Globe,
      title: "Local Impact",
      description:
        "Connect with neighbors and make a difference in your area.",
      color:
        "bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-400",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-24">
      <div className="pointer-events-none absolute -right-40 top-0 size-96 rounded-full bg-emerald-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
            <Sparkles className="size-4" />
            What We Offer
          </div>

          <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Why{" "}
            <span className="text-emerald-700 dark:text-emerald-400">
              GreenLife?
            </span>
          </h2>

          <p className="leading-7 text-muted-foreground">
            Everything you need to organize and participate in community
            service events. Small efforts can create lasting change.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-950/5 dark:hover:shadow-emerald-950/20"
            >
              <div
                className={`mb-6 flex size-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${feature.color}`}
              >
                <feature.icon className="size-7" />
              </div>

              <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                0{index + 1}
              </span>

              <h3 className="mb-3 text-lg font-bold text-foreground">
                {feature.title}
              </h3>

              <p className="text-sm leading-7 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// GALLERY SECTION
// ==========================================

export function GallerySection() {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=700&q=80",
      title: "Winter Clothes Drive",
      subtitle: "Warmth for Rickshaw Pullers",
      location: "Mirpur 10, Dhaka",
    },
    {
      src: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=700&q=80",
      title: "Night Blanket Relief",
      subtitle: "Shelterless Night Support",
      location: "Mohammadpur, Dhaka",
    },
    {
      src: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=700&q=80",
      title: "Dhanmondi Lake Clean-up",
      subtitle: "Eco Plastic-Free Waters",
      location: "Dhanmondi, Dhaka",
    },
    {
      src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=700&q=80",
      title: "Urban Tree Plantation",
      subtitle: "1000 Green Saplings",
      location: "Uttara, Dhaka",
    },
    {
      src: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb7?auto=format&fit=crop&w=700&q=80",
      title: "Community Food Relief",
      subtitle: "Fresh Meals Sharing",
      location: "Old Dhaka",
    },
    {
      src: "https://images.unsplash.com/photo-1497633762267-9d1f1e4a5fb6?auto=format&fit=crop&w=700&q=80",
      title: "Children Book & Bag Drive",
      subtitle: "Education for Every Child",
      location: "Mirpur, Dhaka",
    },
  ];

  return (
    <section className="bg-muted/30 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
            <Heart className="size-4" />
            Real Community Stories
          </div>

          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            See GreenLife{" "}
            <span className="text-emerald-700 dark:text-emerald-400">
              in Action
            </span>
          </h2>

          <p className="mx-auto max-w-xl leading-7 text-muted-foreground">
            Moments of kindness, teamwork, and positive change from community
            service activities.
          </p>
        </div>

        {/* Showcase Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((item, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60" />
              </div>

              {/* Card Content */}
              <div className="p-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {item.subtitle}
                </p>

                <h3 className="mb-3 text-lg font-bold text-foreground transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4 text-emerald-500" />
                  {item.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// NEWSLETTER SECTION
// ==========================================

export function NewsletterSection() {
  const [email, setEmail] = useState("hello@greenlife.org");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
  };

  return (
    <section className="relative overflow-hidden bg-emerald-600 py-20 dark:bg-emerald-950">
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-emerald-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-white">
          <Mail className="h-8 w-8" />
        </div>

        <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Stay Connected
        </h2>

        <p className="mx-auto mb-9 max-w-2xl leading-7 text-emerald-50">
          Stay informed about upcoming community events, volunteering
          opportunities, and ways to make a positive difference.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setSubscribed(false);
            }}
            required
            className="h-12 rounded-full border-white/20 bg-white px-5 text-gray-900 placeholder:text-gray-500"
          />

          <Button
            type="submit"
            className="h-12 rounded-full bg-slate-900 px-8 font-semibold text-white hover:bg-slate-800"
          >
            Subscribe
          </Button>
        </form>

        {subscribed && (
          <div className="mt-5 flex items-center justify-center gap-2 text-sm font-medium text-white">
            <CheckCircle2 className="h-5 w-5" />
            Thank you! You are subscribed successfully.
          </div>
        )}

        <p className="mt-5 text-xs text-emerald-100">
          Join our community and help make a difference.
        </p>
      </div>
    </section>
  );
}

// ==========================================
// FOOTER SECTION
// ==========================================

export function FooterSection() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Upcoming Events", href: "/events" },
    { label: "Create Event", href: "/events/create" },
    { label: "Manage Events", href: "/events/manage" },
    { label: "Joined Events", href: "/events/joined" },
  ];

  const socialLinks = [
    { label: "X (Twitter)", icon: X, href: "#" },
    { label: "Share", icon: Share2, href: "#" },
    { label: "Email", icon: Mail, href: "mailto:hello@greenlife.org" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-emerald-900 bg-[#064e3b] text-white dark:border-emerald-950 dark:bg-[#031b12]">
      <div className="pointer-events-none absolute -right-40 -top-40 size-96 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-14 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-400 text-emerald-950 shadow-lg">
                <Leaf className="size-6" />
              </div>

              <span className="text-2xl font-extrabold tracking-tight">
                GreenLife
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-emerald-100/70">
              Building stronger communities through social service events.
              Connect, volunteer, and make a local impact together.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  title={social.label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-emerald-50 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-400 hover:text-emerald-950"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-emerald-300">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-emerald-100/75 transition-colors hover:text-white"
                  >
                    <ArrowRight className="size-3 text-emerald-400" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-emerald-300">
              Contact Us
            </h3>

            <ul className="space-y-5 text-sm text-emerald-100/75">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-emerald-400" />
                <p className="max-w-xs leading-6">
                  Mirpur 10, Dhaka, Bangladesh
                </p>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="size-5 shrink-0 text-emerald-400" />
                <p>+880 1700-000000</p>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="size-5 shrink-0 text-emerald-400" />
                <p>hello@greenlife.org</p>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-emerald-300">
              Stay Updated
            </h3>

            <p className="text-sm leading-7 text-emerald-100/75">
              Get updates about community events and volunteering
              opportunities.
            </p>

            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                className="h-11 w-full rounded-lg border border-white/15 bg-white/10 px-4 text-sm text-white outline-none transition-colors placeholder:text-emerald-100/50 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
              />

              <Button
                type="submit"
                className="h-11 w-full rounded-lg bg-emerald-400 font-semibold text-emerald-950 transition-colors hover:bg-emerald-300"
              >
                Join Our Community
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-emerald-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} GreenLife. All rights reserved.
          </p>

          <p className="flex items-center gap-2">
            <Heart className="size-3.5 text-emerald-400" />
            Community-driven social development platform
          </p>
        </div>
      </div>
    </footer>
  );
}
