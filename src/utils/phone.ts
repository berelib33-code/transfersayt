/** Normalize TR / AZ mobile numbers to E.164 (+90 / +994). */
export function normalizePhone(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;

  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('00')) digits = digits.slice(2);

  if (digits.startsWith('90') && digits.length >= 12) {
    return '+' + digits.slice(0, 12);
  }
  if (digits.startsWith('994') && digits.length >= 12) {
    return '+' + digits.slice(0, 12);
  }

  if (digits.length === 11 && digits.startsWith('0')) {
    const rest = digits.slice(1);
    const azPrefixes = ['50', '51', '55', '70', '77', '99', '10', '60'];
    if (azPrefixes.includes(rest.slice(0, 2))) return '+994' + rest;
    if (rest.startsWith('5')) return '+90' + rest;
  }

  if (digits.length === 10 && digits.startsWith('5')) return '+90' + digits;
  if (digits.length === 9) return '+994' + digits;
  if (digits.length >= 10 && digits.length <= 15) return '+' + digits;
  return null;
}

export function formatPhoneDisplay(e164: string): string {
  if (e164.startsWith('+90') && e164.length === 13) {
    return `+90 ${e164.slice(3, 6)} ${e164.slice(6, 9)} ${e164.slice(9, 11)} ${e164.slice(11)}`;
  }
  if (e164.startsWith('+994') && e164.length === 13) {
    return `+994 ${e164.slice(4, 6)} ${e164.slice(6, 9)} ${e164.slice(9, 11)} ${e164.slice(11)}`;
  }
  return e164;
}

export function isValidMobile(input: string): boolean {
  return Boolean(normalizePhone(input));
}
