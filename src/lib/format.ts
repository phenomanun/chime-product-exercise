export function formatDateTime(iso: string) {
  const d = new Date(iso)
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(d)
}

export function formatDistanceMiles(miles?: number) {
  if (miles == null) return null
  if (miles < 0.1) return '<0.1 mi'
  return `${miles.toFixed(1)} mi`
}

