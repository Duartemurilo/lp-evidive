/** Número oficial Evidive (DDI + DDD + número, sem símbolos). */
export const EVIDIVE_WHATSAPP_PHONE = "551150394125";

export function buildWhatsAppUrl(text?: string): string {
  const params = new URLSearchParams({
    phone: EVIDIVE_WHATSAPP_PHONE,
    type: "phone_number",
    app_absent: "0",
  });

  if (text) {
    params.set("text", text);
  }

  return `https://api.whatsapp.com/send/?${params.toString()}`;
}
