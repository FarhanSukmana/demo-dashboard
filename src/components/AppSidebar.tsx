"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  Calendar,
  ChevronUp,
  Home,
  Settings,
  Users,
  FolderHeart,
  LogOut,
  Building,
  Video,
  Car,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

// Menu items.
const items = [
  { title: "Beranda", url: "/", icon: Home },
  { title: "Rumah Negara", url: "/rumah-negara", icon: Building },
  { title: "Room Meeting", url: "/room-meeting", icon: Video },
  { title: "Kendaraan Dinas", url: "/kendaraan-dinas", icon: Car },
  { title: "Perizinan Kegiatan", url: "/perizinan-kegiatan", icon: Calendar },
  { title: "Settings", url: "/settings", icon: Settings },
];

const expert = [
  {
    title: "Recommendation Expert",
    url: "/recommendation-expert",
    icon: FolderHeart,
  },
  { title: "Daftar Expert", url: "/daftar-expert", icon: Users },
];

const AppSidebar = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const user = Cookies.get("username");
    if (!user) {
      router.push("/login");
    } else {
      setUsername(user);
    }
  }, [router]);

  return (
    <Sidebar collapsible="icon">
      {/* Header */}
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={"/"}>
                <Image
                  src="/assets/img/kemenkumham.png"
                  alt="logo"
                  width={20}
                  height={20}
                />
                <span>Kemenkumham SI</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator />
      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Avatar>
                    <AvatarImage src="/assets/img/unnamed.png" alt="profile" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  {username || "Guest"} <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent sideOffset={10} side="top" align="end">
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => {
                    Cookies.remove("username");
                    router.push("/login");
                  }}
                >
                  <LogOut
                    className="w-[1.2rem] h-[1.2rem] mr-2"
                    onClick={() => {
                      Cookies.remove("username"); // hapus cookies
                      router.push("/login"); // redirect ke halaman login
                    }}
                  />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
