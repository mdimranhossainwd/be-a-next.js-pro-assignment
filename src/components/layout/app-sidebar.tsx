import * as React from "react";

// import { SearchForm } from "@/components/layout/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { adminRoute } from "@/routes/adminRoute";
import { studentRoute } from "@/routes/studentRoute";
import { tutorRoute } from "@/routes/tutorRoute";
import { Router } from "@/types";
import Link from "next/link";

export function AppSidebar({
  user,
  ...props
}: { user: { role: string } } & React.ComponentProps<typeof Sidebar>) {
  let routes: Router[] = [];

  switch (user?.role) {
    case "ADMIN":
      routes = adminRoute;
      break;

    case "STUDENT":
      routes = studentRoute;
      break;

    case "TUTOR":
      routes = tutorRoute;
      break;

    default:
      routes = [];
      break;
  }
  return (
    <Sidebar {...props}>
      <SidebarHeader>{/* <SearchForm /> */}</SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="text-lg font-bold text-center pb-6 border-b-2">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
