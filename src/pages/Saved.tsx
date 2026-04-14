import { Link } from 'react-router-dom'
import { allEvents } from '../domain/mockData'
import { EventCard } from '../components/EventCard'
import { useSavedEvents } from '../state/savedEvents'

export function SavedEventsPage() {
  const { savedEventIds } = useSavedEvents()
  const saved = allEvents.filter((e) => savedEventIds.has(e.id)).sort((a, b) => a.startTimeIso.localeCompare(b.startTimeIso))

  return (
    <div>
      <div className="sectionHeader">
        <h2 className="sectionTitle">Saved events</h2>
        <div className="muted">{saved.length} saved</div>
      </div>

      {saved.length === 0 ? (
        <div className="card">
          <h3 className="eventTitle">Nothing saved yet</h3>
          <p className="muted">
            Save events from <Link to="/">Home</Link> or <Link to="/events">Live near you</Link> to plan attendance.
          </p>
        </div>
      ) : (
        <div className="twoCol">
          {saved.map((e, idx) => (
            <EventCard key={e.id} event={e} surfaceId="saved_events" rankPosition={idx + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

