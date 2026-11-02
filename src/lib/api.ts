
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

  login: (data: {
    email: string;
    password: string;
  }) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  googleLogin: (token: string) =>
    apiRequest("/auth/google", {
      method: "POST",
      body: JSON.stringify({ token }),
    }),

  logout: () =>
    apiRequest("/auth/logout", {
      method: "POST",
    }),

  me: () =>
    apiRequest("/auth/me"),
};

export default authAPI;
