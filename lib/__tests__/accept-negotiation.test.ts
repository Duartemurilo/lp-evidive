import { describe, expect, it } from "vitest";
import { appendVaryAccept, preferredResponseType } from "../accept-negotiation";

describe("preferredResponseType", () => {
  it("sem header Accept, prefere text/html (a maioria do tráfego real)", () => {
    expect(preferredResponseType(null)).toBe("text/html");
  });

  it("Accept: text/markdown escolhe markdown", () => {
    expect(preferredResponseType("text/markdown")).toBe("text/markdown");
  });

  it("Accept: text/html escolhe html", () => {
    expect(preferredResponseType("text/html")).toBe("text/html");
  });

  it("*/* (curl default, navegadores antigos) cai em text/html", () => {
    expect(preferredResponseType("*/*")).toBe("text/html");
  });

  it("navegador típico (text/html com q mais alto que outros tipos) escolhe html", () => {
    expect(
      preferredResponseType(
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      ),
    ).toBe("text/html");
  });

  it("q-value decide entre os dois quando ambos estão presentes", () => {
    expect(preferredResponseType("text/html;q=0.5, text/markdown;q=0.9")).toBe(
      "text/markdown",
    );
    expect(preferredResponseType("text/html;q=0.9, text/markdown;q=0.5")).toBe(
      "text/html",
    );
  });

  it("empate em q entre */* e um tipo exato: a ordem no header desempata", () => {
    expect(preferredResponseType("*/*, text/markdown")).toBe("text/html");
    expect(preferredResponseType("text/markdown, */*")).toBe("text/markdown");
  });

  it("empate em q e especificidade: a ordem no header desempata", () => {
    expect(preferredResponseType("text/markdown, text/html")).toBe("text/markdown");
    expect(preferredResponseType("text/html, text/markdown")).toBe("text/html");
  });

  it("Accept sem nenhum dos dois tipos aceitos devolve null (o chamador responde 406)", () => {
    expect(preferredResponseType("application/json")).toBeNull();
  });

  it("q=0 explícito descarta o tipo mesmo se ele aparece no header", () => {
    expect(preferredResponseType("text/markdown;q=0, text/html;q=0.1")).toBe(
      "text/html",
    );
  });

  it("header vazio ou só espaços cai no default text/html", () => {
    expect(preferredResponseType("")).toBe("text/html");
  });
});

describe("appendVaryAccept", () => {
  it("sem Vary existente, define Vary: Accept", () => {
    const headers = new Headers();
    appendVaryAccept(headers);
    expect(headers.get("Vary")).toBe("Accept");
  });

  it("com Vary existente sem Accept, acrescenta preservando o que já tinha", () => {
    const headers = new Headers({ Vary: "Accept-Encoding" });
    appendVaryAccept(headers);
    expect(headers.get("Vary")).toBe("Accept-Encoding, Accept");
  });

  it("não duplica Accept se já estiver presente (case-insensitive)", () => {
    const headers = new Headers({ Vary: "accept, Accept-Encoding" });
    appendVaryAccept(headers);
    expect(headers.get("Vary")).toBe("accept, Accept-Encoding");
  });
});
