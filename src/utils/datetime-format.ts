import { formatInTimeZone } from "date-fns-tz";

/**
 * Return datetime in specified format.
 * @param date time in format yyyy-mm-ddThh:mm:ss[+/-hh:mm].For i.e: 2023-11-22T03:17:00+09:00
 * @param format 
 * @returns time in specified format. i.e: 
 * - EEEE, dd MMMM HH:mm. e.g: Monday, 22 November 03:17
 * - HH:mm. e.g: 09:00
 */
export const datetimeFormatter = (date: string, format: string): string => {
  const timezone = date.substring(date.length - 6, date.length);
  const parsedDate = new Date(date);
  return formatInTimeZone(parsedDate, timezone, format);
};
