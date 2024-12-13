const formatters = new Map<string, Intl.NumberFormat>();

export function getCurrencyFormatter(locale: string = 'nl-NL') {
  if (!formatters.has(locale)) {
    formatters.set(locale, new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
    }));
  }
  return formatters.get(locale)!;
}