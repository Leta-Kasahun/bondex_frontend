import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_ROUTES } from "@/src/constants";
import { Button } from "@/src/componenets/ui/button";

export function CtaSection() {
  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-[linear-gradient(120deg,rgba(44,78,111,0.9),rgba(95,130,170,0.9))] px-6 py-10 text-primary-foreground shadow-card-hover md:px-10 md:py-12">
          <Image
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80"
            alt="Team collaborating to launch CRM workspace"
            fill
            className="object-cover opacity-20"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(44,78,111,0.82),rgba(95,130,170,0.85))]" />
          <div className="relative z-10">
          <h2 className="font-heading text-3xl font-semibold md:text-4xl">
            Build a predictable CRM engine with Bondex
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-primary-foreground/90 md:text-base">
            Start with your current lead process, apply automation where it matters, and scale revenue
            operations with confidence.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-7 h-11 px-6">
            <Link href={APP_ROUTES.AUTH.REGISTER}>
              Create your workspace
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
