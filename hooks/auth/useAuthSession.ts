import { useAuth } from "./useAuthContext";

export function useAuthSession() {
  const { user, isLoading, signOut, accessToken } = useAuth();

  return {
    user,
    isLoading,
    signOut,
    isAuthenticated: !!user,
    userEmail: user?.email,
    displayName:
      user?.user_metadata.full_name || user?.email?.split("@")[0] || "User",
    accessToken: accessToken,
    userAvatar: user?.user_metadata.avatar_url,
  };
}
