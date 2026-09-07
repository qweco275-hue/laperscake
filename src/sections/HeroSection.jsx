import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Play,
  Star,
  CheckCircle2,
  Users,
  Clock3,
} from 'lucide-react'

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-20 lg:pb-32 lg:pt-24">

      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#E8B84A]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#BFE5D0]/30 blur-3xl" />

      <div className="mx-auto max-w-7xl">

        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-16">

          {/* =====================================================
              LEFT CONTENT
          ===================================================== */}

          <div className="relative z-10 max-w-2xl">

            {/* BADGE */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#EAD9B7] bg-[#FFF7E5] px-4 py-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E8B84A] text-[11px]">
                ✦
              </span>

              <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#9A6A16] sm:text-sm">
                Baking platform untuk semua
              </span>
            </div>

            {/* HEADLINE */}
            <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-tight text-[#29251F] sm:text-6xl lg:text-[76px]">

              Temukan cara baru

              <br />

              untuk{' '}
              <span className="relative inline-block text-[#A95D6C]">
                jatuh cinta
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 180 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8C48 2 125 2 177 7"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>

              <br />

              pada baking.

            </h1>

            {/* DESCRIPTION */}
            <p className="mt-7 max-w-xl text-base leading-7 text-[#756F66] sm:text-lg">
              Belajar baking jadi lebih mudah dan menyenangkan.
              Temukan kelas, instructor, resep, workshop, dan komunitas
              dalam satu platform.
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              <Link
                to="/explore"
                className="group flex items-center justify-center gap-2 rounded-full bg-[#E8B84A] px-7 py-4 text-center text-sm font-bold text-[#29251F] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#D9A936] hover:shadow-md sm:text-base"
              >
                Explore Kelas

                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/recipes"
                className="flex items-center justify-center gap-2 rounded-full border border-[#E5DED2] bg-white px-7 py-4 text-center text-sm font-bold text-[#29251F] transition duration-200 hover:-translate-y-0.5 hover:bg-[#FAF6EE] sm:text-base"
              >
                Jelajahi Resep
              </Link>

            </div>

            {/* TRUST POINTS */}
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[#756F66]">

              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#BFE5D0]">
                  <CheckCircle2 size={15} />
                </span>

                Beginner friendly
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F4E5D1]">
                  <CheckCircle2 size={15} />
                </span>

                Online & Offline
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F3DCE1]">
                  <CheckCircle2 size={15} />
                </span>

                Instructor profesional
              </div>

            </div>

          </div>

          {/* =====================================================
              RIGHT VISUAL
          ===================================================== */}

          <div className="relative mx-auto w-full max-w-[540px]">

            {/* MAIN CARD */}
            <div className="relative aspect-[0.92] overflow-hidden rounded-[3rem] bg-[#F4E5D1]">

              {/* DECORATIVE SHAPES */}
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#E8B84A]" />

              <div className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-[#BFE5D0]" />

              <div className="absolute left-10 top-14 h-20 w-20 rounded-full border-[12px] border-white/50" />

              <div className="absolute bottom-16 right-12 h-12 w-12 rounded-full bg-[#D98C9B]/40" />

              {/* CENTER CONTENT */}
              <div className="absolute inset-0 flex items-center justify-center">

                <div className="relative z-10 text-center">

                  <div className="mb-4 text-[100px] leading-none drop-shadow-sm sm:text-[130px]">
                    🥐
                  </div>

                  <div className="font-display text-3xl font-semibold text-[#29251F] sm:text-4xl">
                    Bake Something
                  </div>

                  <div className="mt-2 text-sm text-[#756F66]">
                    Learn • Create • Enjoy
                  </div>

                </div>

              </div>

              {/* FLOATING INGREDIENTS */}

              <div className="absolute left-5 top-8 flex h-14 w-14 rotate-[-10deg] items-center justify-center rounded-2xl bg-white text-2xl shadow-lg">
                🥚
              </div>

              <div className="absolute bottom-8 right-7 flex h-14 w-14 rotate-[10deg] items-center justify-center rounded-2xl bg-white text-2xl shadow-lg">
                🧈
              </div>

              <div className="absolute left-10 bottom-20 flex h-12 w-12 rotate-[8deg] items-center justify-center rounded-2xl bg-white text-xl shadow-lg">
                🍫
              </div>

            </div>

            {/* =====================================================
                FLOATING RATING CARD
            ===================================================== */}

            <div className="absolute -bottom-6 left-4 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5 sm:-left-7 sm:p-5">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF7E5] text-[#B57918]">
                  <Star size={19} fill="currentColor" />
                </div>

                <div>

                  <div className="flex items-center gap-1">
                    <p className="text-sm font-bold text-[#29251F]">
                      4.9
                    </p>

                    <Star
                      size={12}
                      className="text-[#E8B84A]"
                      fill="currentColor"
                    />
                  </div>

                  <p className="mt-0.5 text-xs text-[#756F66]">
                    Dari 500+ reviews
                  </p>

                </div>

              </div>

            </div>

            {/* =====================================================
                FLOATING CLASS CARD
            ===================================================== */}

            <div className="absolute right-0 top-8 w-[190px] rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5 sm:-right-6">

              <div className="mb-3 flex items-center justify-between">

                <span className="rounded-full bg-[#EFF8F3] px-2.5 py-1 text-[10px] font-bold text-[#4F8065]">
                  POPULAR
                </span>

                <span className="text-xs text-[#756F66]">
                  4.9 ★
                </span>

              </div>

              <p className="font-display text-base font-semibold leading-tight text-[#29251F]">
                Classic Cookies
                <br />
                Masterclass
              </p>

              <div className="mt-3 flex items-center gap-2 text-[11px] text-[#756F66]">

                <Clock3 size={13} />

                2 jam

              </div>

              <div className="mt-1 flex items-center gap-2 text-[11px] text-[#756F66]">

                <Users size={13} />

                12 peserta

              </div>

            </div>

            {/* =====================================================
                PLAY BUTTON
            ===================================================== */}

            <button
              type="button"
              className="absolute bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#29251F] text-white shadow-xl transition hover:scale-105 hover:bg-[#403A33]"
              aria-label="Lihat video LaperCakes"
            >
              <Play
                size={19}
                fill="currentColor"
                className="ml-0.5"
              />
            </button>

          </div>

        </div>

      </div>

    </section>
  )
}

export default HeroSection