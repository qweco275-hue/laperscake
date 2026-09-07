import { Link } from 'react-router-dom'
import {
  MessageCircle,
  Mail,
  MapPin,
  ArrowUpRight,
} from 'lucide-react'

function Footer() {
  const exploreLinks = [
    { label: 'Semua Kelas', to: '/explore/all' },
    { label: 'Kelas Online', to: '/explore/online' },
    { label: 'Kelas Offline', to: '/explore/offline' },
    { label: 'Workshop', to: '/explore/workshops' },
  ]

  const platformLinks = [
    { label: 'Beranda', to: '/' },
    { label: 'Resep', to: '/recipes' },
    { label: 'Membership', to: '/membership' },
    { label: 'Dashboard', to: '/dashboard' },
  ]

  return (
    <footer className="border-t border-[#EBE5DA] bg-[#29251F] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">

        {/* TOP */}
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* BRAND */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8B84A] text-[#29251F]">
                <span className="text-xl">🧁</span>
              </div>

              <div>
                <p className="font-display text-2xl font-bold">
                  LaperCakes
                </p>

                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Bake • Learn • Share
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
              Platform untuk menemukan kelas baking, belajar dari instructor
              pilihan, mengeksplorasi resep, dan berbagi pengalaman bersama
              komunitas baking.
            </p>

            {/* SOCIAL */}
            <div className="mt-7 flex gap-3">

              <a
                href="https://instagram.com/lapercakes"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram LaperCakes"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-bold transition hover:bg-[#D98C9B]"
              >
                IG
              </a>

              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp LaperCakes"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#BFE5D0] hover:text-[#29251F]"
              >
                <MessageCircle size={17} />
              </a>

              <a
                href="mailto:hello@lapercakes.id"
                aria-label="Email LaperCakes"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#E8B84A] hover:text-[#29251F]"
              >
                <Mail size={17} />
              </a>

            </div>
          </div>

          {/* EXPLORE */}
          <div>
            <h3 className="text-sm font-bold text-white">
              Explore
            </h3>

            <nav className="mt-5 flex flex-col gap-3">
              {exploreLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group flex w-fit items-center gap-1.5 text-sm text-white/55 transition hover:text-white"
                >
                  {link.label}

                  <ArrowUpRight
                    size={13}
                    className="opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* PLATFORM */}
          <div>
            <h3 className="text-sm font-bold text-white">
              LaperCakes
            </h3>

            <nav className="mt-5 flex flex-col gap-3">
              {platformLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group flex w-fit items-center gap-1.5 text-sm text-white/55 transition hover:text-white"
                >
                  {link.label}

                  <ArrowUpRight
                    size={13}
                    className="opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-sm font-bold text-white">
              Hubungi Kami
            </h3>

            <div className="mt-5 space-y-4">

              <div className="flex gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-[#E8B84A]"
                />

                <p className="text-sm leading-6 text-white/55">
                  Studio LaperCakes
                  <br />
                  Yogyakarta, Indonesia
                </p>
              </div>

              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-sm text-white/55 transition hover:text-white"
              >
                <MessageCircle size={17} />
                <span>+62 812-3456-7890</span>
              </a>

              <a
                href="mailto:hello@lapercakes.id"
                className="flex items-center gap-3 text-sm text-white/55 transition hover:text-white"
              >
                <Mail size={17} />
                <span>hello@lapercakes.id</span>
              </a>

            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-12 border-t border-white/10 pt-6">

          <div className="flex flex-col gap-3 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">

            <p>
              © 2026 LaperCakes. All rights reserved.
            </p>

            <p>
              Bake something. Learn something. Share something.
            </p>

          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer