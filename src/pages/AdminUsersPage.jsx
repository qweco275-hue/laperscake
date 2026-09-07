import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Search,
  Users,
  Mail,
  CalendarDays,
  Star,
  Eye,
  X,
  Crown,
  Award,
  ShoppingBag,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import MobileBottomNav from '../components/MobileBottomNav'
import { getDashboard } from '../data/dashboardStorage'

function AdminUsersPage() {
  const [dashboard] = useState(() => getDashboard())
  const [search, setSearch] = useState('')
  const [membershipFilter, setMembershipFilter] =
    useState('all')
  const [selectedUser, setSelectedUser] = useState(null)

  /*
   * Untuk MVP, sistem kita belum mempunyai database users.
   * User utama yang tersimpan di dashboard dijadikan data user.
   *
   * Nanti ketika authentication/database dibuat,
   * bagian ini tinggal diganti dengan data users dari backend.
   */
  const user = dashboard.user || {}

  const users = useMemo(() => {
    return [
      {
        id: 'user-001',
        name: user.name || 'Pandu',
        email: user.email || 'hello@example.com',
        membership: user.membership || 'Baker Member',
        points: Number(user.points || 0),
        bookings: (dashboard.bookings || []).length,
        completedClasses:
          (dashboard.completedClasses || []).length,
        certificates:
          (dashboard.certificates || []).length,
        joinedAt: '2026-08-01',
        status: 'active',
      },
    ]
  }, [dashboard, user])

  const filteredUsers = useMemo(() => {
    const keyword = search.toLowerCase().trim()

    return users.filter((item) => {
      const matchesSearch =
        !keyword ||
        item.name.toLowerCase().includes(keyword) ||
        item.email.toLowerCase().includes(keyword)

      const matchesMembership =
        membershipFilter === 'all' ||
        item.membership
          .toLowerCase()
          .includes(membershipFilter)

      return matchesSearch && matchesMembership
    })
  }, [users, search, membershipFilter])

  const statistics = useMemo(() => {
    const total = users.length

    const pro = users.filter((item) =>
      item.membership
        .toLowerCase()
        .includes('pro'),
    ).length

    const member = users.filter(
      (item) =>
        item.membership
          .toLowerCase()
          .includes('member') &&
        !item.membership
          .toLowerCase()
          .includes('pro'),
    ).length

    const free = users.filter((item) =>
      item.membership
        .toLowerCase()
        .includes('free'),
    ).length

    return {
      total,
      pro,
      member,
      free,
    }
  }, [users])

  function formatDate(date) {
    if (!date) return '-'

    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
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
                Users
              </h1>

              <p className="mt-3 max-w-2xl text-[#756F66]">
                Kelola dan lihat informasi customer yang
                menggunakan LaperCakes.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-[#EBE5DA] bg-white px-4 py-3 shadow-sm">
              <Users
                size={18}
                className="text-[#C99624]"
              />

              <span className="text-sm font-semibold text-[#29251F]">
                {statistics.total} user
              </span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<Users size={20} />}
            label="Total Users"
            value={statistics.total}
          />

          <StatCard
            icon={<Crown size={20} />}
            label="Baker Pro"
            value={statistics.pro}
          />

          <StatCard
            icon={<Award size={20} />}
            label="Baker Member"
            value={statistics.member}
          />

          <StatCard
            icon={<Users size={20} />}
            label="Free Member"
            value={statistics.free}
          />
        </div>

        {/* Search & Filter */}
        <div className="mb-6 rounded-3xl border border-[#EBE5DA] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAA39A]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Cari nama atau email user..."
                className="form-input pl-11"
              />
            </div>

            <select
              value={membershipFilter}
              onChange={(event) =>
                setMembershipFilter(event.target.value)
              }
              className="form-input lg:max-w-[210px]"
            >
              <option value="all">
                Semua Membership
              </option>
              <option value="pro">Baker Pro</option>
              <option value="member">Baker Member</option>
              <option value="free">Free Member</option>
            </select>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-hidden rounded-3xl border border-[#EBE5DA] bg-white shadow-sm lg:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-[#EBE5DA] bg-[#FFFCF5] text-left">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#756F66]">
                    User
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#756F66]">
                    Membership
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#756F66]">
                    Activity
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#756F66]">
                    Points
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#756F66]">
                    Joined
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-[#756F66]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#F1ECE3] last:border-0"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <Avatar name={item.name} />

                        <div>
                          <p className="font-semibold text-[#29251F]">
                            {item.name}
                          </p>

                          <p className="mt-1 flex items-center gap-1 text-sm text-[#756F66]">
                            <Mail size={13} />
                            {item.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <MembershipBadge
                        membership={item.membership}
                      />
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex gap-5">
                        <ActivityStat
                          icon={<ShoppingBag size={14} />}
                          value={item.bookings}
                          label="booking"
                        />

                        <ActivityStat
                          icon={<Award size={14} />}
                          value={item.certificates}
                          label="cert"
                        />
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5 font-semibold text-[#29251F]">
                        <Star
                          size={15}
                          className="fill-current text-[#C99624]"
                        />
                        {item.points.toLocaleString('id-ID')}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-[#756F66]">
                        <CalendarDays size={15} />
                        {formatDate(item.joinedAt)}
                      </div>
                    </td>

                    <td className="px-6 py-5 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedUser(item)
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

          {filteredUsers.length === 0 && (
            <EmptyState />
          )}
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 lg:hidden">
          {filteredUsers.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-[#EBE5DA] bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <Avatar name={item.name} />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-[#29251F]">
                        {item.name}
                      </h3>

                      <p className="mt-1 flex items-center gap-1 break-all text-sm text-[#756F66]">
                        <Mail size={13} />
                        {item.email}
                      </p>
                    </div>

                    <MembershipBadge
                      membership={item.membership}
                    />
                  </div>
                </div>
              </div>

              <div className="my-5 h-px bg-[#F1ECE3]" />

              <div className="grid grid-cols-2 gap-3">
                <MobileStat
                  label="Booking"
                  value={item.bookings}
                />

                <MobileStat
                  label="Certificates"
                  value={item.certificates}
                />

                <MobileStat
                  label="Points"
                  value={item.points.toLocaleString(
                    'id-ID',
                  )}
                />

                <MobileStat
                  label="Status"
                  value="Active"
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedUser(item)
                }
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#29251F] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#403A31]"
              >
                <Eye size={17} />
                Lihat Detail
              </button>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <div className="rounded-3xl border border-[#EBE5DA] bg-white">
              <EmptyState />
            </div>
          )}
        </div>
      </main>

      <MobileBottomNav />

      {/* Detail Modal */}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          formatDate={formatDate}
        />
      )}
    </div>
  )
}

function StatCard({ icon, label, value }) {
  return (
    <div className="rounded-3xl border border-[#EBE5DA] bg-white p-5 shadow-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFF6DD] text-[#C99624]">
        {icon}
      </div>

      <p className="text-sm font-medium text-[#756F66]">
        {label}
      </p>

      <p className="mt-1 font-display text-2xl font-semibold text-[#29251F]">
        {value}
      </p>
    </div>
  )
}

function Avatar({ name }) {
  const initial = name
    ? name.charAt(0).toUpperCase()
    : 'U'

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#BFE5D0] font-display text-lg font-semibold text-[#4F8065]">
      {initial}
    </div>
  )
}

function MembershipBadge({ membership }) {
  const normalized = String(
    membership || '',
  ).toLowerCase()

  let className =
    'bg-[#F2F0EC] text-[#756F66]'

  if (normalized.includes('pro')) {
    className =
      'bg-[#FFF0C4] text-[#966D0C]'
  } else if (normalized.includes('member')) {
    className =
      'bg-[#E7F5EC] text-[#3E7655]'
  }

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${className}`}
    >
      {membership || 'Free Member'}
    </span>
  )
}

function ActivityStat({ icon, value, label }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-sm font-semibold text-[#29251F]">
        <span className="text-[#C99624]">
          {icon}
        </span>
        {value}
      </div>

      <p className="mt-0.5 text-xs text-[#AAA39A]">
        {label}
      </p>
    </div>
  )
}

function MobileStat({ label, value }) {
  return (
    <div className="rounded-2xl bg-[#FFFCF5] p-3">
      <p className="text-xs text-[#AAA39A]">
        {label}
      </p>

      <p className="mt-1 font-semibold text-[#29251F]">
        {value}
      </p>
    </div>
  )
}

function UserDetailModal({
  user,
  onClose,
  formatDate,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#29251F]/45 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#EBE5DA] bg-white px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#C99624]">
              User Detail
            </p>

            <h2 className="mt-1 font-display text-2xl font-semibold text-[#29251F]">
              {user.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EBE5DA] text-[#756F66] transition hover:bg-[#FFF8E8]"
          >
            <X size={19} />
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div className="flex items-center gap-4 rounded-3xl bg-[#FFFCF5] p-5">
            <Avatar name={user.name} />

            <div>
              <h3 className="font-display text-2xl font-semibold text-[#29251F]">
                {user.name}
              </h3>

              <p className="mt-1 text-sm text-[#756F66]">
                {user.email}
              </p>

              <div className="mt-3">
                <MembershipBadge
                  membership={user.membership}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <DetailCard
              icon={<ShoppingBag size={18} />}
              label="Total Booking"
              value={user.bookings}
            />

            <DetailCard
              icon={<Award size={18} />}
              label="Completed Classes"
              value={user.completedClasses}
            />

            <DetailCard
              icon={<Award size={18} />}
              label="Certificates"
              value={user.certificates}
            />

            <DetailCard
              icon={<Star size={18} />}
              label="Points"
              value={user.points.toLocaleString(
                'id-ID',
              )}
            />
          </div>

          <div className="space-y-3">
            <DetailLine
              label="Email"
              value={user.email}
            />

            <DetailLine
              label="Membership"
              value={user.membership}
            />

            <DetailLine
              label="Status"
              value="Active"
            />

            <DetailLine
              label="Joined"
              value={formatDate(user.joinedAt)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-[#EBE5DA] p-4">
      <div className="mb-3 text-[#C99624]">
        {icon}
      </div>

      <p className="text-xs text-[#756F66]">
        {label}
      </p>

      <p className="mt-1 font-display text-xl font-semibold text-[#29251F]">
        {value}
      </p>
    </div>
  )
}

function DetailLine({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#F1ECE3] pb-3 last:border-0">
      <span className="text-sm text-[#756F66]">
        {label}
      </span>

      <span className="text-right text-sm font-semibold text-[#29251F]">
        {value}
      </span>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF6DD] text-[#C99624]">
        <Users size={27} />
      </div>

      <h3 className="mt-5 font-display text-2xl font-semibold text-[#29251F]">
        User tidak ditemukan
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-[#756F66]">
        Coba gunakan kata kunci atau filter membership
        yang berbeda.
      </p>
    </div>
  )
}

export default AdminUsersPage