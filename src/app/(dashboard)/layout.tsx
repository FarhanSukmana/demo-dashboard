import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { Toaster } from "@/components/ui/sonner";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <div className="flex flex-col w-full h-full pl-4">
          <Navbar />
          <div className="py-4 pr-4">{children}</div>
        </div>
        <Toaster position="top-right" richColors />
      </SidebarProvider>
    </ThemeProvider>
  );
}
