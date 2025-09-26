export function parseCustomDateToJsDate(date: string): Date {
  const [dd, mm, yyyy] = date.split('-').map(Number);
  if (!dd || !mm || !yyyy) throw new Error('Bad date');
  return new Date(yyyy, mm - 1, dd);
}
