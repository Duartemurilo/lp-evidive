import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getPrismaDatasourceUrl(): string | undefined {
  const source =
    process.env.NODE_ENV === "development"
      ? process.env.POSTGRES_URL_NON_POOLING ?? process.env.POSTGRES_PRISMA_URL
      : process.env.POSTGRES_PRISMA_URL;
  if (!source) return undefined;
  if (process.env.NODE_ENV === "production") return source;

  try {
    const url = new URL(source);
    // Em dev, forçamos limites conservadores para evitar estouro com múltiplos processos next dev.
    url.searchParams.set("connection_limit", "3");
    url.searchParams.set("pool_timeout", "30");
    return url.toString();
  } catch {
    return source;
  }
}

export const prisma =
  globalForPrisma.prisma ??
  (() => {
    const datasourceUrl = getPrismaDatasourceUrl();
    return new PrismaClient({
      ...(datasourceUrl
        ? { datasources: { db: { url: datasourceUrl } } }
        : {}),
      log:
        process.env.NODE_ENV === "development"
          ? ["error", "warn"]
          : ["error"],
    });
  })();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
