import { describe, expect, it } from "vitest";
import { buildMarkdownNotFound } from "../markdown-not-found";
import { siteConfig } from "../metadata";

describe("buildMarkdownNotFound", () => {
  it("inclui o pathname pedido no corpo", () => {
    expect(buildMarkdownNotFound("/nao-existe")).toContain("`/nao-existe`");
  });

  it("aponta para home, sitemap e llms.txt do domínio canônico", () => {
    const body = buildMarkdownNotFound("/qualquer-coisa");
    expect(body).toContain(`${siteConfig.url}/`);
    expect(body).toContain(`${siteConfig.url}/sitemap.xml`);
    expect(body).toContain(`${siteConfig.url}/llms.txt`);
  });

  it("é markdown válido (título h1 + blockquote)", () => {
    const body = buildMarkdownNotFound("/x");
    expect(body.startsWith("# ")).toBe(true);
    expect(body).toContain("> ");
  });
});
