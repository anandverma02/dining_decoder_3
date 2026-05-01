import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";
import Sidebar from "./Sidebar";
import BackToTop from "./BackToTop";

export default function AppShell() {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const body = document.body;
    body.classList.remove("theme-student", "theme-admin");
    if (user?.role === "admin") body.classList.add("theme-admin");
    if (user?.role === "student") body.classList.add("theme-student");
  }, [user]);

  const right = location.pathname.startsWith("/admin") ? "Admin Panel" : "Student Portal";

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="dd3-app">
      <AppHeader titleRight={user ? right : ""} onToggleSidebar={() => setMobileSidebarOpen((x) => !x)} />
      <div className={`dd3-main${user ? "" : " dd3-mainPublic"}`}>
        {user ? <Sidebar mobileOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} /> : null}
        <main className="dd3-content">
          <Outlet />
        </main>
      </div>
      {mobileSidebarOpen ? <button className="dd3-overlay" onClick={() => setMobileSidebarOpen(false)} /> : null}
      <AppFooter />
      <BackToTop />
    </div>
  );
}

