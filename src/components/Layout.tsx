import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useTheme } from "@/context/ThemeContext";
import {
  LayoutDashboard,
  Settings,
  Users,
  LogOut,
  Moon,
  Sun,
  ShieldCheck,
  User as UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const Layout = () => {
  const { user, login, logout } = useAuthStore();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 border-r flex flex-col p-4">
        <div className="flex items-center gap-2 mb-8 px-2">
          <ShieldCheck className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold">ProManage</h1>
        </div>

        <nav className="flex-1 space-y-1">
          <Link to="/">
            <Button
              variant={isActive("/") ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Button>
          </Link>

          {user?.role === "Admin" && (
            <Link to="/admin-settings">
              <Button
                variant={isActive("/admin-settings") ? "secondary" : "ghost"}
                className="w-full justify-start gap-2"
              >
                <Users size={20} />
                Manage Users
              </Button>
            </Link>
          )}
        </nav>

        <div className="mt-auto space-y-4">
          <Separator />

          <div className="px-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserIcon size={16} />
              <span className="text-sm font-medium">{user?.role}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => login("User")}
              className={user?.role === "User" ? "border-primary" : ""}
            >
              User
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => login("Admin")}
              className={user?.role === "Admin" ? "border-primary" : ""}
            >
              Admin
            </Button>
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-destructive"
            onClick={logout}
          >
            <LogOut size={20} />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};
