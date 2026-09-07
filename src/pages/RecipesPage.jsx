import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import MobileBottomNav from '../components/MobileBottomNav'
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react'

function RecipesPage() {
  const categories = [
    {
      emoji: '🍪',
      title: 'Cookies & Cupcake',
      count: '35+ Recipes',
      category: 'Cookies',
      description: 'Cookies, cupcake, frosting, dan berbagai resep manis.',
    },
    {
      emoji: '🥐',
      title: 'Bread & Pastry',
      count: '25+ Recipes',
      category: 'Bread',
      description: 'Pelajari roti artisan, sourdough, pastry, dan dough.',
    },
    {
      emoji: '🍰',
      title: 'Cake Decoration',
      count: '20+ Recipes',
      category: 'Cake',
      description: 'Teknik dekorasi cake dari basic sampai advanced.',
    },
    {
      emoji: '🍫',
      title: 'Chocolate',
      count: '15+ Recipes',
      category: 'Dessert',
      description: 'Brownie, chocolate dessert, dan kreasi cokelat premium.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#FFFDF7] pb-20 lg:pb-0">
      <Navbar />

      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">

        {/* HEADER */}
        <section>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#DDF3E7] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#4F8065]">
            <Sparkles size={14} />
            RECIPE MARKETPLACE
          </span>

          <h1 className="font-display mt-5 max-w-3xl text-4xl font-semibold leading-tight text-[#29251F] sm:text-6xl">
            Resep, guide, dan knowledge untuk setiap level baker.
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#756F66] sm:text-base">
            Temukan e-book, recipe pack, baking guide, dan resep premium
            LaperCakes untuk membantu kamu berkembang dari beginner hingga
            professional baker.
          </p>
        </section>

        {/* QUICK ACTION */}
        <section className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/recipes/marketplace"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#29251F] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#3a352e]"
          >
            <BookOpen size={17} />
            Lihat Semua Resep
            <ArrowRight size={17} />
          </Link>

          <Link
            to="/my-recipes"
            className="inline-flex items-center justify-center rounded-full border border-[#DCD5C9] bg-white px-6 py-3.5 text-sm font-bold text-[#29251F] transition hover:bg-[#F8F3EA]"
          >
            Resep Saya
          </Link>
        </section>

        {/* CATEGORY */}
        <section className="mt-14">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#A95D6C]">
              Explore by category
            </p>

            <h2 className="font-display mt-2 text-2xl font-semibold text-[#29251F] sm:text-3xl">
              Pilih bidang yang ingin kamu pelajari
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((item) => (
              <Link
                key={item.title}
                to={`/recipes/marketplace?category=${encodeURIComponent(
                  item.category
                )}`}
                className="group relative overflow-hidden rounded-3xl border border-[#EBE5DA] bg-white p-6 transition duration-300 hover:-translate-y-1.5 hover:border-[#D9CFBF] hover:shadow-xl"
              >
                {/* EMOJI */}
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#F8F3EA] text-5xl transition duration-300 group-hover:scale-105">
                  {item.emoji}
                </div>

                {/* CONTENT */}
                <h2 className="font-display mt-6 text-xl font-semibold text-[#29251F]">
                  {item.title}
                </h2>

                <p className="mt-2 text-xs font-semibold text-[#A95D6C]">
                  {item.count}
                </p>

                <p className="mt-3 text-sm leading-6 text-[#756F66]">
                  {item.description}
                </p>

                {/* ACTION */}
                <div className="mt-6 flex items-center justify-between border-t border-[#F0EBE2] pt-4">
                  <span className="text-xs font-bold text-[#756F66]">
                    Explore recipes
                  </span>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#29251F] text-white transition group-hover:translate-x-1">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* MARKETPLACE CTA */}
        <section className="mt-14 overflow-hidden rounded-[2rem] bg-[#29251F] px-6 py-10 text-white sm:px-10 sm:py-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#E8B84A]">
                LaperCakes Recipe Library
              </p>

              <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold sm:text-4xl">
                Dari resep gratis sampai masterclass premium.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">
                Cari resep berdasarkan kategori, level, tipe konten, rating,
                dan kebutuhan baking kamu.
              </p>
            </div>

            <Link
              to="/recipes/marketplace"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#29251F] transition hover:-translate-y-0.5"
            >
              Explore Marketplace
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>

      </main>

      <MobileBottomNav />
    </div>
  )
}

export default RecipesPage