import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ShoppingBag,
  ChefHat,
  BookMarked,
  BarChart3,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  CheckCircle2,
  CircleDollarSign,
  TrendingUp,
  Activity,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import MobileBottomNav from '../components/MobileBottomNav'

import classes from '../data/classes'
import recipes from '../data/recipes'
import { getDashboard } from '../data/dashboardStorage'

function AdminPage() {
  const dashboard = useMemo(() => getDashboard(), [])
  const bookings = dashboard.bookings || []

  const totalRevenue = bookings.reduce(
    (total, booking) =>
      total + Number(booking.price || 0),
    0,
  )

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === 'confirmed',
  ).length

  const completedBookings = bookings.filter(
    (booking) => booking.status === 'completed',
  ).length

  const popularClasses = [...classes]
    .sort(
      (a, b) =>
        Number(b.rating || 0) * Number(b.reviews || 0) -
        Number(a.rating || 0) * Number(a.reviews || 0),
    )
    .slice(0, 4)

  const recentBookings = [...bookings]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0),
    )
    .slice(0, 5)

  const stats = [
    {
      label: 'Total User',
      value: '128',
      description: 'User terdaftar',
      icon: Users,
      href: '/admin/users',
    },
    {
      label: 'Total Kelas',
      value: classes.length,
      description: 'Kelas tersedia',
      icon: BookOpen,
      href: '/admin/classes',
    },
    {
      label: 'Total Booking',
      value: bookings.length,
      description: 'Seluruh booking',
      icon: ShoppingBag,
      href: '/admin/bookings',
    },
    {
      label: 'Total Revenue',
      value: formatCurrency(totalRevenue),
      description: 'Dari booking',
      icon: CircleDollarSign,
      href: '/admin/analytics',
    },
  ]

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-28 pt-8 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#BFE5D0]/50 px-3 py-1.5 text-xs font-bold text-[#4F8065]">
            <LayoutDashboard size={14} />
            ADMIN PANEL
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-display text-4xl font-semibold tracking-tight text-[#29251F] sm:text-5xl">
                Admin Dashboard
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#756F66] sm:text-base">
                Kelola operasional LaperCakes mulai dari kelas,
                instructor, booking, user, resep, sampai analytics.
              </p>
            </div>

            <div className="rounded-2xl border border-[#EBE5DA] bg-white px-4 py-3 text-sm text-[#756F66] shadow-sm">
              Selamat datang kembali, Admin 👋
            </div>
          </div>
        </div>

        {/* STATS */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              to={stat.href}
              className="group rounded-3xl border border-[#EBE5DA] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF3D4] text-[#C99624]">
                  <stat.icon size={20} />
                </div>

                <ArrowUpRight
                  size={17}
                  className="text-[#A19A91] transition group-hover:text-[#29251F]"
                />
              </div>

              <p className="text-sm font-semibold text-[#756F66]">
                {stat.label}
              </p>

              <p className="mt-1 font-display text-2xl font-semibold text-[#29251F]">
                {stat.value}
              </p>

              <p className="mt-1 text-xs text-[#A19A91]">
                {stat.description}
              </p>
            </Link>
          ))}
        </section>

        {/* QUICK ACTION */}
        <section className="mb-8">
          <div className="mb-5">
            <p className="text-sm font-semibold text-[#756F66]">
              Quick Actions
            </p>

            <h2 className="mt-1 font-display text-2xl font-semibold text-[#29251F]">
              Akses cepat
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <QuickAction
              icon={BookOpen}
              title="Kelola Kelas"
              description="Tambah dan edit kelas"
              href="/admin/classes"
            />

            <QuickAction
              icon={ChefHat}
              title="Kelola Instructor"
              description="Atur data instructor"
              href="/admin/instructors"
            />

            <QuickAction
              icon={ShoppingBag}
              title="Kelola Booking"
              description="Cek dan update booking"
              href="/admin/bookings"
            />

            <QuickAction
              icon={BarChart3}
              title="Lihat Analytics"
              description="Pantau performa bisnis"
              href="/admin/analytics"
            />
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">

          {/* POPULAR CLASSES */}
          <div className="rounded-3xl border border-[#EBE5DA] bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-end justify-between gap-4">
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
                Kelola →
              </Link>
            </div>

            <div className="space-y-3">
              {popularClasses.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-2xl border border-[#EBE5DA] p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8B84A]/20 font-display text-lg font-semibold text-[#C99624]">
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-[#29251F]">
                      {item.name}
                    </h3>

                    <div className="mt-1 flex flex-wrap gap-3 text-xs text-[#756F66]">
                      <span className="inline-flex items-center gap-1">
                        <ChefHat size={13} />
                        {item.instructor}
                      </span>

                      <span>
                        {item.reviews} reviews
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <div className="text-sm font-bold text-[#29251F]">
                      ★ {item.rating}
                    </div>

                    <p className="mt-1 text-xs text-[#756F66]">
                      {item.remaining} slot
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RECENT BOOKING */}
          <div className="rounded-3xl border border-[#EBE5DA] bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#756F66]">
                  Activity
                </p>

                <h2 className="mt-1 font-display text-2xl font-semibold text-[#29251F]">
                  Booking Terbaru
                </h2>
              </div>

              <Link
                to="/admin/bookings"
                className="text-sm font-bold text-[#4F8065] hover:underline"
              >
                Semua →
              </Link>
            </div>

            {recentBookings.length > 0 ? (
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div
                    key={
                      booking.bookingNumber ||
                      booking.id
                    }
                    className="flex gap-3"
                  >
                    <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E8B84A]/20 text-[#C99624]">
                      <ShoppingBag size={16} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[#29251F]">
                        {booking.className}
                      </p>

                      <p className="mt-1 truncate text-xs text-[#756F66]">
                        {booking.customerName || 'Customer'}
                      </p>

                      <div className="mt-1 flex items-center gap-1 text-[11px] text-[#A19A91]">
                        <Clock3 size={11} />
                        {formatDate(booking.createdAt)}
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-xs font-bold text-[#29251F]">
                        {formatCurrency(booking.price)}
                      </p>

                      <StatusBadge
                        status={booking.status}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState text="Belum ada booking." />
            )}
          </div>
        </section>

        {/* ADMIN MENU */}
        <section className="mt-8">
          <div className="mb-5">
            <p className="text-sm font-semibold text-[#756F66]">
              Management
            </p>

            <h2 className="mt-1 font-display text-2xl font-semibold text-[#29251F]">
              Admin Menu
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <AdminMenuCard
              icon={BookOpen}
              title="Classes"
              description="Kelola seluruh kelas baking"
              href="/admin/classes"
            />

            <AdminMenuCard
              icon={ChefHat}
              title="Instructors"
              description="Kelola instructor dan profilnya"
              href="/admin/instructors"
            />

            <AdminMenuCard
              icon={ShoppingBag}
              title="Orders / Bookings"
              description="Kelola seluruh transaksi booking"
              href="/admin/bookings"
            />

            <AdminMenuCard
              icon={BookMarked}
              title="Recipes"
              description="Kelola konten dan produk resep"
              href="/admin/recipes"
            />

            <AdminMenuCard
              icon={Users}
              title="Users"
              description="Lihat dan kelola data pengguna"
              href="/admin/users"
            />

            <AdminMenuCard
              icon={BarChart3}
              title="Analytics"
              description="Lihat performa bisnis dan statistik"
              href="/admin/analytics"
            />
          </div>
        </section>

        {/* SUMMARY */}
        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <MiniStat
            icon={CalendarDays}
            label="Confirmed Booking"
            value={confirmedBookings}
          />

          <MiniStat
            icon={CheckCircle2}
            label="Completed Booking"
            value={completedBookings}
          />

          <MiniStat
            icon={TrendingUp}
            label="Total Recipes"
            value={recipes.length}
          />
        </section>

      </main>

      <MobileBottomNav />
    </div>
  )
}

function QuickAction({
  icon: Icon,
  title,
  description,
  href,
}) {
  return (
    <Link
      to={href}
      className="group rounded-3xl border border-[#EBE5DA] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#BFE5D0]/50 text-[#4F8065]">
        <Icon size={20} />
      </div>

      <h3 className="font-semibold text-[#29251F]">
        {title}
      </h3>

      <p className="mt-1 text-sm text-[#756F66]">
        {description}
      </p>

      <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#4F8065]">
        Buka menu
        <ArrowUpRight
          size={13}
          className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </Link>
  )
}

function AdminMenuCard({
  icon: Icon,
  title,
  description,
  href,
}) {
  return (
    <Link
      to={href}
      className="group flex items-center gap-4 rounded-3xl border border-[#EBE5DA] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#DCD4C7] hover:shadow-md"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF3D4] text-[#C99624]">
        <Icon size={21} />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-[#29251F]">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-5 text-[#756F66]">
          {description}
        </p>
      </div>

      <ArrowUpRight
        size={18}
        className="shrink-0 text-[#A19A91] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#29251F]"
      />
    </Link>
  )
}

function MiniStat({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[#EBE5DA] bg-white p-4 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#BFE5D0]/50 text-[#4F8065]">
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

  const current =
    config[status] || {
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

function formatDate(value) {
  if (!value) return '-'

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '-'
  }

  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export default AdminPage