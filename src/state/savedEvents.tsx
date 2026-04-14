import { createContext, useContext, useMemo, useState } from 'react'

type SavedEventsState = {
  savedEventIds: Set<string>
  isSaved: (eventId: string) => boolean
  toggleSaved: (eventId: string) => boolean
}

const SavedEventsContext = createContext<SavedEventsState | null>(null)

export function SavedEventsProvider({ children }: { children: React.ReactNode }) {
  const [savedEventIds, setSavedEventIds] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem('saved_event_ids')
      if (!raw) return new Set()
      const arr = JSON.parse(raw) as string[]
      return new Set(arr)
    } catch {
      return new Set()
    }
  })

  const api = useMemo<SavedEventsState>(() => {
    const persist = (next: Set<string>) => {
      setSavedEventIds(next)
      try {
        localStorage.setItem('saved_event_ids', JSON.stringify([...next]))
      } catch {
        // ignore
      }
    }

    return {
      savedEventIds,
      isSaved: (eventId) => savedEventIds.has(eventId),
      toggleSaved: (eventId) => {
        const next = new Set(savedEventIds)
        if (next.has(eventId)) {
          next.delete(eventId)
          persist(next)
          return false
        }
        next.add(eventId)
        persist(next)
        return true
      },
    }
  }, [savedEventIds])

  return <SavedEventsContext.Provider value={api}>{children}</SavedEventsContext.Provider>
}

export function useSavedEvents() {
  const ctx = useContext(SavedEventsContext)
  if (!ctx) throw new Error('useSavedEvents must be used within SavedEventsProvider')
  return ctx
}

