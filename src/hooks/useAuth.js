import { useEffect, useState } from "react";
import { apiFetch, setToken, clearToken, getToken } from "../lib/api";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  async function loadUser() {
    try {
      if (!getToken()) return;
      const res = await apiFetch("/api/auth/me");
      setUser(res.user);
    } catch {
      clearToken();
      setUser(null);
    } finally {
      setReady(true);
    }
  }

  async function login(email, password) {
    const res = await apiFetch("/api/auth/login", {
      method: "POST",
      body: { email, password },
    });
    setToken(res.access_token);
    await loadUser();
  }

  async function register(email, password) {
    const res = await apiFetch("/api/auth/register", {
      method: "POST",
      body: { email, password },
    });
    setToken(res.access_token);
    await loadUser();
  }

  function logout() {
    clearToken();
    setUser(null);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return { user, ready, login, register, logout };
}
