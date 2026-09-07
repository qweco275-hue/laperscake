import { Link } from 'react-router-dom'
import {
  Search,
  CalendarCheck2,
  CreditCard,
  ChefHat,
  ArrowRight,
} from 'lucide-react'

function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Temukan kelas',
      description:
        'Jelajahi berbagai kelas baking berdasarkan kategori, level, mode, dan jadwal yang paling cocok untukmu.',
    },
    {
      number: '02',
      icon: CalendarCheck2,
      title: 'Pilih jadwal',
      description:
        'Pilih kelas dan jadwal yang tersedia, lalu isi detail peserta untuk mengamankan tempatmu.',
    },
    {
      number: '03',
      icon: CreditCard,
      title: 'Booking & bayar',
      description:
        'Selesaikan pembayaran dengan metode yang tersedia dan dapatkan konfirmasi booking secara instan.',
    },
    {
      number: '04',
      icon: ChefHat,
      title: 'Mulai baking',
      description:
        'Datang ke studio atau join kelas online. Saatnya belajar, membuat, dan menikmati hasil baking-mu.',
    },
  ]

  return (
    <section className="bg-[#F7F2E9] px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#A95D6C]">
              Cara Kerja
            </p>

            <h2 className="font-display mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
              Dari penasaran
              <br />
              sampai jadi baker.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#756F66]">
              Nggak perlu ribet. Temukan kelas yang kamu suka, booking
              tempatmu, lalu mulai pengalaman baking bersama instructor pilihan.
            </p>
          </div>

          <Link
            to="/explore"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-[#29251F] px-5 py-3 text-sm font-bold transition hover:bg-[#29251F] hover:text-white"
          >
            Explore kelas
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* STEPS */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <article
                key={step.number}
                className="group relative rounded-[2rem] bg-white p-7 ring-1 ring-[#EBE5DA] transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8"
              >
                {/* NUMBER + ICON */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold tracking-wider text-[#A29B91]">
                    {step.number}
                  </span>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF1D0] text-[#C99624] transition duration-300 group-hover:rotate-3 group-hover:scale-105">
                    <Icon size={24} strokeWidth={1.8} />
                  </div>
                </div>

                {/* CONTENT */}
                <h3 className="font-display mt-8 text-2xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#756F66]">
                  {step.description}
                </p>

                {/* CONNECTOR */}
                {index < steps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F7F2E9] text-[#A29B91]">
                      <ArrowRight size={13} />
                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-8 overflow-hidden rounded-[2rem] bg-[#29251F] px-7 py-8 text-white sm:px-9">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-[#E8B84A]">
                <ChefHat size={17} />
                READY TO BAKE?
              </div>

              <h3 className="font-display mt-2 text-2xl font-semibold sm:text-3xl">
                Cari kelas baking pertamamu.
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">
                Pilih dari berbagai kelas, instructor, dan pengalaman baking
                yang tersedia di LaperCakes.
              </p>
            </div>

            <Link
              to="/explore"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#E8B84A] px-6 py-3.5 text-sm font-bold text-[#29251F] transition hover:-translate-y-0.5 hover:bg-[#F2C966]"
            >
              Mulai explore
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

export default HowItWorks