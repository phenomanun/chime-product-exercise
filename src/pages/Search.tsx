import { useState } from 'react'
import { Link } from 'react-router-dom'
import { allArtists, allEvents } from '../domain/mockData'
import { formatDateTime } from '../lib/format'

export function SearchPage() {
  const [q, setQ] = useState('')

  const query = q.trim().toLowerCase()
  const artists = query
    ? allArtists.filter((a) => a.name.toLowerCase().includes(query) || a.genres.some((g) => g.toLowerCase().includes(query)))
    : []
  const events = query
    ? allEvents.filter((e) => e.title.toLowerCase().includes(query))
    : []

  return (
    <div>
      <div className="heroCard">
        <h1 className="heroTitle" style={{ fontSize: 28, margin: 0 }}>
          Search
        </h1>
        <p className="heroSub" style={{ marginTop: 10 }}>
          Find artists and shows. Results are mocked from the prototype catalog.
        </p>
        <div style={{ marginTop: 14 }}>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Artists, venues, events…"
            aria-label="Search"
            className="searchInput"
            autoComplete="off"
          />
        </div>
      </div>

      {!query ? (
        <div className="card" style={{ marginTop: 18 }}>
          <p className="muted" style={{ margin: 0 }}>
            Start typing to search. Try <strong style={{ color: 'var(--text-h)' }}>Lunar</strong>,{' '}
            <strong style={{ color: 'var(--text-h)' }}>Kai</strong>, or <strong style={{ color: 'var(--text-h)' }}>Neon</strong>.
          </p>
        </div>
      ) : (
        <>
          <div className="sectionHeader">
            <h2 className="sectionTitle">Artists</h2>
            <div className="muted">{artists.length} results</div>
          </div>
          {artists.length === 0 ? (
            <div className="card">
              <p className="muted" style={{ margin: 0 }}>
                No artist matches.
              </p>
            </div>
          ) : (
            <div className="twoCol">
              {artists.map((a) => (
                <Link key={a.id} to={`/artist/${a.id}`} className="card">
                  <h3 className="eventTitle">{a.name}</h3>
                  <p className="muted">{a.genres.join(' · ')}</p>
                </Link>
              ))}
            </div>
          )}

          <div className="sectionHeader" style={{ marginTop: 18 }}>
            <h2 className="sectionTitle">Events</h2>
            <div className="muted">{events.length} results</div>
          </div>
          {events.length === 0 ? (
            <div className="card">
              <p className="muted" style={{ margin: 0 }}>
                No event title matches.
              </p>
            </div>
          ) : (
            <div className="twoCol">
              {events.map((e) => (
                <Link key={e.id} to={`/event/${e.id}`} className="card">
                  <h3 className="eventTitle">{e.title}</h3>
                  <p className="muted">{formatDateTime(e.startTimeIso)}</p>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
