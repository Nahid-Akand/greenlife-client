"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  LayoutGrid,
  Plus,
  User as UserIcon,
  ArrowRight,
  Leaf,
  CalendarDays,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 transition-transform duration-300 group-hover:scale-105">
            <Leaf className="h-6 w-6" />
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight">
              Green<span className="text-emerald-500">Life</span>
            </span>
            <span className="text-[10px] font-medium tracking-[0.18em] text-muted-foreground">
              GROW TOGETHER
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/events"
            className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-5 py-2.5 text-sm font-semibold text-emerald-600 transition-all hover:bg-emerald-500/15 dark:text-emerald-400"
          >
            <CalendarDays className="h-4 w-4" />
            Upcoming Events
          </Link>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {!user ? (
            <Button
              size="sm"
              onClick={() => router.push("/login")}
              className="h-10 gap-2 rounded-full bg-emerald-500 px-6 font-semibold text-slate-950 shadow-md shadow-emerald-500/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-400"
            >
              Login
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="group flex items-center gap-2 rounded-full border border-border bg-background p-1.5 pr-3 transition-all hover:border-emerald-500/50 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-emerald-500/30">
                <Avatar className="h-9 w-9 border border-emerald-500/20">
                  <AvatarImage
                    src={user.avatarUrl ?? ""}
                    alt={user.name ?? "User"}
                  />
                  <AvatarFallback className="bg-emerald-500/10 font-bold text-emerald-600">
                    {(user.name ?? "U").charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <span className="hidden max-w-28 truncate text-sm font-semibold sm:block">
                  {user.name ?? "User"}
                </span>

                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={12}
                className="w-60 rounded-xl border-border/70 p-2 shadow-xl"
              >
                {/* User Information */}
                <div className="flex items-center gap-3 px-3 py-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatarUrl ?? ""} />
                    <AvatarFallback className="bg-emerald-500/10 font-bold text-emerald-600">
                      {(user.name ?? "U").charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {user.name ?? "User"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Welcome back!
                    </p>
                  </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="cursor-pointer gap-3 rounded-lg py-2.5"
                  onClick={() => router.push("/events/create")}
                >
                  <Plus className="h-4 w-4 text-emerald-500" />
                  Create Event
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer gap-3 rounded-lg py-2.5"
                  onClick={() => router.push("/events/manage")}
                >
                  <LayoutGrid className="h-4 w-4 text-emerald-500" />
                  Manage Events
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer gap-3 rounded-lg py-2.5"
                  onClick={() => router.push("/events/joined")}
                >
                  <UserIcon className="h-4 w-4 text-emerald-500" />
                  Joined Events
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="cursor-pointer gap-3 rounded-lg py-2.5 text-red-500 focus:bg-red-500/10 focus:text-red-500"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}