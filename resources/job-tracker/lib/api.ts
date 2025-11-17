// lib/api.ts
export const api = async (url: string, options: RequestInit = {}) => {
  const base = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${base}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store", // IMPORTANT to avoid caching issues
  });

  if (!res.ok) {
    throw new Error("API Error: " + res.status);
  }

  return res.json();
};
