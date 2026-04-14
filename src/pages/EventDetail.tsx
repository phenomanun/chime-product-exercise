import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getArtistById, getEventById, getVenueById, getEventsForArtist } from '../domain/mockData'
import { formatDateTime, formatDistanceMiles } from '../lib/format'
import { buildEventIcs, downloadIcs } from '../lib/ics'
import { useSavedEvents } from '../state/savedEvents'
import { track } from '../lib/analytics'
import { VenuePreviewMap } from '../components/VenuePreviewMap'

export function EventDetailPage() {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const event = eventId ? getEventById(eventId) : undefined
  const venue = event ? getVenueById(event.venueId) : undefined
  const headliner = event ? getArtistById(event.headlinerArtistId) : undefined
  const lineup = useMemo(() => (event ? event.lineupArtistIds.map((id) => getArtistById(id)).filter(Boolean) : []), [event])
  const { isSaved, toggleSaved } = useSavedEvents()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!event) return
    track({ name: 'EventDetailView', props: { eventId: event.id } })
  }, [event])

  if (!event || !venue || !headliner) {
    return (
      <div className="card">
        <h2 className="sectionTitle">Event not found</h2>
        <p className="muted" style={{ marginTop: 6 }}>
          Try the <Link to="/">home page</Link>.
        </p>
      </div>
    )
  }

  const distance = formatDistanceMiles(event.distanceMiles)
  const saved = isSaved(event.id)
  const similar = getEventsForArtist(event.headlinerArtistId).filter((e) => e.id !== event.id).slice(0, 2)

  const onGetTickets = (partnerId: string, purchaseUrl: string) => {
    track({ name: 'GetTicketsClick', props: { eventId: event.id, partnerId } })
    try {
      track({ name: 'PartnerLanding', props: { eventId: event.id, partnerId, deepLinkResult: 'success' } })
      if (purchaseUrl.startsWith('/')) {
        navigate(purchaseUrl)
      } else {
        window.open(purchaseUrl, '_blank', 'noopener,noreferrer')
      }
    } catch (e) {
      track({
        name: 'PartnerLanding',
        props: {
          eventId: event.id,
          partnerId,
          deepLinkResult: 'failure',
          failureReason: e instanceof Error ? e.message : 'unknown',
        },
      })
    }
  }

  const onToggleSave = () => {
    const nextSaved = toggleSaved(event.id)
    track({ name: 'SaveEvent', props: { eventId: event.id, saved: nextSaved } })
  }

  const onAddToCalendar = () => {
    const ics = buildEventIcs(event, venue)
    downloadIcs(`${event.id}.ics`, ics)
    track({ name: 'CalendarAdd', props: { eventId: event.id } })
  }

  const onShare = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: event.title, url })
        track({ name: 'Share', props: { eventId: event.id, method: 'native_share' } })
        return
      }
    } catch {
      // fall through to copy
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
      track({ name: 'Share', props: { eventId: event.id, method: 'copy_link' } })
    } catch {
      // ignore in prototype
    }
  }

  return (
    <div>
      <div className="heroCard">
        <div className="row" style={{ alignItems: 'flex-start' }}>
          <div style={{ minWidth: 0 }}>
            <h1 className="heroTitle" style={{ fontSize: 30, margin: 0 }}>
              {event.title}
            </h1>
            <p className="muted" style={{ marginTop: 8 }}>
              {formatDateTime(event.startTimeIso)} • {venue.name}, {venue.city}
              {distance ? ` • ${distance}` : ''}
            </p>
          </div>
          <span className={`pill ${event.availability === 'available' ? 'pillAccent' : ''}`}>{event.availability}</span>
        </div>

        <div className="btnRow" style={{ marginTop: 14 }}>
          {event.offers.map((o) => (
            <button key={o.partnerId} className="btn btnPrimary" onClick={() => onGetTickets(o.partnerId, o.purchaseUrl)}>
              Get tickets ({o.partnerId}) • from ${o.priceMin}
              {o.feesIncluded ? '' : ' + fees'}
            </button>
          ))}
          <button className="btn" onClick={onToggleSave}>
            {saved ? 'Saved' : 'Save event'}
          </button>
          <button className="btn" onClick={onAddToCalendar}>
            Add to calendar
          </button>
          <button className="btn" onClick={onShare}>
            Share{copied ? ' (copied)' : ''}
          </button>
        </div>
      </div>

      <div className="grid">
        <div className="col8">
          <div className="sectionHeader">
            <h2 className="sectionTitle">Why recommended</h2>
          </div>
          <div className="card">
            <ul className="smallList">
              {event.recommendedBecause.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>

          <div className="sectionHeader">
            <h2 className="sectionTitle">Lineup</h2>
          </div>
          <div className="card">
            <div className="pillRow">
              {lineup.map((a) => (
                <Link key={a!.id} to={`/artist/${a!.id}`} className="pill">
                  {a!.name}
                </Link>
              ))}
            </div>
          </div>

          {event.availability === 'sold_out' ? (
            <>
              <div className="sectionHeader">
                <h2 className="sectionTitle">Sold out</h2>
                <div className="muted">Offer alternatives</div>
              </div>
              <div className="card">
                <p className="muted">This event is sold out in the prototype dataset. Here are similar upcoming shows:</p>
                <div className="twoCol" style={{ marginTop: 12 }}>
                  {similar.map((e) => (
                    <Link key={e.id} to={`/event/${e.id}`} className="card">
                      <h3 className="eventTitle">{e.title}</h3>
                      <p className="muted">{formatDateTime(e.startTimeIso)}</p>
                    </Link>
                  ))}
                  {similar.length === 0 ? <div className="muted">No similar shows available.</div> : null}
                </div>
              </div>
            </>
          ) : null}
        </div>

        <aside className="col4">
          <div className="sectionHeader">
            <h2 className="sectionTitle">Venue</h2>
          </div>
          <div className="card">
            <div className="kpi">
              <div className="kpiName">{venue.name}</div>
              <div className="kpiVal">{venue.city}</div>
            </div>
            <p className="muted" style={{ marginTop: 10 }}>
              {venue.address}
            </p>
            <div style={{ marginTop: 12 }}>
              <VenuePreviewMap venue={venue} />
            </div>
            <div className="btnRow">
              <a
                className="btn"
                href={`https://www.google.com/maps?q=${encodeURIComponent(venue.address)}`}
                target="_blank"
                rel="noreferrer"
              >
                Open in maps
              </a>
            </div>
          </div>

          <div className="sectionHeader" style={{ marginTop: 18 }}>
            <h2 className="sectionTitle">Headliner</h2>
          </div>
          <div className="card">
            <div className="kpi">
              <div className="kpiName">{headliner.name}</div>
              <div className="kpiVal">{headliner.genres[0] ?? '—'}</div>
            </div>
            <div className="btnRow">
              <Link className="btn" to={`/artist/${headliner.id}`}>
                View artist events
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

