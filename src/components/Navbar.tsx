"use client";

import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import getMedicaLogo from "../assets/logo-blue.png";
import Logoutbutton from "./auth/LogoutButton";
import { Bell } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const Navbar = () => {
  const { user } = useAuthStore();
  return (
    <div className="bg-[#F2F5F6] text-white py-4 px-5 flex justify-end items-center gap-10">
      {/* <Image src={getMedicaLogo} alt="logo" width={40} /> */}
      <div className="flex justify-center items-center gap-5">
        <div className="flex justify-center items-center bg-blue-500 rounded-full p-2">
          <Bell />
        </div>
        <div className="text-black flex flex-col ">
          <span>Welcome</span>
          <span className="font-bold">
            {user?.role === "doctor" && "Dr. "}
            {user?.name}
          </span>
        </div>
      </div>
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar className="size-12">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="text-black">Z</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>
            <Link href={"/profile"}>Profile</Link>
          </DropdownMenuItem> */}
            <Logoutbutton />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
