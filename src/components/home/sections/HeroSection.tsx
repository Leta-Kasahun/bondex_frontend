import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import { APP_ROUTES } from "@/src/constants";
import { Button } from "@/src/components/ui/button";
import heroImage from "../../../../public/hero.png";

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden pt-16 md:pt-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_10%,rgba(95,130,170,0.2),transparent_35%),radial-gradient(circle_at_90%_20%,rgba(44,78,111,0.18),transparent_30%),linear-gradient(to_bottom,#f3f2f0,rgba(243,242,240,0.7))]" />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-10 pt-4 md:grid-cols-2 md:px-6">
        <div className="animate-in slide-in-from-left-8 duration-700">
          <p className="mb-4 inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            Revenue Engine for Growing Teams
          </p>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Turn every lead into a clear pipeline outcome.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
            Bondex gives your team one control center for lead capture, qualification, deal tracking,
            and follow-up automation, built for fast-moving sales operations.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="h-11 px-6">
              <Link href={APP_ROUTES.AUTH.REGISTER}>
                Start free trial
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 px-6">
              <Link href="#how-it-works">
                <PlayCircle className="mr-2 h-4 w-4" aria-hidden />
                See how it works
              </Link>
            </Button>
          </div>
        </div>

        <div className="animate-in slide-in-from-right-8 duration-700">
          <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/45 p-3 shadow-card-hover backdrop-blur-md">
            <Image
              src={heroImage}
              alt="Sales team collaborating with dashboard screens"
              width={1400}
              height={980}
              priority
              unoptimized
              className="h-[360px] w-full rounded-2xl object-cover md:h-[420px]"
            />
            <div className="absolute bottom-7 left-7 rounded-xl border border-white/50 bg-white/70 px-4 py-3 backdrop-blur-md">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Weekly Performance
              </p>
              <p className="font-heading text-2xl font-bold text-foreground">+28.4% Closed Deals</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
