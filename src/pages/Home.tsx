import { allEvents } from '../domain/mockData'
import { EventCard } from '../components/EventCard'

export function HomePage() {
  const recommended = [...allEvents].sort((a, b) => a.startTimeIso.localeCompare(b.startTimeIso)).slice(0, 3)
  const trending = [...allEvents].sort((a, b) => a.id.localeCompare(b.id)).slice(0, 4)

  return (
    <div>
      <section className="heroCard">
        <h1 className="heroTitle">Go to more concerts you’ll love</h1>
        <p className="heroSub">
          A listener-first discovery → booking handoff prototype. Designed to convert listening affinity into live attendance
          (with partner checkout).
        </p>
      </section>

      <div>
        <div className="sectionHeader">
          <h2 className="sectionTitle">Live events for you</h2>
        </div>
        <div className="twoCol">
          {recommended.map((e, idx) => (
            <EventCard key={e.id} event={e} surfaceId="home_recommended" rankPosition={idx + 1} />
          ))}
        </div>

        <div className="sectionHeader" style={{ marginTop: 18 }}>
          <h2 className="sectionTitle">Trending near you</h2>
        </div>
        <div className="twoCol">
          {trending.map((e, idx) => (
            <EventCard key={e.id} event={e} surfaceId="home_trending" rankPosition={idx + 1} />
          ))}
        </div>
      </div>
    </div>
  )
}

