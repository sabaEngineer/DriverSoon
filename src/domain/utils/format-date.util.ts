export function formatDate(date: Date): {
  DateInGeorgian: string;
  date: string;
} {
  const months = [
    'იანვარს',
    'თებერვალს',
    'მარტს',
    'აპრილს',
    'მაისს',
    'ივნისს',
    'ივლისს',
    'აგვისტოს',
    'სექტემბერს',
    'ოქტომბერს',
    'ნოემბერს',
    'დეკემბერს',
  ];
  const d = new Date(date);
  const day = d.getDate();
  const monthName = months[d.getMonth()];
  const iso = `${String(d.getDate()).padStart(2, '0')}-${String(
    d.getMonth() + 1,
  ).padStart(2, '0')}-${d.getFullYear()}`;

  return { date: iso, DateInGeorgian: `${day} ${monthName} ` };
}
