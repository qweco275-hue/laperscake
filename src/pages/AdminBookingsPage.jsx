import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Search,
  CalendarDays,
  Clock3,
  User,
  Phone,
  Mail,
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  X,
  ShoppingBag,
  CircleDollarSign,
  Users,
  Filter,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import MobileBottomNav from '../components/MobileBottomNav'
import { getDashboard, saveDashboard } from '../data/dashboardStorage'

function AdminBookingsPage() {
  const [dashboard, setDashboard] = useState(() => getDashboard())
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedBooking, setSelectedBooking] = useState(null)

  const bookings = dashboard.bookings || []

  const filteredBookings = useMemo(() => {
    const keyword = search.toLowerCase().trim()

    return bookings.filter((booking) => {
      const matchesSearch =
        !keyword ||
        String(booking.bookingNumber || '')
          .toLowerCase()
          .includes(keyword) ||
        String(booking.className || '')
          .toLowerCase()
          .includes(keyword) ||
        String(booking.customerName || '')
          .toLowerCase()
          .includes(keyword) ||
        String(booking.customerEmail || '')
          .toLowerCase()
          .includes(keyword)

      const matchesStatus =
        statusFilter === 'all' ||
        String(booking.status || '').toLowerCase() === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [bookings, search, statusFilter])

  const statistics = useMemo(() => {
    const confirmed = bookings.filter(
      (booking) => booking.status === 'confirmed',
    ).length

    const completed = bookings.filter(
      (booking) => booking.status === 'completed',
    ).length

    const cancelled = bookings.filter(
      (booking) => booking.status === 'cancelled',
    ).length

    const pending = bookings.filter(
      (booking) => booking.status === 'pending',
    ).length

    const revenue = bookings
      .filter((booking) => booking.status !== 'cancelled')
      .reduce(
        (total, booking) =>
          total + Number(booking.price || 0),
        0,
      )

    return {
      total: bookings.length,
      confirmed,
      completed,
      cancelled,
      pending,
      revenue,
    }
  }, [bookings])

  function updateBookingStatus(bookingNumber, newStatus) {
    const updatedBookings = bookings.map((booking) =>
      booking.bookingNumber === bookingNumber
        ? {
            ...booking,
            status: newStatus,
          }
        : booking,
    )

    const updatedDashboard = {
      ...dashboard,
      bookings: updatedBookings,
    }

    saveDashboard(updatedDashboard)
    setDashboard(updatedDashboard)

    if (selectedBooking?.bookingNumber === bookingNumber) {
      setSelectedBooking({
        ...selectedBooking,
        status: newStatus,
      })
    }
  }

  function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(Number(price || 0))
  }

  function formatDate(date) {
    if (!date) return '-'

    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(date))
  }

  function formatCreatedAt(date) {
    if (!date) return '-'

    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date))
  }

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        {/* Header */}
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
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#C99624]">
                Admin Panel
              </p>

              <h1 className="font-display text-4xl font-semibold text-[#29251F] sm:text-5xl">
                Orders & Bookings
              </h1>

              <p className="mt-3 max-w-2xl text-[#756F66]">
                Kelola semua booking kelas yang masuk dari customer.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-[#EBE5DA] bg-white px-4 py-3 shadow-sm">
              <ShoppingBag size={18} className="text-[#C99624]" />
              <span className="text-sm font-semibold text-[#29251F]">
                {statistics.total} total booking
              </span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard
            icon={<ShoppingBag size={20} />}
            label="Total Booking"
            value={statistics.total}
          />

          <StatCard
            icon={<Clock size={20} />}
            label="Pending"
            value={statistics.pending}
          />

          <StatCard
            icon={<CheckCircle2 size={20} />}
            label="Confirmed"
            value={statistics.confirmed}
          />

          <StatCard
            icon={<CheckCircle2 size={20} />}
            label="Completed"
            value={statistics.completed}
          />

          <StatCard
            icon={<CircleDollarSign size={20} />}
            label="Revenue"
            value={formatPrice(statistics.revenue)}
            compact
          />
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-3xl border border-[#EBE5DA] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAA39A]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari booking, nama customer, kelas, atau email..."
                className="form-input pl-11"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter size={18} className="text-[#756F66]" />

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className="form-input min-w-[170px]"
              >
                <option value="all">Semua Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-hidden rounded-3xl border border-[#EBE5DA] bg-white shadow-sm lg:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px]">
              <thead>
                <tr className="border-b border-[#EBE5DA] bg-[#FFFCF5] text-left">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#756F66]">
                    Booking
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#756F66]">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#756F66]">
                    Class
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#756F66]">
                    Schedule
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#756F66]">
                    Payment
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#756F66]">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-[#756F66]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((booking) => (
                  <tr
                    key={
                      booking.bookingNumber ||
                      `${booking.classId}-${booking.createdAt}`
                    }
                    className="border-b border-[#F1ECE3] last:border-0"
                  >
                    <td className="px-6 py-5">
                      <p className="font-mono text-sm font-bold text-[#29251F]">
                        {booking.bookingNumber || '-'}
                      </p>

                      <p className="mt-1 text-xs text-[#AAA39A]">
                        {formatCreatedAt(booking.createdAt)}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <p className="font-semibold text-[#29251F]">
                        {booking.customerName || '-'}
                      </p>

                      <p className="mt-1 text-sm text-[#756F66]">
                        {booking.customerEmail || '-'}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <p className="max-w-[220px] font-semibold text-[#29251F]">
                        {booking.className || '-'}
                      </p>

                      <div className="mt-1 flex items-center gap-2 text-xs text-[#756F66]">
                        <span>{booking.category || '-'}</span>
                        <span>•</span>
                        <span>{booking.mode || '-'}</span>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm font-medium text-[#29251F]">
                        <CalendarDays
                          size={15}
                          className="text-[#C99624]"
                        />
                        {formatDate(booking.date)}
                      </div>

                      <div className="mt-1 flex items-center gap-2 text-xs text-[#756F66]">
                        <Clock3 size={14} />
                        {booking.time || '-'}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <p className="font-semibold text-[#29251F]">
                        {formatPrice(booking.price)}
                      </p>

                      <p className="mt-1 text-xs capitalize text-[#756F66]">
                        {formatPaymentMethod(
                          booking.paymentMethod,
                        )}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge status={booking.status} />
                    </td>

                    <td className="px-6 py-5 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedBooking(booking)
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-[#EBE5DA] px-3 py-2 text-sm font-semibold text-[#29251F] transition hover:border-[#C99624] hover:bg-[#FFF8E8]"
                      >
                        <Eye size={16} />
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <EmptyState search={search} />
          )}
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 lg:hidden">
          {filteredBookings.map((booking) => (
            <div
              key={
                booking.bookingNumber ||
                `${booking.classId}-${booking.createdAt}`
              }
              className="rounded-3xl border border-[#EBE5DA] bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs font-bold text-[#C99624]">
                    {booking.bookingNumber || '-'}
                  </p>

                  <h3 className="mt-1 font-display text-xl font-semibold text-[#29251F]">
                    {booking.className || '-'}
                  </h3>
                </div>

                <StatusBadge status={booking.status} />
              </div>

              <div className="my-4 h-px bg-[#F1ECE3]" />

              <div className="space-y-3">
                <InfoRow
                  icon={<User size={16} />}
                  label="Customer"
                  value={booking.customerName || '-'}
                />

                <InfoRow
                  icon={<CalendarDays size={16} />}
                  label="Tanggal"
                  value={formatDate(booking.date)}
                />

                <InfoRow
                  icon={<Clock3 size={16} />}
                  label="Waktu"
                  value={booking.time || '-'}
                />

                <InfoRow
                  icon={<CreditCard size={16} />}
                  label="Pembayaran"
                  value={formatPrice(booking.price)}
                />
              </div>

              <button
                type="button"
                onClick={() => setSelectedBooking(booking)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#29251F] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#403A31]"
              >
                <Eye size={17} />
                Lihat Detail
              </button>
            </div>
          ))}

          {filteredBookings.length === 0 && (
            <div className="rounded-3xl border border-[#EBE5DA] bg-white p-8">
              <EmptyState search={search} />
            </div>
          )}
        </div>
      </main>

      <MobileBottomNav />

      {/* Detail Modal */}
      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onStatusChange={updateBookingStatus}
          formatPrice={formatPrice}
          formatDate={formatDate}
          formatCreatedAt={formatCreatedAt}
        />
      )}
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  compact = false,
}) {
  return (
    <div className="rounded-3xl border border-[#EBE5DA] bg-white p-5 shadow-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFF6DD] text-[#C99624]">
        {icon}
      </div>

      <p className="text-sm font-medium text-[#756F66]">
        {label}
      </p>

      <p
        className={`mt-1 font-display font-semibold text-[#29251F] ${
          compact ? 'text-xl' : 'text-2xl'
        }`}
      >
        {value}
      </p>
    </div>
  )
}

