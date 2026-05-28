import { FreediveSiteFrame } from "@/components/freedive/freedive-site-frame";
import type { ReactNode } from "react";

export default function FreediveLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <div className="freedive-page relative">
      <FreediveSiteFrame />
      {children}
    </div>
  );
}
