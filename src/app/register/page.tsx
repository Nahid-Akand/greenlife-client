"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Mail, Lock, User as UserIcon, Image as ImageIcon } from "lucide-react";

export default function RegisterPage() {
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
  });

  const handleChange = (key: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [key]: e.target.value }));
    };
  };

  const validatePassword = (password: string): string | undefined => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    return undefined;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.photoUrl ||
      !formData.password
    ) {
      setError("All fields are required");
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setIsLoading(true);

    try {
      const { user } = await authAPI.register({
        name: formData.name,
        email: formData.email,
        photoUrl: formData.photoUrl,
        password: formData.password,
      });

      login(user);

      toast({
        title: "Account created successfully",
        description: `Welcome to GreenLife, ${formData.name}!`,
      });

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create account</CardTitle>
          <CardDescription>
            Join GreenLife to start creating and joining events
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <UserIcon
                  className="absolute left-3 top-1/2 size-4 -mt-1.5 text-muted-foreground"
                />
                <Input
                  id="name"
                  type="text"
                  placeholder="Rahim Ahmed"
                  value={formData.name}
                  onChange={handleChange("name")}
                  disabled={isLoading}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 size-4 -mt-1.5 text-muted-foreground"
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="rahim@example.com"
                  value={formData.email}
                  onChange={handleChange("email")}
                  disabled={isLoading}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="photoUrl">Photo URL</Label>
              <div className="relative">
                <ImageIcon
                  className="absolute left-3 top-1/2 size-4 -mt-1.5 text-muted-foreground"
                />
                <Input
                  id="photoUrl"
                  type="url"
                  placeholder="https://example.com/avatar.jpg"
                  value={formData.photoUrl}
                  onChange={handleChange("photoUrl")}
                  disabled={isLoading}
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Profile picture URL (e.g. from ui-avatars.com)
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 size-4 -mt-1.5 text-muted-foreground"
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange("password")}
                  disabled={isLoading}
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Must include uppercase, lowercase, and be at least 6 characters
              </p>
            </div>
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-900 border border-red-100">
                {error}
              </div>
            )}
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 text-center">
          <p className="text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
