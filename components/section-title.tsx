import {
  heroTitleBase,
  sectionTitleBase,
  sectionTitleDisplay,
  sectionTitleLargeBase,
  sectionTitleSans,
} from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionTitleProps = {
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  sans?: string;
  display?: string;
  className?: string;
  sansClassName?: string;
  displayClassName?: string;
  /** Destaque na mesma linha que `sans` (ex.: “O Universo Evidive”) */
  displayInline?: boolean;
  size?: "default" | "large" | "hero";
};

export function SectionTitle({
  as: Tag = "h2",
  id,
  sans,
  display,
  className,
  sansClassName,
  displayClassName,
  displayInline = false,
  size = "default",
}: SectionTitleProps): ReactNode {
  const sizeClass =
    size === "hero"
      ? heroTitleBase
      : size === "large"
        ? sectionTitleLargeBase
        : sectionTitleBase;

  const displayEl = display ? (
    <span className={cn(sectionTitleDisplay, displayClassName)}>{display}</span>
  ) : null;

  return (
    <Tag id={id} className={cn(sizeClass, className)}>
      {displayInline && display && sans ? (
        <span className={cn(sectionTitleSans, sansClassName)}>
          {sans}
          {displayEl}
        </span>
      ) : (
        <>
          {sans ? (
            <span className={cn("block", sectionTitleSans, sansClassName)}>{sans}</span>
          ) : null}
          {display ? (
            <span
              className={cn(
                sans ? "mt-1 block" : "block",
                sectionTitleDisplay,
                displayClassName,
              )}
            >
              {display}
            </span>
          ) : null}
        </>
      )}
    </Tag>
  );
}

export function SectionTitleSans({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}): ReactNode {
  return <span className={cn(sectionTitleSans, className)}>{children}</span>;
}

export function SectionTitleDisplay({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}): ReactNode {
  return <span className={cn(sectionTitleDisplay, className)}>{children}</span>;
}
