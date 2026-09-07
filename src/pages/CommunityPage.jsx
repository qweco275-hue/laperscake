import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  ChefHat,
  Clock3,
  Heart,
  MessageCircle,
  Plus,
  Search,
  Send,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import MobileBottomNav from '../components/MobileBottomNav'

const STORAGE_KEY = 'lapercakes-community-posts'

const categories = [
  'Semua',
  'Tips & Trik',
  'Showcase',
  'Tanya Baker',
  'Event',
  'Cerita Baking',
]

const defaultPosts = [
  {
    id: 'community-1',
    author: 'Nadia Putri',
    role: 'Home Baker',
    avatar: '👩🏻‍🍳',
    category: 'Showcase',
    title: 'Pertama kali bikin cupcake decoration! 🧁',
    content:
      'Akhirnya berani coba dekorasi cupcake sendiri setelah ikut kelas di LaperCakes. Masih belum sempurna, tapi ternyata seru banget!',
    createdAt: '2026-09-06T10:30:00',
    likes: 24,
    liked: false,
    comments: 8,
  },
  {
    id: 'community-2',
    author: 'Raka Wijaya',
    role: 'Baking Enthusiast',
    avatar: '👨🏻‍🍳',
    category: 'Tips & Trik',
    title: 'Tips supaya cookies tetap chewy',
    content:
      'Kalau kalian suka cookies yang bagian tengahnya chewy, jangan terlalu lama memanggang. Setelah keluar oven memang masih terasa lembut, tapi akan set ketika dingin.',
    createdAt: '2026-09-05T15:20:00',
    likes: 41,
    liked: false,
    comments: 13,
  },
  {
    id: 'community-3',
    author: 'Salsa & Mom',
    role: 'Parent Member',
    avatar: '👩🏻‍👧🏻',
    category: 'Cerita Baking',
    title: 'Baking time jadi quality time ❤️',
    content:
      'Awalnya cuma cari kegiatan weekend untuk anak, ternyata baking bareng malah jadi kegiatan favorit kami. Sekarang setiap weekend selalu cari resep baru.',
    createdAt: '2026-09-04T09:15:00',
    likes: 36,
    liked: false,
    comments: 11,
  },
  {
    id: 'community-4',
    author: 'Chef Anasya',
    role: 'LaperCakes Instructor',
    avatar: '👩🏼‍🍳',
    category: 'Tanya Baker',
    title: 'Ada yang punya pertanyaan soal sourdough?',
    content:
      'Buat yang sedang belajar sourdough dan masih bingung soal starter, hydration, atau proses fermentasi, boleh drop pertanyaan di sini.',
    createdAt: '2026-09-03T17:40:00',
    likes: 52,
    liked: false,
    comments: 19,
  },
  {
    id: 'community-5',
    author: 'LaperCakes',
    role: 'Official',
    avatar: '🍰',
    category: 'Event',
    title: 'Weekend Baking Workshop is coming!',
    content:
      'Siap-siap untuk workshop baking weekend bulan ini. Akan ada kelas seru, resep baru, dan kesempatan ketemu baker lainnya.',
    createdAt: '2026-09-02T13:00:00',
    likes: 67,
    liked: false,
    comments: 21,
  },
]

function getPosts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts))
      return defaultPosts
    }

    const parsed = JSON.parse(saved)

    if (!Array.isArray(parsed)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts))
      return defaultPosts
    }

    return parsed
  } catch (error) {
    console.error('Gagal membaca komunitas:', error)
    return defaultPosts
  }
}

function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
  window.dispatchEvent(new Event('communityUpdated'))
  window.dispatchEvent(new Event('storage'))
}

