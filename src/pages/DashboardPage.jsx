import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Star,
  ChevronRight,
} from 'lucide-react'

import DashboardSidebar from '../components/dashboard/DashboardSidebar'
import DashboardMobileNav from '../components/dashboard/DashboardMobileNav'
import StatCard from '../components/dashboard/StatCard'

import classes from '../data/classes'
import {
  getDashboard,
} from '../utils/dashboardStorage'

import {
  getMembership,
} from '../utils/membershipStorage'

function DashboardPage() {
  const [dashboard, setDashboard] =
    useState(null)

  const [membership, setMembership] = useState(null)

  useEffect(() => {
    setDashboard(getDashboard())
    setMembership(getMembership())
  }, [])

  const upcoming = useMemo(() => {
    if (!dashboard) return []

    return dashboard.bookings
      .filter(
        (booking) =>
          booking.status !== 'cancelled'
      )
      .slice(0, 3)
  }, [dashboard])

  if (!dashboard) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFDF7]">
        <div className="text-center">
          <div className="text-4xl">🧁</div>
          <p className="mt-3 text-sm text-[#756F66]">
            Menyiapkan dashboard...
          </p>
        </div>
      </div>
    )
  }

  const totalBookings =
    dashboard.bookings.length

  const completed =
    dashboard.completedClasses.length

  return (
    <div className="min-h-screen bg-[#FFFDF7]">

      <div className="flex">

        <DashboardSidebar />

        <main className="min-w-0 flex-1">

          <div className="mx-auto max-w-7xl px-5 py-7 pb-24 sm:px-8 sm:py-10 lg:pb-10">

            {/* HEADER */}
            <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#B57918]">
                  Member Dashboard
                </p>

                <h1 className="font-display mt-2 text-4xl font-semibold">
                  Halo, {dashboard.user.name} 👋
                </h1>

                <p className="mt-2 text-sm text-[#756F66]">
                  Siap melanjutkan perjalanan baking-mu?
                </p>

              </div>

              <Link
                to="/explore"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#29251F] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#403A33]"
              >
                Explore Classes
                <ArrowRight size={14} />
              </Link>

            </header>

            {/* STATS */}
            <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              <StatCard
                label="Upcoming Classes"
                value={upcoming.length}
                description="Kelas yang akan kamu ikuti"
                icon="📅"
                background="#FFF1D0"
              />

              <StatCard
                label="Total Bookings"
                value={totalBookings}
                description="Semua booking kamu"
                icon="🎟️"
                background="#EEF9F3"
              />

              <StatCard
                label="Completed"
                value={completed}
                description="Kelas yang sudah selesai"
                icon="🏆"
                background="#FBECEF"
              />

              <StatCard
                label="LaperPoints"
                value={dashboard.user.points.toLocaleString(
                  'id-ID'
                )}
                description="100 points setiap booking"
                icon="✨"
                background="#F2ECFA"
              />

            </section>

            {/* MAIN GRID */}
            <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_340px]">

              {/* UPCOMING */}
              <div className="rounded-3xl border border-[#EBE5DA] bg-white p-6">

                <div className="flex items-center justify-between">

                  <div>
                    <h2 className="font-display text-2xl font-semibold">
                      Upcoming Classes
                    </h2>

                    <p className="mt-1 text-xs text-[#756F66]">
                      Kelas yang sebentar lagi kamu ikuti
                    </p>
                  </div>

                  <Link
                    to="/dashboard/classes"
                    className="flex items-center gap-1 text-xs font-bold text-[#B57918]"
                  >
                    Lihat semua
                    <ChevronRight size={14} />
                  </Link>

                </div>

                <div className="mt-6">

                  {upcoming.length === 0 ? (

                    <EmptyUpcoming />

                  ) : (

                    <div className="space-y-3">

                      {upcoming.map(
                        (booking) => (
                          <BookingCard
                            key={
                              booking.bookingNumber
                            }
                            booking={booking}
                          />
                        )
                      )}

                    </div>

                  )}

                </div>

              </div>

              {/* PROFILE / POINTS */}
              <div className="space-y-6">

                <div className="rounded-3xl bg-[#29251F] p-6 text-white">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-xs font-semibold text-white/50">
                        LaperPoints
                      </p>

                      <p className="font-display mt-2 text-4xl font-semibold">
                        {dashboard.user.points.toLocaleString(
                          'id-ID'
                        )}
                      </p>

                    </div>

                    <div className="text-4xl">
                      ✨
                    </div>

                  </div>

                  <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">

                    <div
                      className="h-full rounded-full bg-[#E8B84A]"
                      style={{
                        width: '64%',
                      }}
                    />

                  </div>

                  <div className="mt-3 flex justify-between text-[10px] text-white/50">
                    <span>
                      Silver Member
                    </span>
                    <span>
                      2,000 pts
                    </span>
                  </div>

                  <Link
                    to="/dashboard/rewards"
                    className="mt-6 flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 text-xs font-bold transition hover:bg-white/15"
                  >
                    Lihat Rewards
                    <ArrowRight size={14} />
                  </Link>

                </div>

                <div className="rounded-3xl border border-[#EBE5DA] bg-white p-6">

  <div className="flex items-start justify-between gap-4">

    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-[#756F66]">
        Membership
      </p>

      <h3 className="font-display mt-2 text-2xl font-semibold">
        {membership?.plan === 'pro'
          ? 'Baker Pro'
          : membership?.plan === 'member'
            ? 'Baker Member'
            : 'Free Member'}
      </h3>
    </div>

    <span
      className={`rounded-full px-3 py-1 text-[9px] font-bold ${
        membership?.plan === 'pro'
          ? 'bg-[#29251F] text-white'
          : membership?.plan === 'member'
            ? 'bg-[#FFF1D0] text-[#9A6B0B]'
            : 'bg-[#F3F1ED] text-[#756F66]'
      }`}
    >
      {membership?.plan === 'pro'
        ? 'PRO'
        : membership?.plan === 'member'
          ? 'ACTIVE'
          : 'FREE'}
    </span>

  </div>

  <p className="mt-2 text-xs leading-5 text-[#756F66]">
    {membership?.plan === 'pro'
      ? 'Akses penuh ke benefit premium, special class, recipe premium, dan exclusive rewards.'
      : membership?.plan === 'member'
        ? 'Nikmati akses ke benefit member, rewards, dan special class.'
        : 'Nikmati akses dasar LaperCakes dan upgrade untuk mendapatkan lebih banyak benefit.'}
  </p>

  <div className="mt-4 space-y-2">

    <div className="flex items-center gap-2 text-xs">
      <span className="text-[#4F8065]">✓</span>
      <span>
        {membership?.plan === 'pro'
          ? 'Premium classes'
          : membership?.plan === 'member'
            ? 'Member classes'
            : 'Free classes'}
      </span>
    </div>

    <div className="flex items-center gap-2 text-xs">
      <span className="text-[#4F8065]">✓</span>
      <span>
        {membership?.plan === 'pro'
          ? 'Premium recipes'
          : membership?.plan === 'member'
            ? 'Member recipes'
            : 'Free recipes'}
      </span>
    </div>

    <div className="flex items-center gap-2 text-xs">
      <span className="text-[#4F8065]">✓</span>
      <span>Rewards & LaperPoints</span>
    </div>

  </div>

  {membership?.plan === 'free' ? (
    <Link
      to="/membership"
      className="mt-5 flex items-center justify-between rounded-xl bg-[#FFF7E5] px-4 py-3 text-xs font-bold transition hover:bg-[#FBEBC9]"
    >
      Upgrade Membership
      <ArrowRight size={14} />
    </Link>
  ) : membership?.plan === 'member' ? (
    <Link
      to="/membership"
      className="mt-5 flex items-center justify-between rounded-xl bg-[#FFF7E5] px-4 py-3 text-xs font-bold transition hover:bg-[#FBEBC9]"
    >
      Upgrade ke Pro
      <ArrowRight size={14} />
    </Link>
  ) : (
    <Link
      to="/membership"
      className="mt-5 flex items-center justify-between rounded-xl bg-[#29251F] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#403A33]"
    >
      Manage Membership
      <ArrowRight size={14} />
    </Link>
  )}

</div>

              </div>

            </section>

            {/* RECOMMENDATIONS */}
            <section className="mt-8">

              <div className="flex items-end justify-between">

                <div>

                  <h2 className="font-display text-2xl font-semibold">
                    Recommended for You
                  </h2>

                  <p className="mt-1 text-xs text-[#756F66]">
                    Berdasarkan minat baking kamu
                  </p>

                </div>

                <Link
                  to="/explore"
                  className="text-xs font-bold text-[#B57918]"
                >
                  Explore →
                </Link>

              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                {classes
                  .filter(
                    (item) =>
                      item.rating >= 4.8
                  )
                  .slice(0, 3)
                  .map((item) => (

                    <Link
                      key={item.id}
                      to={`/classes/${item.id}`}
                      className="group rounded-3xl border border-[#EBE5DA] bg-white p-4 transition hover:-translate-y-1 hover:shadow-lg"
                    >

                      <div className="flex items-center gap-4">

                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#FFF1D0] text-4xl transition group-hover:scale-105">
                          {getEmoji(
                            item.category
                          )}
                        </div>

                        <div className="min-w-0">

                          <div className="flex items-center gap-1 text-[10px] font-bold">
                            <Star
                              size={12}
                              fill="currentColor"
                              className="text-[#E8B84A]"
                            />
                            {item.rating}
                          </div>

                          <h3 className="font-display mt-1 truncate text-lg font-semibold">
                            {item.name}
                          </h3>

                          <p className="mt-1 text-[10px] text-[#756F66]">
                            {item.mode} • {item.level}
                          </p>

                          <p className="mt-2 text-xs font-bold">
                            Rp
                            {item.price.toLocaleString(
                              'id-ID'
                            )}
                          </p>

                        </div>

                      </div>

                    </Link>

                  ))}

              </div>

            </section>

          </div>

        </main>

      </div>

      <DashboardMobileNav />

    </div>
  )
}

