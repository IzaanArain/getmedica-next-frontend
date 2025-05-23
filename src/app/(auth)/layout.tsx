import HeroSection from "@/components/auth/HeroSection";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
        <div className="hidden md:block flex-1">
            <HeroSection/>
        </div>
        <div className="flex-1">
            {children}
        </div>
    </div>
  );
}
