import { describe, expect, it } from "vitest";
import { buildLlmsContent } from "../llms-content";
import { siteConfig } from "../metadata";
import { siteConfig as socialConfig } from "../config";

describe("buildLlmsContent", () => {
  it("começa com o título da marca em h1", () => {
    expect(buildLlmsContent().startsWith(`# ${siteConfig.name}`)).toBe(true);
  });

  it("lista todas as páginas reais do site com URL absoluta", () => {
    const body = buildLlmsContent();
    for (const path of [
      "/",
      "/cursos",
      "/divemaster",
      "/freedive",
      "/viagens",
      "/politica-de-privacidade",
    ]) {
      expect(body).toContain(`${siteConfig.url}${path}`);
    }
  });

  it("não lista a página com noindex (niveis-avancados)", () => {
    expect(buildLlmsContent()).not.toContain("niveis-avancados");
  });

  it("inclui os links de redes sociais do siteConfig", () => {
    const body = buildLlmsContent();
    for (const url of Object.values(socialConfig.social)) {
      expect(body).toContain(url);
    }
  });
});
