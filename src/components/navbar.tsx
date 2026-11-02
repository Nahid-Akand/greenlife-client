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
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <div className="flex shrink-0 items-center gap-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">G</span>
          </div>

          <Link
            href="/"
            className="text-lg font-bold tracking-tight"
          >
            GreenLife
          </Link>
        </div>

        {/* Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
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
              className="bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/25 hover:bg-emerald-400"
            >
              <ArrowRight className="size-4" />
              Login
            </Button>
          ) : (
            <>
              {/* Avatar Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger
  className="relative flex items-center justify-center rounded-lg border border-border p-1 hover:bg-muted"
>
  <Avatar
    className="h-8 w-8"
    title={user.name ?? "User"}
  >
    <AvatarImage
      src={user.avatarUrl ?? ""}
      alt={user.name ?? "User"}
    />

    <AvatarFallback>
      {(user.name ?? "U").charAt(0).toUpperCase()}
    </AvatarFallback>
  </Avatar>
</DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-52"
                >
                  {/* User Name */}
                  <DropdownMenuItem
                    className="flex items-center gap-2"
                    disabled
                  >
                    <UserIcon className="size-4" />
                    <span className="truncate">
                      {user.name ?? "User"}
                    </span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  {/* Create Event */}
                  <DropdownMenuItem
                    className="flex cursor-pointer items-center gap-2"
                    onClick={() => router.push("/events/create")}
                  >
                    <Plus className="size-4" />
                    Create Event
                  </DropdownMenuItem>

                  {/* Manage Events */}
                  <DropdownMenuItem
                    className="flex cursor-pointer items-center gap-2"
                    onClick={() => router.push("/events/manage")}
                  >
                    <LayoutGrid className="size-4" />
                    Manage Events
                  </DropdownMenuItem>

                  {/* Joined Events */}
                  <DropdownMenuItem
                    className="flex cursor-pointer items-center gap-2"
                    onClick={() => router.push("/events/joined")}
                  >
                    <UserIcon className="size-4" />
                    Joined Events
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  {/* Logout */}
                  <DropdownMenuItem
                    className="flex cursor-pointer items-center gap-2 text-red-500 focus:text-red-500"
                    onClick={handleLogout}
                  >
                    <ArrowRight className="size-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}