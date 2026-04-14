import { useMemo, useState } from 'react'
import { allEvents } from '../domain/mockData'
import { EventCard } from '../components/EventCard'
import { EventMap } from '../components/EventMap'

type SortMode = 'recommended' | 'soonest'
type ViewMode = 'list' | 'map'

export function LiveNearYouPage() {
  const [sort, setSort] = useState<SortMode>('recommended')
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  const [view, setView] = useState<ViewMode>('list')

  const events = useMemo(() => {
    let arr = [...allEvents]
    if (onlyAvailable) arr = arr.filter((e) => e.availability === 'available' || e.availability === 'limited')
    if (sort === 'soonest') arr.sort((a, b) => a.startTimeIso.localeCompare(b.startTimeIso))
    if (sort === 'recommended') arr.sort((a, b) => b.recommendedBecause.length - a.recommendedBecause.length)
    return arr
  }, [onlyAvailable, sort])

  return (
    <div>
      <div className="sectionHeader">
        <h2 className="sectionTitle">Live near you</h2>
        <div className="muted">Filter and sort</div>
      </div>

      <div className="card">
        <div className="row" style={{ flexWrap: 'wrap' }}>
          <div className="pillRow" style={{ marginTop: 0 }}>
            <span className="pill pillAccent">Seattle, WA</span>
            <span className="pill">Within 10 miles</span>
          </div>
          <div className="pillRow" style={{ marginTop: 0 }}>
            <label className="pill" style={{ cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                style={{ marginRight: 8 }}
              />
              Only available
            </label>
            <label className="pill" style={{ cursor: 'pointer' }}>
              Sort:{' '}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortMode)}
                style={{ marginLeft: 8 }}
              >
                <option value="recommended">Recommended</option>
                <option value="soonest">Soonest</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="sectionHeader" style={{ marginTop: 16 }}>
        <h2 className="sectionTitle">Events</h2>
        <div className="pillRow" style={{ marginTop: 0 }}>
          <button className={`btn ${view === 'list' ? 'btnPrimary' : ''}`} onClick={() => setView('list')}>
            List
          </button>
          <button className={`btn ${view === 'map' ? 'btnPrimary' : ''}`} onClick={() => setView('map')}>
            Map
          </button>
          <span className="pill">{events.length} results</span>
        </div>
      </div>

      {view === 'list' ? (
        <div className="twoCol">
          {events.map((e, idx) => (
            <EventCard key={e.id} event={e} surfaceId="live_hub" rankPosition={idx + 1} />
          ))}
        </div>
      ) : (
        <EventMap events={events} />
      )}
    </div>
  )
}

