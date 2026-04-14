import { Link } from 'react-router-dom'
import type { Event } from '../domain/types'
import { getArtistById, getVenueById } from '../domain/mockData'
import { formatDateTime, formatDistanceMiles } from '../lib/format'
import { track } from '../lib/analytics'

const availabilityLabel: Record<string, string> = {
  available: 'Available',
  limited: 'Limited',
  sold_out: 'Sold out',
  unknown: 'Unknown',
}

export function EventCard({
  event,
  surfaceId,
  rankPosition,
}: {
  event: Event
  surfaceId: string
  rankPosition: number
}) {
  const headliner = getArtistById(event.headlinerArtistId)
  const venue = getVenueById(event.venueId)
  const distance = formatDistanceMiles(event.distanceMiles)

  return (
    <Link
      to={`/event/${event.id}`}
      className="card"
      onMouseEnter={() => {
        track({ name: 'EventImpression', props: { eventId: event.id, surfaceId, rankPosition } })
      }}
      onClick={() => track({ name: 'EventCardClick', props: { eventId: event.id, surfaceId } })}
    >
      <div className="row">
        <div style={{ minWidth: 0 }}>
          <h3 className="eventTitle">{event.title}</h3>
          <div className="muted" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span>{headliner?.name ?? 'Artist'}</span>
            <span>•</span>
            <span>{formatDateTime(event.startTimeIso)}</span>
          </div>
          <div className="muted" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
            <span>
              {venue?.name ?? 'Venue'}, {venue?.city ?? ''}
            </span>
            {distance ? (
              <>
                <span>•</span>
                <span>{distance}</span>
              </>
            ) : null}
          </div>
        </div>
        <span className={`pill ${event.availability === 'available' ? 'pillAccent' : ''}`}>
          {availabilityLabel[event.availability]}
        </span>
      </div>
    </Link>
  )
}

