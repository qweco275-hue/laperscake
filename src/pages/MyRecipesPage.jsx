import { Link } from 'react-router-dom'
import {
  BookOpen,
  Heart,
  LockKeyhole,
  ArrowRight,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import MobileBottomNav from '../components/dashboard/DashboardMobileNav'
import recipes from '../data/recipes'
import {
  getPurchasedRecipes,
  getRecipeWishlist,
} from '../utils/recipeStorage'

function MyRecipesPage() {
  const purchasedIds = getPurchasedRecipes()
  const wishlistIds = getRecipeWishlist()

  const myRecipes = recipes.filter((recipe) =>
    purchasedIds.includes(recipe.id)
  )

  const wishlistRecipes = recipes.filter((recipe) =>
    wishlistIds.includes(recipe.id)
  )

  return (
    <div className="min-h-screen bg-[#FFFDF7] pb-20 md:pb-0">
      <Navbar />

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
        {/* HEADER */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A95D6C]">
              My Library
            </p>

            <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight text-[#29251F] sm:text-5xl">
              Resep Saya
            </h1>

            <p className="mt-3 max-w-xl text-[#756F66]">
              Semua resep yang sudah kamu beli dan simpan
              dalam library pribadi.
            </p>
          </div>

          <Link
            to="/recipes/marketplace"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#29251F] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#4A443C]"
          >
            Jelajahi Resep
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* STATS */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Stat
            icon={<BookOpen size={20} />}
            label="Resep Dimiliki"
            value={myRecipes.length}
          />

          <Stat
            icon={<Heart size={20} />}
            label="Wishlist"
            value={wishlistRecipes.length}
          />

          <Stat
            icon={<LockKeyhole size={20} />}
            label="Akses"
            value="Selamanya"
          />
        </div>

        {/* MY RECIPES */}
        <section className="mt-12">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#4F8065]">
                Your Collection
              </p>

              <h2 className="font-display mt-1 text-2xl font-semibold text-[#29251F]">
                Koleksi resep kamu
              </h2>
            </div>
          </div>

          {myRecipes.length === 0 ? (
            <EmptyLibrary />
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {myRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                />
              ))}
            </div>
          )}
        </section>

        {/* WISHLIST */}
        {wishlistRecipes.length > 0 && (
          <section className="mt-16 border-t border-[#EBE5DA] pt-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#A95D6C]">
                Saved for later
              </p>

              <h2 className="font-display mt-1 text-2xl font-semibold">
                Wishlist
              </h2>

              <p className="mt-2 text-sm text-[#756F66]">
                Resep yang kamu tandai untuk dipelajari nanti.
              </p>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {wishlistRecipes.map((recipe) => (
                <WishlistCard
                  key={recipe.id}
                  recipe={recipe}
                  owned={purchasedIds.includes(recipe.id)}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <MobileBottomNav />
    </div>
  )
}

function RecipeCard({ recipe }) {
  return (
    <Link
      to={`/recipes/${recipe.id}`}
      className="group overflow-hidden rounded-[24px] border border-[#EBE5DA] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative flex h-48 items-center justify-center bg-[#F7F0E5]">
        <div className="text-7xl transition duration-300 group-hover:scale-110">
          {recipe.emoji}
        </div>

        <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-[#4F8065] shadow-sm">
          ✓ Owned
        </div>
      </div>

      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-[#A95D6C]">
          {recipe.category}
        </p>

        <h3 className="font-display mt-2 text-xl font-semibold leading-tight text-[#29251F]">
          {recipe.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#756F66]">
          {recipe.description}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-[#EBE5DA] pt-4">
          <span className="text-sm font-bold text-[#4F8065]">
            Sudah dimiliki
          </span>

          <span className="text-sm font-bold">
            Buka →
          </span>
        </div>
      </div>
    </Link>
  )
}

function WishlistCard({ recipe, owned }) {
  return (
    <Link
      to={`/recipes/${recipe.id}`}
      className="group rounded-[24px] border border-[#EBE5DA] bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div className="text-5xl">
          {recipe.emoji}
        </div>

        <Heart
          size={19}
          className="fill-[#A95D6C] text-[#A95D6C]"
        />
      </div>

      <p className="mt-5 text-xs font-bold uppercase tracking-wider text-[#A95D6C]">
        {recipe.category}
      </p>

      <h3 className="font-display mt-2 text-lg font-semibold leading-tight">
        {recipe.title}
      </h3>

      <div className="mt-4 flex items-center justify-between text-sm">
        {owned ? (
          <span className="font-bold text-[#4F8065]">
            Sudah dimiliki
          </span>
        ) : (
          <span className="font-bold">
            {recipe.price === 0
              ? 'Gratis'
              : formatPrice(recipe.price)}
          </span>
        )}

        <ArrowRight size={16} />
      </div>
    </Link>
  )
}

function Stat({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[#EBE5DA] bg-white p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F3E6C8]">
        {icon}
      </div>

      <div>
        <p className="text-xs text-[#756F66]">
          {label}
        </p>

        <p className="mt-1 text-lg font-bold text-[#29251F]">
          {value}
        </p>
      </div>
    </div>
  )
}

function EmptyLibrary() {
  return (
    <div className="mt-6 rounded-[28px] border border-dashed border-[#D8D0C4] bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F3E6C8] text-3xl">
        📖
      </div>

      <h3 className="font-display mt-5 text-2xl font-semibold">
        Library kamu masih kosong
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#756F66]">
        Temukan resep favoritmu di marketplace dan mulai
        bangun koleksi baking pribadi.
      </p>

      <Link
        to="/recipes/marketplace"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#29251F] px-5 py-3 text-sm font-bold text-white"
      >
        Cari Resep
        <ArrowRight size={16} />
      </Link>
    </div>
  )
}

function formatPrice(price) {
  if (price === 0) return 'Gratis'

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price)
}

export default MyRecipesPage