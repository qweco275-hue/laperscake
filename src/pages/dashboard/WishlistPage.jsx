import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Heart,
  Star,
  Trash2,
  Users,
  Video,
} from 'lucide-react'

import Navbar from '../../components/Navbar'
import DashboardSidebar from '../../components/dashboard/DashboardSidebar'
import DashboardMobileNav from '../../components/dashboard/DashboardMobileNav'

import  classes  from '../../data/classes'
import  recipes  from '../../data/recipes'

import {
  getWishlist,
  toggleWishlist,
} from '../../utils/dashboardStorage'

import {
  getRecipeWishlist,
  toggleRecipeWishlist,
} from '../../utils/recipeStorage'

export default function WishlistPage() {
  const [classWishlist, setClassWishlist] = useState([])
  const [recipeWishlist, setRecipeWishlist] = useState([])

  useEffect(() => {
    setClassWishlist(getWishlist())
    setRecipeWishlist(getRecipeWishlist())
  }, [])

  const wishlistClasses = classes.filter((item) =>
    classWishlist.includes(item.id)
  )

  const wishlistRecipes = recipes.filter((item) =>
    recipeWishlist.includes(item.id)
  )

  const removeClass = (id) => {
    const updated = toggleWishlist(id)
    setClassWishlist(updated)
  }

  const removeRecipe = (id) => {
    const updated = toggleRecipeWishlist(id)
    setRecipeWishlist(updated)
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[var(--lc-cream)]">
        <div className="mx-auto flex max-w-[1500px]">
          <DashboardSidebar />

          <main className="min-w-0 flex-1 px-4 pb-28 pt-8 md:px-8 lg:px-10 lg:pb-12">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f9e9ed] text-[var(--lc-berry-dark)]">
                  <Heart size={24} />
                </div>

                <div>
                  <p className="text-sm font-medium text-[var(--lc-muted)]">
                    Saved for later
                  </p>

                  <h1 className="font-display text-3xl text-[var(--lc-text)] md:text-4xl">
                    Wishlist
                  </h1>
                </div>
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--lc-muted)]">
                Simpan kelas dan resep favoritmu supaya gampang ditemukan
                kembali kapan saja.
              </p>
            </div>

            {/* Summary */}
            <div className="mb-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[var(--lc-border)] bg-white p-5">
                <p className="text-sm text-[var(--lc-muted)]">
                  Saved Classes
                </p>

                <p className="mt-1 text-3xl font-bold text-[var(--lc-text)]">
                  {wishlistClasses.length}
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--lc-border)] bg-white p-5">
                <p className="text-sm text-[var(--lc-muted)]">
                  Saved Recipes
                </p>

                <p className="mt-1 text-3xl font-bold text-[var(--lc-text)]">
                  {wishlistRecipes.length}
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--lc-border)] bg-white p-5">
                <p className="text-sm text-[var(--lc-muted)]">
                  Total Wishlist
                </p>

                <p className="mt-1 text-3xl font-bold text-[var(--lc-text)]">
                  {wishlistClasses.length + wishlistRecipes.length}
                </p>
              </div>
            </div>

            {/* Classes */}
            <section>
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[var(--lc-text)]">
                    Favorite Classes
                  </h2>

                  <p className="mt-1 text-sm text-[var(--lc-muted)]">
                    Kelas yang kamu simpan.
                  </p>
                </div>

                <Link
                  to="/explore"
                  className="hidden items-center gap-1 text-sm font-semibold text-[var(--lc-text)] sm:flex"
                >
                  Explore
                  <ArrowRight size={15} />
                </Link>
              </div>

              {wishlistClasses.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {wishlistClasses.map((item) => (
                    <article
                      key={item.id}
                      className="group overflow-hidden rounded-[26px] border border-[var(--lc-border)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                      {/* Visual */}
                      <div className="relative flex h-44 items-center justify-center bg-[#fff4d6]">
                        <span className="text-6xl">
                          {item.emoji || '🍰'}
                        </span>

                        <button
                          onClick={() => removeClass(item.id)}
                          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--lc-berry-dark)] shadow-sm transition hover:bg-[#f9e9ed]"
                          title="Remove from wishlist"
                        >
                          <Trash2 size={17} />
                        </button>

                        <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[var(--lc-text)] backdrop-blur">
                          {item.mode}
                        </span>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs font-semibold text-[var(--lc-mint-dark)]">
                            {item.category}
                          </span>

                          <div className="flex items-center gap-1 text-xs font-semibold text-[var(--lc-text)]">
                            <Star
                              size={13}
                              fill="currentColor"
                            />
                            {item.rating}
                          </div>
                        </div>

                        <h3 className="mt-2 line-clamp-2 text-lg font-bold text-[var(--lc-text)]">
                          {item.name}
                        </h3>

                        <div className="mt-3 flex items-center gap-3 text-xs text-[var(--lc-muted)]">
                          {item.mode === 'Online' ? (
                            <span className="flex items-center gap-1">
                              <Video size={13} />
                              Online
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Users size={13} />
                              Offline
                            </span>
                          )}

                          <span>•</span>

                          <span>{item.level}</span>
                        </div>

                        <div className="mt-5 flex items-center justify-between">
                          <p className="text-lg font-bold text-[var(--lc-text)]">
                            Rp{item.price.toLocaleString('id-ID')}
                          </p>

                          <Link
                            to={`/classes/${item.id}`}
                            className="flex items-center gap-1 rounded-xl bg-[var(--lc-text)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                          >
                            Detail
                            <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon="🍰"
                  title="Belum ada kelas favorit"
                  description="Simpan kelas yang menarik buat kamu dan kelas tersebut akan muncul di sini."
                  buttonText="Explore Classes"
                  to="/explore"
                />
              )}
            </section>

            {/* Recipes */}
            <section className="mt-12">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[var(--lc-text)]">
                    Favorite Recipes
                  </h2>

                  <p className="mt-1 text-sm text-[var(--lc-muted)]">
                    Resep yang kamu simpan.
                  </p>
                </div>

                <Link
                  to="/recipes/marketplace"
                  className="hidden items-center gap-1 text-sm font-semibold text-[var(--lc-text)] sm:flex"
                >
                  Explore
                  <ArrowRight size={15} />
                </Link>
              </div>

              {wishlistRecipes.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                  {wishlistRecipes.map((item) => (
                    <article
                      key={item.id}
                      className="overflow-hidden rounded-[26px] border border-[var(--lc-border)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="relative flex h-40 items-center justify-center bg-[#fff8e7]">
                        <span className="text-6xl">
                          {item.emoji || '🍪'}
                        </span>

                        <button
                          onClick={() => removeRecipe(item.id)}
                          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--lc-berry-dark)] shadow-sm"
                          title="Remove from wishlist"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-[var(--lc-mint-dark)]">
                            {item.category}
                          </span>

                          <div className="flex items-center gap-1 text-xs font-semibold">
                            <Star
                              size={13}
                              fill="currentColor"
                            />
                            {item.rating}
                          </div>
                        </div>

                        <h3 className="mt-2 line-clamp-2 text-base font-bold text-[var(--lc-text)]">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-xs text-[var(--lc-muted)]">
                          {item.type} • {item.level}
                        </p>

                        <div className="mt-5 flex items-center justify-between">
                          <span className="font-bold text-[var(--lc-text)]">
                            {item.price === 0
                              ? 'Free'
                              : `Rp${item.price.toLocaleString(
                                  'id-ID'
                                )}`}
                          </span>

                          <Link
                            to={`/recipes/${item.id}`}
                            className="flex items-center gap-1 rounded-xl bg-[var(--lc-text)] px-3.5 py-2.5 text-xs font-semibold text-white"
                          >
                            Lihat
                            <ArrowRight size={13} />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon="📖"
                  title="Belum ada resep favorit"
                  description="Simpan resep yang ingin kamu coba nanti."
                  buttonText="Explore Recipes"
                  to="/recipes/marketplace"
                />
              )}
            </section>
          </main>
        </div>
      </div>

      <DashboardMobileNav />
    </>
  )
}

function EmptyState({
  icon,
  title,
  description,
  buttonText,
  to,
}) {
  return (
    <div className="rounded-[28px] border border-dashed border-[var(--lc-border)] bg-white px-6 py-14 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff5dc] text-3xl">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-bold text-[var(--lc-text)]">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--lc-muted)]">
        {description}
      </p>

      <Link
        to={to}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--lc-text)] px-5 py-3 text-sm font-semibold text-white"
      >
        {buttonText}
        <ArrowRight size={15} />
      </Link>
    </div>
  )
}