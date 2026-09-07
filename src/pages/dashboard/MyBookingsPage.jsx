import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  MapPin,
  Monitor,
  PackageOpen,
  ReceiptText,
  Search,
  CheckCircle2,
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import MobileBottomNav from '../../components/MobileBottomNav'
import { getBookings } from '../../data/dashboardStorage'

function MyBookingsPage() {
  const [bookings, setBookings] = useState([])
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  const loadBookings = () => {
    setBookings(getBookings())
  }

  useEffect(() => {
    loadBookings()

    const handleStorage = () => loadBookings()
    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const searchText = search.toLowerCase()

      const matchesSearch =
        booking.className?.toLowerCase().includes(searchText) ||
        booking.bookingNumber?.toLowerCase().includes(searchText)

      const normalizedStatus = booking.status?.toLowerCase() || ''

      const matchesStatus =
        status === 'all' ||
        normalizedStatus === status

      return matchesSearch && matchesStatus
    })
  }, [bookings, search, status])

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#A95D6C]">
            My Account
          </p>

          <h1 className="font-display text-4xl font-semibold tracking-tight text-[#29251F] sm:text-5xl">
            My Bookings
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#756F66] sm:text-base">
            Lihat semua kelas yang sudah kamu booking dan cek detail jadwalnya
            di sini.
          </p>
        </div>

        {/* Summary */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <SummaryCard
            label="Total Bookings"
            value={bookings.length}
            icon={<ReceiptText size={20} />}
          />

          <SummaryCard
            label="Confirmed"
            value={
              bookings.filter(
                (item) => item.status?.toLowerCase() === 'confirmed'
              ).length
            }
            icon={<CheckCircle2 size={20} />}
          />

          <SummaryCard
            label="Upcoming"
            value={bookings.filter(isUpcoming).length}
            icon={<CalendarDays size={20} />}
          />
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-3xl border border-[#EBE5DA] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAA39A]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari nama kelas atau booking number..."
                className="form-input pl-11"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto">
              <FilterButton
                active={status === 'all'}
                onClick={() => setStatus('all')}
              >
                All
              </FilterButton>

              <FilterButton
                active={status === 'confirmed'}
                onClick={() => setStatus('confirmed')}
              >
                Confirmed
              </FilterButton>

              <FilterButton
                active={status === 'pending'}
                onClick={() => setStatus('pending')}
              >
                Pending
              </FilterButton>

              <FilterButton
                active={status === 'cancelled'}
                onClick={() => setStatus('cancelled')}
              >
                Cancelled
              </FilterButton>
            </div>
          </div>
        </div>

        {/* Booking List */}
        {filteredBookings.length === 0 ? (
          <EmptyState
            hasBookings={bookings.length > 0}
            onReset={() => {
              setSearch('')
              setStatus('all')
            }}
          />
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <BookingCard key={booking.bookingNumber} booking={booking} />
            ))}
          </div>
        )}
      </main>

      <MobileBottomNav />
    </div>
  )
}

