import { AppSidebar } from "@/components/AppSidebar";
import HeroSection from "@/components/auth/HeroSection";
import Navbar from "@/components/Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full flex">
       <SidebarProvider>
          <AppSidebar />
            <div className="w-full">
            <Navbar />
            <SidebarTrigger/>
              {children}
            </div>
        </SidebarProvider>
    </div>
  );
}
