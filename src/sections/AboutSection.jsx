import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ChefHat,
  Heart,
  Sparkles,
  Users,
} from 'lucide-react'

function AboutSection() {
  return (
    <section
      id="tentang"
      className="bg-[#FFFDF7] px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">

        {/* MAIN CONTENT */}
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">

          {/* LEFT VISUAL */}
          <div className="relative min-h-[460px] overflow-hidden rounded-[2.5rem] bg-[#29251F] p-8 text-white sm:p-10">

            {/* Decorative circles */}
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#E8B84A]/20" />
            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#BFE5D0]/15" />

            <div className="relative flex h-full flex-col justify-between">

              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold tracking-wide text-[#E8B84A]">
                  <Sparkles size={14} />
                  TENTANG LAPerCAKES
                </span>

                <h2 className="font-display mt-7 max-w-md text-4xl font-semibold leading-tight sm:text-5xl">
                  Lebih dari sekadar
                  <span className="text-[#E8B84A]"> kelas baking.</span>
                </h2>

                <p className="mt-5 max-w-md text-sm leading-7 text-white/65 sm:text-base">
                  Sebuah ruang untuk belajar, bereksperimen, bertemu sesama
                  baking enthusiast, dan menikmati proses membuat sesuatu
                  dengan tangan sendiri.
                </p>
              </div>

              {/* Mini visual */}
              <div className="mt-10 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                  <ChefHat size={22} className="text-[#E8B84A]" />
                  <p className="mt-4 font-display text-xl font-semibold">
                    Learn
                  </p>
                  <p className="mt-1 text-xs text-white/50">
                    Belajar dari instructor pilihan
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                  <Heart size={22} className="text-[#F3AAB7]" />
                  <p className="mt-4 font-display text-xl font-semibold">
                    Enjoy
                  </p>
                  <p className="mt-1 text-xs text-white/50">
                    Nikmati proses baking
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col justify-between rounded-[2.5rem] border border-[#EBE5DA] bg-white p-8 shadow-[0_12px_40px_rgba(41,37,31,0.04)] sm:p-10">

            <div>
              <span className="inline-flex rounded-full bg-[#BFE5D0] px-4 py-2 text-xs font-bold text-[#4F8065]">
                Kenapa LaperCakes?
              </span>

              <h3 className="font-display mt-5 max-w-xl text-3xl font-semibold leading-tight sm:text-4xl">
                Baking seharusnya terasa
                <span className="text-[#A95D6C]"> menyenangkan.</span>
              </h3>

              <div className="mt-6 space-y-4">
                <p className="text-sm leading-7 text-[#756F66] sm:text-base">
                  LaperCakes hadir untuk membuat pengalaman belajar baking
                  terasa lebih mudah, fleksibel, dan menyenangkan. Mulai dari
                  kelas dasar sampai workshop yang lebih intensif, semuanya
                  bisa ditemukan dalam satu platform.
                </p>

                <p className="text-sm leading-7 text-[#756F66] sm:text-base">
                  Kamu bisa belajar secara online dari rumah, datang langsung
                  ke studio, atau mengikuti event dan workshop bersama
                  komunitas. Pilih pengalaman yang paling sesuai dengan
                  kebutuhanmu.
                </p>
              </div>
            </div>

            {/* FEATURES */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-[#FFF7E5] p-5">
                <Users size={20} className="text-[#C99624]" />
                <p className="mt-4 text-sm font-bold">
                  Untuk semua
                </p>
                <p className="mt-1 text-xs leading-5 text-[#756F66]">
                  Pemula hingga baker berpengalaman
                </p>
              </div>

              <div className="rounded-2xl bg-[#EEF9F3] p-5">
                <ChefHat size={20} className="text-[#4F8065]" />
                <p className="mt-4 text-sm font-bold">
                  Instructor pilihan
                </p>
                <p className="mt-1 text-xs leading-5 text-[#756F66]">
                  Belajar bersama baker berpengalaman
                </p>
              </div>

              <div className="rounded-2xl bg-[#FBECEF] p-5">
                <Sparkles size={20} className="text-[#A95D6C]" />
                <p className="mt-4 text-sm font-bold">
                  Banyak pengalaman
                </p>
                <p className="mt-1 text-xs leading-5 text-[#756F66]">
                  Kelas, workshop, resep, dan komunitas
                </p>
              </div>
            </div>

            {/* CTA */}
            <Link
              to="/explore"
              className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#29251F] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#3B352D]"
            >
              Kenali LaperCakes
              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

          </div>
        </div>

      </div>
    </section>
  )
}

export default AboutSection