function BookingCard({ booking }) {
  const date = new Date(
    `${booking.date}T12:00:00`
  )

  const formattedDate =
    date.toLocaleDateString('id-ID', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    })

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#EBE5DA] p-4 sm:flex-row sm:items-center">

      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#FFF1D0] text-3xl">
        {getEmoji(booking.category)}
      </div>

      <div className="min-w-0 flex-1">

        <div className="flex flex-wrap items-center gap-2">

          <span className="rounded-full bg-[#DDF3E7] px-2.5 py-1 text-[9px] font-bold text-[#4F8065]">
            Confirmed
          </span>

          <span className="text-[10px] text-[#756F66]">
            #{booking.bookingNumber}
          </span>

        </div>

        <h3 className="mt-2 font-display text-lg font-semibold">
          {booking.className}
        </h3>

        <div className="mt-2 flex flex-wrap gap-4 text-[10px] text-[#756F66]">

          <span className="flex items-center gap-1">
            <CalendarDays size={12} />
            {formattedDate}
          </span>

          <span className="flex items-center gap-1">
            <Clock3 size={12} />
            {booking.time}
          </span>

          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {booking.mode}
          </span>

        </div>

      </div>

      <Link
        to={`/classes/${booking.classId}`}
        className="rounded-full border border-[#EBE5DA] px-4 py-2 text-center text-[10px] font-bold transition hover:bg-[#FFF7E5]"
      >
        Detail
      </Link>

    </div>
  )
}

function EmptyUpcoming() {
  return (
    <div className="rounded-2xl bg-[#FFFDF7] px-6 py-12 text-center">

      <div className="text-4xl">
        🧁
      </div>

      <h3 className="font-display mt-4 text-xl font-semibold">
        Belum ada kelas
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-[#756F66]">
        Kamu belum memiliki upcoming class.
        Yuk cari kelas baking yang cocok.
      </p>

      <Link
        to="/explore"
        className="mt-5 inline-flex rounded-full bg-[#29251F] px-5 py-3 text-xs font-bold text-white"
      >
        Explore Classes
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
  }

  return emojis[category] || '🧁'
}

export default DashboardPage