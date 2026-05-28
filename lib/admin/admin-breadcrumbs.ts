export type AdminBreadcrumbItem = {
  label: string;
  href?: string;
};

const PANEL_HOME = { label: "Painel", href: "/admin/viagens" } as const;
const TRIPS_LIST = { label: "Viagens", href: "/admin/viagens" } as const;

function normalizeAdminPath(pathname: string): string {
  const path = pathname.split("?")[0]?.split("#")[0] ?? pathname;
  if (path === "/admin" || path === "/admin/") return "/admin/viagens";
  return path.replace(/\/+$/, "") || "/admin/viagens";
}

/**
 * Trilha de navegação do painel admin a partir da URL.
 * `currentLabel` substitui o rótulo da página atual (ex.: título da viagem em edição).
 */
export function getAdminBreadcrumbs(
  pathname: string,
  options?: { currentLabel?: string | null },
): AdminBreadcrumbItem[] {
  const path = normalizeAdminPath(pathname);
  const currentLabel = options?.currentLabel?.trim();

  if (!path.startsWith("/admin")) {
    return [PANEL_HOME];
  }

  if (path === "/admin/viagens") {
    return [PANEL_HOME, { label: "Viagens" }];
  }

  if (!path.startsWith("/admin/viagens/")) {
    return [PANEL_HOME];
  }

  const rest = path.slice("/admin/viagens/".length);
  const segments = rest.split("/").filter(Boolean);

  if (segments[0] === "nova") {
    return [PANEL_HOME, TRIPS_LIST, { label: "Nova viagem" }];
  }

  if (segments[0] === "preview") {
    return [PANEL_HOME, TRIPS_LIST, { label: "Prévia da página" }];
  }

  if (segments.length >= 2 && segments[1] === "editar") {
    return [
      PANEL_HOME,
      TRIPS_LIST,
      { label: currentLabel || "Editar viagem" },
    ];
  }

  return [PANEL_HOME, TRIPS_LIST];
}
