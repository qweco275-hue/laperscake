import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Heart,
  MapPin,
  Monitor,
  Star,
  Users,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import MobileBottomNav from '../components/MobileBottomNav'
import BookingCheckout from '../components/classes/BookingCheckout'
import { getClasses } from '../data/classStorage'
import { getInstructors } from '../data/instructorStorage'

function ClassDetailPage() {
  const { id } = useParams()

  const [classes, setClasses] = useState(() => getClasses())

  const [instructors, setInstructors] = useState(() =>
    getInstructors(),
  )

  const [bookingOpen, setBookingOpen] = useState(false)

  const [activeTab, setActiveTab] = useState('Overview')

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem('lapercakes-wishlist') || '[]',
      )
    } catch {
      return []
    }
  })

  const [selectedDate, setSelectedDate] = useState('')

  const selectedClass = useMemo(() => {
    return classes.find(
      (item) => String(item.id) === String(id),
    )
  }, [classes, id])

  /*
   * Cocokkan instructor pada data kelas
   * dengan data instructor dari Admin Instructors.
   *
   * Prioritas:
   * 1. instructorId jika tersedia
   * 2. nama instructor
   */
  const selectedInstructor = useMemo(() => {
    if (!selectedClass) return null

    if (selectedClass.instructorId) {
      const byId = instructors.find(
        (item) =>
          String(item.id) ===
          String(selectedClass.instructorId),
      )

      if (byId) return byId
    }

    if (selectedClass.instructor) {
      const classInstructorName =
        String(selectedClass.instructor)
          .trim()
          .toLowerCase()

      return (
        instructors.find(
          (item) =>
            String(item.name || '')
              .trim()
              .toLowerCase() === classInstructorName,
        ) || null
      )
    }

    return null
  }, [selectedClass, instructors])

  useEffect(() => {
    const refreshData = () => {
      setClasses(getClasses())
      setInstructors(getInstructors())
    }

    refreshData()

    window.addEventListener(
      'storage',
      refreshData,
    )

    window.addEventListener(
      'classesUpdated',
      refreshData,
    )

    window.addEventListener(
      'instructorsUpdated',
      refreshData,
    )

    return () => {
      window.removeEventListener(
        'storage',
        refreshData,
      )

      window.removeEventListener(
        'classesUpdated',
        refreshData,
      )

      window.removeEventListener(
        'instructorsUpdated',
        refreshData,
      )
    }
  }, [])

  useEffect(() => {
    if (selectedClass) {
      setSelectedDate(selectedClass.date || '')
    }
  }, [selectedClass])

  if (!selectedClass) {
    return (
      <div className="min-h-screen bg-[#FFFDF7]">
        <Navbar />

        <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4 py-16">
          <div className="w-full rounded-3xl border border-[#EBE5DA] bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF3D4] text-3xl">
              🔎
            </div>

            <h1 className="font-display text-3xl font-semibold text-[#29251F]">
              Kelas tidak ditemukan
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#756F66]">
              Kelas yang kamu cari mungkin sudah dihapus
              atau tidak tersedia.
            </p>

            <Link
              to="/explore"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#29251F] px-5 py-3 text-sm font-bold text-white"
            >
              <ArrowLeft size={16} />
              Kembali ke Explore
            </Link>
          </div>
        </main>

        <MobileBottomNav />
      </div>
    )
  }

  const isWishlisted = wishlist.some(
    (item) =>
      String(item) === String(selectedClass.id),
  )

  const soldOut =
    Number(selectedClass.remaining || 0) <= 0

  const toggleWishlist = () => {
    const current = [...wishlist]

    const exists = current.some(
      (item) =>
        String(item) === String(selectedClass.id),
    )

    const updated = exists
      ? current.filter(
          (item) =>
            String(item) !==
            String(selectedClass.id),
        )
      : [...current, selectedClass.id]

    setWishlist(updated)

    localStorage.setItem(
      'lapercakes-wishlist',
      JSON.stringify(updated),
    )
  }

  const handleBookingSuccess = () => {
    setBookingOpen(false)
    setClasses(getClasses())
  }

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      <Navbar />

      <main className="pb-28">

        {/* BREADCRUMB */}
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#756F66] transition hover:text-[#29251F]"
          >
            <ArrowLeft size={16} />
            Semua kelas
          </Link>
        </div>

        {/* HERO */}
        <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-[2rem] border border-[#EBE5DA] bg-white shadow-sm lg:grid-cols-[1.05fr_1fr]">

            {/* VISUAL */}
            <div className="relative flex min-h-[380px] items-center justify-center overflow-hidden bg-[#FFF3D4] lg:min-h-[520px]">
              <div className="absolute inset-0 opacity-40">
                <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#BFE5D0]" />

                <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-[#D98C9B]" />

                <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border-[30px] border-white/30" />
              </div>

              <span className="relative text-[9rem] drop-shadow-sm sm:text-[11rem]">
                {getEmoji(selectedClass.category)}
              </span>

              <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#29251F] backdrop-blur">
                  {selectedClass.category}
                </span>

                {selectedClass.mode && (
                  <span className="rounded-full bg-[#BFE5D0]/90 px-3 py-1.5 text-xs font-bold text-[#4F8065] backdrop-blur">
                    {selectedClass.mode}
                  </span>
                )}

                {selectedClass.level && (
                  <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#756F66] backdrop-blur">
                    {selectedClass.level}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={toggleWishlist}
                className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#756F66] shadow-sm backdrop-blur transition hover:scale-105"
                aria-label="Wishlist"
              >
                <Heart
                  size={20}
                  fill={
                    isWishlisted
                      ? 'currentColor'
                      : 'none'
                  }
                  className={
                    isWishlisted
                      ? 'text-[#A95D6C]'
                      : ''
                  }
                />
              </button>

              {soldOut && (
                <div className="absolute bottom-5 left-5 rounded-full bg-[#A95D6C] px-4 py-2 text-xs font-bold text-white">
                  KELAS PENUH
                </div>
              )}
            </div>

            {/* HERO CONTENT */}
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-2 text-sm">
                <Star
                  size={17}
                  fill="currentColor"
                  className="text-[#E8B84A]"
                />

                <span className="font-bold text-[#29251F]">
                  {selectedClass.rating || '-'}
                </span>

                <span className="text-[#756F66]">
                  ({selectedClass.reviews || 0} reviews)
                </span>
              </div>

              <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-[#29251F] sm:text-5xl">
                {selectedClass.name}
              </h1>

              <p className="mt-5 text-sm leading-7 text-[#756F66] sm:text-base">
                {selectedClass.description ||
                  'Pelajari baking dengan cara yang menyenangkan bersama instructor berpengalaman.'}
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <Info
                  icon={CalendarDays}
                  label="Tanggal"
                  value={selectedClass.date || '-'}
                />

                <Info
                  icon={Clock3}
                  label="Waktu"
                  value={selectedClass.time || '-'}
                />

                <Info
                  icon={Users}
                  label="Peserta"
                  value={
                    selectedClass.ageLabel ||
                    selectedClass.audience ||
                    'Semua usia'
                  }
                />

                <Info
                  icon={
                    selectedClass.mode === 'Online'
                      ? Monitor
                      : MapPin
                  }
                  label="Format"
                  value={
                    selectedClass.mode === 'Online'
                      ? 'Online Class'
                      : 'Offline Class'
                  }
                />
              </div>

              <div className="mt-8 flex flex-col gap-4 border-t border-[#EBE5DA] pt-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs text-[#A19A91]">
                    Harga kelas
                  </p>

                  <p className="mt-1 font-display text-3xl font-semibold text-[#29251F]">
                    {formatCurrency(
                      selectedClass.price,
                    )}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!soldOut) {
                      setBookingOpen(true)
                    }
                  }}
                  disabled={soldOut}
                  className={`rounded-2xl px-6 py-3.5 text-sm font-bold transition ${
                    soldOut
                      ? 'cursor-not-allowed bg-[#F1ECE4] text-[#A19A91]'
                      : 'bg-[#29251F] text-white hover:bg-[#4F8065]'
                  }`}
                >
                  {soldOut
                    ? 'Kelas Penuh'
                    : 'Booking Sekarang'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT + BOOKING CARD */}
        <section className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

            {/* CONTENT */}
            <div>
              <div className="rounded-3xl border border-[#EBE5DA] bg-white p-6 shadow-sm sm:p-8">

                {/* TABS */}
                <div className="grid grid-cols-2 gap-2 rounded-2xl bg-[#FFFDF7] p-1 sm:grid-cols-5">
                  {[
                    'Overview',
                    'Curriculum',
                    'Materials',
                    'Instructor',
                    'Reviews',
                  ].map((tab) => (
                    <TabButton
                      key={tab}
                      label={tab}
                      active={activeTab === tab}
                      onClick={() =>
                        setActiveTab(tab)
                      }
                    />
                  ))}
                </div>

                {/* TAB CONTENT */}
                <div className="mt-8">

                  {activeTab === 'Overview' && (
                    <Overview
                      selectedClass={selectedClass}
                    />
                  )}

                  {activeTab === 'Curriculum' && (
                    <Curriculum
                      selectedClass={selectedClass}
                    />
                  )}

                  {activeTab === 'Materials' && (
                    <Materials
                      selectedClass={selectedClass}
                    />
                  )}

                  {activeTab === 'Instructor' && (
                    <Instructor
                      selectedClass={selectedClass}
                      instructor={selectedInstructor}
                    />
                  )}

                  {activeTab === 'Reviews' && (
                    <Reviews
                      selectedClass={selectedClass}
                    />
                  )}

                </div>
              </div>
            </div>

            {/* BOOKING CARD */}
            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <div className="rounded-3xl border border-[#EBE5DA] bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-[#756F66]">
                  Booking kelas
                </p>

                <h2 className="mt-1 font-display text-2xl font-semibold text-[#29251F]">
                  Pilih jadwal
                </h2>

                <div className="mt-5 space-y-3">
                  <ScheduleOption
                    date={selectedClass.date}
                    time={selectedClass.time}
                    selected={
                      selectedDate ===
                      selectedClass.date
                    }
                    onClick={() =>
                      setSelectedDate(
                        selectedClass.date,
                      )
                    }
                    remaining={
                      selectedClass.remaining
                    }
                  />

                  <ScheduleOption
                    date="2026-09-26"
                    time={selectedClass.time}
                    selected={
                      selectedDate ===
                      '2026-09-26'
                    }
                    onClick={() =>
                      setSelectedDate(
                        '2026-09-26',
                      )
                    }
                    remaining={8}
                  />

                  <ScheduleOption
                    date="2026-10-03"
                    time={selectedClass.time}
                    selected={
                      selectedDate ===
                      '2026-10-03'
                    }
                    onClick={() =>
                      setSelectedDate(
                        '2026-10-03',
                      )
                    }
                    remaining={10}
                  />
                </div>

                <div className="mt-6 rounded-2xl bg-[#FFFDF7] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#756F66]">
                      Harga
                    </span>

                    <span className="font-bold text-[#29251F]">
                      {formatCurrency(
                        selectedClass.price,
                      )}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-[#756F66]">
                      Slot tersedia
                    </span>

                    <span
                      className={`text-sm font-bold ${
                        soldOut
                          ? 'text-[#A95D6C]'
                          : 'text-[#4F8065]'
                      }`}
                    >
                      {selectedClass.remaining || 0}{' '}
                      slot
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!soldOut) {
                      setBookingOpen(true)
                    }
                  }}
                  disabled={soldOut}
                  className={`mt-5 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-bold ${
                    soldOut
                      ? 'cursor-not-allowed bg-[#F1ECE4] text-[#A19A91]'
                      : 'bg-[#E8B84A] text-[#29251F] hover:bg-[#D9A936]'
                  }`}
                >
                  {soldOut
                    ? 'Kelas Penuh'
                    : 'Lanjut Booking'}

                  {!soldOut && (
                    <ChevronRight size={17} />
                  )}
                </button>

                <div className="mt-5 space-y-3">
                  <TrustItem text="Booking aman dan mudah" />
                  <TrustItem text="Konfirmasi booking otomatis" />
                  <TrustItem text="Dukungan customer service" />
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <MobileBottomNav />

      {bookingOpen && (
        <BookingCheckout
          selectedClass={{
            ...selectedClass,
            date:
              selectedDate ||
              selectedClass.date,
          }}
          onClose={() =>
            setBookingOpen(false)
          }
          onSuccess={
            handleBookingSuccess
          }
        />
      )}
    </div>
  )
}

