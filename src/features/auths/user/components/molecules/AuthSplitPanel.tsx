import Image from "next/image";
import { ShieldCheck, Sparkles, Workflow } from "lucide-react";

type AuthSplitPanelProps = {
  imageSrc: string;
  imageAlt: string;
  heading: string;
  description: string;
  showTextContent?: boolean;
  showHighlights?: boolean;
  useBrandedBlurBackground?: boolean;
  imageClassName?: string;
  imageFit?: "cover" | "contain";
  overlayClassName?: string;
};

export function AuthSplitPanel({
  imageSrc,
  imageAlt,
  heading,
  description,
  showTextContent = true,
  showHighlights = true,
  useBrandedBlurBackground = false,
  imageClassName = "",
  imageFit = "cover",
  overlayClassName = "bg-[linear-gradient(130deg,rgba(30,41,59,0.6),rgba(44,78,111,0.72))]",
}: AuthSplitPanelProps) {
  return (
    <aside className="relative hidden min-h-screen overflow-hidden border-r border-border/60 lg:block">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className={`${imageFit === "contain" ? "object-contain" : "object-cover"} ${useBrandedBlurBackground ? "scale-100 blur-[0.6px] saturate-115 brightness-95" : ""} ${imageClassName}`}
        sizes="50vw"
      />
      {useBrandedBlurBackground ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(139,170,207,0.34),transparent_42%),radial-gradient(circle_at_78%_72%,rgba(44,78,111,0.36),transparent_48%)]" />
      ) : null}
      <div className={`absolute inset-0 ${overlayClassName}`} />
      <div className="relative z-10 flex h-full flex-col justify-between p-10 text-primary-foreground">
        {showTextContent ? (
          <div>
            <p className="inline-flex rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              Bondex Registration
            </p>
            <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight">{heading}</h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-primary-foreground/90">{description}</p>
          </div>
        ) : null}
        {showHighlights ? (
          <div className="grid gap-3 text-sm">
            <div className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" aria-hidden /> Secure account onboarding</div>
            <div className="inline-flex items-center gap-2"><Workflow className="h-4 w-4" aria-hidden /> Clear onboarding flow</div>
            <div className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4" aria-hidden /> Brand-consistent UI</div>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
