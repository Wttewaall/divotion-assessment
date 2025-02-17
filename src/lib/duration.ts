const translations = {
  nl: {
    day: 'dag',
    days: 'dagen',
    hour: 'uur',
    hours: 'uren',
    minute: 'minuut',
    minutes: 'minuten',
    second: 'seconde',
    seconds: 'seconden',
    millisecond: 'milliseconde',
    milliseconds: 'milliseconden',
  },
};

type Locale = keyof typeof translations;
type TimeUnit = keyof (typeof translations)['nl'];

export const formatDuration = (ms: number, locale?: Locale) => {
  ms = Math.abs(ms); // positive values only for now

  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000,
  };

  const getNotation = (key: string, val: number) => {
    const timeUnit = `${key}${val !== 1 ? 's' : ''}` as TimeUnit;
    return (locale && translations[locale][timeUnit]) || timeUnit;
  };

  return Object.entries(time)
    .filter((val) => val[1] !== 0)
    .map(([key, val]) => `${val} ${getNotation(key, val)}`)
    .join(', ');
};

// example
formatDuration(1001); // '1 second, 1 millisecond'
formatDuration(34325055574, 'nl'); // '397 dagen, 6 uren, 44 minuten, 15 seconden, 574 milliseconden'