function Overview({ selectedClass }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-[#29251F]">
        Tentang kelas
      </h2>

      <p className="mt-4 text-sm leading-7 text-[#756F66]">
        {selectedClass.longDescription ||
          selectedClass.description ||
          'Kelas baking yang dirancang agar peserta dapat belajar secara praktis dan menyenangkan.'}
      </p>

      {selectedClass.highlights?.length > 0 && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {selectedClass.highlights.map(
            (highlight, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-2xl bg-[#FFFDF7] p-4"
              >
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-[#4F8065]"
                />

                <span className="text-sm leading-6 text-[#756F66]">
                  {highlight}
                </span>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  )
}

function Curriculum({ selectedClass }) {
  const curriculum =
    selectedClass.curriculum || []

  if (!curriculum.length) {
    return (
      <div>
        <h2 className="font-display text-2xl font-semibold text-[#29251F]">
          Curriculum
        </h2>

        <p className="mt-3 text-sm text-[#756F66]">
          Detail curriculum akan tersedia segera.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-[#29251F]">
        Curriculum
      </h2>

      <div className="mt-5 space-y-3">
        {curriculum.map((item, index) => {
          const title =
            typeof item === 'string'
              ? item
              : item.title || item.name

          const description =
            typeof item === 'string'
              ? null
              : item.description

          return (
            <div
              key={index}
              className="flex gap-4 rounded-2xl border border-[#EBE5DA] p-4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFF3D4] font-bold text-[#C99624]">
                {index + 1}
              </div>

              <div>
                <p className="text-sm font-bold text-[#29251F]">
                  {title}
                </p>

                {description && (
                  <p className="mt-1 text-xs leading-5 text-[#756F66]">
                    {description}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Materials({ selectedClass }) {
  const ingredients =
    selectedClass.ingredients || []

  const equipment =
    selectedClass.equipment || []

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-[#29251F]">
        Materials
      </h2>

      <div className="mt-5 grid gap-6 sm:grid-cols-2">
        <MaterialList
          title="Ingredients"
          items={ingredients}
        />

        <MaterialList
          title="Equipment"
          items={equipment}
        />
      </div>
    </div>
  )
}

function MaterialList({ title, items }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-[#29251F]">
        {title}
      </h3>

      {items.length ? (
        <ul className="mt-3 space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-[#756F66]"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E8B84A]" />

              {typeof item === 'string'
                ? item
                : item.name || item.title}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-[#A19A91]">
          Belum ada data.
        </p>
      )}
    </div>
  )
}

function Instructor({
  selectedClass,
  instructor,
}) {
  const instructorName =
    instructor?.name ||
    selectedClass.instructor ||
    'Instructor LaperCakes'

  const instructorRole =
    instructor?.role ||
    selectedClass.instructorRole ||
    'Professional Baking Instructor'

  const instructorSpecialty =
    instructor?.specialty || ''

  const instructorBio =
    instructor?.bio ||
    'Belajar langsung bersama instructor berpengalaman dan mendapatkan pengalaman praktik selama kelas berlangsung.'

  const instructorRating =
    Number(
      instructor?.rating ||
        selectedClass.rating ||
        0,
    )

  const instructorReviews =
    Number(
      instructor?.reviews ||
        selectedClass.reviews ||
        0,
    )

  const instructorStudents =
    Number(instructor?.students || 0)

  const instructorClasses =
    Number(instructor?.classes || 0)

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-[#29251F]">
            Instructor
          </h2>

          <p className="mt-2 text-sm text-[#756F66]">
            Kenali instructor yang akan membimbingmu di kelas ini.
          </p>
        </div>

        {instructor && (
          <Link
            to={`/instructors/${instructor.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#4F8065] transition hover:text-[#29251F]"
          >
            Lihat profil
            <ArrowRight size={15} />
          </Link>
        )}
      </div>

      <div className="mt-5 overflow-hidden rounded-3xl border border-[#EBE5DA] bg-[#FFFDF7]">
        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">

            {/* AVATAR */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-[#BFE5D0]/60 text-5xl shadow-sm">
              {instructor?.emoji || '👨‍🍳'}
            </div>

            {/* MAIN INFO */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-2xl font-semibold text-[#29251F]">
                      {instructorName}
                    </h3>

                    {instructor && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF6EF] px-2.5 py-1 text-[10px] font-bold text-[#4F8065]">
                        <CheckCircle2 size={12} />
                        Instructor
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm font-semibold text-[#4F8065]">
                    {instructorRole}
                  </p>

                  {instructorSpecialty && (
                    <span className="mt-3 inline-flex rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#514B43]">
                      {instructorSpecialty}
                    </span>
                  )}
                </div>

                <div className="flex w-fit items-center gap-1.5 rounded-full bg-[#FFF4D8] px-3 py-2 text-xs font-bold text-[#A87518]">
                  <Star
                    size={14}
                    fill="currentColor"
                  />

                  {instructorRating
                    ? instructorRating.toFixed(1)
                    : '-'}
                </div>
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#756F66]">
                {instructorBio}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {instructor?.experience && (
                  <MiniInfo
                    label="Experience"
                    value={instructor.experience}
                  />
                )}

                {instructor?.location && (
                  <MiniInfo
                    label="Location"
                    value={instructor.location}
                    icon={MapPin}
                  />
                )}

                {instructor && (
                  <MiniInfo
                    label="Reviews"
                    value={`${instructorReviews}`}
                    icon={Star}
                  />
                )}
              </div>
            </div>
          </div>

          {/* STATS */}
          {instructor && (
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#EBE5DA] pt-5 sm:grid-cols-3">
              <InstructorStat
                icon={BookOpenIcon}
                value={instructorClasses}
                label="Kelas"
              />

              <InstructorStat
                icon={Users}
                value={instructorStudents}
                label="Students"
              />

              <InstructorStat
                icon={Star}
                value={instructorReviews}
                label="Reviews"
              />
            </div>
          )}

          {/* PROFILE BUTTON */}
          {instructor && (
            <Link
              to={`/instructors/${instructor.id}`}
              className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-[#29251F] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#4F8065]"
            >
              Lihat Profil Instructor
              <ArrowRight size={17} />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

function MiniInfo({
  label,
  value,
  icon: Icon,
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2">
      {Icon && (
        <Icon
          size={14}
          className="text-[#756F66]"
        />
      )}

      <div>
        <span className="text-[9px] font-bold uppercase tracking-wide text-[#A19A91]">
          {label}
        </span>

        <span className="ml-1.5 text-xs font-semibold text-[#29251F]">
          {value}
        </span>
      </div>
    </div>
  )
}

function InstructorStat({
  icon: Icon,
  value,
  label,
}) {
  return (
    <div className="rounded-2xl bg-white p-4 text-center">
      <div className="flex justify-center text-[#756F66]">
        <Icon size={16} />
      </div>

      <p className="mt-1.5 text-sm font-bold text-[#29251F]">
        {value}
      </p>

      <p className="text-[10px] text-[#8C857B]">
        {label}
      </p>
    </div>
  )
}

function BookOpenIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a4 4 0 0 0-4-4H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a4 4 0 0 1 4-4h6z" />
    </svg>
  )
}

function Reviews({ selectedClass }) {
  const rating = Number(
    selectedClass.rating || 0,
  )

  const reviews = Number(
    selectedClass.reviews || 0,
  )

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-[#29251F]">
        Reviews
      </h2>

      <div className="mt-5 flex items-center gap-5 rounded-3xl bg-[#FFFDF7] p-5">
        <div>
          <p className="font-display text-4xl font-semibold text-[#29251F]">
            {rating || '-'}
          </p>

          <div className="mt-1 flex gap-0.5">
            {[1, 2, 3, 4, 5].map(
              (item) => (
                <Star
                  key={item}
                  size={14}
                  fill={
                    item <=
                    Math.round(rating)
                      ? 'currentColor'
                      : 'none'
                  }
                  className="text-[#E8B84A]"
                />
              ),
            )}
          </div>
        </div>

        <div className="h-12 w-px bg-[#EBE5DA]" />

        <div>
          <p className="text-sm font-bold text-[#29251F]">
            {reviews} reviews
          </p>

          <p className="mt-1 text-xs text-[#756F66]">
            Rating peserta kelas
          </p>
        </div>
      </div>
    </div>
  )
}

function ScheduleOption({
  date,
  time,
  selected,
  onClick,
  remaining,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        selected
          ? 'border-[#C99624] bg-[#FFF3D4]'
          : 'border-[#EBE5DA] bg-white hover:border-[#DCD4C7]'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-[#29251F]">
            {formatDateOnly(date)}
          </p>

          <p className="mt-1 text-xs text-[#756F66]">
            {time || '-'}
          </p>
        </div>

        <div className="text-right">
          <p
            className={`text-xs font-bold ${
              Number(remaining || 0) <= 0
                ? 'text-[#A95D6C]'
                : 'text-[#4F8065]'
            }`}
          >
            {remaining || 0} slot
          </p>
        </div>
      </div>
    </button>
  )
}

function TrustItem({ text }) {
  return (
    <div className="flex items-center gap-2 text-xs text-[#756F66]">
      <CheckCircle2
        size={14}
        className="text-[#4F8065]"
      />

      {text}
    </div>
  )
}

function TabButton({
  label,
  active = false,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-3 py-2.5 text-xs font-bold transition ${
        active
          ? 'bg-white text-[#29251F] shadow-sm ring-1 ring-[#EBE5DA]'
          : 'text-[#756F66] hover:bg-white/60 hover:text-[#29251F]'
      }`}
    >
      {label}
    </button>
  )
}

function Info({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-[#FFFDF7] p-3.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#4F8065]">
        <Icon size={17} />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wide text-[#A19A91]">
          {label}
        </p>

        <p className="mt-0.5 truncate text-sm font-semibold text-[#29251F]">
          {value}
        </p>
      </div>
    </div>
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

function formatDateOnly(value) {
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

export default ClassDetailPage