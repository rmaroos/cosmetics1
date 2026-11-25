export function normalisePhone(value: string): string {
  return value.replace(/[\s()-]/g, '');
}

/** Sri Lankan mobile numbers: 07XXXXXXXX, 7XXXXXXXX or +947XXXXXXXX */
export function isValidSriLankanMobile(value: string): boolean {
  return /^(?:\+94|0094|0)?7[0-8]\d{7}$/.test(normalisePhone(value));
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function passwordIssues(value: string): string[] {
  const issues: string[] = [];
  if (value.length < 8) issues.push('At least 8 characters');
  if (!/[A-Z]/.test(value)) issues.push('One uppercase letter');
  if (!/[a-z]/.test(value)) issues.push('One lowercase letter');
  if (!/\d/.test(value)) issues.push('One number');
  return issues;
}

export function isValidPostalCode(value: string): boolean {
  return value.trim() === '' || /^\d{5}$/.test(value.trim());
}

export function sanitiseText(value: string, max = 2000): string {
  return value.replace(/[<>]/g, '').slice(0, max);
}

export const REVIEW_PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const REVIEW_PHOTO_MAX_BYTES = 5 * 1024 * 1024;
export const REVIEW_PHOTO_MAX_COUNT = 3;