import { Link, useNavigate, useParams } from 'react-router-dom'
import type { PartnerId } from '../domain/types'
import { getEventById, getVenueById } from '../domain/mockData'
import { formatDateTime } from '../lib/format'
import { track } from '../lib/analytics'
import { useMemo, useState } from 'react'

function partnerLabel(partnerId: PartnerId) {
  if (partnerId === 'ticketmaster') return 'Ticketmaster Marketplace'
  if (partnerId === 'seatgeek') return 'SeatGeek Marketplace'
  return 'Partner Marketplace'
}

export function CheckoutPage() {
  const { partnerId, eventId } = useParams()
  const navigate = useNavigate()

  const event = eventId ? getEventById(eventId) : undefined
  const partner = (partnerId as PartnerId | undefined) ?? undefined
  const offer = useMemo(() => {
    if (!event || !partner) return null
    return event.offers.find((o) => o.partnerId === partner) ?? null
  }, [event, partner])

  const venue = event ? getVenueById(event.venueId) : undefined

  const [qty, setQty] = useState(2)

  if (!event || !partner || !offer || !venue) {
    return (
      <div className="card">
        <h2 className="sectionTitle">Checkout unavailable</h2>
        <p className="muted" style={{ marginTop: 6 }}>
          This is a mocked third-party checkout page. Go back to <Link to="/">Home</Link>.
        </p>
      </div>
    )
  }

  const base = offer.priceMin
  const perTicket = base
  const fees = offer.feesIncluded ? 0 : Math.round(perTicket * 0.18)
  const total = (perTicket + fees) * qty

  const onComplete = () => {
    track({ name: 'PartnerConversion', props: { eventId: event.id, partnerId: partner, tickets: qty, total, currency: 'USD' } })
    navigate(`/event/${event.id}`)
  }

  return (
    <div>
      <div className="heroCard">
        <div className="row" style={{ alignItems: 'flex-start' }}>
          <div style={{ minWidth: 0 }}>
            <h1 className="heroTitle" style={{ fontSize: 28, margin: 0 }}>
              {partnerLabel(partner)}
            </h1>
            <p className="muted" style={{ marginTop: 8 }}>
              Mocked third-party checkout • Opens in-app for prototype demos
            </p>
          </div>
          <span className="pill pillAccent">Third-party</span>
        </div>
      </div>

      <div className="grid">
        <div className="col8">
          <div className="sectionHeader">
            <h2 className="sectionTitle">Order</h2>
            <div className="muted">Event + ticket selection</div>
          </div>

          <div className="card">
            <div className="kpi">
              <div className="kpiName">{event.title}</div>
              <div className="kpiVal">{formatDateTime(event.startTimeIso)}</div>
            </div>
            <p className="muted" style={{ marginTop: 10 }}>
              {venue.name} • {venue.city}
            </p>

            <div className="btnRow" style={{ marginTop: 12 }}>
              <label className="pill" style={{ cursor: 'pointer' }}>
                Tickets:{' '}
                <select value={qty} onChange={(e) => setQty(Number(e.target.value))} style={{ marginLeft: 8 }}>
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
              <span className="pill">From ${offer.priceMin}</span>
              {offer.priceMax != null ? <span className="pill">Up to ${offer.priceMax}</span> : null}
              <span className="pill">{offer.feesIncluded ? 'Fees included' : 'Fees at checkout'}</span>
            </div>
          </div>

          <div className="sectionHeader" style={{ marginTop: 18 }}>
            <h2 className="sectionTitle">Summary</h2>
            <div className="muted">Mock pricing breakdown</div>
          </div>
          <div className="card">
            <div className="kpi">
              <div className="kpiName">Tickets</div>
              <div className="kpiVal">
                {qty} × ${perTicket}
              </div>
            </div>
            <div className="kpi">
              <div className="kpiName">Fees</div>
              <div className="kpiVal">{offer.feesIncluded ? '$0' : `${qty} × $${fees}`}</div>
            </div>
            <div className="kpi">
              <div className="kpiName">Total</div>
              <div className="kpiVal">${total}</div>
            </div>

            <div className="btnRow">
              <button className="btn btnPrimary" onClick={onComplete}>
                Complete purchase (mock)
              </button>
              <Link className="btn" to={`/event/${event.id}`}>
                Cancel
              </Link>
            </div>
            <p className="muted" style={{ marginTop: 10 }}>
              Completing purchase logs a <code>PartnerConversion</code> event (prototype only).
            </p>
          </div>
        </div>

        <aside className="col4">
          <div className="sectionHeader">
            <h2 className="sectionTitle">Return</h2>
            <div className="muted">Back to Spotify</div>
          </div>
          <div className="card">
            <p className="muted">In production this would be an external partner site/app.</p>
            <div className="btnRow">
              <Link className="btn" to={`/event/${event.id}`}>
                Back to event
              </Link>
              <Link className="btn" to="/">
                Home
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

