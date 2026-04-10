import { AccordionContent, AccordionItem, AccordionTrigger } from "@/src/components/ui/accordion";

type FaqItemProps = {
  value: string;
  question: string;
  answer: string;
};

export function FaqItem({ value, question, answer }: FaqItemProps) {
  return (
    <AccordionItem value={value} className="rounded-lg border border-border/70 px-4">
      <AccordionTrigger>{question}</AccordionTrigger>
      <AccordionContent className="text-muted-foreground">{answer}</AccordionContent>
    </AccordionItem>
  );
}
