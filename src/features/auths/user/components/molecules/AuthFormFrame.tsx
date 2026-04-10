import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import { cn } from "@/src/utils/cn";

type AuthFormFrameProps = {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
  topIcon?: LucideIcon;
  headerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  topIconWrapClassName?: string;
  topIconClassName?: string;
};

export function AuthFormFrame({
  title,
  description,
  children,
  footer,
  topIcon: TopIcon,
  headerClassName,
  titleClassName,
  descriptionClassName,
  topIconWrapClassName,
  topIconClassName,
}: AuthFormFrameProps) {
  return (
    <Card className="w-full max-w-lg border-border/70 bg-[#FFFFFF] shadow-card-hover">
      <CardContent className="space-y-6 p-6 md:p-8">
        <div className={cn("space-y-1", headerClassName)}>
          {TopIcon ? (
            <span className={cn("mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary", topIconWrapClassName)}>
              <TopIcon className={cn("h-4 w-4", topIconClassName)} aria-hidden />
            </span>
          ) : null}
          <h1 className={cn("font-heading text-[1.95rem] font-bold text-foreground md:text-[2.1rem]", titleClassName)}>{title}</h1>
          <p className={cn("text-base text-muted-foreground", descriptionClassName)}>{description}</p>
        </div>
        {children}
        {footer ? <div className="border-t border-border/60 pt-4 text-[15px] text-muted-foreground">{footer}</div> : null}
      </CardContent>
    </Card>
  );
}
