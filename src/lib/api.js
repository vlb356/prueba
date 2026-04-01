import { hasSupabaseEnv, supabaseRest } from './supabaseClient'

const wait = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms))

const mockState = {
  venues: [
    { id: 'v1', name: 'Urban Club District', sport: 'Basketball', zone: 'Center', slots: 8 },
    { id: 'v2', name: 'North Padel Dome', sport: 'Padel', zone: 'North', slots: 5 },
    { id: 'v3', name: 'Pulse Factory Gym', sport: 'HIIT', zone: 'West', slots: 12 },
    { id: 'v4', name: 'River Run Park', sport: 'Running', zone: 'South', slots: 20 },
  ],
  events: [
    { id: 'e1', name: 'Friday Padel Ladder', sport: 'Padel', joined: false, attendees: 12 },
    { id: 'e2', name: 'Sunrise Running Crew', sport: 'Running', joined: false, attendees: 22 },
    { id: 'e3', name: 'Sunday 3v3 Open', sport: 'Basketball', joined: false, attendees: 16 },
  ],
  bookings: [],
}

export const api = {
  async getBootstrapData() {
    if (!hasSupabaseEnv) {
      await wait()
      return {
        source: 'mock',
        venues: [...mockState.venues],
        events: [...mockState.events],
        bookings: [...mockState.bookings],
      }
    }

    const [venues, events, bookings] = await Promise.all([
      supabaseRest('venues?select=*'),
      supabaseRest('events?select=*'),
      supabaseRest('bookings?select=*'),
    ])

    return { source: 'supabase', venues, events, bookings }
  },

  async bookVenue({ venueId, venueName, date, slot }) {
    if (!hasSupabaseEnv) {
      await wait()
      const booking = {
        id: `b-${Date.now()}`,
        venue_id: venueId,
        venue_name: venueName,
        date,
        slot,
      }
      mockState.bookings.unshift(booking)
      return booking
    }

    const result = await supabaseRest('bookings', {
      method: 'POST',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify([{ venue_id: venueId, venue_name: venueName, date, slot }]),
    })

    return result[0]
  },

  async toggleEventJoin(eventId, currentJoinedState) {
    if (!hasSupabaseEnv) {
      await wait(120)
      mockState.events = mockState.events.map((event) => {
        if (event.id !== eventId) return event
        return {
          ...event,
          joined: !currentJoinedState,
          attendees: currentJoinedState ? event.attendees - 1 : event.attendees + 1,
        }
      })

      return mockState.events.find((event) => event.id === eventId)
    }

    const updatedList = await supabaseRest(`events?id=eq.${eventId}`, {
      method: 'PATCH',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify({ joined: !currentJoinedState }),
    })

    return updatedList[0]
  },
}
