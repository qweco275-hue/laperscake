import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Clock3,
  Heart,
  Star,
  Check,
  ShoppingBag,
  BookOpen,
  ChefHat,
  Lock,
  LockKeyhole,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import MobileBottomNav from '../components/MobileBottomNav'
import recipes from '../data/recipes'
import {
  getRecipeWishlist,
  toggleRecipeWishlist,
  isRecipePurchased,
  purchaseRecipe,
} from '../utils/recipeStorage'

function RecipeDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const recipe = recipes.find(
    (item) => item.id === Number(id),
  )

  const [wishlist, setWishlist] = useState(
    getRecipeWishlist(),
  )

  const [purchased, setPurchased] = useState(
    recipe ? isRecipePurchased(recipe.id) : false,
  )

  if (!recipe) {
    return (
      <div className="min-h-screen bg-[#FFFDF7]">
        <Navbar />

        <div className="mx-auto max-w-4xl px-4 py-24 text-center">
          <div className="text-6xl">🍰</div>

          <h1 className="font-display mt-6 text-3xl font-semibold">
            Resep tidak ditemukan
          </h1>

          <p className="mt-3 text-[#756F66]">
            Resep yang kamu cari mungkin sudah tidak tersedia.
          </p>

          <Link
            to="/recipes"
            className="mt-7 inline-flex rounded-xl bg-[#29251F] px-5 py-3 text-sm font-bold text-white"
          >
            Kembali ke Recipes
          </Link>
        </div>
      </div>
    )
  }

  const isFree = recipe.price === 0

  const handleWishlist = () => {
    setWishlist(toggleRecipeWishlist(recipe.id))
  }

  const formatPrice = (price) => {
    if (price === 0) return 'Gratis'

    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleAccess = () => {
    // Kalau resep gratis, langsung buka
    if (isFree) {
      setPurchased(true)
      return
    }
     // Kalau sudah dibeli, langsung akses
    if (purchased) {
      return
    }
    // Resep berbayar → masuk checkout
    navigate('/checkout', {
      state: {
        type: 'recipe',
        recipe: recipe,
      },
    })
  }

 


  return (
    <div className="min-h-screen bg-[#FFFDF7] pb-20 md:pb-0">
      <Navbar />

      <main>
        {/* BREADCRUMB */}
        <section className="border-b border-[#EBE5DA]">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-8">
            <Link
              to="/recipes"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#756F66] transition hover:text-[#29251F]"
            >
              <ArrowLeft size={17} />
              Kembali ke Recipes
            </Link>
          </div>
        </section>

        {/* HERO */}
        <section>
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8 lg:py-14">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              {/* LEFT */}
              <div>
                <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-[32px] bg-[#F3E7D0] sm:min-h-[470px]">
                  <div className="absolute left-6 top-6 rounded-full bg-white px-4 py-2 text-xs font-bold shadow-sm">
                    {recipe.type}
                  </div>

                  <button
                    onClick={handleWishlist}
                    className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
                  >
                    <Heart
                      size={20}
                      className={
                        wishlist.includes(recipe.id)
                          ? 'fill-[#A95D6C] text-[#A95D6C]'
                          : 'text-[#756F66]'
                      }
                    />
                  </button>

                  <div className="text-[120px] sm:text-[150px]">
                    {recipe.emoji}
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col justify-center">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#F3E6C8] px-3 py-1.5 text-xs font-bold text-[#8B681D]">
                    {recipe.category}
                  </span>

                  <span className="rounded-full bg-[#E7F1EB] px-3 py-1.5 text-xs font-bold text-[#4F8065]">
                    {recipe.level}
                  </span>
                </div>

                <h1 className="font-display mt-5 text-4xl font-semibold leading-tight tracking-tight text-[#29251F] sm:text-5xl">
                  {recipe.title}
                </h1>

                <p className="mt-5 text-base leading-7 text-[#756F66]">
                  {recipe.description}
                </p>

                {/* STATS */}
                <div className="mt-7 flex flex-wrap gap-5">
                  <Info
                    icon={
                      <Star
                        size={17}
                        className="fill-[#E8B84A] text-[#E8B84A]"
                      />
                    }
                    value={recipe.rating}
                    label={`${recipe.reviews} reviews`}
                  />

                  <Info
                    icon={<Clock3 size={17} />}
                    value={recipe.time}
                    label="Total waktu"
                  />

                  <Info
                    icon={<BookOpen size={17} />}
                    value={`${recipe.steps.length} step`}
                    label="Panduan"
                  />
                </div>

                {/* PRICE */}
                <div className="mt-8 rounded-2xl border border-[#E8E0D4] bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#8C867D]">
                    Akses resep
                  </p>

                  <div className="mt-1 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-2xl font-bold">
                        {formatPrice(recipe.price)}
                      </p>

                      <p className="mt-1 text-xs text-[#756F66]">
                        {isFree
                          ? 'Akses gratis'
                          : 'Sekali bayar, akses selamanya'}
                      </p>
                    </div>

                    {purchased && (
                      <span className="flex items-center gap-1.5 text-sm font-bold text-[#4F8065]">
                        <Check size={17} />
                        Sudah dimiliki
                      </span>
                    )}
                  </div>

                  <button
                    onClick={handleAccess}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#29251F] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#4A443C]"
                  >
                    {purchased ? (
                      <>
                        <BookOpen size={17} />
                        Akses Resep
                      </>
                    ) : isFree ? (
                      <>
                        <BookOpen size={17} />
                        Buka Resep Gratis
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={17} />
                        Beli Sekarang
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RECIPE CONTENT */}
        <section className="border-t border-[#EBE5DA] bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:py-16">
            {purchased ? (
              <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
                {/* INGREDIENTS */}
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3E6C8]">
                      🥣
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#A95D6C]">
                        Ingredients
                      </p>

                      <h2 className="font-display text-2xl font-semibold">
                        Bahan yang dibutuhkan
                      </h2>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {recipe.ingredients.map((ingredient) => (
                      <div
                        key={ingredient}
                        className="flex items-center gap-3 rounded-xl border border-[#EEE8DE] bg-[#FFFDF7] px-4 py-3"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E7F1EB]">
                          <Check
                            size={14}
                            className="text-[#4F8065]"
                          />
                        </span>

                        <span className="text-sm">
                          {ingredient}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* STEPS */}
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E7F1EB]">
                      👨‍🍳
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#4F8065]">
                        Method
                      </p>

                      <h2 className="font-display text-2xl font-semibold">
                        Step-by-step
                      </h2>
                    </div>
                  </div>

                  <div className="mt-6 space-y-5">
                    {recipe.steps.map((step, index) => (
                      <div
                        key={step}
                        className="flex gap-4"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#29251F] text-sm font-bold text-white">
                          {index + 1}
                        </div>

                        <div className="pt-1">
                          <p className="text-sm leading-7 text-[#4A443C]">
                            {step}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* LOCKED CONTENT */
              <div className="mx-auto max-w-3xl">
                <div className="overflow-hidden rounded-[32px] border border-[#EBE5DA] bg-[#FFFDF7]">
                  <div className="px-6 py-12 text-center sm:px-12 sm:py-16">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F3E6C8]">
                      <LockKeyhole
                        size={32}
                        className="text-[#8B681D]"
                      />
                    </div>

                    <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#A95D6C]">
                      Premium Content
                    </p>

                    <h2 className="font-display mt-3 text-3xl font-semibold text-[#29251F]">
                      Resep ini masih terkunci
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl leading-7 text-[#756F66]">
                      Dapatkan akses penuh ke daftar bahan,
                      step-by-step, dan seluruh panduan baking
                      dari resep ini.
                    </p>

                    <div className="mx-auto mt-8 grid max-w-md gap-3 text-left">
                      {[
                        '✓ Daftar bahan lengkap',
                        '✓ Step-by-step instructions',
                        '✓ Akses selamanya',
                      ].map((item) => (
                        <div
                          key={item}
                          className="rounded-xl bg-white px-4 py-3 text-sm font-semibold"
                        >
                          {item}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleAccess}
                      className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#29251F] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#4A443C]"
                    >
                      <ShoppingBag size={17} />
                      Beli {formatPrice(recipe.price)}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* TRUST */}
        <section className="bg-[#FFFDF7]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
            <div className="grid gap-4 sm:grid-cols-3">
              <Trust
                icon={<ChefHat size={20} />}
                title="Dikurasi Baker"
                text="Materi dibuat untuk membantu proses baking lebih terarah."
              />

              <Trust
                icon={<BookOpen size={20} />}
                title="Praktis Dipelajari"
                text="Langkah disusun secara runtut dan mudah diikuti."
              />

              <Trust
                icon={<Lock size={20} />}
                title="Akses Aman"
                text="Resep yang sudah dibeli tersimpan di akun kamu."
              />
            </div>
          </div>
        </section>

        {/* RELATED */}
        <section className="border-t border-[#EBE5DA] bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#A95D6C]">
                  Keep Baking
                </p>

                <h2 className="font-display mt-1 text-3xl font-semibold">
                  Resep lainnya
                </h2>
              </div>

              <Link
                to="/recipes"
                className="text-sm font-bold underline underline-offset-4"
              >
                Lihat semua
              </Link>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {recipes
                .filter(
                  (item) =>
                    item.id !== recipe.id &&
                    item.category === recipe.category,
                )
                .slice(0, 3)
                .map((item) => (
                  <Link
                    key={item.id}
                    to={`/recipes/${item.id}`}
                    className="group rounded-2xl border border-[#EBE5DA] bg-[#FFFDF7] p-5 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="text-5xl">
                      {item.emoji}
                    </div>

                    <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[#A95D6C]">
                      {item.category}
                    </p>

                    <h3 className="font-display mt-2 text-xl font-semibold">
                      {item.title}
                    </h3>

                    <div className="mt-4 flex items-center gap-2 text-sm text-[#756F66]">
                      <Star
                        size={14}
                        className="fill-[#E8B84A] text-[#E8B84A]"
                      />
                      {item.rating}
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      <MobileBottomNav />
    </div>
  )
}

function Info({ icon, value, label }) {
  return (
    <div className="flex items-center gap-2">
      {icon}

      <div>
        <p className="text-sm font-bold">{value}</p>
        <p className="text-xs text-[#8C867D]">{label}</p>
      </div>
    </div>
  )
}

function Trust({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-[#EBE5DA] bg-[#FFFDF7] p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold">{title}</h3>

      <p className="mt-1 text-sm leading-6 text-[#756F66]">
        {text}
      </p>
    </div>
  )
}

export default RecipeDetailPage