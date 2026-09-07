import defaultDashboard from '../data/dashboard'

const STORAGE_KEY = 'lapercakes-dashboard'
const WISHLIST_KEY = 'lapercakes-wishlist'

export function getDashboard() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (!saved) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultDashboard)
      )

      return defaultDashboard
    }

    return JSON.parse(saved)
  } catch {
    return defaultDashboard
  }
}

export function saveDashboard(data) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  )
}

export function addBooking(booking) {
  const dashboard = getDashboard()

  dashboard.bookings = [
    booking,
    ...dashboard.bookings,
  ]

  dashboard.user.points += 100

  saveDashboard(dashboard)

  return dashboard
}

// ===============================
// CLASS WISHLIST
// ===============================

export function getWishlist() {
  try {
    return JSON.parse(
      localStorage.getItem(WISHLIST_KEY) || '[]'
    )
  } catch {
    return []
  }
}

export function addWishlist(id) {
  const current = getWishlist()

  if (!current.includes(id)) {
    current.push(id)
  }

  localStorage.setItem(
    WISHLIST_KEY,
    JSON.stringify(current)
  )

  return current
}

export function toggleWishlist(id) {
  const current = getWishlist()

  const updated = current.includes(id)
    ? current.filter((item) => item !== id)
    : [...current, id]

  localStorage.setItem(
    WISHLIST_KEY,
    JSON.stringify(updated)
  )

  return updated
}