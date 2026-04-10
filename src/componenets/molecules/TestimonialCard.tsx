import { Star } from "lucide-react";

type TestimonialCardProps = {
  quote: string;
  author: string;
  role: string;
};

export function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <article className="rounded-2xl border border-border/70 bg-card p-6 shadow-card">
      <div className="mb-4 flex items-center gap-1 text-primary">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={`${author}-star-${index}`} className="h-4 w-4 fill-current" aria-hidden />
        ))}
      </div>
      <p className="text-sm leading-7 text-muted-foreground">“{quote}”</p>
      <p className="mt-5 font-medium text-card-foreground">{author}</p>
      <p className="text-xs text-muted-foreground">{role}</p>
    </article>
  );
}
