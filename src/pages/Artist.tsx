import { Link, useParams } from 'react-router-dom'
import { getArtistById, getEventsForArtist } from '../domain/mockData'
import { EventCard } from '../components/EventCard'

export function ArtistPage() {
  const { artistId } = useParams()
  const artist = artistId ? getArtistById(artistId) : undefined
  const events = artistId ? getEventsForArtist(artistId) : []

  if (!artist) {
    return (
      <div className="card">
        <h2 className="sectionTitle">Artist not found</h2>
        <p className="muted" style={{ marginTop: 6 }}>
          Try the <Link to="/">home page</Link>.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="heroCard">
        <div className="row" style={{ alignItems: 'flex-start' }}>
          <div>
            <h1 className="heroTitle" style={{ fontSize: 30, margin: 0 }}>
              {artist.name}
            </h1>
            <p className="muted" style={{ marginTop: 8 }}>
              Genres: {artist.genres.join(', ')}
            </p>
          </div>
          <span className="pill pillAccent">Artist page</span>
        </div>
      </div>

      <div className="sectionHeader">
        <h2 className="sectionTitle">Events</h2>
        <div className="muted">Upcoming shows tied to this artist</div>
      </div>

      {events.length === 0 ? (
        <div className="card">
          <p className="muted">No upcoming events in this prototype dataset.</p>
        </div>
      ) : (
        <div className="twoCol">
          {events.map((e, idx) => (
            <EventCard key={e.id} event={e} surfaceId="artist_events" rankPosition={idx + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

