import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  SlidersHorizontal,
  Star,
  Clock3,
  Users,
  MapPin,
  Heart,
  ChevronDown,
  X,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import MobileBottomNav from '../components/MobileBottomNav'
import { getClasses } from '../data/classStorage'

function ExplorePage() {
  const [classes, setClasses] = useState(() => getClasses())

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Semua')
  const [level, setLevel] = useState('Semua')
  const [mode, setMode] = useState('Semua')
  const [audience, setAudience] = useState('Semua')
  const [price, setPrice] = useState('Semua')
  const [rating, setRating] = useState('Semua')
  const [sort, setSort] = useState('popular')
  const [showFilters, setShowFilters] = useState(false)

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem('lapercakes-wishlist') || '[]',
      )
    } catch {
      return []
    }
  })

  // Ambil ulang data saat halaman dibuka / storage berubah
  useEffect(() => {
    const refreshClasses = () => {
      setClasses(getClasses())
    }

    refreshClasses()

    window.addEventListener('storage', refreshClasses)

    return () => {
      window.removeEventListener('storage', refreshClasses)
    }
  }, [])

  const categories = useMemo(() => {
    return [
      'Semua',
      ...new Set(
        classes
          .map((item) => item.category)
          .filter(Boolean),
      ),
    ]
  }, [classes])

  const levels = useMemo(() => {
    return [
      'Semua',
      ...new Set(
        classes
          .map((item) => item.level)
          .filter(Boolean),
      ),
    ]
  }, [classes])

  const audiences = [
    'Semua',
    'All Ages',
    'Adult/18+',
    'Family',
  ]

  const filteredClasses = useMemo(() => {
    let result = [...classes]

    const keyword = search.trim().toLowerCase()

    if (keyword) {
      result = result.filter((item) => {
        const searchableText = [
          item.name,
          item.description,
          item.category,
          item.level,
          item.mode,
          item.audience,
          item.instructor,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()

        return searchableText.includes(keyword)
      })
    }

    if (category !== 'Semua') {
      result = result.filter(
        (item) => item.category === category,
      )
    }

    if (level !== 'Semua') {
      result = result.filter(
        (item) => item.level === level,
      )
    }

    if (mode !== 'Semua') {
      result = result.filter(
        (item) => item.mode === mode,
      )
    }

    if (audience !== 'Semua') {
      result = result.filter(
        (item) => item.audience === audience,
      )
    }

    if (price === 'Gratis') {
      result = result.filter(
        (item) => Number(item.price || 0) === 0,
      )
    }

    if (price === 'Di bawah 200K') {
      result = result.filter(
        (item) => Number(item.price || 0) < 200000,
      )
    }

    if (price === '200K - 300K') {
      result = result.filter(
        (item) =>
          Number(item.price || 0) >= 200000 &&
          Number(item.price || 0) <= 300000,
      )
    }

    if (price === 'Di atas 300K') {
      result = result.filter(
        (item) => Number(item.price || 0) > 300000,
      )
    }

    if (rating === '4.5+') {
      result = result.filter(
        (item) => Number(item.rating || 0) >= 4.5,
      )
    }

    if (rating === '4.8+') {
      result = result.filter(
        (item) => Number(item.rating || 0) >= 4.8,
      )
    }

    if (sort === 'price-low') {
      result.sort(
        (a, b) =>
          Number(a.price || 0) -
          Number(b.price || 0),
      )
    }

    if (sort === 'price-high') {
      result.sort(
        (a, b) =>
          Number(b.price || 0) -
          Number(a.price || 0),
      )
    }

    if (sort === 'rating') {
      result.sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0),
      )
    }

    if (sort === 'slots') {
      result.sort(
        (a, b) =>
          Number(a.remaining || 0) -
          Number(b.remaining || 0),
      )
    }

    if (sort === 'popular') {
      result.sort(
        (a, b) =>
          Number(b.rating || 0) *
            Number(b.reviews || 0) -
          Number(a.rating || 0) *
            Number(a.reviews || 0),
      )
    }

    return result
  }, [
    classes,
    search,
    category,
    level,
    mode,
    audience,
    price,
    rating,
    sort,
  ])

  const toggleWishlist = (id) => {
    const current = [...wishlist]
    const exists = current.some(
      (item) => String(item) === String(id),
    )

    const updated = exists
      ? current.filter(
          (item) => String(item) !== String(id),
        )
      : [...current, id]

    setWishlist(updated)

    localStorage.setItem(
      'lapercakes-wishlist',
      JSON.stringify(updated),
    )
  }

  const clearFilters = () => {
    setCategory('Semua')
    setLevel('Semua')
    setMode('Semua')
    setAudience('Semua')
    setPrice('Semua')
    setRating('Semua')
    setSearch('')
  }

  const activeFilterCount = [
    category !== 'Semua',
    level !== 'Semua',
    mode !== 'Semua',
    audience !== 'Semua',
    price !== 'Semua',
    rating !== 'Semua',
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-28 pt-8 sm:px-6 lg:px-8">

        {/* HEADER */}
        <section className="mb-8">
          <div className="mb-3 inline-flex rounded-full bg-[#BFE5D0]/50 px-3 py-1.5 text-xs font-bold text-[#4F8065]">
            EXPLORE CLASSES
          </div>

          <h1 className="font-display text-4xl font-semibold tracking-tight text-[#29251F] sm:text-5xl">
            Temukan kelas baking
            <br />
            yang cocok untukmu.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#756F66] sm:text-base">
            Pilih kelas sesuai minat, level, dan cara belajar
            yang kamu inginkan.
          </p>
        </section>

        {/* SEARCH */}
        <section className="mb-6">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A19A91]"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Cari kelas, kategori, instructor..."
                className="form-input pl-12"
              />
            </div>

            <button
              onClick={() =>
                setShowFilters(!showFilters)
              }
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#EBE5DA] bg-white px-5 py-3 text-sm font-bold text-[#29251F] shadow-sm lg:hidden"
            >
              <SlidersHorizontal size={18} />
              Filter

              {activeFilterCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E8B84A] px-1.5 text-[10px]">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </section>

        {/* FILTERS */}
        <section
          className={`mb-8 ${
            showFilters ? 'block' : 'hidden'
          } lg:block`}
        >
          <div className="rounded-3xl border border-[#EBE5DA] bg-white p-4 shadow-sm">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">

              <FilterSelect
                label="Kategori"
                value={category}
                onChange={setCategory}
                options={categories}
              />

              <FilterSelect
                label="Level"
                value={level}
                onChange={setLevel}
                options={['Semua', ...levels.filter((item) => item !== 'Semua')]}
              />

              <FilterSelect
                label="Mode"
                value={mode}
                onChange={setMode}
                options={[
                  'Semua',
                  'Online',
                  'Offline',
                ]}
              />

              <FilterSelect
                label="Audience"
                value={audience}
                onChange={setAudience}
                options={audiences}
              />

              <FilterSelect
                label="Harga"
                value={price}
                onChange={setPrice}
                options={[
                  'Semua',
                  'Gratis',
                  'Di bawah 200K',
                  '200K - 300K',
                  'Di atas 300K',
                ]}
              />

              <FilterSelect
                label="Rating"
                value={rating}
                onChange={setRating}
                options={[
                  'Semua',
                  '4.5+',
                  '4.8+',
                ]}
              />
            </div>

            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#A95D6C] hover:underline"
              >
                <X size={14} />
                Reset filter
              </button>
            )}
          </div>
        </section>

        {/* RESULT HEADER */}
        <section className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-[#756F66]">
              Menampilkan{' '}
              <span className="font-bold text-[#29251F]">
                {filteredClasses.length}
              </span>{' '}
              kelas
            </p>
          </div>

          <div className="relative">
            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
              className="appearance-none rounded-xl border border-[#EBE5DA] bg-white py-2.5 pl-4 pr-10 text-sm font-semibold text-[#29251F] outline-none"
            >
              <option value="popular">
                Paling populer
              </option>
              <option value="rating">
                Rating tertinggi
              </option>
              <option value="price-low">
                Harga terendah
              </option>
              <option value="price-high">
                Harga tertinggi
              </option>
              <option value="slots">
                Slot paling sedikit
              </option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#756F66]"
            />
          </div>
        </section>

        {/* CLASS GRID */}
        {filteredClasses.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredClasses.map((item) => {
              const isWishlisted = wishlist.some(
                (id) =>
                  String(id) === String(item.id),
              )

              return (
                <ClassCard
                  key={item.id}
                  item={item}
                  isWishlisted={isWishlisted}
                  onWishlist={() =>
                    toggleWishlist(item.id)
                  }
                />
              )
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-[#EBE5DA] bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF3D4] text-3xl">
              🔎
            </div>

            <h2 className="font-display text-2xl font-semibold text-[#29251F]">
              Kelas tidak ditemukan
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#756F66]">
              Coba gunakan kata kunci atau filter yang
              berbeda.
            </p>

            <button
              onClick={clearFilters}
              className="mt-5 rounded-xl bg-[#29251F] px-5 py-3 text-sm font-bold text-white"
            >
              Reset filter
            </button>
          </div>
        )}

      </main>

      <MobileBottomNav />
    </div>
  )
}

function ClassCard({
  item,
  isWishlisted,
  onWishlist,
}) {
  const soldOut = Number(item.remaining || 0) <= 0

  return (
    <article className="group overflow-hidden rounded-3xl border border-[#EBE5DA] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      {/* VISUAL */}
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-[#FFF3D4]">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#BFE5D0]" />
          <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[#D98C9B]" />
        </div>

        <span className="relative text-7xl transition duration-300 group-hover:scale-110">
          {getEmoji(item.category)}
        </span>

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold text-[#29251F] backdrop-blur">
            {item.category}
          </span>

          {item.mode && (
            <span className="rounded-full bg-[#BFE5D0]/90 px-3 py-1 text-[10px] font-bold text-[#4F8065] backdrop-blur">
              {item.mode}
            </span>
          )}
        </div>

        <button
          onClick={onWishlist}
          aria-label="Wishlist"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#756F66] shadow-sm backdrop-blur transition hover:scale-105"
        >
          <Heart
            size={17}
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
          <div className="absolute bottom-4 left-4 rounded-full bg-[#A95D6C] px-3 py-1.5 text-[10px] font-bold text-white">
            FULL
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <div className="mb-2 flex items-center gap-1.5 text-xs text-[#756F66]">
          <Star
            size={14}
            fill="currentColor"
            className="text-[#E8B84A]"
          />

          <span className="font-bold text-[#29251F]">
            {item.rating || '-'}
          </span>

          <span>
            ({item.reviews || 0})
          </span>
        </div>

        <Link to={`/classes/${item.id}`}>
          <h2 className="line-clamp-2 min-h-[56px] font-display text-xl font-semibold leading-7 text-[#29251F] transition group-hover:text-[#4F8065]">
            {item.name}
          </h2>
        </Link>

        <p className="mt-2 line-clamp-2 min-h-[42px] text-sm leading-5 text-[#756F66]">
          {item.description ||
            'Belajar baking dengan instructor berpengalaman.'}
        </p>

        <div className="mt-4 space-y-2 border-t border-[#EBE5DA] pt-4">
          <div className="flex items-center gap-2 text-xs text-[#756F66]">
            <Clock3 size={14} />
            <span>
              {item.date || '-'} · {item.time || '-'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#756F66]">
            <Users size={14} />
            <span>
              {item.instructor || 'Instructor'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#756F66]">
            <MapPin size={14} />
            <span>
              {item.mode === 'Online'
                ? 'Online class'
                : 'Offline class'}
            </span>
          </div>
        </div>

        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] text-[#A19A91]">
              Mulai dari
            </p>

            <p className="font-display text-xl font-semibold text-[#29251F]">
              {formatCurrency(item.price)}
            </p>
          </div>

          <Link
            to={`/classes/${item.id}`}
            className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              soldOut
                ? 'bg-[#F1ECE4] text-[#A19A91]'
                : 'bg-[#29251F] text-white hover:bg-[#4F8065]'
            }`}
          >
            {soldOut
              ? 'Lihat detail'
              : 'Lihat kelas'}
          </Link>
        </div>

        {!soldOut && (
          <p className="mt-3 text-[11px] font-semibold text-[#A95D6C]">
            Tinggal {item.remaining} slot
          </p>
        )}
      </div>
    </article>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-[#A19A91]">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="w-full appearance-none rounded-xl border border-[#EBE5DA] bg-[#FFFDF7] px-3 py-2.5 pr-8 text-sm font-medium text-[#29251F] outline-none focus:border-[#C99624]"
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

        <ChevronDown
          size={15}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#756F66]"
        />
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

export default ExplorePage