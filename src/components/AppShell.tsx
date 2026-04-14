import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import './ui.css'

function eventsHubTabActive(pathname: string) {
  return (
    pathname === '/events' ||
    pathname.startsWith('/event/') ||
    pathname.startsWith('/checkout/')
  )
}

function SaveIcon() {
  return (
    <svg className="navIcon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 4.75C7 3.784 7.784 3 8.75 3h6.5c.966 0 1.75.784 1.75 1.75v15.25l-5-2.6-5 2.6V4.75Z"
        fill="currentColor"
        opacity="0.92"
      />
    </svg>
  )
}

function BottomHomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 5.25L4.5 10.5V19a1 1 0 0 0 1 1h4.5v-5.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75V20H18.5a1 1 0 0 0 1-1v-8.5L12 5.25Z"
        fill="currentColor"
      />
    </svg>
  )
}

function BottomSearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
      />
    </svg>
  )
}

function BottomEventsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8 2.75v1.5H6.25A2.25 2.25 0 0 0 4 6.5V19c0 1.24 1 2.25 2.25 2.25h11.5c1.24 0 2.25-1 2.25-2.25V6.5c0-1.24-1-2.25-2.25-2.25H16V2.75h-1.5v1.5H9.5V2.75H8Zm-1.75 4h11.5c.41 0 .75.34.75.75V9H5.5V7.5c0-.41.34-.75.75-.75Zm-.75 4.25h13V19c0 .41-.34.75-.75.75H6.25a.75.75 0 0 1-.75-.75v-7.25Z"
        fill="currentColor"
      />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg className="navIcon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3.25a5.25 5.25 0 0 0-5.25 5.25v2.63c0 .86-.22 1.7-.64 2.45L5.2 15.2c-.35.7.16 1.55.92 1.55h12.76c.76 0 1.27-.85.92-1.55l-1.01-2.02a4.6 4.6 0 0 1-.64-2.45V8.5A5.25 5.25 0 0 0 12 3.25Z"
        fill="currentColor"
        opacity="0.92"
      />
      <path d="M10.75 18.75a1.25 1.25 0 0 0 2.5 0h-2.5Z" fill="currentColor" opacity="0.55" />
    </svg>
  )
}

export function AppShell() {
  const { pathname } = useLocation()
  const eventsTabActive = eventsHubTabActive(pathname)

  return (
    <div className="appShell">
      <header className="topNav">
        <div className="topNavInner">
          <Link to="/" className="brand" aria-label="Spotify Events Prototype">
            <span className="dot" aria-hidden="true" />
            Spotify Events
          </Link>
          <nav className="navLinks" aria-label="Primary navigation">
            <NavLink to="/events" className={({ isActive }) => `navLink${isActive ? ' active' : ''}`}>
              Live near you
            </NavLink>
            <NavLink
              to="/saved"
              title="Saved events"
              aria-label="Saved events"
              className={({ isActive }) => `navIconLink${isActive ? ' active' : ''}`}
            >
              <SaveIcon />
            </NavLink>
            <NavLink
              to="/notifications"
              title="Notifications"
              aria-label="Notifications"
              className={({ isActive }) => `navIconLink${isActive ? ' active' : ''}`}
            >
              <BellIcon />
              <span className="notifDot" aria-hidden="true" />
            </NavLink>
            <NavLink
              to="/artist/a_lunar_echo"
              className={({ isActive }) => `navLink${isActive ? ' active' : ''}`}
            >
              Example artist
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
      <nav className="bottomTabBar" aria-label="Bottom navigation">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `bottomTab${isActive ? ' bottomTabActive' : ''}`}
        >
          <span className="bottomTabInner">
            <BottomHomeIcon className="bottomTabIcon" />
            <span className="bottomTabLabel">Home</span>
          </span>
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) => `bottomTab${isActive ? ' bottomTabActive' : ''}`}
        >
          <span className="bottomTabInner">
            <BottomSearchIcon className="bottomTabIcon" />
            <span className="bottomTabLabel">Search</span>
          </span>
        </NavLink>
        <NavLink
          to="/events"
          className={() => `bottomTab${eventsTabActive ? ' bottomTabActive' : ''}`}
        >
          <span className="bottomTabInner">
            <BottomEventsIcon className="bottomTabIcon" />
            <span className="bottomTabLabel">Events</span>
          </span>
        </NavLink>
      </nav>
    </div>
  )
}

