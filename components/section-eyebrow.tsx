import { sectionEyebrow } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionEyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function SectionEyebrow({
  children,
  className,
}: SectionEyebrowProps): ReactNode {
  return <p className={cn(sectionEyebrow, className)}>{children}</p>;
}
