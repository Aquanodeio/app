// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3080";

// Helper function to make authenticated requests, only use for server side routes 
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  authToken?: string
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  
  if (authToken) {
    headers.Authorization = authToken;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  console.log(response, "response");

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "An unknown error occurred" }));
    throw new Error(error.message || "An error occurred");
  }

  return response.json();
} 