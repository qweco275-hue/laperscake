import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Monitor,
  Search,
  SlidersHorizontal,
  Star,
  Users,
  X,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import MobileBottomNav from '../components/MobileBottomNav'
import { getClasses } from '../data/classStorage'

function SchedulePage() {
  const [classes, setClasses] = useState(() => getClasses())

  const [search, setSearch] = useState('')
  const [mode, setMode] = useState('Semua')
  const [level, setLevel] = useState('Semua')
  const [audience, setAudience] = useState('Semua')
  const [month, setMonth] = useState('Semua')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const refreshClasses = () => {
      setClasses(getClasses())
    }

    window.addEventListener(
      'classesUpdated',
      refreshClasses,
    )

    window.addEventListener(
      'storage',
      refreshClasses,
    )

    return () => {
      window.removeEventListener(
        'classesUpdated',
        refreshClasses,
      )

      window.removeEventListener(
        'storage',
        refreshClasses,
      )
    }
  }, [])

  const monthOptions = useMemo(() => {
    const months = classes
      .map((item) => {
        if (!item.date) return null

        return new Date(
          `${item.date}T00:00:00`,
        ).toLocaleDateString('id-ID', {
          month: 'long',
        })
      })
      .filter(Boolean)

    return [
      'Semua',
      ...new Set(months),
    ]
  }, [classes])

  const levelOptions = useMemo(() => {
    return [
      'Semua',
      ...new Set(
        classes
          .map((item) => item.level)
          .filter(Boolean),
      ),
    ]
  }, [classes])

  const audienceOptions = useMemo(() => {
    return [
      'Semua',
      ...new Set(
        classes
          .map((item) => item.audience)
          .filter(Boolean),
      ),
    ]
  }, [classes])

  const filteredClasses = useMemo(() => {
    const keyword = search
      .toLowerCase()
      .trim()

    return [...classes]
      .filter((item) => {
        const itemMonth = item.date
          ? new Date(
              `${item.date}T00:00:00`,
            ).toLocaleDateString('id-ID', {
              month: 'long',
            })
          : ''

        const matchesSearch =
          !keyword ||
          item.name
            ?.toLowerCase()
            .includes(keyword) ||
          item.category
            ?.toLowerCase()
            .includes(keyword) ||
          item.instructor
            ?.toLowerCase()
            .includes(keyword)

        const matchesMode =
          mode === 'Semua' ||
          item.mode === mode

        const matchesLevel =
          level === 'Semua' ||
          item.level === level

        const matchesAudience =
          audience === 'Semua' ||
          item.audience === audience

        const matchesMonth =
          month === 'Semua' ||
          itemMonth === month

        return (
          matchesSearch &&
          matchesMode &&
          matchesLevel &&
          matchesAudience &&
          matchesMonth
        )
      })
      .sort(
        (a, b) =>
          new Date(a.date) -
          new Date(b.date),
      )
  }, [
    classes,
    search,
    mode,
    level,
    audience,
    month,
  ])

  const activeFilterCount = [
    mode !== 'Semua',
    level !== 'Semua',
    audience !== 'Semua',
    month !== 'Semua',
  ].filter(Boolean).length

  const resetFilters = () => {
    setSearch('')
    setMode('Semua')
    setLevel('Semua')
    setAudience('Semua')
    setMonth('Semua')
  }

  return (
    <div className="min-h-screen bg-[#FFFDF7] pb-20 lg:pb-0">
      <Navbar />

      {/* HERO */}
      <section className="border-b border-[#EBE5DA]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF1D0] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#A56E12]">
                <CalendarDays size={14} />
                Jadwal Kelas
              </span>

              <h1 className="font-display mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Temukan kelas baking
                <br />
                yang pas buat kamu.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#756F66] sm:text-base">
                Lihat jadwal kelas LaperCakes,
                pilih mode belajar, dan booking
                kelas favoritmu dengan mudah.
              </p>
            </div>

            <div className="rounded-[2rem] bg-[#29251F] p-6 text-white sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8B84A] text-xl">
                  🧁
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                    LaperCakes
                  </p>

                  <p className="mt-1 font-display text-xl font-semibold">
                    Bake. Learn. Share.
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-white/65">
                Pilih kelas online dari rumah
                atau datang langsung ke studio
                LaperCakes.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <MiniHeroStat
                  value={classes.length}
                  label="Total kelas"
                />

                <MiniHeroStat
                  value={
                    classes.filter(
                      (item) =>
                        item.mode === 'Online',
                    ).length
                  }
                  label="Online"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER */}
      <section className="mx-auto max-w-7xl px-5 pt-8 sm:px-8 sm:pt-10">
        <div className="rounded-[2rem] border border-[#EBE5DA] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
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
                placeholder="Cari kelas, kategori, atau instructor..."
                className="form-input pl-11"
              />
            </div>

            <div className="flex gap-2">
              {[
                'Semua',
                'Online',
                'Offline',
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setMode(item)
                  }
                  className={`flex-1 rounded-xl px-4 py-3 text-sm font-bold transition sm:flex-none ${
                    mode === item
                      ? 'bg-[#29251F] text-white'
                      : 'border border-[#EBE5DA] bg-[#FFFDF7] text-[#756F66] hover:text-[#29251F]'
                  }`}
                >
                  {item}
                </button>
              ))}

              <button
                type="button"
                onClick={() =>
                  setShowFilters(
                    (current) => !current,
                  )
                }
                className={`relative inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition ${
                  showFilters
                    ? 'border-[#29251F] bg-[#29251F] text-white'
                    : 'border-[#EBE5DA] bg-[#FFFDF7] text-[#756F66] hover:text-[#29251F]'
                }`}
              >
                <SlidersHorizontal size={17} />
                <span className="hidden sm:inline">
                  Filter
                </span>

                {activeFilterCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E8B84A] px-1.5 text-[10px] font-black text-[#29251F]">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 grid gap-3 border-t border-[#EBE5DA] pt-4 sm:grid-cols-2 lg:grid-cols-4">
              <FilterSelect
                label="Bulan"
                value={month}
                options={monthOptions}
                onChange={setMonth}
              />

              <FilterSelect
                label="Level"
                value={level}
                options={levelOptions}
                onChange={setLevel}
              />

              <FilterSelect
                label="Target"
                value={audience}
                options={audienceOptions}
                onChange={setAudience}
              />

              <button
                type="button"
                onClick={resetFilters}
                className="mt-auto flex h-[46px] items-center justify-center gap-2 rounded-xl border border-[#EBE5DA] bg-[#FFFDF7] px-4 text-sm font-bold text-[#756F66] transition hover:border-[#D8D0C2] hover:text-[#29251F]"
              >
                <X size={16} />
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* RESULT HEADER */}
      <section className="mx-auto max-w-7xl px-5 pb-5 pt-8 sm:px-8 sm:pb-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-[#29251F]">
              {filteredClasses.length} kelas tersedia
            </p>

            <p className="mt-1 text-xs text-[#8C857B]">
              Pilih kelas sesuai waktu dan
              cara belajar yang kamu mau.
            </p>
          </div>

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={resetFilters}
              className="self-start text-xs font-bold text-[#A95D6C] hover:underline"
            >
              Hapus semua filter
            </button>
          )}
        </div>
      </section>

      {/* CLASS LIST */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-24">
        {filteredClasses.length > 0 ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {filteredClasses.map(
              (item) => (
                <ScheduleCard
                  key={item.id}
                  item={item}
                />
              ),
            )}
          </div>
        ) : (
          <EmptySchedule
            resetFilters={resetFilters}
          />
        )}
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="overflow-hidden rounded-[2.5rem] bg-[#BFE5D0] p-8 sm:p-12 lg:p-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#4F8065]">
                Masih bingung pilih kelas?
              </span>

              <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
                Mulai dari kelas yang
                paling sesuai dengan
                levelmu.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-[#526A5B]">
                Jelajahi semua kelas LaperCakes
                dan temukan pengalaman baking
                yang paling cocok.
              </p>
            </div>

            <Link
              to="/explore"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#29251F] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#403A33]"
            >
              Explore Semua Kelas
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <MobileBottomNav />
    </div>
  )
}