function formatDate(dateString) {
  const date = new Date(dateString)
  const now = new Date()

  const diff = Math.floor((now - date) / 1000)

  if (diff < 60) return 'Baru saja'
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`
  if (diff < 604800) return `${Math.floor(diff / 86400)} hari lalu`

  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function CommunityPage() {
  const [posts, setPosts] = useState([])
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('Terbaru')
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Cerita Baking',
  })

  useEffect(() => {
    setPosts(getPosts())

    const refresh = () => {
      setPosts(getPosts())
    }

    window.addEventListener('communityUpdated', refresh)
    window.addEventListener('storage', refresh)

    return () => {
      window.removeEventListener('communityUpdated', refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])

  const filteredPosts = useMemo(() => {
    let result = [...posts]

    if (activeCategory !== 'Semua') {
      result = result.filter(
        (post) => post.category === activeCategory,
      )
    }

    const query = searchQuery.trim().toLowerCase()

    if (query) {
      result = result.filter((post) =>
        [
          post.title,
          post.content,
          post.author,
          post.category,
        ]
          .join(' ')
          .toLowerCase()
          .includes(query),
      )
    }

    if (sortBy === 'Populer') {
      result.sort((a, b) => b.likes - a.likes)
    } else {
      result.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt),
      )
    }

    return result
  }, [posts, activeCategory, searchQuery, sortBy])

  const totalLikes = posts.reduce(
    (total, post) => total + Number(post.likes || 0),
    0,
  )

  const totalComments = posts.reduce(
    (total, post) =>
      total + Number(post.comments || 0),
    0,
  )

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (String(post.id) !== String(postId)) {
        return post
      }

      const liked = !post.liked

      return {
        ...post,
        liked,
        likes: Math.max(
          0,
          Number(post.likes || 0) + (liked ? 1 : -1),
        ),
      }
    })

    setPosts(updatedPosts)
    savePosts(updatedPosts)
  }

  const handleCreatePost = (event) => {
    event.preventDefault()

    if (
      !formData.title.trim() ||
      !formData.content.trim()
    ) {
      return
    }

    const newPost = {
      id: `community-${Date.now()}`,
      author: 'Kamu',
      role: 'Community Member',
      avatar: '🧑🏻‍🍳',
      category: formData.category,
      title: formData.title.trim(),
      content: formData.content.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
      liked: false,
      comments: 0,
    }

    const updatedPosts = [newPost, ...posts]

    setPosts(updatedPosts)
    savePosts(updatedPosts)

    setFormData({
      title: '',
      content: '',
      category: 'Cerita Baking',
    })

    setIsCreateOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#29251F]">
      <Navbar />

      <main className="pb-24 lg:pb-0">
        {/* HERO */}
        <section className="border-b border-[#EBE5DA] bg-[#FFF8E8]">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E8B84A]/40 bg-white px-4 py-2 text-sm font-semibold text-[#8B681C]">
                  <Sparkles size={16} />
                  LaperCakes Community
                </div>

                <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                  Tempat baker
                  <br />
                  <span className="text-[#C99624]">
                    saling berbagi.
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-7 text-[#756F66] sm:text-lg">
                  Bagikan hasil baking, cari inspirasi,
                  tanya ke baker lain, dan temukan
                  teman yang sama-sama suka dunia
                  baking.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreateOpen(true)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#29251F] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#423B32]"
                  >
                    <Plus size={18} />
                    Buat Postingan
                  </button>

                  <Link
                    to="/explore"
                    className="inline-flex items-center gap-2 rounded-full border border-[#D9D0C2] bg-white px-6 py-3.5 text-sm font-bold transition hover:-translate-y-0.5 hover:border-[#BBAF9D]"
                  >
                    Jelajahi Kelas
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="relative mx-auto max-w-sm">
                  <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full bg-[#BFE5D0]/60 blur-2xl" />
                  <div className="absolute -bottom-8 -left-6 h-32 w-32 rounded-full bg-[#D98C9B]/20 blur-2xl" />

                  <div className="relative rounded-[2rem] border border-white bg-white p-7 shadow-[0_24px_70px_rgba(41,37,31,0.10)]">
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF3CF] text-2xl">
                          🍰
                        </div>

                        <div>
                          <p className="font-bold">
                            LaperCakes
                          </p>
                          <p className="text-xs text-[#8A8379]">
                            Community
                          </p>
                        </div>
                      </div>

                      <Sparkles
                        size={19}
                        className="text-[#C99624]"
                      />
                    </div>

                    <div className="space-y-3">
                      <MiniCommunityItem
                        emoji="🧁"
                        title="Showcase"
                        text="Pamer hasil baking"
                      />

                      <MiniCommunityItem
                        emoji="💡"
                        title="Tips & Trik"
                        text="Belajar dari baker lain"
                      />

                      <MiniCommunityItem
                        emoji="💬"
                        title="Tanya Baker"
                        text="Diskusi seputar baking"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
          {/* STATS */}
          <div className="grid gap-4 sm:grid-cols-3">
            <CommunityStat
              icon={<Users size={20} />}
              value={posts.length}
              label="Postingan"
            />

            <CommunityStat
              icon={<Heart size={20} />}
              value={totalLikes}
              label="Apresiasi"
            />

            <CommunityStat
              icon={<MessageCircle size={20} />}
              value={totalComments}
              label="Diskusi"
            />
          </div>

          {/* TOOLBAR */}
          <div className="mt-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#C99624]">
                  COMMUNITY FEED
                </p>

                <h2 className="mt-1 font-display text-3xl font-semibold">
                  Cerita dari sesama baker
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsCreateOpen(true)}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-[#E8B84A] px-5 py-3 text-sm font-bold text-[#29251F] transition hover:bg-[#DDAE3F]"
              >
                <Plus size={17} />
                Buat Postingan
              </button>
            </div>

            <div className="mt-7 flex flex-col gap-3 lg:flex-row">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999186]"
                />

                <input
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Cari postingan, topik, atau baker..."
                  className="form-input pl-11"
                />
              </div>

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value)
                }
                className="form-input lg:w-44"
              >
                <option>Terbaru</option>
                <option>Populer</option>
              </select>
            </div>

            {/* CATEGORY */}
            <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
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

          {/* FEED */}
          <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="space-y-5">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <CommunityPost
                    key={post.id}
                    post={post}
                    onLike={handleLike}
                  />
                ))
              ) : (
                <EmptyCommunity />
              )}
            </div>

            {/* SIDEBAR */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-5">
                <div className="rounded-3xl border border-[#EBE5DA] bg-white p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#BFE5D0]/60">
                      <TrendingUp size={19} />
                    </div>

                    <div>
                      <h3 className="font-bold">
                        Topik populer
                      </h3>

                      <p className="text-xs text-[#8A8379]">
                        Minggu ini
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      ['#cookies', '12 postingan'],
                      ['#cupcake', '9 postingan'],
                      ['#bakingtips', '8 postingan'],
                      ['#sourdough', '6 postingan'],
                    ].map(([topic, count]) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() =>
                          setSearchQuery(
                            topic.replace('#', ''),
                          )
                        }
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition hover:bg-[#FFF8E8]"
                      >
                        <span className="font-semibold text-[#514B43]">
                          {topic}
                        </span>

                        <span className="text-xs text-[#9B9388]">
                          {count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl bg-[#29251F] p-6 text-white">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                    <ChefHat size={21} />
                  </div>

                  <h3 className="mt-5 font-display text-2xl font-semibold">
                    Punya cerita baking?
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/65">
                    Jangan disimpan sendiri. Bagikan
                    proses, hasil, atau tips favoritmu
                    ke komunitas.
                  </p>

                  <button
                    type="button"
                    onClick={() => setIsCreateOpen(true)}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-[#29251F]"
                  >
                    Mulai berbagi
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <FooterSimple />

      <MobileBottomNav />

      {/* CREATE POST MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#29251F]/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#EBE5DA] px-6 py-5 sm:px-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C99624]">
                  Community
                </p>

                <h2 className="mt-1 font-display text-2xl font-semibold">
                  Buat postingan
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F3EC] text-[#655F56] transition hover:bg-[#EEE8DE]"
              >
                <X size={19} />
              </button>
            </div>

            <form
              onSubmit={handleCreatePost}
              className="space-y-5 p-6 sm:p-7"
            >
              <div>
                <label className="mb-2 block text-sm font-bold">
                  Kategori
                </label>

                <select
                  value={formData.category}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      category: event.target.value,
                    })
                  }
                  className="form-input"
                >
                  {categories
                    .filter(
                      (category) =>
                        category !== 'Semua',
                    )
                    .map((category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Judul postingan
                </label>

                <input
                  value={formData.title}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      title: event.target.value,
                    })
                  }
                  placeholder="Contoh: Tips bikin cookies chewy"
                  className="form-input"
                  maxLength={100}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Ceritakan lebih detail
                </label>

                <textarea
                  value={formData.content}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      content: event.target.value,
                    })
                  }
                  placeholder="Tulis pengalaman, tips, pertanyaan, atau cerita baking kamu..."
                  className="form-input min-h-36 resize-none"
                  maxLength={500}
                  required
                />

                <p className="mt-2 text-right text-xs text-[#999186]">
                  {formData.content.length}/500
                </p>
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="rounded-full border border-[#DDD5C9] px-5 py-3 text-sm font-bold text-[#5D574F]"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#29251F] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#423B32]"
                >
                  <Send size={16} />
                  Publikasikan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function CommunityPost({ post, onLike }) {
  return (
    <article className="rounded-[1.5rem] border border-[#EBE5DA] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-[0_16px_45px_rgba(41,37,31,0.07)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FFF3CF] text-2xl">
            {post.avatar}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-bold">
                {post.author}
              </p>

              {post.author === 'LaperCakes' && (
                <span className="rounded-full bg-[#BFE5D0] px-2 py-0.5 text-[10px] font-bold text-[#356047]">
                  OFFICIAL
                </span>
              )}
            </div>

            <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-[#938B80]">
              <span>{post.role}</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Clock3 size={11} />
                {formatDate(post.createdAt)}
              </span>
            </div>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-[#FFF8E8] px-3 py-1.5 text-xs font-bold text-[#9A711B]">
          {post.category}
        </span>
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-bold leading-snug sm:text-xl">
          {post.title}
        </h3>

        <p className="mt-2 text-sm leading-7 text-[#716A61] sm:text-base">
          {post.content}
        </p>
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-[#F0EBE3] pt-4">
        <button
          type="button"
          onClick={() => onLike(post.id)}
          className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition ${
            post.liked
              ? 'bg-[#FCE6EA] text-[#A95D6C]'
              : 'text-[#756F66] hover:bg-[#F8F4EE]'
          }`}
        >
          <Heart
            size={17}
            fill={post.liked ? 'currentColor' : 'none'}
          />
          {post.likes}
        </button>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-[#756F66] transition hover:bg-[#F8F4EE]"
        >
          <MessageCircle size={17} />
          {post.comments}
        </button>

        <span className="ml-auto hidden items-center gap-1.5 text-xs text-[#9B9388] sm:inline-flex">
          <BookOpen size={14} />
          Community
        </span>
      </div>
    </article>
  )
}

function CommunityStat({ icon, value, label }) {
  return (
    <div className="rounded-2xl border border-[#EBE5DA] bg-white p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF3CF] text-[#9A711B]">
          {icon}
        </div>

        <div>
          <p className="text-2xl font-bold">
            {value}
          </p>

          <p className="text-sm text-[#8A8379]">
            {label}
          </p>
        </div>
      </div>
    </div>
  )
}

function MiniCommunityItem({ emoji, title, text }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-[#FFFDF7] p-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
        {emoji}
      </div>

      <div>
        <p className="text-sm font-bold">
          {title}
        </p>

        <p className="text-xs text-[#8A8379]">
          {text}
        </p>
      </div>
    </div>
  )
}

function EmptyCommunity() {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-[#D8D0C4] bg-white p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF3CF] text-2xl">
        🔎
      </div>

      <h3 className="mt-5 font-display text-2xl font-semibold">
        Postingan belum ditemukan
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#81796F]">
        Coba gunakan kata kunci lain atau pilih
        kategori yang berbeda.
      </p>
    </div>
  )
}

function FooterSimple() {
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

export default CommunityPage