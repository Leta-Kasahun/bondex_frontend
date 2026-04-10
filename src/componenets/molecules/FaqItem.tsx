import { AccordionContent, AccordionItem, AccordionTrigger } from "@/src/componenets/ui/accordion";

type FaqItemProps = {
  value: string;
  question: string;
  answer: string;
};

export function FaqItem({ value, question, answer }: FaqItemProps) {
  return (
    <AccordionItem
      value={value}
      className="rounded-xl border border-border/70 bg-card px-5 py-2 shadow-card"
    >
      <AccordionTrigger className="text-base text-card-foreground hover:no-underline">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-sm leading-6 text-muted-foreground">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
}
