export const toISODateString = (date: Date | string) => {
  const d = typeof date == 'string' ? new Date(date) : date;
  return d.toISOString().match(/[\d-]+/)?.[0] || '';
};
