import { CalendarDays, CalendarClock } from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import getMedicaLogo from "../assets/logo-white.png";
// Menu items.
const items = [
  {
    title: "Availability",
    url: "/doctor",
    icon: CalendarDays,
  },
  {
    title: "Appointments",
    url: "/doctor/appointments",
    icon: CalendarClock,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="bg-[#18A0FB] pt-8">
        <div className="flex flex-col justify-center items-center">
          <Image src={getMedicaLogo} alt="logo" width={50}/>
          <span className="font-bold text-white text-2xl mt-2">GETMEDICA</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-[#18A0FB] text-white">
        <SidebarGroup>
          {/* <SidebarGroupLabel className="text-2xl text-white">
            GETMEDICA
          </SidebarGroupLabel> */}
          <SidebarGroupContent className="">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={`${item.url}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
