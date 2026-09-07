import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  PlayCircle,
  Search,
  Ticket,
} from 'lucide-react'

import DashboardSidebar from '../components/dashboard/DashboardSidebar'
import DashboardMobileNav from '../components/dashboard/DashboardMobileNav'
import { getDashboard } from '../utils/dashboardStorage'

function MyClassesPage() {
  const [dashboard] = useState(() => getDashboard())
  const [activeTab, setActiveTab] = useState('upcoming')
  const [search, setSearch] = useState('')

  const bookings = dashboard?.bookings || []

  const upcomingBookings = useMemo(() => {
    return bookings.filter(
      (booking) =>
        booking.status !== 'cancelled' &&
        booking.status !== 'completed'
    )
  }, [bookings])

  const completedBookings = useMemo(() => {
    return bookings.filter(
      (booking) =>
        booking.status === 'completed'
    )
  }, [bookings])

  const currentBookings =
    activeTab === 'upcoming'
      ? upcomingBookings
      : completedBookings

  const filteredBookings = useMemo(() => {
    const keyword = search.trim().toLowerCase()

    if (!keyword) return currentBookings

    return currentBookings.filter((booking) =>
      [
        booking.className,
        booking.category,
        booking.instructor,
        booking.mode,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value).toLowerCase().includes(keyword)
        )
    )
  }, [currentBookings, search])

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      <div className="flex">
        <DashboardSidebar />

        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-7xl px-5 py-7 pb-24 sm:px-8 sm:py-10 lg:pb-10">

            {/* HEADER */}
            <header>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#B57918]">
                My Learning
              </p>

              <div className="mt-2 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <h1 className="font-display text-4xl font-semibold">
                    My Classes
                  </h1>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-[#756F66]">
                    Kelola semua kelas baking yang sedang dan sudah
                    kamu ikuti di LaperCakes.
                  </p>
                </div>

                <Link
                  to="/explore"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#29251F] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#403A33]"
                >
                  Cari Kelas Baru
                  <ArrowRight size={14} />
                </Link>
              </div>
            </header>

            {/* STATS */}
            <section className="mt-8 grid gap-4 sm:grid-cols-3">
              <SummaryCard
                icon="🎟️"
                label="Total Classes"
                value={bookings.length}
                description="Semua booking"
                background="#FFF1D0"
              />

              <SummaryCard
                icon="📅"
                label="Upcoming"
                value={upcomingBookings.length}
                description="Kelas yang akan datang"
                background="#EEF9F3"
              />

              <SummaryCard
                icon="🏆"
                label="Completed"
                value={completedBookings.length}
                description="Kelas yang sudah selesai"
                background="#FBECEF"
              />
            </section>

            {/* CONTENT */}
            <section className="mt-8 rounded-3xl border border-[#EBE5DA] bg-white p-5 sm:p-6">

              {/* TOOLBAR */}
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex rounded-full bg-[#F5F2EC] p-1">
                  <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`rounded-full px-5 py-2.5 text-xs font-bold transition ${
                      activeTab === 'upcoming'
                        ? 'bg-white text-[#29251F] shadow-sm'
                        : 'text-[#756F66]'
                    }`}
                  >
                    Upcoming
                    <span className="ml-2 opacity-50">
                      {upcomingBookings.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('completed')}
                    className={`rounded-full px-5 py-2.5 text-xs font-bold transition ${
                      activeTab === 'completed'
                        ? 'bg-white text-[#29251F] shadow-sm'
                        : 'text-[#756F66]'
                    }`}
                  >
                    Completed
                    <span className="ml-2 opacity-50">
                      {completedBookings.length}
                    </span>
                  </button>
                </div>

                <div className="relative w-full lg:max-w-xs">
                  <Search
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9B958C]"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Cari kelas..."
                    className="w-full rounded-full border border-[#EBE5DA] bg-[#FFFDF7] py-3 pl-10 pr-4 text-xs outline-none transition focus:border-[#D7B15B]"
                  />
                </div>
              </div>

              {/* LIST */}
              <div className="mt-6">
                {filteredBookings.length === 0 ? (
                  <EmptyState
                    type={activeTab}
                    search={search}
                  />
                ) : (
                  <div className="space-y-4">
                    {filteredBookings.map((booking) => (
                      <ClassCard
                        key={
                          booking.bookingNumber ||
                          booking.id
                        }
                        booking={booking}
                        completed={
                          activeTab === 'completed'
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>

      <DashboardMobileNav />
    </div>
  )
}

function SummaryCard({
  icon,
  label,
  value,
  description,
  background,
}) {
  return (
    <div
      className="rounded-3xl border border-[#EBE5DA] p-5"
      style={{ background }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#756F66]">
            {label}
          </p>

          <p className="font-display mt-2 text-3xl font-semibold">
            {value}
          </p>

          <p className="mt-1 text-[10px] text-[#756F66]">
            {description}
          </p>
        </div>

        <span className="text-3xl">
          {icon}
        </span>
      </div>
    </div>
  )
}

function ClassCard({ booking, completed }) {
  const date = booking.date
    ? new Date(`${booking.date}T12:00:00`)
    : null

  const formattedDate = date
    ? date.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '-'

  const isOnline =
    String(booking.mode || '').toLowerCase() === 'online'

  return (
    <div className="rounded-3xl border border-[#EBE5DA] p-5 transition hover:shadow-md sm:p-6">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

        {/* ICON */}
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#FFF1D0] text-4xl">
          {getEmoji(booking.category)}
        </div>

        {/* INFO */}
        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${
                completed
                  ? 'bg-[#F3F1ED] text-[#756F66]'
                  : 'bg-[#DDF3E7] text-[#4F8065]'
              }`}
            >
              {completed ? 'COMPLETED' : 'CONFIRMED'}
            </span>

            {booking.bookingNumber && (
              <span className="text-[10px] text-[#756F66]">
                #{booking.bookingNumber}
              </span>
            )}
          </div>

          <h2 className="font-display mt-2 text-xl font-semibold">
            {booking.className || 'Baking Class'}
          </h2>

          <div className="mt-3 grid gap-2 text-xs text-[#756F66] sm:grid-cols-2">
            <span className="flex items-center gap-2">
              <CalendarDays size={14} />
              {formattedDate}
            </span>

            <span className="flex items-center gap-2">
              <Clock3 size={14} />
              {booking.time || '-'}
            </span>

            <span className="flex items-center gap-2">
              <MapPin size={14} />
              {booking.mode || '-'}
            </span>

            {booking.instructor && (
              <span className="flex items-center gap-2">
                <span className="text-sm">👨‍🍳</span>
                {booking.instructor}
              </span>
            )}
          </div>
        </div>

        {/* ACTION */}
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col">

          {completed ? (
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F3F1ED] px-5 py-3 text-[10px] font-bold text-[#756F66]"
            >
              <CheckCircle2 size={14} />
              Selesai
            </button>
          ) : isOnline ? (
            <button
              type="button"
              onClick={() =>
                alert(
                  'Link kelas online akan tersedia mendekati jadwal kelas.'
                )
              }
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#29251F] px-5 py-3 text-[10px] font-bold text-white transition hover:bg-[#403A33]"
            >
              <PlayCircle size={14} />
              Join Class
            </button>
          ) : (
            <span className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFF7E5] px-5 py-3 text-[10px] font-bold text-[#9A6B0B]">
              <MapPin size={14} />
              Offline
            </span>
          )}

          {booking.classId && (
            <Link
              to={`/classes/${booking.classId}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#EBE5DA] px-5 py-3 text-[10px] font-bold transition hover:bg-[#FFF7E5]"
            >
              Detail
              <ArrowRight size={13} />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

function EmptyState({ type, search }) {
  if (search) {
    return (
      <div className="rounded-2xl bg-[#FFFDF7] px-6 py-14 text-center">
        <div className="text-4xl">🔎</div>

        <h3 className="font-display mt-4 text-xl font-semibold">
          Kelas tidak ditemukan
        </h3>

        <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-[#756F66]">
          Coba gunakan kata kunci lain untuk mencari kelasmu.
        </p>
      </div>
    )
  }

  if (type === 'completed') {
    return (
      <div className="rounded-2xl bg-[#FFFDF7] px-6 py-14 text-center">
        <div className="text-4xl">🏆</div>

        <h3 className="font-display mt-4 text-xl font-semibold">
          Belum ada kelas selesai
        </h3>

        <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-[#756F66]">
          Kelas yang sudah kamu selesaikan akan muncul di sini.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-[#FFFDF7] px-6 py-14 text-center">
      <div className="text-4xl">🧁</div>

      <h3 className="font-display mt-4 text-xl font-semibold">
        Belum ada upcoming class
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-[#756F66]">
        Yuk cari kelas baking yang cocok dan mulai perjalanan
        baking-mu.
      </p>

      <Link
        to="/explore"
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#29251F] px-5 py-3 text-xs font-bold text-white"
      >
        Explore Classes
        <ArrowRight size={14} />
      </Link>
    </div>
  )
}

function getEmoji(category) {
  const emojis = {
    Cookies: '🍪',
    Cake: '🍰',
    Bread: '🥖',
    Pastry: '🥐',
    Dessert: '🍫',
  }

  return emojis[category] || '🧁'
}

export default MyClassesPage