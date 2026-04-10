import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { APP_ROUTES } from "@/src/constants";
import { cn } from "@/src/utils/cn";

const BONDEX_LOGO_ALT = "Bondex CRM";
const bondexLogo = "/bondex.png";

type LogoProps = {
  className?: string;
  imageClassName?: string;
  href?: string;
  imageProps?: Partial<ImageProps>;
};

export function Logo({
  className,
  imageClassName,
  href = APP_ROUTES.ROOT,
  imageProps,
}: LogoProps) {
  const content = (
    <div className={cn("flex items-center", className)}>
      <Image
        src={bondexLogo}
        alt={BONDEX_LOGO_ALT}
        width={96}
        height={96}
        unoptimized
        priority
        className={cn("h-16 w-16 object-contain md:h-18 md:w-18", imageClassName)}
        {...imageProps}
      />
    </div>
  );

  return (
    <Link href={href} aria-label="Go to Bondex home" className="inline-flex shrink-0">
      {content}
    </Link>
  );
}