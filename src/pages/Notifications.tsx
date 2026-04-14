import { Link } from 'react-router-dom'
import { formatDateTime } from '../lib/format'
import { getEventById, getVenueById } from '../domain/mockData'
import { useSavedEvents } from '../state/savedEvents'

type Notif = {
  id: string
  title: string
  body: string
  eventId?: string
  kind: 'saved_reminder' | 'on_sale' | 'day_of' | 'post_show'
}

export function NotificationsPage() {
  const { savedEventIds } = useSavedEvents()

  const saved = [...savedEventIds]
    .map((id) => getEventById(id))
    .filter(Boolean)
    .sort((a, b) => a!.startTimeIso.localeCompare(b!.startTimeIso))

  const notifs: Notif[] = []

  for (const e of saved) {
    if (!e) continue
    const venue = getVenueById(e.venueId)
    notifs.push({
      id: `${e.id}:saved`,
      kind: 'saved_reminder',
      title: 'Saved show coming up',
      body: `${e.title} • ${formatDateTime(e.startTimeIso)}${venue ? ` • ${venue.name}` : ''}`,
      eventId: e.id,
    })
  }

  // Demo-only: a couple of global notifications to show the tab isn’t empty for new users.
  notifs.push({
    id: 'demo:on_sale',
    kind: 'on_sale',
    title: 'On sale today',
    body: 'Kai Nova (DJ Set) just opened a new GA tier (mock inventory signal).',
    eventId: 'e_002',
  })
  notifs.push({
    id: 'demo:post_show',
    kind: 'post_show',
    title: 'Relive the show',
    body: 'After your next concert, you’ll see a “Relive the show” playlist here (prototype).',
  })

  return (
    <div>
      <div className="heroCard">
        <h1 className="heroTitle" style={{ fontSize: 30, margin: 0 }}>
          Notifications
        </h1>
        <p className="heroSub" style={{ marginTop: 10 }}>
          Mock lifecycle messages: saved reminders, on-sale updates, day-of prompts, and post-show engagement.
        </p>
      </div>

      <div className="sectionHeader">
        <h2 className="sectionTitle">Inbox</h2>
        <div className="muted">{notifs.length} items</div>
      </div>

      <div className="twoCol">
        {notifs.map((n) => (
          <div key={n.id} className="card">
            <div className="row" style={{ alignItems: 'flex-start' }}>
              <div style={{ minWidth: 0 }}>
                <div className="eventTitle">{n.title}</div>
                <div className="muted" style={{ marginTop: 6 }}>
                  {n.body}
                </div>
              </div>
              <span className="pill pillAccent">{n.kind.replaceAll('_', ' ')}</span>
            </div>
            <div className="btnRow">
              {n.eventId ? (
                <Link className="btn btnPrimary" to={`/event/${n.eventId}`}>
                  View event
                </Link>
              ) : (
                <Link className="btn" to="/">
                  Discover
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
