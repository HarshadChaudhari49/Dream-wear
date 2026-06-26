import { createContext, useContext, useState, ReactNode } from "react";
import { setTokens, clearTokens } from "../services/apiClient";

interface AuthContextType {
  isAuthenticated: boolean;
  login:  (access: string, refresh: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("dream_atelier_access_token"),
  );

  function login(access: string, refresh: string) {
    setTokens(access, refresh);
    setIsAuthenticated(true);
  }

  function logout() {
    clearTokens();
    localStorage.removeItem("dream_atelier_phone");
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
