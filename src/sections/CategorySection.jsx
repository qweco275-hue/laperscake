import { Link } from 'react-router-dom'
import { ArrowRight, MonitorPlay, MapPin, Users, Sparkles } from 'lucide-react'

function CategorySection() {
  return (
    <section className="bg-[#FFFDF7] px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#A95D6C]">
              Pilih Pengalaman
            </p>

            <h2 className="font-display mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
              Baking dengan cara
              <br />
              yang paling kamu suka.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#756F66]">
              Mau belajar dari rumah, datang langsung ke studio, atau
              mengikuti workshop spesial? Temukan pengalaman baking yang
              cocok untukmu.
            </p>
          </div>

          <Link
            to="/explore"
            className="group inline-flex w-fit items-center gap-2 text-sm font-bold text-[#29251F]"
          >
            Lihat semua kelas
            <ArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Main Categories */}
        <div className="mt-12 grid gap-5 lg:grid-cols-3">

          {/* ONLINE */}
          <article className="group relative overflow-hidden rounded-[2rem] bg-[#BFE5D0] p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-9">
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/20" />

            <div className="relative">
              <div className="flex items-start justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-xs font-bold tracking-wide text-[#4F8065]">
                  <MonitorPlay size={13} />
                  ONLINE
                </span>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/60 text-[#4F8065]">
                  <MonitorPlay size={23} />
                </div>
              </div>

              <h3 className="font-display mt-8 text-3xl font-semibold sm:text-4xl">
                Belajar dari rumah.
              </h3>

              <p className="mt-4 max-w-sm text-sm leading-6 text-[#4F8065]">
                Ikuti kelas live bersama instructor dari mana saja.
                Fleksibel, praktis, dan tetap interaktif.
              </p>

              <Link
                to="/explore/online"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#29251F] transition hover:-translate-y-0.5 hover:bg-[#FFFDF7]"
              >
                Lihat kelas online
                <ArrowRight size={16} />
              </Link>
            </div>
          </article>

          {/* OFFLINE */}
          <article className="group relative overflow-hidden rounded-[2rem] bg-[#F3D7DC] p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-9">
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/20" />

            <div className="relative">
              <div className="flex items-start justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-xs font-bold tracking-wide text-[#A95D6C]">
                  <MapPin size={13} />
                  OFFLINE
                </span>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/60 text-[#A95D6C]">
                  <MapPin size={23} />
                </div>
              </div>

              <h3 className="font-display mt-8 text-3xl font-semibold sm:text-4xl">
                Datang ke studio.
              </h3>

              <p className="mt-4 max-w-sm text-sm leading-6 text-[#A95D6C]">
                Rasakan pengalaman baking secara langsung bersama
                instructor dan komunitas baking di studio.
              </p>

              <Link
                to="/explore/offline"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#29251F] transition hover:-translate-y-0.5 hover:bg-[#FFFDF7]"
              >
                Lihat kelas offline
                <ArrowRight size={16} />
              </Link>
            </div>
          </article>

          {/* WORKSHOP */}
          <article className="group relative overflow-hidden rounded-[2rem] bg-[#F1E1B8] p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-9">
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/25" />

            <div className="relative">
              <div className="flex items-start justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-xs font-bold tracking-wide text-[#A27620]">
                  <Sparkles size={13} />
                  WORKSHOP
                </span>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/60 text-[#A27620]">
                  <Sparkles size={23} />
                </div>
              </div>

              <h3 className="font-display mt-8 text-3xl font-semibold sm:text-4xl">
                Buat sesuatu yang spesial.
              </h3>

              <p className="mt-4 max-w-sm text-sm leading-6 text-[#8A691F]">
                Ikuti workshop tematik, event spesial, atau pengalaman
                baking bersama orang-orang terdekat.
              </p>

              <Link
                to="/explore/workshops"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#29251F] transition hover:-translate-y-0.5 hover:bg-[#FFFDF7]"
              >
                Lihat workshop
                <ArrowRight size={16} />
              </Link>
            </div>
          </article>

        </div>

        {/* Bottom Trust Row */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl border border-[#EBE5DA] bg-white px-5 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF4D7] text-[#C99624]">
              <Users size={19} />
            </div>
            <div>
              <p className="text-sm font-bold">Untuk semua usia</p>
              <p className="text-xs text-[#756F66]">
                Dari pemula sampai advanced
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[#EBE5DA] bg-white px-5 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E5F5EC] text-[#4F8065]">
              <MonitorPlay size={19} />
            </div>
            <div>
              <p className="text-sm font-bold">Online & Offline</p>
              <p className="text-xs text-[#756F66]">
                Pilih cara belajar favoritmu
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[#EBE5DA] bg-white px-5 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F8E8EB] text-[#A95D6C]">
              <Sparkles size={19} />
            </div>
            <div>
              <p className="text-sm font-bold">Instructor pilihan</p>
              <p className="text-xs text-[#756F66]">
                Belajar bersama baker berpengalaman
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default CategorySection