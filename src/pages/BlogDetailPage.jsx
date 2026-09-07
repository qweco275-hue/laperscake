import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock3,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import MobileBottomNav from '../components/MobileBottomNav'

const articles = [
  {
    id: '5-tips-baking-pemula',
    title: '5 Tips Baking untuk Pemula agar Hasilnya Lebih Konsisten',
    category: 'Baking Tips',
    author: 'LaperCakes Team',
    date: '2026-09-06',
    readTime: '5 min read',
    emoji: '🧁',
    intro:
      'Baking terlihat sederhana, tetapi ada banyak detail kecil yang menentukan hasil akhir. Buat kamu yang baru mulai, konsistensi adalah salah satu hal terpenting untuk dipelajari.',
    sections: [
      {
        heading: '1. Selalu baca resep sampai selesai',
        text:
          'Sebelum mulai menimbang bahan, baca seluruh resep terlebih dahulu. Pastikan kamu memahami urutan proses, waktu istirahat adonan, suhu oven, dan equipment yang dibutuhkan.',
      },
      {
        heading: '2. Gunakan takaran yang konsisten',
        text:
          'Dalam baking, perbedaan sedikit pada jumlah bahan dapat memengaruhi tekstur dan rasa. Gunakan timbangan digital agar takaran lebih akurat dan hasil antar-batch lebih konsisten.',
      },
      {
        heading: '3. Kenali karakter oven',
        text:
          'Setiap oven bisa memiliki karakter panas yang berbeda. Temperatur yang tertulis pada oven belum tentu sama dengan temperatur aktual di dalamnya. Kenali oven secara bertahap dan perhatikan hasil setiap batch.',
      },
      {
        heading: '4. Jangan terburu-buru mengganti bahan',
        text:
          'Bahan dalam resep biasanya memiliki fungsi tertentu. Sebelum melakukan substitusi, pahami terlebih dahulu fungsi bahan tersebut agar perubahan tidak mengganggu struktur adonan.',
      },
      {
        heading: '5. Catat hasil setiap percobaan',
        text:
          'Catat temperatur, waktu baking, tekstur, dan perubahan yang kamu lakukan. Dengan begitu, kamu bisa mengetahui apa yang berhasil dan apa yang perlu diperbaiki pada percobaan berikutnya.',
      },
    ],
  },
  {
    id: 'cara-memilih-oven',
    title: 'Cara Memilih Oven yang Tepat untuk Home Baker',
    category: 'Baking Tips',
    author: 'Chef Anasya',
    date: '2026-09-04',
    readTime: '6 min read',
    emoji: '🔥',
    intro:
      'Oven merupakan salah satu investasi penting untuk home baker. Pilihan oven yang tepat akan membuat proses baking terasa lebih mudah dan terkontrol.',
    sections: [
      {
        heading: 'Perhatikan kapasitas',
        text:
          'Pilih kapasitas oven sesuai kebutuhan. Untuk penggunaan rumahan, kapasitas yang terlalu besar belum tentu lebih efisien jika sebagian besar ruang tidak digunakan.',
      },
      {
        heading: 'Perhatikan kontrol temperatur',
        text:
          'Kontrol temperatur yang stabil membantu menghasilkan proses baking yang lebih konsisten. Fitur tambahan juga dapat dipertimbangkan sesuai kebutuhan.',
      },
      {
        heading: 'Kenali kebutuhan baking',
        text:
          'Cookies, cake, bread, dan pastry dapat memiliki kebutuhan yang berbeda. Tentukan jenis produk yang paling sering dibuat sebelum memilih oven.',
      },
    ],
  },
  {
    id: 'baking-di-rumah',
    title: 'Kenapa Baking di Rumah Bisa Jadi Quality Time?',
    category: 'Inspiration',
    author: 'LaperCakes Team',
    date: '2026-09-02',
    readTime: '4 min read',
    emoji: '👩🏻‍🍳',
    intro:
      'Baking tidak selalu harus tentang mengejar hasil yang sempurna. Prosesnya sendiri dapat menjadi momen untuk menghabiskan waktu bersama orang-orang terdekat.',
    sections: [
      {
        heading: 'Baking membuat kita lebih hadir',
        text:
          'Menimbang bahan, mengaduk adonan, sampai menunggu hasil oven membuat aktivitas terasa lebih mindful dibanding sekadar membeli makanan jadi.',
      },
      {
        heading: 'Bisa dilakukan bersama',
        text:
          'Baking bisa menjadi aktivitas keluarga, pasangan, maupun teman. Setiap orang dapat mengambil bagian dalam prosesnya.',
      },
      {
        heading: 'Hasil akhirnya menjadi kenangan',
        text:
          'Makanan yang dibuat bersama sering kali memiliki cerita tersendiri. Tidak hanya enak dimakan, tetapi juga mengingatkan kita pada proses pembuatannya.',
      },
    ],
  },
  {
    id: 'basic-cookies',
    title: 'Mengenal Basic Cookies: Dari Dough sampai Baking',
    category: 'Recipe',
    author: 'Chef Rara',
    date: '2026-08-30',
    readTime: '7 min read',
    emoji: '🍪',
    intro:
      'Cookies menjadi salah satu produk baking yang cukup ramah untuk pemula. Namun, memahami dough akan membuat hasilnya jauh lebih mudah dikontrol.',
    sections: [
      {
        heading: 'Mulai dari komposisi bahan',
        text:
          'Tepung, butter, gula, telur, dan bahan tambahan memiliki fungsi masing-masing. Perubahan komposisi akan memengaruhi tekstur akhir cookies.',
      },
      {
        heading: 'Perhatikan suhu butter',
        text:
          'Kondisi butter dapat memengaruhi struktur dough. Ikuti kondisi yang diminta resep agar proses mixing berjalan sesuai tujuan.',
      },
      {
        heading: 'Kenali hasil yang diinginkan',
        text:
          'Tentukan sejak awal apakah kamu ingin cookies yang crunchy, chewy, soft, atau kombinasi. Target tekstur akan membantu menentukan proses baking.',
      },
    ],
  },
  {
    id: 'mulai-bisnis-baking',
    title: 'Mulai Bisnis Baking dari Rumah: Apa yang Perlu Disiapkan?',
    category: 'Business',
    author: 'LaperCakes Team',
    date: '2026-08-27',
    readTime: '8 min read',
    emoji: '📦',
    intro:
      'Hobi baking dapat berkembang menjadi peluang bisnis. Namun, sebelum mulai menjual, ada beberapa hal dasar yang sebaiknya dipersiapkan.',
    sections: [
      {
        heading: 'Tentukan produk utama',
        text:
          'Mulailah dari produk yang benar-benar kamu kuasai. Fokus pada beberapa produk terlebih dahulu agar kualitas lebih mudah dijaga.',
      },
      {
        heading: 'Hitung biaya dengan jelas',
        text:
          'Jangan hanya menghitung bahan utama. Packaging, listrik, tenaga, dan biaya operasional juga perlu dipertimbangkan.',
      },
      {
        heading: 'Bangun identitas brand',
        text:
          'Brand yang konsisten membantu produk lebih mudah dikenali. Mulai dari nama, visual, packaging, hingga cara berkomunikasi dengan pelanggan.',
      },
    ],
  },
  {
    id: 'belajar-baking-online',
    title: 'Belajar Baking Online Tetap Bisa Interaktif',
    category: 'LaperCakes',
    author: 'LaperCakes Team',
    date: '2026-08-24',
    readTime: '5 min read',
    emoji: '💻',
    intro:
      'Kelas online bukan berarti belajar sendirian. Dengan format yang tepat, proses belajar baking dari rumah tetap bisa terasa interaktif.',
    sections: [
      {
        heading: 'Siapkan bahan sebelum kelas',
        text:
          'Mise en place membuat proses kelas lebih lancar. Semua bahan dan equipment sebaiknya sudah siap sebelum kelas dimulai.',
      },
      {
        heading: 'Jangan takut bertanya',
        text:
          'Salah satu manfaat kelas adalah kesempatan mendapatkan arahan langsung. Gunakan sesi tanya jawab untuk memahami bagian yang masih membingungkan.',
      },
      {
        heading: 'Praktik langsung',
        text:
          'Baking adalah skill yang berkembang melalui praktik. Setelah kelas selesai, ulangi resep untuk memperkuat pemahaman.',
      },
    ],
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

function BlogDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const articleIndex = articles.findIndex(
    (article) => article.id === id,
  )

  const article = articles[articleIndex]

  if (!article) {
    return (
      <div className="min-h-screen bg-[#FFFDF7]">
        <Navbar />

        <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-5 text-center">
          <div className="text-6xl">📖</div>

          <h1 className="mt-5 font-display text-4xl font-semibold">
            Artikel tidak ditemukan
          </h1>

          <p className="mt-3 text-[#756F66]">
            Artikel yang kamu cari belum tersedia.
          </p>

          <Link
            to="/blog"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#29251F] px-6 py-3 text-sm font-bold text-white"
          >
            <ArrowLeft size={17} />
            Kembali ke Blog
          </Link>
        </main>

        <MobileBottomNav />
      </div>
    )
  }

  const previousArticle =
    articles[articleIndex - 1]

  const nextArticle =
    articles[articleIndex + 1]

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#29251F]">
      <Navbar />

      <main className="pb-24 lg:pb-0">
        <article>
          {/* ARTICLE HERO */}
          <section className="border-b border-[#EBE5DA] bg-[#FFF8E8]">
            <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
              <button
                type="button"
                onClick={() => navigate('/blog')}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#756F66] transition hover:text-[#29251F]"
              >
                <ArrowLeft size={17} />
                Kembali ke Blog
              </button>

              <div className="mt-10 max-w-4xl">
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.13em] text-[#C99624]">
                  <span>{article.category}</span>
                  <span className="h-1 w-1 rounded-full bg-[#C99624]" />
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 size={13} />
                    {article.readTime}
                  </span>
                </div>

                <h1 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                  {article.title}
                </h1>

                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[#756F66]">
                  <span className="font-bold text-[#29251F]">
                    {article.author}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <CalendarDays size={16} />
                    {formatDate(article.date)}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ARTICLE */}
          <section className="mx-auto max-w-5xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
            <div className="flex min-h-[280px] items-center justify-center rounded-[2rem] bg-[#FFF3CF] text-8xl sm:min-h-[380px] sm:text-9xl">
              {article.emoji}
            </div>

            <div className="mx-auto mt-10 max-w-3xl">
              <p className="text-lg font-medium leading-8 text-[#514B43] sm:text-xl">
                {article.intro}
              </p>

              <div className="mt-10 space-y-9">
                {article.sections.map(
                  (section) => (
                    <section key={section.heading}>
                      <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                        {section.heading}
                      </h2>

                      <p className="mt-3 text-base leading-8 text-[#716A61]">
                        {section.text}
                      </p>
                    </section>
                  ),
                )}
              </div>

              <div className="mt-12 rounded-3xl border border-[#EBE5DA] bg-white p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF3CF]">
                    <BookOpen size={20} />
                  </div>

                  <div>
                    <p className="font-bold">
                      Mau langsung praktik?
                    </p>

                    <p className="mt-1 text-sm leading-6 text-[#756F66]">
                      Temukan kelas baking yang sesuai
                      dan praktik langsung bersama
                      instructor LaperCakes.
                    </p>

                    <Link
                      to="/kelas"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#9A711B]"
                    >
                      Lihat kelas
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>

        {/* ARTICLE NAVIGATION */}
        <section className="border-t border-[#EBE5DA] bg-white">
          <div className="mx-auto grid max-w-5xl gap-4 px-5 py-10 sm:px-8 lg:grid-cols-2 lg:px-10">
            {previousArticle ? (
              <Link
                to={`/blog/${previousArticle.id}`}
                className="group rounded-3xl border border-[#EBE5DA] p-5 transition hover:border-[#D5C6AF] hover:bg-[#FFFDF7]"
              >
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#9A711B]">
                  Artikel sebelumnya
                </p>

                <div className="mt-3 flex items-center justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold">
                    {previousArticle.title}
                  </h3>

                  <ArrowLeft
                    size={19}
                    className="shrink-0 transition group-hover:-translate-x-1"
                  />
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextArticle ? (
              <Link
                to={`/blog/${nextArticle.id}`}
                className="group rounded-3xl border border-[#EBE5DA] p-5 text-right transition hover:border-[#D5C6AF] hover:bg-[#FFFDF7]"
              >
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#9A711B]">
                  Artikel berikutnya
                </p>

                <div className="mt-3 flex items-center justify-between gap-4">
                  <ArrowRight
                    size={19}
                    className="shrink-0 transition group-hover:translate-x-1"
                  />

                  <h3 className="font-display text-xl font-semibold">
                    {nextArticle.title}
                  </h3>
                </div>
              </Link>
            ) : null}
          </div>
        </section>
      </main>

      <MobileBottomNav />
    </div>
  )
}

export default BlogDetailPage