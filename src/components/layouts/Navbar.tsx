"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { APP_ROUTES } from "@/src/constants";
import { useAuth } from "@/src/hooks/useAuth";
import { useAdminAuth } from "@/src/features/auths/admin";
import { useUserAuth } from "@/src/features/auths/user";
import { AuthenticatedAvatarMenu } from "@/src/features/shared";
import { Logo } from "../home/Logo";
import { NavLinks,type NavLinkItem } from "../molecules/NavLinks";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { cn } from "@/src/utils/cn";

const navLinks: NavLinkItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const router = useRouter();
  const { isAuthenticated, role, name, email, avatar } = useAuth();
  const { logoutMutation: userLogoutMutation } = useUserAuth();
  const { logoutMutation: adminLogoutMutation } = useAdminAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAmharic, setIsAmharic] = useState(false);

  const onLogout = () => {
    if (role === "ADMIN") {
      adminLogoutMutation.mutate(undefined, {
        onSettled: () => {
          setIsMenuOpen(false);
          router.push(APP_ROUTES.ROOT);
        },
      });
      return;
    }

    userLogoutMutation.mutate(undefined, {
      onSettled: () => {
        setIsMenuOpen(false);
        router.push(APP_ROUTES.ROOT);
      },
    });
  };

  const isLoggingOut = role === "ADMIN" ? adminLogoutMutation.isPending : userLogoutMutation.isPending;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <nav
        className={cn(
          "flex w-full items-center gap-3 border-b px-3 py-2.5 transition-all md:px-6",
          isScrolled
            ? "border-border/50 bg-white/85 shadow-card backdrop-blur-xl"
            : "border-border/70 bg-white/75 backdrop-blur-lg"
        )}
      >
        <div className="flex items-center gap-3">
          <Logo />
          <div className="hidden h-10 items-center gap-2 rounded-lg border border-border/70 bg-background/90 px-3 lg:flex">
            <Search className="h-4 w-4 text-muted-foreground" aria-hidden />
            <Input
              type="text"
              placeholder="Search business..."
              className="h-8 w-48 border-0 bg-transparent px-0 text-[15px] focus-visible:ring-0"
              aria-label="Search business"
            />
          </div>
        </div>

        <NavLinks links={navLinks} className="hidden xl:ml-5 xl:flex" />

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <div className="flex h-10 items-center gap-2 rounded-lg border border-border/70 bg-background/90 px-3">
            <span className={cn("text-sm font-medium", !isAmharic ? "text-foreground" : "text-muted-foreground")}>EN</span>
            <Switch checked={isAmharic} onCheckedChange={setIsAmharic} aria-label="Language layout toggle" />
            <span className={cn("text-sm font-medium", isAmharic ? "text-foreground" : "text-muted-foreground")}>AM</span>
          </div>
          {isAuthenticated && role ? (
            <AuthenticatedAvatarMenu
              role={role}
              onLogout={onLogout}
              isLoggingOut={isLoggingOut}
              name={name}
              email={email}
              avatarUrl={avatar}
            />
          ) : (
            <>
              <Button asChild variant="ghost" className="h-10 px-5 text-[15px]">
                <Link href={APP_ROUTES.AUTH.LOGIN}>Sign In</Link>
              </Button>
              <Button asChild className="h-10 px-6 text-[15px]">
                <Link href={APP_ROUTES.AUTH.REGISTER}>Start Free</Link>
              </Button>
            </>
          )}
        </div>
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/70 bg-background text-foreground md:hidden"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isMenuOpen ? (
        <div className="w-full border-b border-border/60 bg-white/90 p-4 shadow-card backdrop-blur-xl md:hidden">
          <div className="mb-4 flex h-10 items-center gap-2 rounded-lg border border-border/70 bg-background/90 px-3">
            <Search className="h-4 w-4 text-muted-foreground" aria-hidden />
            <Input
              type="text"
              placeholder="Search business..."
              className="h-8 border-0 bg-transparent px-0 text-[15px] focus-visible:ring-0"
              aria-label="Search business"
            />
          </div>
          <NavLinks
            links={navLinks}
            className="flex-col items-start gap-4"
            onNavigate={() => setIsMenuOpen(false)}
          />
          <div className="mt-4 flex items-center justify-between rounded-lg border border-border/70 bg-background/90 px-3 py-2">
            <span className="text-sm font-medium text-foreground">Language</span>
            <div className="flex items-center gap-2">
              <span className={cn("text-xs font-medium", !isAmharic ? "text-foreground" : "text-muted-foreground")}>EN</span>
              <Switch checked={isAmharic} onCheckedChange={setIsAmharic} aria-label="Language layout toggle" />
              <span className={cn("text-xs font-medium", isAmharic ? "text-foreground" : "text-muted-foreground")}>AM</span>
            </div>
          </div>
          {isAuthenticated && role ? (
            <div className="mt-4">
              <AuthenticatedAvatarMenu
                role={role}
                onLogout={onLogout}
                isLoggingOut={isLoggingOut}
                fullWidth
                name={name}
                email={email}
                avatarUrl={avatar}
              />
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button asChild variant="outline" className="h-10 text-[15px]">
                <Link href={APP_ROUTES.AUTH.LOGIN}>Sign In</Link>
              </Button>
              <Button asChild className="h-10 text-[15px]">
                <Link href={APP_ROUTES.AUTH.REGISTER}>Start Free</Link>
              </Button>
            </div>
          )}
        </div>
      ) : null}
    </header>
  );
}