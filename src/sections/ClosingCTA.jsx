import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ChefHat,
  Sparkles,
  BookOpen,
} from 'lucide-react'

function ClosingCTA() {
  return (
    <section className="bg-[#FFFDF7] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">

        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#E8B84A] px-6 py-12 sm:px-12 sm:py-16">

          {/* Decorative shapes */}
          <div className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-white/15" />
          <div className="absolute -bottom-20 -right-10 h-52 w-52 rounded-full bg-white/15" />
          <div className="absolute right-1/4 top-8 h-16 w-16 rounded-full border-2 border-white/20" />

          <div className="relative mx-auto max-w-3xl text-center">

            {/* ICON */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#29251F] text-[#E8B84A] shadow-lg">
              <ChefHat size={30} strokeWidth={1.8} />
            </div>

            {/* EYEBROW */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#6F551A]">
              <Sparkles size={14} />
              Ready to bake?
              <Sparkles size={14} />
            </div>

            {/* HEADING */}
            <h2 className="font-display mt-4 text-4xl font-semibold leading-tight text-[#29251F] sm:text-5xl">
              Saatnya bikin sesuatu
              <br />
              yang <span className="text-[#A95D6C]">lezat.</span>
            </h2>

            {/* DESCRIPTION */}
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#514B43] sm:text-base">
              Temukan kelas, resep, dan pengalaman baking yang sesuai dengan
              caramu. Pilih sesuatu yang menarik, lalu mulai baking hari ini.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                to="/explore"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#29251F] px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#403A32]"
              >
                Explore Kelas
                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/recipes"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#29251F] transition hover:-translate-y-0.5 hover:bg-[#FFFDF7]"
              >
                <BookOpen size={17} />
                Jelajahi Resep
              </Link>

            </div>

            {/* TRUST POINTS */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-[#6F551A]">
              <span>✓ Online & Offline</span>
              <span>✓ Beginner Friendly</span>
              <span>✓ Instructor Pilihan</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default ClosingCTA