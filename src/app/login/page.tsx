"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { authAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const GoogleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="mr-2"
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66v-2.77c-1.16-.79-1.95-1.94-2.21-3.31H12v-2.77h3.57c.26-1.37 1.04-2.53 2.21-3.31V7.29c-2.08 1.92-3.28 4.74-3.28 8.09v2.77H5.28c1.82 1.68 4.31 2.66 7.28 2.66"
    />
    <path
      fill="#FBBC05"
      d="M5.28 7.29c0-3.35 1.2-6.33 3.28-8.09V1.71H2c-1.97 2.08-3.28 4.9-3.28 8.09 0 3.19 1.3 6.02 3.28 8.09h3.57v-2.77c-1.16.79-1.95 1.94-2.21 3.31z"
    />
    <path
      fill="#EA4335"
      d="M12 5.29c1.61 0 3.09-.59 4.23-1.57v2.77c-.79.53-1.6.84-2.51.84-1.78 0-3.28-1.35-3.72-3.04z"
    />
  </svg>
);

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

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
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      // In production, use a real Google OAuth library (e.g., next-auth, @react-oauth/google)
      // Here we simulate receiving a Google ID token after user signs in with Google
      const token = "google-id-token-from-frontend";
      const user = await authAPI.googleLogin(token);

      login(user);

      toast({
        title: "Signed in with Google",
        description: `Welcome back, ${user.name}!`,
      });

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Google login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0f172a] px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-500/30">
              <div className="text-white text-2xl">
                🤝
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Welcome Back
          </h1>
          <p className="text-slate-400 text-center">
            Sign in to organize and join community drives
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-slate-300">
              Email
            </Label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 size-5 -mt-2.5 text-slate-500"
              />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                className="pl-12 pr-4 bg-slate-800/50 border border-slate-700 text-slate-100 placeholder-slate-500 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 dark:bg-transparent"
                disabled={isLoading}
              />
            </div>
          </div>
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
                className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 size-5 -mt-2.5 text-slate-500"
              />
              <Input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="••••••••"
                className="pl-12 pr-10 bg-slate-800/50 border border-slate-700 text-slate-100 placeholder-slate-500 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 dark:bg-transparent"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 -mt-2.5 text-slate-500 hover:text-emerald-400 transition-colors"
                aria-label={passwordVisible ? "Hide password" : "Show password"}
              >
                {passwordVisible ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
          </div>
          {error && (
            <div className="rounded-md bg-red-900/20 p-3 text-sm text-red-400 border border-red-500/30">
              {error}
            </div>
          )}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-500 text-slate-900 hover:bg-emerald-400 disabled:opacity-60 shadow-lg shadow-emerald-500/25"
          >
            {isLoading ? "Signing in..." : "Sign In →"}
          </Button>
        </form>

        <Separator orientation="horizontal" className="my-6 text-slate-600">
          <span className="bg-[#0f172a] px-2 text-xs font-medium text-slate-500">
            OR CONTINUE WITH
          </span>
        </Separator>

        <Button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 border border-slate-600 bg-slate-800/50 text-slate-100 hover:bg-slate-700 hover:border-slate-500 transition-colors"
        >
          <GoogleIcon />
          Continue with Google
        </Button>

        <p className="text-center text-xs text-slate-500">
          Don&rsquo;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