function ScheduleCard({ item }) {
  const remaining = Number(
    item.remaining ?? 0,
  )

  const isAlmostFull =
    remaining > 0 && remaining <= 3

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-[#EBE5DA] bg-white transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="grid sm:grid-cols-[190px_1fr]">
        {/* VISUAL */}
        <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden bg-[#F4E5D1]">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#E8B84A]" />

          <div className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-[#BFE5D0]" />

          <div className="relative z-10 text-8xl drop-shadow-sm">
            {getEmoji(item.category)}
          </div>

          <span
            className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wider ${
              item.mode === 'Online'
                ? 'bg-[#DDF3E7] text-[#4F8065]'
                : 'bg-[#F9DCE2] text-[#A95D6C]'
            }`}
          >
            {item.mode}
          </span>

          {isAlmostFull && (
            <span className="absolute bottom-4 left-4 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-[#A95D6C] shadow-sm">
              Hampir penuh
            </span>
          )}
        </div>

        {/* CONTENT */}
        <div className="flex flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#A56E12]">
                {item.category ||
                  'Baking Class'}
              </span>

              <h2 className="font-display mt-2 text-2xl font-semibold leading-tight">
                {item.name}
              </h2>
            </div>

            <div className="flex shrink-0 items-center gap-1 rounded-full bg-[#FFF4D8] px-2.5 py-1.5 text-xs font-bold text-[#A87518]">
              <Star
                size={13}
                fill="currentColor"
              />
              {Number(
                item.rating || 0,
              ).toFixed(1)}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <Info
              icon={CalendarDays}
              value={formatDate(item.date)}
            />

            <Info
              icon={Clock3}
              value={item.time || '-'}
            />

            <Info
              icon={
                item.mode === 'Online'
                  ? Monitor
                  : MapPin
              }
              value={
                item.mode === 'Online'
                  ? 'Online'
                  : 'Yogyakarta'
              }
            />

            <Info
              icon={Users}
              value={
                remaining > 0
                  ? `${remaining} slot tersisa`
                  : 'Kelas penuh'
              }
            />
          </div>

          <div className="mt-auto flex items-end justify-between gap-4 pt-6">
            <div>
              <p className="text-[11px] text-[#8C857B]">
                Mulai dari
              </p>

              <p className="mt-1 text-xl font-black text-[#29251F]">
                {formatCurrency(
                  item.price,
                )}
              </p>
            </div>

            <Link
              to={`/classes/${item.id}`}
              className="inline-flex items-center gap-2 rounded-xl bg-[#29251F] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#403A33]"
            >
              Lihat Detail
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

function Info({
  icon: Icon,
  value,
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-xl bg-[#F8F6F1] px-3 py-2.5">
      <Icon
        size={15}
        className="shrink-0 text-[#756F66]"
      />

      <span className="truncate text-xs font-semibold text-[#514B43]">
        {value}
      </span>
    </div>
  )
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-[#756F66]">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="form-input h-[46px]"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

function MiniHeroStat({
  value,
  label,
}) {
  return (
    <div className="rounded-2xl bg-white/10 px-4 py-3">
      <p className="font-display text-2xl font-semibold">
        {value}
      </p>

      <p className="mt-1 text-[11px] text-white/50">
        {label}
      </p>
    </div>
  )
}

function EmptySchedule({
  resetFilters,
}) {
  return (
    <div className="rounded-[2rem] border border-dashed border-[#D8D0C2] bg-white px-6 py-20 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF4D8] text-3xl">
        🔎
      </div>

      <h2 className="font-display mt-5 text-2xl font-semibold">
        Kelas tidak ditemukan
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#756F66]">
        Coba ubah kata kunci atau filter
        yang sedang digunakan.
      </p>

      <button
        type="button"
        onClick={resetFilters}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#29251F] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#403A33]"
      >
        <X size={16} />
        Reset Filter
      </button>
    </div>
  )
}

function getEmoji(category = '') {
  const value = category.toLowerCase()

  if (value.includes('cookie')) return '🍪'
  if (value.includes('cake')) return '🎂'
  if (value.includes('bread')) return '🍞'
  if (value.includes('pastry')) return '🥐'
  if (value.includes('pizza')) return '🍕'
  if (value.includes('cupcake')) return '🧁'

  return '🧁'
}

function formatCurrency(value) {
  return new Intl.NumberFormat(
    'id-ID',
    {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    },
  ).format(Number(value || 0))
}

function formatDate(date) {
  if (!date) return '-'

  return new Date(
    `${date}T00:00:00`,
  ).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default SchedulePage