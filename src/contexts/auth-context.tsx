
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { User } from "@/types";
import authAPI from "@/lib/api";

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check the backend session when the app loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await authAPI.me();

        if (data.authenticated && data.user) {
          setUser({
            ...data.user,
            avatarUrl: data.user.avatarUrl ?? "",
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to restore session:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Update frontend user after successful login
  const login = (user: User) => {
    setUser(user);
  };

  // Destroy backend session and clear frontend user
  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
}
