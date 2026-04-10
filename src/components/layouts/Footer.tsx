import Link from "next/link";
import { Logo } from "@/src/components/home/Logo";

export function Footer() {
  const footerGroups = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Integrations", href: "#integrations" },
        { label: "AI", href: "#ai" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "Sales Teams", href: "#about" },
        { label: "Operations", href: "#features" },
        { label: "Enterprise CRM", href: "#pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#about" },
        { label: "Testimonials", href: "#testimonials" },
        { label: "FAQ", href: "#faq" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "API", href: "#" },
        { label: "Status", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Security", href: "#" },
      ],
    },
  ];

  return (
    <footer id="contact" className="border-t border-border/60 bg-card/70 py-10">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-6 md:px-6">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-base leading-7 text-muted-foreground">
            Bondex helps teams manage leads, pipeline operations, and conversion workflows in one place.
          </p>
          <p className="mt-4 text-base text-muted-foreground">hello@bondexcrm.com</p>
          <p className="text-base text-muted-foreground">+251 900 000 000</p>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title}>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">
              {group.title}
            </h3>
            <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              {group.links.map((link) => (
                <Link key={link.label} className="hover:text-primary" href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-8 w-full max-w-7xl border-t border-border/60 px-4 pt-4 text-xs text-muted-foreground md:px-6">
        <p>© {new Date().getFullYear()} Bondex CRM. All rights reserved.</p>
      </div>
    </footer>
  );
}
