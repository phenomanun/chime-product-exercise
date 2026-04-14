type AnalyticsEvent =
  | {
      name: 'EventImpression'
      props: { eventId: string; surfaceId: string; rankPosition: number }
    }
  | { name: 'EventCardClick'; props: { eventId: string; surfaceId: string } }
  | { name: 'EventDetailView'; props: { eventId: string } }
  | { name: 'GetTicketsClick'; props: { eventId: string; partnerId: string } }
  | {
      name: 'PartnerLanding'
      props: { eventId: string; partnerId: string; deepLinkResult: 'success' | 'failure'; failureReason?: string }
    }
  | { name: 'PartnerConversion'; props: { eventId: string; partnerId: string; tickets: number; total: number; currency: 'USD' } }
  | { name: 'SaveEvent'; props: { eventId: string; saved: boolean } }
  | { name: 'CalendarAdd'; props: { eventId: string } }
  | { name: 'Share'; props: { eventId: string; method: 'copy_link' | 'native_share' } }

export function track(ev: AnalyticsEvent) {
  const payload = {
    ts: new Date().toISOString(),
    ...ev,
  }
  // Prototype-only: send to console so measurement is visible during demos.
  // In production this would go to an analytics pipeline.
  // eslint-disable-next-line no-console
  console.log('[analytics]', payload)
}

