import Link from "next/link";
import { cn } from "@/src/utils/cn";

export type NavLinkItem = {
  label: string;
  href: string;
};

type NavLinksProps = {
  links: NavLinkItem[];
  className?: string;
  onNavigate?: () => void;
};

export function NavLinks({ links, className, onNavigate }: NavLinksProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          onClick={onNavigate}
          className="rounded-md px-3.5 py-2 text-[1.02rem] font-medium text-primary transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
