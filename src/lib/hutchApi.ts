export const HUTCH_COUNTRY_CODE = "94";

export interface HutchSession {
  msisdn: string;
  actDate: string;
  renewDate: string;
  pricePoint: string;
  validity: string;
  unsubUrl: string;
}

export function normalizeHutchMsisdn(input: string): string {
  return input.replace(/\D/g, "");
}

export function isValidHutchMsisdn(input: string): boolean {
  const digits = input.replace(/\D/g, "");
  return digits.length >= 5;
}
