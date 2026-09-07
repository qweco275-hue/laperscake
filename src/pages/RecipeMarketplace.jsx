import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  SlidersHorizontal,
  Heart,
  Star,
  Clock3,
  ArrowUpDown,
  Sparkles,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import MobileBottomNav from '../components/MobileBottomNav'
import recipes from '../data/recipes'
import {
  getRecipeWishlist,
  toggleRecipeWishlist,
} from '../utils/recipeStorage'

function RecipeMarketplace() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('Semua')
  const [category, setCategory] = useState('Semua')
  const [level, setLevel] = useState('Semua')
  const [sort, setSort] = useState('popular')
  const [wishlist, setWishlist] = useState(getRecipeWishlist())

  const filteredRecipes = useMemo(() => {
    let result = recipes.filter((recipe) => {
      const keyword = search.toLowerCase()

      const matchesSearch =
        recipe.title.toLowerCase().includes(keyword) ||
        recipe.category.toLowerCase().includes(keyword)

      const matchesType =
        type === 'Semua' || recipe.type === type

      const matchesCategory =
        category === 'Semua' || recipe.category === category

      const matchesLevel =
        level === 'Semua' || recipe.level === level

      return (
        matchesSearch &&
        matchesType &&
        matchesCategory &&
        matchesLevel
      )
    })

    if (sort === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    }

    if (sort === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    }

    if (sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    }

    if (sort === 'popular') {
      result.sort((a, b) => b.reviews - a.reviews)
    }

    return result
  }, [search, type, category, level, sort])

  const handleWishlist = (id) => {
    setWishlist(toggleRecipeWishlist(id))
  }

  const formatPrice = (price) => {
    if (price === 0) return 'Gratis'

    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-[#FFFDF7] pb-20 md:pb-0">
      <Navbar />

      <main>
        {/* HEADER */}
        <section className="border-b border-[#EBE5DA] bg-[#FFFDF7]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:py-16">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#F4E7C5] px-4 py-2 text-sm font-semibold text-[#8B681D]">
                <Sparkles size={15} />
                LaperCakes Recipe Library
              </div>

              <h1 className="font-display text-4xl font-semibold tracking-tight text-[#29251F] sm:text-5xl">
                Resep yang bikin
                <span className="text-[#C99624]"> baking lebih serius.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-[#756F66]">
                Temukan resep, teknik, dan panduan baking dari level
                pemula sampai advanced.
              </p>
            </div>

            {/* SEARCH */}
            <div className="mt-8 flex max-w-3xl items-center gap-3 rounded-2xl border border-[#E7E0D5] bg-white px-4 py-3 shadow-sm">
              <Search size={20} className="text-[#8C867D]" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari cookies, sourdough, cake..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>
        </section>

        {/* FILTER */}
        <section className="sticky top-[65px] z-20 border-b border-[#EBE5DA] bg-[#FFFDF7]/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-wrap gap-3 px-4 py-4 sm:px-8">
            <Filter
              icon={<SlidersHorizontal size={16} />}
              value={type}
              onChange={setType}
              options={[
                'Semua',
                'Free',
                'E-book',
                'Premium',
              ]}
            />

            <Filter
              value={category}
              onChange={setCategory}
              options={[
                'Semua',
                'Cookies',
                'Bread',
                'Pastry',
                'Cake',
                'Dessert',
              ]}
            />

            <Filter
              value={level}
              onChange={setLevel}
              options={[
                'Semua',
                'Beginner',
                'Intermediate',
                'Advanced',
              ]}
            />

            <Filter
              icon={<ArrowUpDown size={16} />}
              value={sort}
              onChange={setSort}
              options={[
                'popular',
                'price-low',
                'price-high',
                'rating',
              ]}
              labels={{
                popular: 'Terpopuler',
                'price-low': 'Harga Terendah',
                'price-high': 'Harga Tertinggi',
                rating: 'Rating Tertinggi',
              }}
            />
          </div>
        </section>

        {/* CONTENT */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-8 lg:py-14">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <p className="text-sm text-[#756F66]">
                {filteredRecipes.length} resep ditemukan
              </p>

              <h2 className="font-display mt-1 text-2xl font-semibold">
                Explore Recipes
              </h2>
            </div>
          </div>

          {filteredRecipes.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#D9D0C2] bg-white px-6 py-20 text-center">
              <div className="text-5xl">🔎</div>

              <h3 className="mt-5 font-display text-2xl font-semibold">
                Resep tidak ditemukan
              </h3>

              <p className="mt-2 text-sm text-[#756F66]">
                Coba gunakan kata kunci atau filter yang berbeda.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredRecipes.map((recipe) => (
                <article
                  key={recipe.id}
                  className="group overflow-hidden rounded-[26px] border border-[#EBE5DA] bg-white transition hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* VISUAL */}
                  <div className="relative flex h-52 items-center justify-center bg-[#F5EBD7]">
                    <div className="text-7xl transition duration-300 group-hover:scale-110">
                      {recipe.emoji}
                    </div>

                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold">
                      {recipe.type}
                    </div>

                    <button
                      onClick={() => handleWishlist(recipe.id)}
                      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90"
                    >
                      <Heart
                        size={17}
                        className={
                          wishlist.includes(recipe.id)
                            ? 'fill-[#A95D6C] text-[#A95D6C]'
                            : 'text-[#756F66]'
                        }
                      />
                    </button>
                  </div>

                  {/* BODY */}
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#A95D6C]">
                        {recipe.category}
                      </span>

                      <span className="rounded-full bg-[#F3F0EA] px-2.5 py-1 text-xs font-semibold">
                        {recipe.level}
                      </span>
                    </div>

                    <h3 className="mt-3 min-h-[52px] font-display text-xl font-semibold leading-tight">
                      {recipe.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#756F66]">
                      {recipe.description}
                    </p>

                    <div className="mt-4 flex items-center gap-4 text-xs text-[#756F66]">
                      <span className="flex items-center gap-1">
                        <Star
                          size={14}
                          className="fill-[#E8B84A] text-[#E8B84A]"
                        />
                        {recipe.rating}
                      </span>

                      <span>{recipe.reviews} reviews</span>

                      <span className="flex items-center gap-1">
                        <Clock3 size={14} />
                        {recipe.time}
                      </span>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#EEE8DE] pt-4">
                      <div>
                        <p className="text-xs text-[#8C867D]">
                          Akses resep
                        </p>

                        <p className="mt-0.5 font-bold">
                          {formatPrice(recipe.price)}
                        </p>
                      </div>

                      <Link
                        to={`/recipes/${recipe.id}`}
                        className="rounded-xl bg-[#29251F] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#4A443C]"
                      >
                        Lihat Resep
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <MobileBottomNav />
    </div>
  )
}

function Filter({
  icon,
  value,
  onChange,
  options,
  labels = {},
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-[#E7E0D5] bg-white px-3">
      {icon}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent py-2.5 text-sm outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {labels[option] || option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default RecipeMarketplace