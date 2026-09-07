import { useState } from 'react'
import { Link } from 'react-router-dom'
import ebooks from '../data/ebooks'
import EbookCheckout from '../components/ebooks/EbookCheckout'

function RecipeStore() {
  const [selectedEbook, setSelectedEbook] = useState(null)
  const [checkoutEbook, setCheckoutEbook] = useState(null)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-[#FFFDF7]">

      {/* HEADER */}
      <header className="border-b border-[#EBE5DA] bg-[#FFFDF7]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">

          <Link
            to="/"
            className="text-sm font-semibold text-[#756F66] transition hover:text-[#29251F]"
          >
            ← Website Utama
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8B84A]">
              🧁
            </div>

            <span className="font-display text-lg font-bold">
              LaperCakes
            </span>
          </div>

        </div>
      </header>

      <main>

        {/* HERO */}
        <section className="px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20">
          <div className="mx-auto max-w-4xl text-center">

            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#A95D6C]">
              LaperCakes Recipe Store
            </p>

            <h1 className="font-display mt-4 text-4xl font-semibold leading-tight sm:text-6xl">
              Resep seru untuk
              <br />
              <span className="text-[#A95D6C]">baking di rumah.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#756F66] sm:text-lg">
              Panduan resep praktis untuk menemani anak dan orang tua
              membuat kreasi baking bersama.
            </p>

          </div>
        </section>

        {/* FREE GUIDE */}
        <section className="px-5 sm:px-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-[2rem] bg-[#BFE5D0] p-7 sm:p-10 md:flex-row md:items-center md:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl">
                📖
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#4F8065]">
                  Gratis
                </p>

                <h2 className="font-display mt-1 text-2xl font-semibold">
                  Panduan Umum Baking untuk Pemula
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-[#4F8065]">
                  Kenalan dengan basic tools, bahan, dan tips baking
                  sebelum mulai membuat resep pertamamu.
                </p>
              </div>

            </div>

            <button
              type="button"
              className="shrink-0 rounded-full bg-[#29251F] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
            >
              Ambil Gratis →
            </button>

          </div>
        </section>

        {/* EBOOKS */}
        <section className="px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl">

            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#A95D6C]">
                Koleksi Resep
              </p>

              <h2 className="font-display mt-3 text-3xl font-semibold sm:text-4xl">
                Pilih resep favoritmu.
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">

              {ebooks.map((ebook) => (
                <article
                  key={ebook.id}
                  className="group overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-[#EBE5DA] transition duration-200 hover:-translate-y-1 hover:shadow-md"
                >

                  {/* COVER */}
                  <div className="relative flex h-60 items-center justify-center bg-[#F4E5D1]">

                    <span className="absolute left-5 top-5 rounded-full bg-white px-3 py-1.5 text-xs font-bold shadow-sm">
                      {ebook.badge}
                    </span>

                    <span className="text-8xl transition duration-200 group-hover:scale-110">
                      {ebook.emoji}
                    </span>

                  </div>

                  {/* CONTENT */}
                  <div className="p-6">

                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#A95D6C]">
                      {ebook.category}
                    </p>

                    <h3 className="font-display mt-2 text-2xl font-semibold leading-tight">
                      {ebook.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[#756F66]">
                      {ebook.description}
                    </p>

                    <div className="mt-6 flex items-end justify-between gap-4">

                      <div>
                        <p className="text-xs text-[#A29B91]">
                          Harga
                        </p>

                        <p className="mt-1 text-lg font-bold">
                          {formatPrice(ebook.price)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedEbook(ebook)}
                        className="rounded-full bg-[#E8B84A] px-4 py-2.5 text-sm font-bold transition hover:bg-[#C99624]"
                      >
                        Lihat Detail
                      </button>

                    </div>

                  </div>

                </article>
              ))}

            </div>

          </div>
        </section>

      </main>

      {/* DETAIL MODAL */}
      {selectedEbook && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#29251F]/50 p-0 sm:items-center sm:p-5">

          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-t-[2rem] bg-[#FFFDF7] p-6 sm:rounded-[2rem] sm:p-8">

            {/* MODAL HEADER */}
            <div className="flex items-start justify-between gap-5">

              <div>
                <span className="rounded-full bg-[#F3D7DC] px-3 py-1.5 text-xs font-bold text-[#A95D6C]">
                  {selectedEbook.badge}
                </span>

                <h2 className="font-display mt-4 text-3xl font-semibold leading-tight">
                  {selectedEbook.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEbook(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4EFE5] text-lg transition hover:bg-[#EBE5DA]"
                aria-label="Tutup detail ebook"
              >
                ×
              </button>

            </div>

            {/* VISUAL */}
            <div className="mt-6 flex h-44 items-center justify-center rounded-[1.5rem] bg-[#F4E5D1]">
              <span className="text-7xl">
                {selectedEbook.emoji}
              </span>
            </div>

            {/* DESCRIPTION */}
            <p className="mt-6 text-sm leading-7 text-[#756F66]">
              {selectedEbook.description}
            </p>

            {/* CONTENT */}
            <div className="mt-7">

              <h3 className="font-display text-xl font-semibold">
                Isi Ebook
              </h3>

              <ul className="mt-4 space-y-3">
                {selectedEbook.contents.map((content) => (
                  <li
                    key={content}
                    className="flex items-center gap-3 text-sm text-[#514B43]"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#BFE5D0] text-xs">
                      ✓
                    </span>

                    {content}
                  </li>
                ))}
              </ul>

            </div>

            {/* PRICE + CTA */}
            <div className="mt-8 rounded-2xl bg-white p-5 ring-1 ring-[#EBE5DA]">

              <p className="text-xs text-[#A29B91]">
                Harga Ebook
              </p>

              <div className="mt-1 flex items-center justify-between gap-4">

                <p className="text-2xl font-bold">
                  {formatPrice(selectedEbook.price)}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setCheckoutEbook(selectedEbook)
                    setSelectedEbook(null)
                  }}
                  className="rounded-full bg-[#D98C9B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#A95D6C]"
                >
                  Beli & Download
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

      {checkoutEbook && (
        <EbookCheckout
          selectedEbook={checkoutEbook}
          onClose={() => setCheckoutEbook(null)}
        />
      )}

      {/* FOOTER */}
      <footer className="border-t border-[#EBE5DA] px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-center text-xs text-[#A29B91] sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>© 2026 LaperCakes</p>
          <p>Resep simpel untuk little bakers.</p>
        </div>
      </footer>

    </div>
  )
}

export default RecipeStore