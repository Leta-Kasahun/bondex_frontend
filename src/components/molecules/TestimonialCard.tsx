type TestimonialCardProps = {
  quote: string;
  author: string;
  role: string;
};

export function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card/70 p-5 shadow-card">
      <p className="text-sm leading-6 text-muted-foreground">“{quote}”</p>
      <p className="mt-4 font-semibold text-foreground">{author}</p>
      <p className="text-xs text-muted-foreground">{role}</p>
    </div>
  );
}
