import Image from "next/image";
import { ShieldCheck, Sparkles, Workflow } from "lucide-react";

type AuthSplitPanelProps = {
  imageSrc: string;
  imageAlt: string;
  heading: string;
  description: string;
};

export function AuthSplitPanel({ imageSrc, imageAlt, heading, description }: AuthSplitPanelProps) {
  return (
    <aside className="relative hidden min-h-screen overflow-hidden border-r border-border/60 lg:block">
      <Image src={imageSrc} alt={imageAlt} fill priority className="object-cover" sizes="50vw" />
      <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(30,41,59,0.6),rgba(44,78,111,0.72))]" />
      <div className="relative z-10 flex h-full flex-col justify-between p-10 text-primary-foreground">
        <div>
          <p className="inline-flex rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Bondex Registration
          </p>
          <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight">{heading}</h2>
          <p className="mt-3 max-w-md text-sm leading-7 text-primary-foreground/90">{description}</p>
        </div>
        <div className="grid gap-3 text-sm">
          <div className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" aria-hidden /> Secure account onboarding</div>
          <div className="inline-flex items-center gap-2"><Workflow className="h-4 w-4" aria-hidden /> Clear onboarding flow</div>
          <div className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4" aria-hidden /> Brand-consistent UI</div>
        </div>
      </div>
    </aside>
  );
}
