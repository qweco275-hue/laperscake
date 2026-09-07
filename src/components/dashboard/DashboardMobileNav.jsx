import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  CalendarDays,
  Heart,
  UserRound,
} from 'lucide-react'

const items = [
  {
    label: 'Home',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Classes',
    path: '/dashboard/classes',
    icon: CalendarDays,
  },
  {
    label: 'Wishlist',
    path: '/dashboard/wishlist',
    icon: Heart,
  },
  {
    label: 'Account',
    path: '/dashboard/account',
    icon: UserRound,
  },
]

function DashboardMobileNav() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#EBE5DA] bg-white/95 px-3 py-2 backdrop-blur lg:hidden">

      <div className="mx-auto flex max-w-lg justify-around">

        {items.map((item) => {

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
              className={`flex min-w-16 flex-col items-center gap-1 rounded-xl px-3 py-2 ${
                active
                  ? 'text-[#B57918]'
                  : 'text-[#756F66]'
              }`}
            >
              <Icon size={18} />

              <span className="text-[9px] font-bold">
                {item.label}
              </span>

            </Link>
          )
        })}

      </div>

    </nav>
  )
}

export default DashboardMobileNav