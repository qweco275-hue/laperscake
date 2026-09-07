import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  CalendarDays,
  Receipt,
  BookOpen,
  Award,
  Gift,
  Heart,
  UserRound,
  LogOut,
} from 'lucide-react'

const menu = [
  {
    label: 'Overview',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'My Classes',
    path: '/dashboard/classes',
    icon: CalendarDays,
  },
  {
    label: 'My Bookings',
    path: '/dashboard/bookings',
    icon: Receipt,
  },
  {
    label: 'My Recipes',
    path: '/dashboard/recipes',
    icon: BookOpen,
  },
  {
    label: 'Certificates',
    path: '/dashboard/certificates',
    icon: Award,
  },
  {
    label: 'Rewards',
    path: '/dashboard/rewards',
    icon: Gift,
  },
  {
    label: 'Wishlist',
    path: '/dashboard/wishlist',
    icon: Heart,
  },
]

function DashboardSidebar() {
  const location = useLocation()

  return (
    <aside className="hidden w-64 shrink-0 border-r border-[#EBE5DA] bg-white lg:block">

      <div className="sticky top-0 min-h-screen p-5">

        {/* PROFILE */}
        <div className="rounded-3xl bg-[#FFF7E5] p-5">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8B84A] text-xl">
              👨‍🍳
            </div>

            <div className="min-w-0">

              <p className="truncate text-sm font-bold">
                Pandu
              </p>

              <p className="mt-0.5 text-[10px] text-[#756F66]">
                Baker Member
              </p>

            </div>

          </div>

          <div className="mt-4 flex items-center justify-between rounded-2xl bg-white px-3 py-2">

            <span className="text-[10px] font-semibold text-[#756F66]">
              LaperPoints
            </span>

            <span className="text-xs font-bold">
              1,280
            </span>

          </div>

        </div>

        {/* MENU */}
        <nav className="mt-6 space-y-1">

          {menu.map((item) => {

            const Icon = item.icon

            const active =
              item.path === '/dashboard'
                ? location.pathname === '/dashboard'
                : location.pathname.startsWith(
                    item.path
                  )

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  active
                    ? 'bg-[#29251F] text-white'
                    : 'text-[#756F66] hover:bg-[#FFF7E5] hover:text-[#29251F]'
                }`}
              >
                <Icon size={17} />
                {item.label}
              </Link>
            )
          })}

        </nav>

        <div className="my-6 border-t border-[#EBE5DA]" />

        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#756F66] transition hover:bg-[#FFF7E5]"
        >
          <LogOut size={17} />
          Kembali ke Website
        </Link>

      </div>

    </aside>
  )
}

export default DashboardSidebar