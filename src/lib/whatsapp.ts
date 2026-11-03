export function hasWhatsApp(number: string): boolean {
  return /\d/.test(number);
}

export function whatsappUrl(number: string, message?: string): string {
  const digits = number.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
