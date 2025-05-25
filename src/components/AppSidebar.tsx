"use client";

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
import { useRoleContext } from "@/providers/RoleProvider";
import { sidebarLinks } from "@/constants";
import { useAuthStore } from "@/store/authStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function AppSidebar() {
  const { role } = useRoleContext();
  const { user } = useAuthStore();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const currentPathRole = pathname.split("/")[1];
    if (user && user.role !== currentPathRole) {
      router.push(`/${user.role}`);
    }
  }, [user, pathname, router]);
  
  return (
    <Sidebar>
      <SidebarHeader className="bg-[#18A0FB] pt-8">
        <div className="flex flex-col justify-center items-center">
          <Image src={getMedicaLogo} alt="logo" width={50} />
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
              {sidebarLinks
                .filter((item) => role && item.role.includes(role))
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={`/${role}${item.url}`}>
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
