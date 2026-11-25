import type { ContactDetails } from '../types/commerce';
import type { AddressDraft } from '../components/checkout/AddressFields';
import { isValidEmail, isValidPostalCode, isValidSriLankanMobile, passwordIssues } from './validation';

export type Errors = Record<string, string>;

export function validateContact(c: ContactDetails, createAccount: boolean, password: string): Errors {
  const e: Errors = {};
  if (!c.firstName.trim()) e.firstName = 'Enter your first name.';
  if (!c.lastName.trim()) e.lastName = 'Enter your last name.';
  if (!isValidEmail(c.email)) e.email = 'Enter a valid email address, e.g. name@example.com.';
  if (!isValidSriLankanMobile(c.phone)) e.phone = 'Enter a valid Sri Lankan mobile number, e.g. 077 123 4567.';
  if (createAccount) {
    const issues = passwordIssues(password);
    if (issues.length) e.password = `Password needs: ${issues.join(', ').toLowerCase()}.`;
  }
  return e;
}

export function validateAddress(a: AddressDraft): Partial<Record<keyof AddressDraft, string>> {
  const e: Partial<Record<keyof AddressDraft, string>> = {};
  if (a.fullName.trim().length < 2) e.fullName = 'Enter the recipient’s full name.';
  if (!isValidSriLankanMobile(a.phone)) e.phone = 'Enter a valid Sri Lankan mobile number.';
  if (a.line1.trim().length < 3) e.line1 = 'Enter the house number and street.';
  if (!a.city.trim()) e.city = 'Enter the town or city.';
  if (!a.district) e.district = 'Select a district.';
  if (!isValidPostalCode(a.postalCode)) e.postalCode = 'Postal codes have 5 digits.';
  return e;
}