import { buildLlmsContent } from "@/lib/llms-content";

export const revalidate = 3600;

export async function GET() {
  return new Response(buildLlmsContent(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
