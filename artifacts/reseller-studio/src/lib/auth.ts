import { useUser, useClerk } from "@clerk/react";
import { useLocation } from "wouter";

export function useAuth() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [, setLocation] = useLocation();

  const logout = async () => {
    await signOut();
    setLocation("/");
  };

  const email =
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses?.[0]?.emailAddress ??
    user?.id ??
    null;

  return {
    email,
    logout,
    isAuthenticated: isLoaded && !!user,
    isLoaded,
  };
}
