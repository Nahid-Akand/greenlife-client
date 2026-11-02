"use client";

import { Navbar } from "@/components/navbar";

export default function NavbarPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold text-foreground">Navbar Preview</h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          The navbar is fixed at the top. Log in to see the profile picture
          dropdown with Create Event, Manage Events, and Joined Events. Log out
          to see the Login button again.
        </p>
      </main>
    </div>
  );
}
