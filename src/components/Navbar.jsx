import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Menu,
  X,
  Search,
  ChevronDown,
  UserRound,
  BookOpen,
  CalendarDays,
  Laptop,
  MapPin,
  Users,
  Building2,
  Sparkles,
  ChefHat,
  Heart,
} from 'lucide-react'

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [exploreOpen, setExploreOpen] = useState(false)

  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  const closeMenu = () => {
    setMobileOpen(false)
    setExploreOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#EBE5DA]/80 bg-[#FFFDF7]/95 backdrop-blur-xl">

      {/* ================= HEADER ================= */}
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-8">

        {/* LOGO */}
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E8B84A] text-xl shadow-sm transition duration-300 group-hover:-rotate-3 group-hover:scale-105">
            🧁
          </div>

          <div>
            <p className="font-display text-xl font-bold leading-none tracking-tight text-[#29251F]">
              LaperCakes
            </p>

            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-[#756F66]">
              Bake • Learn • Share
            </p>
          </div>
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="hidden items-center gap-6 lg:flex">

          <NavLink
            to="/"
            active={isActive('/')}
          >
            Beranda
          </NavLink>

          {/* EXPLORE */}
          <div
            className="relative"
            onMouseEnter={() => setExploreOpen(true)}
            onMouseLeave={() => setExploreOpen(false)}
          >
            <button
              type="button"
              className={`flex items-center gap-1 text-sm font-semibold transition ${
                exploreOpen || isActive('/explore')
                  ? 'text-[#B57918]'
                  : 'text-[#29251F] hover:text-[#B57918]'
              }`}
            >
              Explore
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${
                  exploreOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {exploreOpen && (
              <div className="absolute left-1/2 top-full w-[620px] -translate-x-1/2 pt-4">

                <div className="rounded-[28px] border border-[#EBE5DA] bg-white p-5 shadow-[0_24px_70px_rgba(41,37,31,0.14)]">

                  {/* HEADER */}
                  <div className="mb-4 flex items-center justify-between border-b border-[#F0EBE2] pb-4">
                    <div>
                      <p className="font-display text-lg font-bold text-[#29251F]">
                        Explore LaperCakes
                      </p>

                      <p className="mt-1 text-xs text-[#756F66]">
                        Temukan pengalaman baking yang cocok untukmu.
                      </p>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF7E5] text-[#B57918]">
                      <Sparkles size={17} />
                    </div>
                  </div>

                  {/* MENU */}
                  <div className="grid grid-cols-2 gap-2">

                    <ExploreLink
                      to="/explore/all"
                      icon={<BookOpen size={18} />}
                      title="All Classes"
                      description="Lihat semua kelas baking"
                      onClick={closeMenu}
                    />

                    <ExploreLink
                      to="/explore/online"
                      icon={<Laptop size={18} />}
                      title="Online Class"
                      description="Belajar dari rumah"
                      onClick={closeMenu}
                    />

                    <ExploreLink
                      to="/explore/offline"
                      icon={<MapPin size={18} />}
                      title="Offline Class"
                      description="Belajar langsung di studio"
                      onClick={closeMenu}
                    />

                    <ExploreLink
                      to="/explore/workshops"
                      icon={<CalendarDays size={18} />}
                      title="Workshops"
                      description="Event dan kelas spesial"
                      onClick={closeMenu}
                    />

                    <ExploreLink
                      to="/explore/private"
                      icon={<Users size={18} />}
                      title="Private Class"
                      description="Kelas eksklusif dan personal"
                      onClick={closeMenu}
                    />

                    <ExploreLink
                      to="/explore/corporate"
                      icon={<Building2 size={18} />}
                      title="Corporate"
                      description="Team building & company"
                      onClick={closeMenu}
                    />

                  </div>

                  {/* FOOTER */}
                  <Link
                    to="/explore"
                    onClick={closeMenu}
                    className="mt-4 flex items-center justify-between rounded-2xl bg-[#29251F] px-4 py-3 text-white transition hover:bg-[#403A33]"
                  >
                    <div className="flex items-center gap-3">
                      <ChefHat size={18} />

                      <div>
                        <p className="text-sm font-bold">
                          Lihat Semua Kelas
                        </p>

                        <p className="text-[11px] text-white/60">
                          Cari kelas berdasarkan kebutuhanmu
                        </p>
                      </div>
                    </div>

                    <span className="text-lg">→</span>
                  </Link>

                </div>
              </div>
            )}
          </div>

          <NavLink
            to="/classes"
            active={isActive('/classes')}
          >
            Kelas
          </NavLink>

          <NavLink
            to="/instructors"
            active={isActive('/instructors')}
          >
            Instruktur
          </NavLink>

          <NavLink
            to="/recipes"
            active={isActive('/recipes')}
          >
            Resep
          </NavLink>

          <NavLink
            to="/community"
            active={isActive('/community')}
          >
            Komunitas
          </NavLink>

          <NavLink
            to="/blog"
            active={isActive('/blog')}
          >
            Blog
          </NavLink>

        </nav>

        {/* ================= RIGHT SIDE ================= */}
        <div className="hidden items-center gap-3 lg:flex">

          {/* SEARCH */}
          <Link
            to="/explore"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EBE5DA] bg-white transition hover:border-[#E8B84A] hover:bg-[#FFF7E5]"
            aria-label="Cari kelas"
          >
            <Search size={17} />
          </Link>

          {/* WISHLIST */}
          <Link
            to="/dashboard/wishlist"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EBE5DA] bg-white transition hover:border-[#D98C9B] hover:bg-[#FFF3F5]"
            aria-label="Wishlist"
          >
            <Heart size={17} />
          </Link>

          {/* ACCOUNT */}
          <Link
            to="/dashboard"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EBE5DA] bg-white transition hover:border-[#E8B84A] hover:bg-[#FFF7E5]"
            aria-label="Dashboard"
          >
            <UserRound size={17} />
          </Link>

          {/* CTA */}
          <Link
            to="/explore"
            className="rounded-full bg-[#29251F] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#403A33] hover:shadow-lg"
          >
            Cari Kelas
          </Link>

        </div>

        {/* ================= MOBILE BUTTON ================= */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EBE5DA] bg-white transition hover:bg-[#FFF7E5] lg:hidden"
          aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

      </div>

      {/* ================= MOBILE MENU ================= */}
      {mobileOpen && (
        <div className="border-t border-[#EBE5DA] bg-[#FFFDF7] px-4 py-5 shadow-lg lg:hidden">

          <div className="space-y-1">

            <MobileLink
              to="/"
              active={isActive('/')}
              onClick={closeMenu}
            >
              Beranda
            </MobileLink>

            <MobileLink
              to="/explore"
              active={isActive('/explore')}
              onClick={closeMenu}
            >
              Explore
            </MobileLink>

            <MobileLink
              to="/classes"
              active={isActive('/classes')}
              onClick={closeMenu}
            >
              Kelas
            </MobileLink>

            <MobileLink
              to="/instructors"
              active={isActive('/instructors')}
              onClick={closeMenu}
            >
              Instruktur
            </MobileLink>

            <MobileLink
              to="/events"
              active={isActive('/events')}
              onClick={closeMenu}
            >
              Events
            </MobileLink>

            <MobileLink
              to="/recipes"
              active={isActive('/recipes')}
              onClick={closeMenu}
            >
              Toko Resep
            </MobileLink>

            <MobileLink
              to="/community"
              active={isActive('/community')}
              onClick={closeMenu}
            >
              Komunitas
            </MobileLink>

            <MobileLink
              to="/blog"
              active={isActive('/blog')}
              onClick={closeMenu}
            >
              Blog
            </MobileLink>

            <MobileLink
              to="/membership"
              active={isActive('/membership')}
              onClick={closeMenu}
            >
              Membership
            </MobileLink>

            <MobileLink
              to="/dashboard/wishlist"
              active={isActive('/dashboard/wishlist')}
              onClick={closeMenu}
            >
              Wishlist
            </MobileLink>

            <MobileLink
              to="/dashboard"
              active={isActive('/dashboard')}
              onClick={closeMenu}
            >
              Dashboard
            </MobileLink>

            {/* MOBILE CTA */}
            <div className="pt-4">

              <Link
                to="/explore"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-full bg-[#29251F] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#403A33]"
              >
                <Search size={16} />
                Cari Kelas
              </Link>

            </div>

          </div>
        </div>
      )}

    </header>
  )
}

/* =========================================================
   DESKTOP NAV LINK
========================================================= */

function NavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`relative py-2 text-sm font-semibold transition ${
        active
          ? 'text-[#B57918]'
          : 'text-[#29251F] hover:text-[#B57918]'
      }`}
    >
      {children}

      {active && (
        <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#E8B84A]" />
      )}
    </Link>
  )
}

/* =========================================================
   EXPLORE LINK
========================================================= */

function ExploreLink({
  to,
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="group flex gap-3 rounded-2xl p-3 transition hover:bg-[#FFF7E5]"
    >

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF7E5] text-[#B57918] transition group-hover:bg-[#E8B84A] group-hover:text-[#29251F]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm font-bold text-[#29251F]">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-[#756F66]">
          {description}
        </p>
      </div>

    </Link>
  )
}

/* =========================================================
   MOBILE LINK
========================================================= */

function MobileLink({
  to,
  active,
  children,
  onClick,
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
        active
          ? 'bg-[#FFF7E5] text-[#B57918]'
          : 'text-[#29251F] hover:bg-[#FFF7E5]'
      }`}
    >
      <span>{children}</span>

      {active && (
        <span className="h-1.5 w-1.5 rounded-full bg-[#E8B84A]" />
      )}
    </Link>
  )
}

export default Navbar