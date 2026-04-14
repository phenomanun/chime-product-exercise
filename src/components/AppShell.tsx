import { Link, NavLink, Outlet } from 'react-router-dom'
import './ui.css'

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
  return (
    <div className="appShell">
      <header className="topNav">
        <div className="topNavInner">
          <Link to="/" className="brand" aria-label="Spotify Events Prototype">
            <span className="dot" aria-hidden="true" />
            Spotify Events
          </Link>
          <nav className="navLinks" aria-label="Primary navigation">
            <NavLink to="/live" className={({ isActive }) => `navLink${isActive ? ' active' : ''}`}>
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
    </div>
  )
}

