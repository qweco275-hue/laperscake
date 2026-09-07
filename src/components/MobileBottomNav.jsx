import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  Search,
  GraduationCap,
  BookOpen,
  UserRound,
} from 'lucide-react'

function MobileBottomNav() {
  const location = useLocation()

  const items = [
    {
      label: 'Home',
      icon: Home,
      path: '/',
    },
    {
      label: 'Explore',
      icon: Search,
      path: '/explore',
    },
    {
      label: 'Kelas',
      icon: GraduationCap,
      path: '/classes',
    },
    {
      label: 'Resep',
      icon: BookOpen,
      path: '/recipes',
    },
    {
      label: 'Profile',
      icon: UserRound,
      path: '/dashboard',
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#EBE5DA] bg-white/95 px-3 py-2 backdrop-blur-xl lg:hidden">

      <div className="mx-auto flex max-w-md items-center justify-around">

        {items.map((item) => {
          const Icon = item.icon

          const active =
            item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path)

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex min-w-[60px] flex-col items-center gap-1 rounded-xl px-3 py-2 transition ${
                active
                  ? 'text-[#B57918]'
                  : 'text-[#756F66]'
              }`}
            >
              <Icon size={19} strokeWidth={active ? 2.4 : 1.8} />

              <span className="text-[10px] font-semibold">
                {item.label}
              </span>
            </Link>
          )
        })}

      </div>

    </nav>
  )
}

export default MobileBottomNav