import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  MapPin,
  Search,
  Star,
  Users,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import MobileBottomNav from '../components/MobileBottomNav'
import { getInstructors } from '../data/instructorStorage'

function InstructorsPage() {
  const [instructors, setInstructors] = useState(
    () => getInstructors(),
  )

  const [search, setSearch] = useState('')
  const [specialty, setSpecialty] = useState('Semua')

  useEffect(() => {
    const refreshInstructors = () => {
      setInstructors(getInstructors())
    }

    window.addEventListener(
      'instructorsUpdated',
      refreshInstructors,
    )

    window.addEventListener(
      'storage',
      refreshInstructors,
    )

    return () => {
      window.removeEventListener(
        'instructorsUpdated',
        refreshInstructors,
      )

      window.removeEventListener(
        'storage',
        refreshInstructors,
      )
    }
  }, [])

  const specialties = useMemo(() => {
    return [
      'Semua',
      ...new Set(
        instructors
          .map((item) => item.specialty)
          .filter(Boolean),
      ),
    ]
  }, [instructors])

  const filteredInstructors = useMemo(() => {
    const keyword = search.toLowerCase().trim()

    return instructors.filter((instructor) => {
      const matchesSearch =
        !keyword ||
        instructor.name
          ?.toLowerCase()
          .includes(keyword) ||
        instructor.role
          ?.toLowerCase()
          .includes(keyword) ||
        instructor.specialty
          ?.toLowerCase()
          .includes(keyword) ||
        instructor.location
          ?.toLowerCase()
          .includes(keyword)

      const matchesSpecialty =
        specialty === 'Semua' ||
        instructor.specialty === specialty

      const isActive =
        instructor.status === 'active' ||
        !instructor.status

      return (
        matchesSearch &&
        matchesSpecialty &&
        isActive
      )
    })
  }, [instructors, search, specialty])

  return (
    <div className="min-h-screen bg-[#FFFDF7] pb-20 lg:pb-0">
      <Navbar />

      <main>
        {/* HERO */}
        <section className="border-b border-[#EBE5DA]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
            <span className="inline-flex rounded-full bg-[#FFF1D0] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#A56E12]">
              Instructors
            </span>

            <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
              <div>
                <h1 className="font-display max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  Belajar langsung dari para baker profesional.
                </h1>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-[#756F66] sm:text-base">
                  Kenali instructor LaperCakes, pengalaman
                  mereka, spesialisasi, dan kelas yang mereka
                  ajarkan.
                </p>
              </div>

              <div className="rounded-[2rem] bg-[#29251F] p-6 text-white sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/50">
                  LaperCakes Instructor
                </p>

                <p className="mt-3 font-display text-2xl font-semibold">
                  Bukan cuma mengajar resep.
                </p>

                <p className="mt-3 text-sm leading-6 text-white/65">
                  Setiap instructor membawa pengalaman,
                  teknik, dan cara belajar yang berbeda.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FILTER */}
        <section className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* SEARCH */}
            <div className="relative w-full lg:max-w-md">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999187]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Cari nama, spesialisasi, atau lokasi..."
                className="form-input pl-11"
              />
            </div>

            {/* SPECIALTY */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {specialties.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSpecialty(item)}
                  className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold transition ${
                    specialty === item
                      ? 'bg-[#29251F] text-white'
                      : 'border border-[#EBE5DA] bg-white text-[#756F66] hover:border-[#D8D0C2] hover:text-[#29251F]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* INSTRUCTORS */}
        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
          {filteredInstructors.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredInstructors.map((instructor) => (
                <InstructorCard
                  key={instructor.id}
                  instructor={instructor}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              search={search}
              specialty={specialty}
            />
          )}
        </section>

        {/* BOTTOM CTA */}
        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-24">
          <div className="overflow-hidden rounded-[2.5rem] bg-[#BFE5D0] p-8 sm:p-12 lg:p-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#4F8065]">
                  Mau langsung praktik?
                </span>

                <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
                  Pilih kelas dan belajar bersama instructor favoritmu.
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-6 text-[#526A5B]">
                  Temukan kelas online maupun offline yang
                  sesuai dengan minat dan levelmu.
                </p>
              </div>

              <Link
                to="/explore"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#29251F] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#403A33]"
              >
                Cari Kelas
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MobileBottomNav />
    </div>
  )
}

function InstructorCard({ instructor }) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-[#EBE5DA] bg-white transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      {/* VISUAL */}
      <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[#F4E5D1]">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#E8B84A]" />
        <div className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-[#BFE5D0]" />

        <div className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full bg-white text-7xl shadow-lg">
          {instructor.emoji || '👨‍🍳'}
        </div>

        <div className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold shadow-sm">
          <CheckCircle2
            size={14}
            className="text-[#4F8065]"
          />
          Instructor
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold">
              {instructor.name}
            </h2>

            <p className="mt-1 text-sm text-[#756F66]">
              {instructor.role || 'Baker Instructor'}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1 rounded-full bg-[#FFF4D8] px-3 py-1.5 text-xs font-bold text-[#A87518]">
            <Star
              size={13}
              fill="currentColor"
            />
            {Number(instructor.rating || 0).toFixed(1)}
          </div>
        </div>

        {instructor.specialty && (
          <div className="mt-5">
            <span className="inline-flex rounded-full bg-[#F8F6F1] px-3 py-1.5 text-xs font-bold text-[#514B43]">
              {instructor.specialty}
            </span>
          </div>
        )}

        {instructor.bio && (
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-[#756F66]">
            {instructor.bio}
          </p>
        )}

        <div className="mt-5 grid grid-cols-3 gap-2">
          <Stat
            icon={BookOpen}
            value={instructor.classes || 0}
            label="Kelas"
          />

          <Stat
            icon={Users}
            value={instructor.students || 0}
            label="Students"
          />

          <Stat
            icon={Star}
            value={instructor.reviews || 0}
            label="Reviews"
          />
        </div>

        {instructor.location && (
          <div className="mt-5 flex items-center gap-2 text-xs text-[#756F66]">
            <MapPin size={15} />
            {instructor.location}
          </div>
        )}

        <Link
          to={`/instructors/${instructor.id}`}
          className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#29251F] px-4 py-3 text-sm font-bold text-white transition group-hover:bg-[#403A33]"
        >
          Lihat Profil
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  )
}

function Stat({ icon: Icon, value, label }) {
  return (
    <div className="rounded-xl bg-[#F8F6F1] px-2 py-3 text-center">
      <div className="flex justify-center text-[#756F66]">
        <Icon size={15} />
      </div>

      <p className="mt-1 text-sm font-bold text-[#29251F]">
        {value}
      </p>

      <p className="text-[10px] text-[#8C857B]">
        {label}
      </p>
    </div>
  )
}

function EmptyState({ search, specialty }) {
  return (
    <div className="rounded-[2rem] border border-dashed border-[#D8D0C2] bg-white px-6 py-16 text-center">
      <div className="text-5xl">👨‍🍳</div>

      <h2 className="mt-5 font-display text-2xl font-semibold">
        Instructor tidak ditemukan
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#756F66]">
        Coba gunakan kata kunci atau spesialisasi yang
        berbeda.
      </p>

      {(search || specialty !== 'Semua') && (
        <p className="mt-4 text-xs text-[#A56E12]">
          Filter sedang aktif
        </p>
      )}
    </div>
  )
}

export default InstructorsPage