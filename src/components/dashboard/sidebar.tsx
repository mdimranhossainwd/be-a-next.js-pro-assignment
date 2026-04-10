"use client";

import { Button } from "@/components/ui/button";
import { authService } from "@/lib/services";
import { cn } from "@/lib/utils";
import { Calendar, Home, LogOut, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SidebarProps {
  role: "STUDENT" | "TUTOR" | "ADMIN";
}

const studentLinks = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/bookings", label: "My Bookings", icon: Calendar },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

const tutorLinks = [
  { href: "/tutor/dashboard", label: "Dashboard", icon: Home },
  { href: "/tutor/profile", label: "Profile", icon: User },
  { href: "/tutor/availability", label: "Availability", icon: Calendar },
];

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/users", label: "Users", icon: User },
  { href: "/admin/bookings", label: "Bookings", icon: Calendar },
  { href: "/admin/categories", label: "Categories", icon: Home },
];

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links =
    role === "STUDENT"
      ? studentLinks
      : role === "TUTOR"
        ? tutorLinks
        : adminLinks;

  const handleLogout = () => {
    authService.logout();
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-background border border-border shadow-sm hover:bg-muted transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-muted-foreground" />
        ) : (
          <Menu className="h-6 w-6 text-muted-foreground" />
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:sticky lg:top-0 inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out flex flex-col h-screen lg:h-screen",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="p-6 flex-shrink-0">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
            onClick={closeSidebar}
          >
            SkillBridge
          </Link>
          <p className="text-sm text-muted-foreground mt-1 font-medium">
            {role === "STUDENT"
              ? "Student"
              : role === "TUTOR"
                ? "Tutor"
                : "Admin"}{" "}
            Dashboard
          </p>
        </div>

        <nav className="flex-1 px-4">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeSidebar}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all",
                  isActive
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer rounded-lg transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}
