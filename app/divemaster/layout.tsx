import { DivemasterSiteFrame } from "@/components/divemaster/divemaster-site-frame";
import type { ReactNode } from "react";

export default function DivemasterLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <div className="divemaster-page relative">
      <DivemasterSiteFrame />
      {children}
    </div>
  );
}
