import { AdminThemeProvider } from "@/components/admin/theme/admin-theme-provider";
import type { ReactNode } from "react";

export default function AdminPanelLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return <AdminThemeProvider>{children}</AdminThemeProvider>;
}
