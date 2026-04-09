"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarButton,
  NavbarLogo,
  NavBody,
  NavItems,
} from "@/components/ui/resizable-navbar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { authService } from "@/lib/services";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type User = {
  id: string;
  email: string;
  name: string;
  role: "STUDENT" | "TUTOR" | "ADMIN";
  createdAt: string;
  updatedAt: string;
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser) as User);
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
        setUser(null);
      }
    }
  }, []);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "All Tutors", link: "/tutors" },
    { name: "Blog", link: "/blog" },
  ];

  if (user) {
    switch (user.role) {
      case "STUDENT":
        navItems.push({ name: "Dashboard", link: "/dashboard" });
        break;
      case "TUTOR":
        navItems.push({ name: "Dashboard", link: "/tutor/dashboard" });
        break;
      case "ADMIN":
        navItems.push({ name: "Dashboard", link: "/admin" });
        break;
    }
  }

  const dropdownMenuItem = {
    name: "Dashboard",
    link: "/dashboard",
  };

  if (user) {
    switch (user.role) {
      case "STUDENT":
        dropdownMenuItem.link = "/dashboard";
        break;
      case "TUTOR":
        dropdownMenuItem.link = "/tutor/dashboard";

        break;
      case "ADMIN":
        dropdownMenuItem.link = "/admin";
        break;
    }
  }

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center space-x-2">
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <div className="flex items-center gap-3">
                  <ModeToggle />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-10 w-10 p-0 border border-border bg-card hover:bg-muted transition-colors"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="font-bold text-primary flex items-center justify-center">
                            {user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 p-2 rounded-xl" align="end">
                      <div className="px-3 py-2 border-b border-border mb-1">
                        <p className="text-sm font-bold truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() =>
                            (window.location.href = dropdownMenuItem.link)
                          }
                          className="cursor-pointer rounded-lg px-3 py-2"
                        >
                          {dropdownMenuItem.name}
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator className="my-1" />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={handleLogout}
                          className="cursor-pointer text-destructive focus:text-destructive rounded-lg px-3 py-2"
                        >
                          Log out
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <>
                <div className="flex gap-3 items-center">
                  <ModeToggle />
                  <NavbarButton
                    className="bg-muted text-foreground hover:bg-muted/80 border-border"
                    href="/login"
                  >
                    Login
                  </NavbarButton>
                  <NavbarButton
                    className="bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20"
                    href="/register"
                  >
                    Get Started
                  </NavbarButton>
                </div>
              </>
            )}
          </div>
        </div>
      </NavBody>
      <MobileNav visible={mobileMenuOpen}>
        <MobileNavHeader>
          <NavbarLogo />
          <div className="flex items-center space-x-2">
            <ModeToggle />
            <MobileNavToggle
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </div>
        </MobileNavHeader>
        <MobileNavMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        >
          <NavItems
            items={navItems}
            className="flex flex-col space-x-0 space-y-4 relative w-full items-start"
          />
          <div className="flex items-center space-x-2">
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  <div className="flex items-center flex-col gap-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full cursor-pointer"
                        >
                          <Avatar>
                            <AvatarFallback className="font-bold text-primary">
                              <span className="text-white font-bold text-xl">
                                {user?.name
                                  ?.trim()
                                  .split(/\s+/)
                                  .slice(0, 2)
                                  .map((w) => w[0].toUpperCase())
                                  .join("")}
                              </span>
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-32">
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() =>
                              (window.location.href = dropdownMenuItem.link)
                            }
                            className="cursor-pointer"
                          >
                            {dropdownMenuItem.name}
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={handleLogout}
                            variant="destructive"
                            className="cursor-pointer"
                          >
                            Log out
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <NavbarButton
                      className="dark:bg-primary dark:text-white"
                      href="/contact"
                    >
                      Get Started
                    </NavbarButton>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-3 flex-col">
                    <NavbarButton
                      className="dark:bg-primary dark:text-white"
                      href="/login"
                    >
                      Login
                    </NavbarButton>
                    <NavbarButton
                      className="dark:bg-primary dark:text-white"
                      href="/register"
                    >
                      Sign Up
                    </NavbarButton>
                  </div>
                </>
              )}
            </div>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
