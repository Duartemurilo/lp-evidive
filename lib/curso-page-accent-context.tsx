"use client";

import { sectionWaveWrapOnLight } from "@/lib/typography";
import { createContext, useContext, type ReactNode } from "react";

export type CursoPageAccent = "primary" | "foreground";

const CursoPageAccentContext = createContext<CursoPageAccent>("foreground");

export function CursoPageAccentProvider({
  accent = "foreground",
  children,
}: {
  accent?: CursoPageAccent;
  children: ReactNode;
}): ReactNode {
  return (
    <CursoPageAccentContext.Provider value={accent}>{children}</CursoPageAccentContext.Provider>
  );
}

export function useCursoPageAccent(): CursoPageAccent {
  return useContext(CursoPageAccentContext);
}

export function useCursoTitleDisplayClassName(): string {
  return useCursoPageAccent() === "primary" ? "text-primary" : "text-foreground";
}

export function useCursoWaveWrapClassName(): string {
  return useCursoPageAccent() === "primary" ? "text-primary" : sectionWaveWrapOnLight;
}

export function useCursoTimelineAccent(): CursoPageAccent {
  return useCursoPageAccent();
}
