import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api, { setAuthToken } from "../lib/api";

const AuthContext = createContext(null);

function readStored() {
  try {
    const token = localStorage.getItem("dd3_token");
    const user = JSON.parse(localStorage.getItem("dd3_user") || "null");
    return { token, user };
  } catch {
    return { token: null, user: null };
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => readStored().token);
  const [user, setUser] = useState(() => readStored().user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  useEffect(() => {
    async function loadMe() {
      try {
        if (!token) return;
        const res = await api.get("/api/auth/me");
        setUser(res.data.user);
        localStorage.setItem("dd3_user", JSON.stringify(res.data.user));
      } catch {
        setToken(null);
        setUser(null);
        localStorage.removeItem("dd3_token");
        localStorage.removeItem("dd3_user");
        setAuthToken(null);
      }
    }
    setLoading(true);
    loadMe().finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function login(email, password) {
    const res = await api.post("/api/auth/login", { email, password });
    const t = res.data.token;
    const u = res.data.user;
    setToken(t);
    setUser(u);
    localStorage.setItem("dd3_token", t);
    localStorage.setItem("dd3_user", JSON.stringify(u));
    setAuthToken(t);
    return u;
  }

  async function registerStudent(payload) {
    const res = await api.post("/api/auth/register", payload);
    const t = res.data.token;
    const u = res.data.user;
    setToken(t);
    setUser(u);
    localStorage.setItem("dd3_token", t);
    localStorage.setItem("dd3_user", JSON.stringify(u));
    setAuthToken(t);
    return u;
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("dd3_token");
    localStorage.removeItem("dd3_user");
    setAuthToken(null);
  }

  const value = useMemo(
    () => ({ token, user, loading, login, registerStudent, logout }),
    [token, user, loading]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
