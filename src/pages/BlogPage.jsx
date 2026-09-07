import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock3,
  Search,
  Sparkles,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import MobileBottomNav from '../components/MobileBottomNav'

const categories = [
  'Semua',
  'Baking Tips',
  'Inspiration',
  'Recipe',
  'Business',
  'LaperCakes',
]

const articles = [
  {
    id: '5-tips-baking-pemula',
    title: '5 Tips Baking untuk Pemula agar Hasilnya Lebih Konsisten',
    excerpt:
      'Mulai baking tanpa takut gagal. Kenali beberapa dasar penting yang bisa membuat hasil baking lebih konsisten.',
    category: 'Baking Tips',
    author: 'LaperCakes Team',
    date: '2026-09-06',
    readTime: '5 min read',
    emoji: '🧁',
    featured: true,
  },
  {
    id: 'cara-memilih-oven',
    title: 'Cara Memilih Oven yang Tepat untuk Home Baker',
    excerpt:
      'Oven menjadi salah satu equipment paling penting dalam baking. Kenali hal yang perlu diperhatikan sebelum membeli.',
    category: 'Baking Tips',
    author: 'Chef Anasya',
    date: '2026-09-04',
    readTime: '6 min read',
    emoji: '🔥',
    featured: false,
  },
  {
    id: 'baking-di-rumah',
    title: 'Kenapa Baking di Rumah Bisa Jadi Quality Time?',
    excerpt:
      'Baking bukan hanya tentang hasil akhirnya. Proses membuatnya juga bisa menjadi aktivitas menyenangkan bersama keluarga.',
    category: 'Inspiration',
    author: 'LaperCakes Team',
    date: '2026-09-02',
    readTime: '4 min read',
    emoji: '👩🏻‍🍳',
    featured: false,
  },
  {
    id: 'basic-cookies',
    title: 'Mengenal Basic Cookies: Dari Dough sampai Baking',
    excerpt:
      'Memahami karakter dough adalah langkah awal untuk menghasilkan cookies dengan tekstur yang sesuai.',
    category: 'Recipe',
    author: 'Chef Rara',
    date: '2026-08-30',
    readTime: '7 min read',
    emoji: '🍪',
    featured: false,
  },
  {
    id: 'mulai-bisnis-baking',
    title: 'Mulai Bisnis Baking dari Rumah: Apa yang Perlu Disiapkan?',
    excerpt:
      'Baking bisa berkembang menjadi bisnis. Pelajari beberapa hal dasar sebelum mulai menjual produk homemade.',
    category: 'Business',
    author: 'LaperCakes Team',
    date: '2026-08-27',
    readTime: '8 min read',
    emoji: '📦',
    featured: false,
  },
  {
    id: 'belajar-baking-online',
    title: 'Belajar Baking Online Tetap Bisa Interaktif',
    excerpt:
      'Kelas baking online tidak harus terasa seperti belajar sendirian. Ini cara membuat pengalaman belajar tetap seru.',
    category: 'LaperCakes',
    author: 'LaperCakes Team',
    date: '2026-08-24',
    readTime: '5 min read',
    emoji: '💻',
    featured: false,
  },
]

function formatDate(date) {
  return new Date(date).toLocaleDateString(
    'id-ID',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
  )
}

