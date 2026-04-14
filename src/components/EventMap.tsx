import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import marker2x from 'leaflet/dist/images/marker-icon-2x.png'
import marker from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import type { Event, Venue } from '../domain/types'
import { getVenueById } from '../domain/mockData'
import { formatDateTime } from '../lib/format'

L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: marker,
  shadowUrl: markerShadow,
})

type Pin = { event: Event; venue: Venue }

export function EventMap({ events }: { events: Event[] }) {
  const pins = useMemo<Pin[]>(() => {
    return events
      .map((event) => {
        const venue = getVenueById(event.venueId)
        if (!venue) return null
        return { event, venue }
      })
      .filter(Boolean) as Pin[]
  }, [events])

  const center = useMemo<[number, number]>(() => {
    if (pins.length === 0) return [47.6062, -122.3321]
    const lat = pins.reduce((sum, p) => sum + p.venue.lat, 0) / pins.length
    const lng = pins.reduce((sum, p) => sum + p.venue.lng, 0) / pins.length
    return [lat, lng]
  }, [pins])

  return (
    <div className="card" style={{ padding: 14 }}>
      <div className="row" style={{ marginBottom: 10 }}>
        <div>
          <div className="kpiName">Map</div>
          <div className="muted">OpenStreetMap (Leaflet)</div>
        </div>
        <div className="pillRow" style={{ marginTop: 0 }}>
          <span className="pill">Pins: {pins.length}</span>
        </div>
      </div>

      <div style={{ height: 520, borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)' }}>
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
          attributionControl={true}
        >
          <TileLayer
            // OpenStreetMap tiles (public)
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {pins.map((p) => (
            <Marker key={p.event.id} position={[p.venue.lat, p.venue.lng]}>
              <Popup>
                <div style={{ minWidth: 220 }}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>{p.event.title}</div>
                  <div style={{ opacity: 0.8, marginBottom: 10 }}>
                    {formatDateTime(p.event.startTimeIso)} • {p.venue.name}
                  </div>
                  <Link className="btn btnPrimary" to={`/event/${p.event.id}`}>
                    Open event
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}

