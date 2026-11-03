
"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { authAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Email and password login
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string) || "";
    const password = (formData.get("password") as string) || "";

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const { user } = await authAPI.login({ email, password });

      login(user);

      toast({
        title: "Signed in successfully",
        description: `Welcome back, ${user.name}!`,
      });

      router.push("/");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Invalid email or password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Google login
  const handleGoogleSuccess = async (credentialResponse: {
    credential?: string;
  }) => {
    if (!credentialResponse.credential) {
      setError("Google authentication failed. Please try again.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const { user } = await authAPI.googleLogin(
        credentialResponse.credential
      );

      login(user);

      toast({
        title: "Signed in with Google",
        description: `Welcome, ${user.name}!`,
      });

      router.push("/");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Google login failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0f172a] px-4">
      <div className="w-full max-w-md space-y-6">

        {/* Header */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-500/30">
              <div className="text-2xl text-white">
                🤝
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white">
            Welcome Back
          </h1>

          <p className="text-center text-slate-400">
            Sign in to organize and join community drives
          </p>
        </div>

        {/* Email and Password Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-slate-300"
            >
              Email
            </Label>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 size-5 -mt-2.5 text-slate-500" />

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                className="border border-slate-700 bg-slate-800/50 pl-12 pr-4 text-slate-100 placeholder-slate-500 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 dark:bg-transparent"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-slate-300"
              >
                Password
              </Label>

              <a
                href="#"
                className="text-xs text-emerald-400 transition-colors hover:text-emerald-300"
                onClick={(e) => e.preventDefault()}
              >
                Forgot password?
              </a>
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 size-5 -mt-2.5 text-slate-500" />

              <Input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="••••••••"
                className="border border-slate-700 bg-slate-800/50 pl-12 pr-10 text-slate-100 placeholder-slate-500 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 dark:bg-transparent"
                disabled={isLoading}
              />

              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 -mt-2.5 text-slate-500 transition-colors hover:text-emerald-400"
                aria-label={
                  passwordVisible ? "Hide password" : "Show password"
                }
              >
                {passwordVisible ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-md border border-red-500/30 bg-red-900/20 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Sign In →"}
          </Button>
        </form>

        {/* Separator */}
        <Separator orientation="horizontal" className="my-6 text-slate-600">
          <span className="bg-[#0f172a] px-2 text-xs font-medium text-slate-500">
            OR CONTINUE WITH
          </span>
        </Separator>

        {/* Google Login */}
        <div className="flex w-full justify-center">
          {isLoading ? (
            <Button
              disabled
              className="w-full border border-slate-600 bg-slate-800/50 text-slate-100"
            >
              Signing in...
            </Button>
          ) : (
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                setError("Google login failed. Please try again.");
              }}
              theme="filled_black"
              size="large"
              text="continue_with"
              shape="rectangular"
              logo_alignment="left"
              width="300"
            />
          )}
        </div>

        {/* Register Link */}
        <p className="text-center text-xs text-slate-500">
          Don&rsquo;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-emerald-400 transition-colors hover:text-emerald-300"
          >
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
}