function StatusBadge({ status }) {
  const normalized = String(status || 'pending').toLowerCase()

  const config = {
    pending: {
      label: 'Pending',
      className: 'bg-[#FFF4D8] text-[#9A7115]',
      icon: <Clock size={13} />,
    },
    confirmed: {
      label: 'Confirmed',
      className: 'bg-[#E7F5EC] text-[#3E7655]',
      icon: <CheckCircle2 size={13} />,
    },
    completed: {
      label: 'Completed',
      className: 'bg-[#E4F1F8] text-[#3C6C83]',
      icon: <CheckCircle2 size={13} />,
    },
    cancelled: {
      label: 'Cancelled',
      className: 'bg-[#FBE9EC] text-[#A95D6C]',
      icon: <XCircle size={13} />,
    },
  }

  const current = config[normalized] || config.pending

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${current.className}`}
    >
      {current.icon}
      {current.label}
    </span>
  )
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-[#C99624]">
        {icon}
      </div>

      <div>
        <p className="text-xs text-[#AAA39A]">
          {label}
        </p>

        <p className="text-sm font-semibold text-[#29251F]">
          {value}
        </p>
      </div>
    </div>
  )
}

function BookingDetailModal({
  booking,
  onClose,
  onStatusChange,
  formatPrice,
  formatDate,
  formatCreatedAt,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#29251F]/45 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#EBE5DA] bg-white px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#C99624]">
              Booking Detail
            </p>

            <h2 className="mt-1 font-display text-2xl font-semibold text-[#29251F]">
              {booking.bookingNumber || 'Booking'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EBE5DA] text-[#756F66] transition hover:bg-[#FFF8E8] hover:text-[#29251F]"
          >
            <X size={19} />
          </button>
        </div>

        <div className="space-y-6 p-6">
          {/* Status */}
          <div className="rounded-2xl bg-[#FFFCF5] p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs text-[#756F66]">
                  Status booking
                </p>

                <div className="mt-2">
                  <StatusBadge status={booking.status} />
                </div>
              </div>

              <select
                value={booking.status || 'pending'}
                onChange={(event) =>
                  onStatusChange(
                    booking.bookingNumber,
                    event.target.value,
                  )
                }
                className="form-input sm:max-w-[180px]"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Customer */}
          <section>
            <SectionTitle
              icon={<User size={18} />}
              title="Customer"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <DetailItem
                label="Nama"
                value={booking.customerName || '-'}
              />

              <DetailItem
                label="Nomor Telepon"
                value={booking.customerPhone || '-'}
                icon={<Phone size={15} />}
              />

              <DetailItem
                label="Email"
                value={booking.customerEmail || '-'}
                icon={<Mail size={15} />}
              />
            </div>
          </section>

          {/* Class */}
          <section>
            <SectionTitle
              icon={<ShoppingBag size={18} />}
              title="Class"
            />

            <div className="rounded-2xl border border-[#EBE5DA] p-4">
              <h3 className="font-display text-xl font-semibold text-[#29251F]">
                {booking.className || '-'}
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                <SmallTag text={booking.category || '-'} />
                <SmallTag text={booking.mode || '-'} />
              </div>
            </div>
          </section>

          {/* Schedule */}
          <section>
            <SectionTitle
              icon={<CalendarDays size={18} />}
              title="Schedule"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <DetailItem
                label="Tanggal"
                value={formatDate(booking.date)}
                icon={<CalendarDays size={15} />}
              />

              <DetailItem
                label="Waktu"
                value={booking.time || '-'}
                icon={<Clock3 size={15} />}
              />
            </div>
          </section>

          {/* Payment */}
          <section>
            <SectionTitle
              icon={<CreditCard size={18} />}
              title="Payment"
            />

            <div className="rounded-2xl border border-[#EBE5DA] p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-[#756F66]">
                    Metode Pembayaran
                  </p>

                  <p className="mt-1 font-semibold text-[#29251F]">
                    {formatPaymentMethod(
                      booking.paymentMethod,
                    )}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-[#756F66]">
                    Total
                  </p>

                  <p className="mt-1 font-display text-xl font-semibold text-[#29251F]">
                    {formatPrice(booking.price)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Metadata */}
          <div className="border-t border-[#EBE5DA] pt-5">
            <p className="text-xs text-[#AAA39A]">
              Booking dibuat pada
            </p>

            <p className="mt-1 text-sm font-medium text-[#756F66]">
              {formatCreatedAt(booking.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionTitle({ icon, title }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <div className="text-[#C99624]">
        {icon}
      </div>

      <h3 className="font-semibold text-[#29251F]">
        {title}
      </h3>
    </div>
  )
}

function DetailItem({ label, value, icon }) {
  return (
    <div className="rounded-2xl border border-[#EBE5DA] p-4">
      <p className="text-xs text-[#756F66]">
        {label}
      </p>

      <div className="mt-1 flex items-center gap-2">
        {icon && (
          <span className="text-[#C99624]">
            {icon}
          </span>
        )}

        <p className="break-all text-sm font-semibold text-[#29251F]">
          {value}
        </p>
      </div>
    </div>
  )
}

function SmallTag({ text }) {
  return (
    <span className="rounded-full bg-[#F7F2E8] px-3 py-1 text-xs font-semibold text-[#756F66]">
      {text}
    </span>
  )
}

function EmptyState({ search }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF6DD] text-[#C99624]">
        <ShoppingBag size={27} />
      </div>

      <h3 className="mt-5 font-display text-2xl font-semibold text-[#29251F]">
        {search
          ? 'Booking tidak ditemukan'
          : 'Belum ada booking'}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-[#756F66]">
        {search
          ? 'Coba gunakan kata kunci lain untuk mencari booking.'
          : 'Booking yang dibuat customer akan otomatis muncul di halaman ini.'}
      </p>
    </div>
  )
}

function formatPaymentMethod(method) {
  const methods = {
    qris: 'QRIS',
    bank_transfer: 'Transfer Bank',
    card: 'Kartu',
  }

  return methods[method] || method || '-'
}

export default AdminBookingsPage