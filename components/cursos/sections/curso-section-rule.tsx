import { SectionFineRule } from "@/components/section-fine-rule";
import type { CursoSectionRuleBlock } from "@/lib/types/curso-page";
import type { ReactNode } from "react";

type CursoSectionRuleProps = {
  block: CursoSectionRuleBlock;
};

export function CursoSectionRule({ block }: CursoSectionRuleProps): ReactNode {
  return (
    <div id={block.id} className="bg-background">
      <SectionFineRule />
    </div>
  );
}
