export type PartnerId = 'ticketmaster' | 'seatgeek'

export type Availability = 'available' | 'limited' | 'sold_out' | 'unknown'

export type Venue = {
  id: string
  name: string
  city: string
  region?: string
  country: string
  address: string
  lat: number
  lng: number
}

export type Artist = {
  id: string
  name: string
  genres: string[]
  imageUrl?: string
}

export type PartnerOffer = {
  partnerId: PartnerId
  purchaseUrl: string
  currency: 'USD'
  priceMin: number
  priceMax?: number
  feesIncluded: boolean
}

export type Event = {
  id: string
  title: string
  startTimeIso: string
  venueId: string
  headlinerArtistId: string
  lineupArtistIds: string[]
  availability: Availability
  offers: PartnerOffer[]
  distanceMiles?: number
  recommendedBecause: string[]
}

