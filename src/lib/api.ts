
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      data.error || data.message || "Request failed"
    );
  }

  return data;
}

export const authAPI = {
  // Register
  register: (data: {
    name: string;
    email: string;
    photoUrl: string;
    password: string;
  }) =>
    apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Email and password login
  login: (data: {
    email: string;
    password: string;
  }) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Google login
  googleLogin: (credential: string) =>
    apiRequest("/auth/google", {
      method: "POST",
      body: JSON.stringify({ credential }),
    }),

  // Logout
  logout: () =>
    apiRequest("/auth/logout", {
      method: "POST",
    }),

  // Get current logged-in user
  me: () =>
    apiRequest("/auth/me"),
};

export default authAPI;
