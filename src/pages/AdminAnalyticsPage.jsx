import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  CalendarDays,
  ChefHat,
  CircleDollarSign,
  Clock3,
  ShoppingBag,
  TrendingUp,
  Users,
  UtensilsCrossed,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import MobileBottomNav from '../components/MobileBottomNav'

import { getDashboard } from '../data/dashboardStorage'
import { getClasses } from '../data/classStorage'
import { getAdminRecipes } from '../data/recipeAdminStorage'

function AdminAnalyticsPage() {
  const dashboard = useMemo(() => getDashboard(), [])
  const classes = useMemo(() => getClasses(), [])
  const recipes = useMemo(() => getAdminRecipes(), [])

  const bookings = dashboard.bookings || []

  const totalRevenue = bookings.reduce(
    (total, booking) => total + Number(booking.price || 0),
    0,
  )

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === 'confirmed',
  ).length

  const completedBookings = bookings.filter(
    (booking) => booking.status === 'completed',
  ).length

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === 'cancelled',
  ).length

  const pendingBookings = bookings.filter(
    (booking) => booking.status === 'pending',
  ).length

  const popularClasses = [...classes]
    .sort(
      (a, b) =>
        Number(b.rating || 0) * Number(b.reviews || 0) -
        Number(a.rating || 0) * Number(a.reviews || 0),
    )
    .slice(0, 5)

  const popularRecipes = [...recipes]
    .sort(
      (a, b) =>
        Number(b.rating || 0) * Number(b.reviews || 0) -
        Number(a.rating || 0) * Number(a.reviews || 0),
    )
    .slice(0, 5)

  const monthlyRevenue = useMemo(() => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mei',
      'Jun',
      'Jul',
      'Agu',
      'Sep',
      'Okt',
      'Nov',
      'Des',
    ]

    const result = months.map((month, index) => ({
      month,
      revenue: 0,
      bookings: 0,
      index,
    }))

    bookings.forEach((booking) => {
      if (!booking.createdAt) return

      const date = new Date(booking.createdAt)

      if (Number.isNaN(date.getTime())) return

      const monthIndex = date.getMonth()

      if (result[monthIndex]) {
        result[monthIndex].revenue += Number(booking.price || 0)
        result[monthIndex].bookings += 1
      }
    })

    return result
  }, [bookings])

  const maxRevenue = Math.max(
    ...monthlyRevenue.map((item) => item.revenue),
    1,
  )

  const recentActivity = [...bookings]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0),
    )
    .slice(0, 6)

  const stats = [
    {
      label: 'Total Revenue',
      value: formatCurrency(totalRevenue),
      description: 'Total nilai booking',
      icon: CircleDollarSign,
    },
    {
      label: 'Total Booking',
      value: bookings.length,
      description: 'Seluruh transaksi',
      icon: ShoppingBag,
    },
    {
      label: 'User',
      value: dashboard.user ? 1 : 0,
      description: 'User terdaftar saat ini',
      icon: Users,
    },
    {
      label: 'Kelas Aktif',
      value: classes.length,
      description: 'Kelas tersedia',
      icon: BookOpen,
    },
  ]

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-28 pt-8 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-8">
          <Link
            to="/admin"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#756F66] transition hover:text-[#29251F]"
          >
            <ArrowLeft size={17} />
            Kembali ke Admin Dashboard
          </Link>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#BFE5D0]/50 px-3 py-1.5 text-xs font-bold text-[#4F8065]">
                <BarChart3 size={14} />
                ANALYTICS
              </div>

              <h1 className="font-display text-4xl font-semibold tracking-tight text-[#29251F] sm:text-5xl">
                Business Analytics
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#756F66] sm:text-base">
                Pantau performa booking, revenue, kelas, resep, dan aktivitas
                LaperCakes dari satu dashboard.
              </p>
            </div>

            <div className="rounded-2xl border border-[#EBE5DA] bg-white px-4 py-3 text-sm text-[#756F66] shadow-sm">
              Data diperbarui dari localStorage
            </div>
          </div>
        </div>

        {/* STATS */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <AnalyticsStat
              key={item.label}
              {...item}
            />
          ))}
        </section>

        {/* REVENUE + BOOKING STATUS */}
        <section className="mb-8 grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <div className="rounded-3xl border border-[#EBE5DA] bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#756F66]">
                  Revenue
                </p>

                <h2 className="mt-1 font-display text-3xl font-semibold text-[#29251F]">
                  {formatCurrency(totalRevenue)}
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8B84A]/20 text-[#C99624]">
                <TrendingUp size={20} />
              </div>
            </div>

            <div className="flex h-64 items-end gap-2 border-b border-[#EBE5DA] px-1 pb-0 sm:gap-4">
              {monthlyRevenue.map((item) => {
                const height =
                  item.revenue > 0
                    ? Math.max((item.revenue / maxRevenue) * 100, 8)
                    : 3

                return (
                  <div
                    key={item.month}
                    className="group flex h-full flex-1 flex-col items-center justify-end"
                  >
                    <div className="relative flex w-full flex-1 items-end justify-center">
                      <div
                        className="w-full max-w-9 rounded-t-xl bg-[#E8B84A] transition-all duration-300 group-hover:bg-[#C99624]"
                        style={{
                          height: `${height}%`,
                        }}
                      >
                        {item.revenue > 0 && (
                          <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#29251F] px-2.5 py-1.5 text-xs font-semibold text-white shadow-lg group-hover:block">
                            {formatCurrency(item.revenue)}
                          </div>
                        )}
                      </div>
                    </div>

                    <span className="mt-3 text-[11px] font-semibold text-[#756F66]">
                      {item.month}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-[#EBE5DA] bg-white p-6 shadow-sm">
            <div className="mb-6">
              <p className="text-sm font-semibold text-[#756F66]">
                Booking Status
              </p>

              <h2 className="mt-1 font-display text-2xl font-semibold text-[#29251F]">
                Ringkasan Booking
              </h2>
            </div>

            <div className="space-y-5">
              <StatusRow
                label="Confirmed"
                value={confirmedBookings}
                total={bookings.length}
              />

              <StatusRow
                label="Completed"
                value={completedBookings}
                total={bookings.length}
              />

              <StatusRow
                label="Pending"
                value={pendingBookings}
                total={bookings.length}
              />

              <StatusRow
                label="Cancelled"
                value={cancelledBookings}
                total={bookings.length}
              />
            </div>

            {bookings.length === 0 && (
              <div className="mt-6 rounded-2xl bg-[#FFFDF7] p-4 text-sm text-[#756F66]">
                Belum ada booking. Data statistik akan muncul setelah customer
                melakukan booking.
              </div>
            )}
          </div>
        </section>

        {/* POPULAR CLASSES */}
        <section className="mb-8 rounded-3xl border border-[#EBE5DA] bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#756F66]">
                Performance
              </p>

              <h2 className="mt-1 font-display text-2xl font-semibold text-[#29251F]">
                Kelas Terpopuler
              </h2>
            </div>

            <Link
              to="/admin/classes"
              className="text-sm font-bold text-[#4F8065] hover:underline"
            >
              Kelola kelas →
            </Link>
          </div>

          {popularClasses.length > 0 ? (
            <div className="space-y-3">
              {popularClasses.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-2xl border border-[#EBE5DA] p-4 transition hover:bg-[#FFFDF7]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8B84A]/20 font-display text-lg font-semibold text-[#C99624]">
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-[#29251F]">
                      {item.name}
                    </h3>

                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[#756F66]">
                      <span className="inline-flex items-center gap-1">
                        <ChefHat size={13} />
                        {item.instructor || 'Instructor'}
                      </span>

                      <span>
                        {item.reviews || 0} reviews
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <div className="flex items-center gap-1 text-sm font-bold text-[#29251F]">
                      <span>★</span>
                      {item.rating || 0}
                    </div>

                    <p className="mt-1 text-xs text-[#756F66]">
                      {item.remaining ?? 0} slot
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState text="Belum ada data kelas." />
          )}
        </section>

        {/* RECIPES + ACTIVITY */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-[#EBE5DA] bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#756F66]">
                  Content
                </p>

                <h2 className="mt-1 font-display text-2xl font-semibold text-[#29251F]">
                  Resep Terpopuler
                </h2>
              </div>

              <Link
                to="/admin/recipes"
                className="text-sm font-bold text-[#4F8065] hover:underline"
              >
                Kelola →
              </Link>
            </div>

            {popularRecipes.length > 0 ? (
              <div className="space-y-3">
                {popularRecipes.map((recipe, index) => (
                  <div
                    key={recipe.id}
                    className="flex items-center gap-3 rounded-2xl bg-[#FFFDF7] p-3"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#BFE5D0]/50 text-xl">
                      {recipe.emoji || '🍰'}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-[#29251F]">
                        {recipe.title}
                      </p>

                      <p className="mt-1 text-xs text-[#756F66]">
                        {recipe.type || 'Recipe'} · {recipe.reviews || 0} reviews
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-sm font-bold text-[#29251F]">
                      ★ {recipe.rating || 0}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState text="Belum ada data resep." />
            )}
          </div>

          <div className="rounded-3xl border border-[#EBE5DA] bg-white p-6 shadow-sm">
            <div className="mb-6">
              <p className="text-sm font-semibold text-[#756F66]">
                Activity
              </p>

              <h2 className="mt-1 font-display text-2xl font-semibold text-[#29251F]">
                Aktivitas Terbaru
              </h2>
            </div>

            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((booking) => (
                  <div
                    key={booking.bookingNumber || booking.id}
                    className="flex gap-3"
                  >
                    <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E8B84A]/20 text-[#C99624]">
                      <ShoppingBag size={16} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#29251F]">
                        Booking baru
                      </p>

                      <p className="mt-1 truncate text-sm text-[#756F66]">
                        {booking.customerName || 'Customer'} —{' '}
                        {booking.className}
                      </p>

                      <div className="mt-1 flex items-center gap-2 text-xs text-[#A19A91]">
                        <Clock3 size={12} />
                        {formatDateTime(booking.createdAt)}
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-sm font-bold text-[#29251F]">
                        {formatCurrency(booking.price)}
                      </p>

                      <StatusBadge status={booking.status} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState text="Belum ada aktivitas booking." />
            )}
          </div>
        </section>

        {/* QUICK METRICS */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            icon={CalendarDays}
            label="Booking Confirmed"
            value={confirmedBookings}
          />

          <MetricCard
            icon={BookOpen}
            label="Total Kelas"
            value={classes.length}
          />

          <MetricCard
            icon={UtensilsCrossed}
            label="Total Resep"
            value={recipes.length}
          />

          <MetricCard
            icon={Users}
            label="Completed"
            value={completedBookings}
          />
        </section>
      </main>

      <MobileBottomNav />
    </div>
  )
}

function AnalyticsStat({
  label,
  value,
  description,
  icon: Icon,
}) {
  return (
    <div className="rounded-3xl border border-[#EBE5DA] bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF3D4] text-[#C99624]">
          <Icon size={20} />
        </div>

        <TrendingUp
          size={17}
          className="text-[#4F8065]"
        />
      </div>

      <p className="text-sm font-semibold text-[#756F66]">
        {label}
      </p>

      <p className="mt-1 font-display text-2xl font-semibold text-[#29251F]">
        {value}
      </p>

      <p className="mt-1 text-xs text-[#A19A91]">
        {description}
      </p>
    </div>
  )
}

function StatusRow({
  label,
  value,
  total,
}) {
  const percentage =
    total > 0
      ? Math.round((value / total) * 100)
      : 0

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-semibold text-[#29251F]">
          {label}
        </span>

        <span className="text-[#756F66]">
          {value} · {percentage}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-[#F1ECE4]">
        <div
          className="h-full rounded-full bg-[#BFE5D0]"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  const config = {
    pending: {
      label: 'Pending',
      className: 'bg-[#FFF3D4] text-[#9A741C]',
    },
    confirmed: {
      label: 'Confirmed',
      className: 'bg-[#DDF3E7] text-[#4F8065]',
    },
    completed: {
      label: 'Completed',
      className: 'bg-[#DCECF8] text-[#3E6D8C]',
    },
    cancelled: {
      label: 'Cancelled',
      className: 'bg-[#F8E1E5] text-[#A95D6C]',
    },
  }

  const current = config[status] || {
    label: status || 'Unknown',
    className: 'bg-[#F1ECE4] text-[#756F66]',
  }

  return (
    <span
      className={`mt-1 inline-flex rounded-full px-2 py-1 text-[10px] font-bold ${current.className}`}
    >
      {current.label}
    </span>
  )
}

function MetricCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[#EBE5DA] bg-white p-4 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#BFE5D0]/50 text-[#4F8065]">
        <Icon size={18} />
      </div>

      <div>
        <p className="text-xs font-semibold text-[#756F66]">
          {label}
        </p>

        <p className="mt-0.5 text-xl font-bold text-[#29251F]">
          {value}
        </p>
      </div>
    </div>
  )
}

function EmptyState({ text }) {
  return (
    <div className="rounded-2xl bg-[#FFFDF7] p-5 text-sm text-[#756F66]">
      {text}
    </div>
  )
}

function formatCurrency(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0))
}

function formatDateTime(value) {
  if (!value) return '-'

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '-'
  }

  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export default AdminAnalyticsPage