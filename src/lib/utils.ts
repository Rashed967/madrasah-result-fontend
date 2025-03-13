import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toBengaliNumber(number: number | string | undefined): string {
  if (number === undefined || number === null) return '';

  const bengaliNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return number.toString().replace(/[0-9]/g, (digit) => bengaliNumerals[parseInt(digit)]);
}

export function toEnglishNumber(number: number | string | undefined): string {
  if (number === undefined || number === null) return '';

  const englishNumerals = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  return number.toString().replace(/[০-৯]/g, (digit) => englishNumerals[parseInt(digit)]);
}
