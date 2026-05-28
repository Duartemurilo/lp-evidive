import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Criar conta | EviDive Admin",
  robots: { index: false, follow: false },
};

export default function SignUpPage(): ReactNode {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
}
