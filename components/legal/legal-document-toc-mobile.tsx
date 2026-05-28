"use client";

import { LegalDocumentTocSheet, type LegalDocumentTocItem } from "@/components/legal/legal-document-toc-sheet";
import { LegalDocumentTocTrigger } from "@/components/legal/legal-document-toc-trigger";
import { useState, type ReactNode } from "react";

type LegalDocumentTocMobileProps = {
  items: readonly LegalDocumentTocItem[];
};

export function LegalDocumentTocMobile({ items }: LegalDocumentTocMobileProps): ReactNode {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mb-6 lg:hidden">
        <LegalDocumentTocTrigger isOpen={open} onClick={() => setOpen(true)} />
      </div>
      <LegalDocumentTocSheet
        open={open}
        onClose={() => setOpen(false)}
        items={items}
      />
    </>
  );
}
