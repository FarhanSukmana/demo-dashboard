"use client";
import { Moon, Sun, Bell } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { SidebarTrigger } from "./ui/sidebar";
import { usePathname } from "next/navigation";

// contoh data notifikasi
const notifications = [
  { id: 1, message: "Rumah #12 ditambahkan", time: "5 menit lalu" },
  { id: 2, message: "Kegiatan Rapat Bulanan disetujui", time: "15 menit lalu" },
  {
    id: 3,
    message: "Kendaraan B1234AB memerlukan service",
    time: "1 jam lalu",
  },
  { id: 4, message: "Ruangan Meeting A1 dibooking", time: "2 jam lalu" },
  { id: 5, message: "Perizinan kegiatan X ditolak", time: "3 jam lalu" },
];

const Navbar: React.FC = () => {
  const { setTheme } = useTheme();
  const pathname = usePathname();

  const getTitle = (): string => {
    if (pathname === "/") return "Dashboard";

    // Ambil segmen pertama setelah /
    const segment = pathname?.split("/")[1] ?? "";

    const specialCases: Record<string, string> = {
      "recommendation-expert": "Recommendation Expert",
    };

    if (specialCases[segment]) return specialCases[segment];
    if (!segment) return "Dashboard";

    // Ubah "rumah-negara" -> "Rumah Negara"
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <nav className="flex justify-between w-full h-full p-4 bg-card rounded-lg border shadow-sm">
      <div className="flex gap-4">
        <SidebarTrigger />
        <h1 className="text-black dark:text-white font-semibold text-xl">
          {getTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-[1.2rem] w-[1.2rem]" />
              {/* indikator jumlah notifikasi */}
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                {notifications.length}
              </span>
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notif) => (
              <DropdownMenuItem
                key={notif.id}
                className="flex flex-col items-start"
              >
                <span className="text-sm text-black dark:text-white">
                  {notif.message}
                </span>
                <span className="text-xs text-muted-foreground">
                  {notif.time}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* DarkMode */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:hidden" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] hidden dark:block transition-all" />
              <span className="sr-only">Toggle Theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" alignOffset={15}>
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
