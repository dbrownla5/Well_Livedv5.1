import { useEffect, useState } from "react";
import { useLocation } from "wouter";

const EMAIL_KEY = "reseller_operator_email";

export function getOperatorEmail(): string | null {
  return localStorage.getItem(EMAIL_KEY);
}

export function setOperatorEmail(email: string) {
  localStorage.setItem(EMAIL_KEY, email);
  window.dispatchEvent(new Event("operator-changed"));
}

export function clearOperatorEmail() {
  localStorage.removeItem(EMAIL_KEY);
  window.dispatchEvent(new Event("operator-changed"));
}

export function useAuth() {
  const [email, setEmail] = useState<string | null>(getOperatorEmail());
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleStorage = () => {
      setEmail(getOperatorEmail());
    };
    window.addEventListener("operator-changed", handleStorage);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("operator-changed", handleStorage);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const login = (newEmail: string) => {
    setOperatorEmail(newEmail);
  };

  const logout = () => {
    clearOperatorEmail();
    setLocation("/login");
  };

  return { email, login, logout, isAuthenticated: !!email };
}
