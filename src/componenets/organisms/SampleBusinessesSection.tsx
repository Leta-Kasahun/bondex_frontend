import Image from "next/image";
import Link from "next/link";
import { Building2, MapPin, Star } from "lucide-react";
import { APP_ROUTES } from "@/src/constants";
import { SectionHeader } from "@/src/componenets/atoms/SectionHeader";
import { Button } from "@/src/componenets/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/componenets/ui/card";

const sampleBusinesses = [
  {
    name: "Addis Growth Labs",
    category: "Marketing Agency",
    location: "Addis Ababa",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Blue Nile Logistics",
    category: "Supply Chain",
    location: "Bole, Addis Ababa",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Habesha Retail Group",
    category: "Retail",
    location: "Megenagna",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?auto=format&fit=crop&w=900&q=80",
  },
];

export function SampleBusinessesSection() {
  return (
    <section id="about" className="py-16 bg-accent/20">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <SectionHeader
          eyebrow="Business directory"
          title="Sample businesses on Bondex"
          description="Preview how businesses are listed so users can search, evaluate, and contact the right fit quickly."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {sampleBusinesses.map((business) => (
            <Card key={business.name} className="border border-border/70">
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={business.image}
                  alt={business.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <CardHeader className="border-b border-border/60">
                <CardTitle className="text-lg">{business.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-4">
                <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="h-4 w-4" aria-hidden />
                  {business.category}
                </p>
                <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" aria-hidden />
                  {business.location}
                </p>
                <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-current text-primary" aria-hidden />
                  {business.rating} rating
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={APP_ROUTES.PUBLIC.HOME}>View profile</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
