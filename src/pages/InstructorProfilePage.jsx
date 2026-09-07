import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Star,
  Users,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import MobileBottomNav from '../components/MobileBottomNav'
import { getInstructors } from '../data/instructorStorage'
import { getClasses } from '../data/classStorage'

function InstructorProfilePage() {
  const { id } = useParams()

  const [instructors, setInstructors] = useState(
    () => getInstructors(),
  )

  const [classes, setClasses] = useState(
    () => getClasses(),
  )

  useEffect(() => {
    const refreshData = () => {
      setInstructors(getInstructors())
      setClasses(getClasses())
    }

    refreshData()

    window.addEventListener(
      'instructorsUpdated',
      refreshData,
    )

    window.addEventListener(
      'classesUpdated',
      refreshData,
    )

    window.addEventListener(
      'storage',
      refreshData,
    )

    return () => {
      window.removeEventListener(
        'instructorsUpdated',
        refreshData,
      )

      window.removeEventListener(
        'classesUpdated',
        refreshData,
      )

      window.removeEventListener(
        'storage',
        refreshData,
      )
    }
  }, [])

  const instructor = useMemo(() => {
    return instructors.find(
      (item) =>
        String(item.id) === String(id),
    )
  }, [instructors, id])

  const instructorClasses = useMemo(() => {
    if (!instructor) return []

    return classes.filter((item) => {
      if (
        item.instructorId &&
        String(item.instructorId) ===
          String(instructor.id)
      ) {
        return true
      }

      return (
        String(item.instructor || '')
          .trim()
          .toLowerCase() ===
        String(instructor.name || '')
          .trim()
          .toLowerCase()
      )
    })
  }, [classes, instructor])

  if (!instructor) {
    return (
      <div className="min-h-screen bg-[#FFFDF7]">
        <Navbar />

        <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4 py-16">
          <div className="w-full rounded-3xl border border-[#EBE5DA] bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF3D4] text-3xl">
              👨‍🍳
            </div>

            <h1 className="mt-5 font-display text-3xl font-semibold text-[#29251F]">
              Instructor tidak ditemukan
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#756F66]">
              Profil instructor yang kamu cari mungkin
              sudah dihapus atau tidak tersedia.
            </p>

            <Link
              to="/instructors"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#29251F] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#4F8065]"
            >
              <ArrowLeft size={16} />
              Kembali ke Instructors
            </Link>
          </div>
        </main>

        <MobileBottomNav />
      </div>
    )
  }

  const rating = Number(instructor.rating || 0)
  const reviews = Number(instructor.reviews || 0)
  const students = Number(instructor.students || 0)
  const totalClasses = Number(instructor.classes || 0)

  return (
    <div className="min-h-screen bg-[#FFFDF7] pb-20 lg:pb-0">
      <Navbar />

      <main>

        {/* BACK */}
        <section className="border-b border-[#EBE5DA]">
          <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8">
            <Link
              to="/instructors"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#756F66] transition hover:text-[#29251F]"
            >
              <ArrowLeft size={16} />
              Semua instructor
            </Link>
          </div>
        </section>

        {/* PROFILE HERO */}
        <section className="border-b border-[#EBE5DA]">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:items-center">

              {/* AVATAR */}
              <div className="relative flex h-80 items-center justify-center overflow-hidden rounded-[2.5rem] bg-[#F4E5D1]">
                <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[#E8B84A]" />

                <div className="absolute -bottom-16 -left-12 h-52 w-52 rounded-full bg-[#BFE5D0]" />

                <div className="relative z-10 flex h-44 w-44 items-center justify-center rounded-full bg-white text-[7rem] shadow-xl">
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

              {/* PROFILE INFO */}
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#FFF1D0] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#A56E12]">
                    LaperCakes Instructor
                  </span>

                  {instructor.status === 'active' && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF6EF] px-3 py-1.5 text-xs font-bold text-[#4F8065]">
                      <CheckCircle2 size={13} />
                      Aktif
                    </span>
                  )}
                </div>

                <h1 className="font-display mt-5 text-4xl font-semibold leading-tight tracking-tight text-[#29251F] sm:text-5xl lg:text-6xl">
                  {instructor.name}
                </h1>

                <p className="mt-3 text-lg font-semibold text-[#4F8065]">
                  {instructor.role || 'Baker Instructor'}
                </p>

                {instructor.specialty && (
                  <div className="mt-5">
                    <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-[#514B43] shadow-sm ring-1 ring-[#EBE5DA]">
                      {instructor.specialty}
                    </span>
                  </div>
                )}

                <p className="mt-6 max-w-2xl text-sm leading-7 text-[#756F66] sm:text-base">
                  {instructor.bio ||
                    'Belajar baking bersama instructor berpengalaman dan temukan teknik baru untuk membuat hasil baking yang lebih baik.'}
                </p>

                {instructor.location && (
                  <div className="mt-5 flex items-center gap-2 text-sm text-[#756F66]">
                    <MapPin
                      size={17}
                      className="text-[#4F8065]"
                    />
                    {instructor.location}
                  </div>
                )}

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 rounded-2xl bg-[#FFF4D8] px-4 py-3">
                    <Star
                      size={18}
                      fill="currentColor"
                      className="text-[#E8B84A]"
                    />

                    <div>
                      <p className="text-sm font-bold text-[#29251F]">
                        {rating
                          ? rating.toFixed(1)
                          : '-'}
                      </p>

                      <p className="text-[10px] text-[#756F66]">
                        {reviews} reviews
                      </p>
                    </div>
                  </div>

                  {instructor.experience && (
                    <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-[#EBE5DA]">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-[#A19A91]">
                        Experience
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#29251F]">
                        {instructor.experience}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <div className="grid gap-3 sm:grid-cols-3">
            <ProfileStat
              icon={BookOpen}
              value={
                totalClasses ||
                instructorClasses.length
              }
              label="Kelas diajarkan"
            />

            <ProfileStat
              icon={Users}
              value={students}
              label="Students"
            />

            <ProfileStat
              icon={Star}
              value={reviews}
              label="Reviews"
            />
          </div>
        </section>

        {/* CLASSES */}
        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-24">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#B57918]">
                Classes
              </span>

              <h2 className="font-display mt-2 text-3xl font-semibold text-[#29251F] sm:text-4xl">
                Kelas yang diajarkan
              </h2>

              <p className="mt-2 text-sm text-[#756F66]">
                Temukan kelas dan belajar langsung bersama{' '}
                {instructor.name}.
              </p>
            </div>

            <Link
              to="/explore"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#4F8065] transition hover:text-[#29251F]"
            >
              Explore semua kelas
              <ArrowRight size={16} />
            </Link>
          </div>

          {instructorClasses.length > 0 ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {instructorClasses.map((item) => (
                <ClassCard
                  key={item.id}
                  item={item}
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-[2rem] border border-dashed border-[#D8D0C2] bg-white px-6 py-16 text-center">
              <div className="text-5xl">🧁</div>

              <h3 className="mt-5 font-display text-2xl font-semibold text-[#29251F]">
                Belum ada kelas
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#756F66]">
                Instructor ini belum memiliki kelas yang
                terhubung.
              </p>

              <Link
                to="/explore"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#29251F] px-5 py-3 text-sm font-bold text-white"
              >
                Cari kelas
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-24">
          <div className="overflow-hidden rounded-[2.5rem] bg-[#BFE5D0] p-8 sm:p-12 lg:p-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#4F8065]">
                  Siap belajar?
                </span>

                <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold leading-tight text-[#29251F] sm:text-4xl">
                  Temukan kelas dan mulai baking bareng instructor favoritmu.
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-6 text-[#526A5B]">
                  Pilih kelas online atau offline sesuai
                  kebutuhanmu.
                </p>
              </div>

              <Link
                to="/explore"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#29251F] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#403A33]"
              >
                Explore Classes
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

function ProfileStat({
  icon: Icon,
  value,
  label,
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[#EBE5DA] bg-white p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF3D4] text-[#B57918]">
        <Icon size={19} />
      </div>

      <div>
        <p className="font-display text-2xl font-semibold text-[#29251F]">
          {value}
        </p>

        <p className="text-xs text-[#756F66]">
          {label}
        </p>
      </div>
    </div>
  )
}

function ClassCard({ item }) {
  return (
    <Link
      to={`/classes/${item.id}`}
      className="group overflow-hidden rounded-[2rem] border border-[#EBE5DA] bg-white transition duration-200 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-[#FFF3D4]">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#BFE5D0]" />

        <div className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-[#D98C9B]" />

        <span className="relative z-10 text-7xl transition duration-200 group-hover:scale-110">
          {getEmoji(item.category)}
        </span>

        {item.mode && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold text-[#29251F] backdrop-blur">
            {item.mode}
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-[#F8F6F1] px-3 py-1.5 text-[10px] font-bold text-[#756F66]">
            {item.category || 'Baking'}
          </span>

          <div className="flex items-center gap-1 text-xs font-bold text-[#A87518]">
            <Star
              size={13}
              fill="currentColor"
              className="text-[#E8B84A]"
            />
            {item.rating || '-'}
          </div>
        </div>

        <h3 className="font-display mt-4 text-xl font-semibold leading-tight text-[#29251F]">
          {item.name}
        </h3>

        <div className="mt-4 space-y-2">
          {item.date && (
            <div className="flex items-center gap-2 text-xs text-[#756F66]">
              <CalendarDays size={14} />
              {formatDate(item.date)}
            </div>
          )}

          {item.time && (
            <div className="flex items-center gap-2 text-xs text-[#756F66]">
              <Clock3 size={14} />
              {item.time}
            </div>
          )}

          {item.mode === 'Offline' && item.location && (
            <div className="flex items-center gap-2 text-xs text-[#756F66]">
              <MapPin size={14} />
              {item.location}
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-[#EBE5DA] pt-4">
          <div>
            <p className="text-[10px] text-[#A19A91]">
              Mulai dari
            </p>

            <p className="mt-1 text-sm font-bold text-[#29251F]">
              {formatCurrency(item.price)}
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#29251F] text-white transition group-hover:bg-[#4F8065]">
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  )
}

function getEmoji(category) {
  const emojiMap = {
    Cookies: '🍪',
    Cake: '🎂',
    Bread: '🍞',
    Pastry: '🥐',
    Dessert: '🍰',
    Pizza: '🍕',
  }

  return emojiMap[category] || '🧁'
}

function formatCurrency(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0))
}

function formatDate(value) {
  if (!value) return '-'

  const date = new Date(
    `${value}T00:00:00`,
  )

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat(
    'id-ID',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    },
  ).format(date)
}

export default InstructorProfilePage