function BlogPage() {
  const [activeCategory, setActiveCategory] =
    useState('Semua')

  const [searchQuery, setSearchQuery] =
    useState('')

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === 'Semua' ||
        article.category === activeCategory

      const query =
        searchQuery.trim().toLowerCase()

      const matchesSearch =
        !query ||
        [
          article.title,
          article.excerpt,
          article.category,
          article.author,
        ]
          .join(' ')
          .toLowerCase()
          .includes(query)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const featuredArticle =
    articles.find((article) => article.featured) ||
    articles[0]

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#29251F]">
      <Navbar />

      <main className="pb-24 lg:pb-0">
        {/* HERO */}
        <section className="border-b border-[#EBE5DA] bg-[#FFF8E8]">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E8B84A]/40 bg-white px-4 py-2 text-sm font-semibold text-[#8B681C]">
                <Sparkles size={16} />
                LaperCakes Blog
              </div>

              <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Cerita, tips,
                <br />
                dan inspirasi{' '}
                <span className="text-[#C99624]">
                  baking.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-[#756F66] sm:text-lg">
                Temukan insight seputar baking,
                inspirasi resep, tips dari baker,
                sampai cerita di balik LaperCakes.
              </p>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
          {/* FEATURED */}
          <div className="grid overflow-hidden rounded-[2rem] border border-[#EBE5DA] bg-white lg:grid-cols-2">
            <div className="flex min-h-[320px] items-center justify-center bg-[#FFF3CF] p-10 lg:min-h-[440px]">
              <div className="text-center">
                <div className="text-8xl sm:text-9xl">
                  {featuredArticle.emoji}
                </div>

                <div className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#8B681C] shadow-sm">
                  <BookOpen size={14} />
                  Featured Article
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
              <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.12em] text-[#C99624]">
                <span>{featuredArticle.category}</span>
                <span className="h-1 w-1 rounded-full bg-[#C99624]" />
                <span>{featuredArticle.readTime}</span>
              </div>

              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                {featuredArticle.title}
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#756F66] sm:text-base">
                {featuredArticle.excerpt}
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold">
                    {featuredArticle.author}
                  </p>

                  <p className="mt-1 text-xs text-[#938B80]">
                    {formatDate(featuredArticle.date)}
                  </p>
                </div>

                <Link
                  to={`/blog/${featuredArticle.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-[#29251F] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#423B32]"
                >
                  Baca artikel
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>

          {/* TOOLBAR */}
          <div className="mt-14">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#C99624]">
                  Latest stories
                </p>

                <h2 className="mt-2 font-display text-3xl font-semibold">
                  Artikel terbaru
                </h2>
              </div>

              <div className="relative w-full lg:max-w-sm">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999186]"
                />

                <input
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Cari artikel..."
                  className="form-input pl-11"
                />
              </div>
            </div>

            {/* CATEGORIES */}
            <div className="mt-7 flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => {
                const active =
                  activeCategory === category

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      setActiveCategory(category)
                    }
                    className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                      active
                        ? 'bg-[#29251F] text-white'
                        : 'border border-[#E5DED3] bg-white text-[#655F56] hover:border-[#C9BFAF]'
                    }`}
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          </div>

          {/* ARTICLE GRID */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
              />
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="mt-8 rounded-[1.5rem] border border-dashed border-[#D8D0C4] bg-white p-12 text-center">
              <div className="text-4xl">🔎</div>

              <h3 className="mt-4 font-display text-2xl font-semibold">
                Artikel tidak ditemukan
              </h3>

              <p className="mt-2 text-sm text-[#81796F]">
                Coba gunakan kata kunci atau kategori
                lain.
              </p>
            </div>
          )}

          {/* NEWSLETTER / CTA */}
          <div className="mt-14 overflow-hidden rounded-[2rem] bg-[#29251F] p-7 text-white sm:p-10 lg:p-12">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#E8B84A]">
                  Keep learning
                </p>

                <h2 className="mt-2 font-display text-3xl font-semibold">
                  Mau belajar baking langsung?
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/60">
                  Kalau sudah siap praktik, cek kelas
                  baking LaperCakes dan temukan kelas
                  yang cocok buat kamu.
                </p>
              </div>

              <Link
                to="/kelas"
                className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#29251F]"
              >
                Lihat kelas
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <MobileBottomNav />
    </div>
  )
}

function ArticleCard({ article }) {
  return (
    <Link
      to={`/blog/${article.id}`}
      className="group overflow-hidden rounded-[1.5rem] border border-[#EBE5DA] bg-white transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(41,37,31,0.08)]"
    >
      <div className="flex h-52 items-center justify-center bg-[#FFF3CF] text-7xl transition group-hover:scale-[1.02]">
        {article.emoji}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-[#FFF8E8] px-3 py-1.5 text-xs font-bold text-[#9A711B]">
            {article.category}
          </span>

          <span className="inline-flex items-center gap-1 text-xs text-[#999186]">
            <Clock3 size={12} />
            {article.readTime}
          </span>
        </div>

        <h3 className="mt-4 font-display text-xl font-semibold leading-snug">
          {article.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#756F66]">
          {article.excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-[#F0EBE3] pt-4">
          <div>
            <p className="text-xs font-bold">
              {article.author}
            </p>

            <p className="mt-1 text-[11px] text-[#999186]">
              {formatDate(article.date)}
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7F3EC] transition group-hover:bg-[#E8B84A]">
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  )
}

function Footer() {
  return (
    <footer className="border-t border-[#EBE5DA] bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-[#81796F] sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex items-center gap-2 font-bold text-[#29251F]">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E8B84A]">
            🍰
          </div>
          LaperCakes
        </div>

        <p>
          Belajar. Berbagi. Baking bersama.
        </p>
      </div>
    </footer>
  )
}

export default BlogPage