import { NextResponse } from "next/server";
import { ApiError } from "@/lib/admin/require-auth";
import { Prisma } from "@prisma/client";

export function jsonOk<T>(data: T, status = 200): NextResponse {
  return NextResponse.json({ ok: true, data }, { status });
}

export function jsonError(
  message: string,
  status = 400,
  details?: Record<string, string>,
): NextResponse {
  return NextResponse.json({ ok: false, error: message, details }, { status });
}

export function handleApiError(error: unknown): NextResponse {
  if (error instanceof ApiError) {
    return jsonError(error.message, error.status, error.details);
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return jsonError("Já existe um registro com estes dados.", 409);
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    console.error(error);
    const devHint =
      process.env.NODE_ENV === "development"
        ? " Rode `npm run db:generate` e reinicie o servidor (`npm run dev`)."
        : "";
    return jsonError(
      `Configuração do banco desatualizada no servidor.${devHint}`,
      500,
    );
  }

  console.error(error);
  if (process.env.NODE_ENV === "development" && error instanceof Error) {
    return jsonError(`Erro interno do servidor: ${error.message}`, 500);
  }
  return jsonError("Erro interno do servidor.", 500);
}
