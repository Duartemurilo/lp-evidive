import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Entrar | EviDive Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage(): Promise<ReactNode> {
  const { userId } = await auth();
  if (userId) {
    redirect("/admin/viagens");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#163e48] px-4 py-12">
      <SignIn
        path="/admin/login"
        routing="path"
        signUpUrl="/sign-up"
        forceRedirectUrl="/admin/viagens"
      />
    </div>
  );
}
