import type { Artist, Event, Venue } from './types'

export const venues: Record<string, Venue> = {
  v_fremont: {
    id: 'v_fremont',
    name: 'Fremont Amphitheater',
    city: 'Seattle',
    region: 'WA',
    country: 'US',
    address: '3512 N Fremont Ave, Seattle, WA',
    lat: 47.6519,
    lng: -122.3493,
  },
  v_metro: {
    id: 'v_metro',
    name: 'Metro Hall',
    city: 'Seattle',
    region: 'WA',
    country: 'US',
    address: '1501 5th Ave, Seattle, WA',
    lat: 47.608,
    lng: -122.334,
  },
  v_paramount: {
    id: 'v_paramount',
    name: 'Paramount Theater',
    city: 'Seattle',
    region: 'WA',
    country: 'US',
    address: '911 Pine St, Seattle, WA',
    lat: 47.6134,
    lng: -122.3327,
  },
}

export const artists: Record<string, Artist> = {
  a_lunar_echo: {
    id: 'a_lunar_echo',
    name: 'Lunar Echo',
    genres: ['indie pop', 'dream pop'],
  },
  a_neon_pines: {
    id: 'a_neon_pines',
    name: 'Neon Pines',
    genres: ['alt rock', 'indie rock'],
  },
  a_kai_nova: {
    id: 'a_kai_nova',
    name: 'Kai Nova',
    genres: ['electronic', 'house'],
  },
  a_mira_sol: {
    id: 'a_mira_sol',
    name: 'Mira Sol',
    genres: ['latin pop', 'pop'],
  },
}

const now = new Date()
const daysFromNowIso = (days: number) => {
  const d = new Date(now)
  d.setDate(d.getDate() + days)
  d.setHours(20, 0, 0, 0)
  return d.toISOString()
}

export const events: Record<string, Event> = {
  e_001: {
    id: 'e_001',
    title: 'Lunar Echo — Live',
    startTimeIso: daysFromNowIso(12),
    venueId: 'v_paramount',
    headlinerArtistId: 'a_lunar_echo',
    lineupArtistIds: ['a_lunar_echo', 'a_neon_pines'],
    availability: 'limited',
    offers: [
      {
        partnerId: 'ticketmaster',
        purchaseUrl: '/checkout/ticketmaster/e_001',
        currency: 'USD',
        priceMin: 49,
        priceMax: 129,
        feesIncluded: false,
      },
    ],
    distanceMiles: 2.4,
    recommendedBecause: ['You follow Lunar Echo', 'Similar to artists you stream at night'],
  },
  e_002: {
    id: 'e_002',
    title: 'Kai Nova (DJ Set)',
    startTimeIso: daysFromNowIso(5),
    venueId: 'v_metro',
    headlinerArtistId: 'a_kai_nova',
    lineupArtistIds: ['a_kai_nova'],
    availability: 'available',
    offers: [
      {
        partnerId: 'seatgeek',
        purchaseUrl: '/checkout/seatgeek/e_002',
        currency: 'USD',
        priceMin: 35,
        priceMax: 85,
        feesIncluded: true,
      },
      {
        partnerId: 'ticketmaster',
        purchaseUrl: '/checkout/ticketmaster/e_002',
        currency: 'USD',
        priceMin: 39,
        priceMax: 99,
        feesIncluded: false,
      },
    ],
    distanceMiles: 1.1,
    recommendedBecause: ['Because you listen to house', 'Trending near you'],
  },
  e_003: {
    id: 'e_003',
    title: 'Mira Sol — Arena Night',
    startTimeIso: daysFromNowIso(28),
    venueId: 'v_fremont',
    headlinerArtistId: 'a_mira_sol',
    lineupArtistIds: ['a_mira_sol'],
    availability: 'sold_out',
    offers: [
      {
        partnerId: 'ticketmaster',
        purchaseUrl: '/checkout/ticketmaster/e_003',
        currency: 'USD',
        priceMin: 79,
        priceMax: 210,
        feesIncluded: false,
      },
    ],
    distanceMiles: 4.9,
    recommendedBecause: ['Top artist this month', 'Because you saved a pop playlist'],
  },
  e_004: {
    id: 'e_004',
    title: 'Neon Pines — Club Tour',
    startTimeIso: daysFromNowIso(9),
    venueId: 'v_metro',
    headlinerArtistId: 'a_neon_pines',
    lineupArtistIds: ['a_neon_pines', 'a_lunar_echo'],
    availability: 'available',
    offers: [
      {
        partnerId: 'seatgeek',
        purchaseUrl: '/checkout/seatgeek/e_004',
        currency: 'USD',
        priceMin: 29,
        priceMax: 75,
        feesIncluded: true,
      },
    ],
    distanceMiles: 1.1,
    recommendedBecause: ['Similar to your rock rotation', 'Because you liked Neon Pines radio'],
  },
}

export const allEvents = Object.values(events)
export const allArtists = Object.values(artists)
export const allVenues = Object.values(venues)

export const getEventById = (id: string) => events[id]
export const getArtistById = (id: string) => artists[id]
export const getVenueById = (id: string) => venues[id]

export const getEventsForArtist = (artistId: string) =>
  allEvents
    .filter((e) => e.lineupArtistIds.includes(artistId))
    .sort((a, b) => a.startTimeIso.localeCompare(b.startTimeIso))

