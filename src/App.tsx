import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { HomePage } from './pages/Home'
import { LiveNearYouPage } from './pages/LiveNearYou'
import { SearchPage } from './pages/Search'
import { ArtistPage } from './pages/Artist'
import { EventDetailPage } from './pages/EventDetail'
import { CheckoutPage } from './pages/Checkout'
import { SavedEventsPage } from './pages/Saved'
import { NotificationsPage } from './pages/Notifications'
import { SavedEventsProvider } from './state/savedEvents'
import './App.css'

function App() {
  return (
    <SavedEventsProvider>
      <Routes>
        <Route element={<AppShell />}>
                   <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<LiveNearYouPage />} />
          <Route path="/live" element={<Navigate to="/events" replace />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/artist/:artistId" element={<ArtistPage />} />
          <Route path="/event/:eventId" element={<EventDetailPage />} />
          <Route path="/checkout/:partnerId/:eventId" element={<CheckoutPage />} />
          <Route path="/saved" element={<SavedEventsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </SavedEventsProvider>
  )
}

export default App