function BookingCard({ booking }) {
  const statusInfo = getStatusInfo(booking.status)

  return (
    <div className="group overflow-hidden rounded-3xl border border-[#EBE5DA] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-col lg:flex-row">
        {/* Visual */}
        <div className="relative flex min-h-[180px] w-full items-center justify-center overflow-hidden bg-[#BFE5D0] lg:w-[220px]">
          <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/30" />
          <div className="absolute -bottom-12 -left-10 h-36 w-36 rounded-full bg-[#E8B84A]/30" />

          <span className="relative text-7xl">
            {getEmoji(booking.category)}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusInfo.className}`}
                >
                  {statusInfo.label}
                </span>

                {booking.mode && (
                  <span className="rounded-full bg-[#F7F3EA] px-3 py-1 text-xs font-medium text-[#756F66]">
                    {booking.mode}
                  </span>
                )}
              </div>

              <h2 className="font-display text-2xl font-semibold text-[#29251F]">
                {booking.className || 'Baking Class'}
              </h2>

              <p className="mt-1 text-sm text-[#756F66]">
                Booking #{booking.bookingNumber || '-'}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-xs font-medium text-[#756F66]">
                Total Price
              </p>

              <p className="mt-1 text-lg font-bold text-[#29251F]">
                {formatCurrency(booking.price)}
              </p>
            </div>
          </div>

          <div className="my-5 h-px bg-[#EBE5DA]" />

          <div className="grid gap-3 sm:grid-cols-3">
            <InfoItem
              icon={<CalendarDays size={17} />}
              label="Date"
              value={formatDate(booking.date)}
            />

            <InfoItem
              icon={<Clock3 size={17} />}
              label="Time"
              value={booking.time || '-'}
            />

            <InfoItem
              icon={
                booking.mode?.toLowerCase() === 'online' ? (
                  <Monitor size={17} />
                ) : (
                  <MapPin size={17} />
                )
              }
              label="Mode"
              value={booking.mode || '-'}
            />
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-[#756F66]">
              Booked on {formatCreatedDate(booking.createdAt)}
            </div>

            {booking.classId ? (
              <Link
                to={`/classes/${booking.classId}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#29251F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4A443C]"
              >
                View Class
                <ChevronRight size={16} />
              </Link>
            ) : (
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#29251F] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Booking Detail
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function SummaryCard({ label, value, icon }) {
  return (
    <div className="rounded-3xl border border-[#EBE5DA] bg-white p-5 shadow-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFF3D6] text-[#C99624]">
        {icon}
      </div>

      <p className="text-sm text-[#756F66]">{label}</p>

      <p className="mt-1 font-display text-3xl font-semibold text-[#29251F]">
        {value}
      </p>
    </div>
  )
}

function FilterButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
        active
          ? 'bg-[#29251F] text-white'
          : 'bg-[#F7F3EA] text-[#756F66] hover:bg-[#EEE8DC]'
      }`}
    >
      {children}
    </button>
  )
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-[#A95D6C]">{icon}</div>

      <div>
        <p className="text-xs text-[#756F66]">{label}</p>
        <p className="mt-0.5 text-sm font-semibold text-[#29251F]">
          {value}
        </p>
      </div>
    </div>
  )
}

function EmptyState({ hasBookings, onReset }) {
  return (
    <div className="rounded-3xl border border-dashed border-[#D9D0C2] bg-white px-6 py-16 text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#F7F3EA] text-[#A95D6C]">
        <PackageOpen size={30} />
      </div>

      <h2 className="font-display text-2xl font-semibold text-[#29251F]">
        {hasBookings ? 'Booking tidak ditemukan' : 'Belum ada booking'}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#756F66]">
        {hasBookings
          ? 'Coba ubah kata pencarian atau filter status.'
          : 'Kamu belum memiliki kelas yang dibooking. Yuk cari kelas baking yang menarik!'}
      </p>

      {hasBookings ? (
        <button
          type="button"
          onClick={onReset}
          className="mt-6 rounded-full bg-[#29251F] px-5 py-2.5 text-sm font-semibold text-white"
        >
          Reset Filter
        </button>
      ) : (
        <Link
          to="/explore"
          className="mt-6 inline-flex rounded-full bg-[#29251F] px-5 py-2.5 text-sm font-semibold text-white"
        >
          Explore Classes
        </Link>
      )}
    </div>
  )
}

function getStatusInfo(status) {
  const normalized = status?.toLowerCase()

  if (normalized === 'confirmed') {
    return {
      label: 'Confirmed',
      className: 'bg-[#E5F5EC] text-[#4F8065]',
    }
  }

  if (normalized === 'pending') {
    return {
      label: 'Pending',
      className: 'bg-[#FFF3D6] text-[#A26F13]',
    }
  }

  if (normalized === 'cancelled') {
    return {
      label: 'Cancelled',
      className: 'bg-[#FBE8EC] text-[#A95D6C]',
    }
  }

  return {
    label: status || 'Unknown',
    className: 'bg-[#F3F0EA] text-[#756F66]',
  }
}

function isUpcoming(booking) {
  if (!booking.date) return false

  const bookingDate = new Date(`${booking.date}T23:59:59`)
  return bookingDate >= new Date()
}

function getEmoji(category) {
  const emojis = {
    Cookies: '🍪',
    Cake: '🧁',
    Bread: '🍞',
    Pastry: '🥐',
  }

  return emojis[category] || '🍰'
}

function formatCurrency(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value || 0)
}

function formatDate(date) {
  if (!date) return '-'

  return new Date(`${date}T00:00:00`).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatCreatedDate(date) {
  if (!date) return '-'

  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default MyBookingsPage