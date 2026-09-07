const BOOKINGS_KEY = 'lapercakes-bookings'

function readBookings() {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (error) {
    console.error('Gagal membaca bookings:', error)
    return []
  }
}

function saveBookings(bookings) {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings))

  window.dispatchEvent(new Event('bookingsUpdated'))
  window.dispatchEvent(new Event('storage'))
}

/* =========================
   BOOKINGS
========================= */

export function getBookings() {
  return readBookings()
}

export function addBooking(booking) {
  const bookings = readBookings()

  const newBooking = {
    id: booking.id || `booking-${Date.now()}`,
    ...booking,
  }

  bookings.unshift(newBooking)
  saveBookings(bookings)

  return newBooking
}

export function getBookingById(id) {
  const bookings = readBookings()

  return bookings.find(
    (booking) => String(booking.id) === String(id)
  )
}

export function getBookingByNumber(bookingNumber) {
  const bookings = readBookings()

  return bookings.find(
    (booking) =>
      String(booking.bookingNumber) === String(bookingNumber)
  )
}

export function updateBooking(id, updates) {
  const bookings = readBookings()

  const updatedBookings = bookings.map((booking) =>
    String(booking.id) === String(id)
      ? {
          ...booking,
          ...updates,
        }
      : booking
  )

  saveBookings(updatedBookings)

  return updatedBookings.find(
    (booking) => String(booking.id) === String(id)
  )
}

export function deleteBooking(id) {
  const bookings = readBookings()

  const filteredBookings = bookings.filter(
    (booking) => String(booking.id) !== String(id)
  )

  saveBookings(filteredBookings)

  return true
}

export function clearBookings() {
  localStorage.removeItem(BOOKINGS_KEY)

  window.dispatchEvent(new Event('bookingsUpdated'))
  window.dispatchEvent(new Event('storage'))
}

/* =========================
   DASHBOARD
========================= */

export function getDashboard() {
  const bookings = readBookings()

  const totalBookings = bookings.length

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === 'confirmed'
  ).length

  const pendingBookings = bookings.filter(
    (booking) => booking.status === 'pending'
  ).length

  const completedBookings = bookings.filter(
    (booking) => booking.status === 'completed'
  ).length

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === 'cancelled'
  ).length

  const totalRevenue = bookings
    .filter(
      (booking) =>
        booking.status === 'confirmed' ||
        booking.status === 'completed'
    )
    .reduce(
      (total, booking) =>
        total + Number(booking.price || 0),
      0
    )

  return {
    bookings,
    totalBookings,
    totalRevenue,
    confirmedBookings,
    pendingBookings,
    completedBookings,
    cancelledBookings,
  }
}

/* =========================
   SAVE DASHBOARD
========================= */

/*
  Dipakai oleh halaman Admin untuk menyimpan
  perubahan data dashboard/bookings.
*/
export function saveDashboard(dashboard) {
  if (!dashboard) return

  const bookings = Array.isArray(dashboard)
    ? dashboard
    : Array.isArray(dashboard.bookings)
      ? dashboard.bookings
      : []

  saveBookings(bookings)

  return getDashboard()
}