import { adminClerkAppearance } from "@/lib/admin/clerk-auth-appearance";
import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Entrar | EviDive Admin",
  robots: { index: false, follow: false },
};

export default function SignInPage(): ReactNode {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <SignIn
        path="/sign-in"
        routing="path"
        appearance={adminClerkAppearance}
      />
    </div>
  );
}
