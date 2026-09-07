import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

function FAQ() {
  const faqs = [
    {
      question: 'Siapa saja yang bisa ikut kelas LaperCakes?',
      answer:
        'LaperCakes menyediakan kelas untuk berbagai usia dan tingkat pengalaman. Beberapa kelas terbuka untuk semua usia, sementara kelas tertentu memiliki target peserta dan level yang lebih spesifik.',
    },
    {
      question: 'Apa perbedaan kelas online dan offline?',
      answer:
        'Kelas online dilakukan dari rumah melalui platform yang ditentukan oleh instructor. Kelas offline dilakukan secara langsung di studio atau lokasi workshop. Detail lokasi dan platform akan tercantum pada halaman masing-masing kelas.',
    },
    {
      question: 'Apakah bahan dan peralatan sudah disediakan?',
      answer:
        'Kebutuhan bahan dan peralatan berbeda untuk setiap kelas. Informasi mengenai ingredients dan equipment akan dicantumkan pada detail kelas sehingga kamu bisa mempersiapkannya sebelum kelas dimulai.',
    },
    {
      question: 'Apakah saya harus sudah bisa baking?',
      answer:
        'Tidak perlu. Tersedia kelas Beginner untuk kamu yang baru mulai belajar baking. Kalau sudah punya pengalaman, kamu juga bisa memilih kelas Intermediate atau Advanced sesuai kemampuan.',
    },
    {
      question: 'Bagaimana cara melakukan booking kelas?',
      answer:
        'Pilih kelas yang kamu inginkan, lihat detail dan jadwal yang tersedia, kemudian klik Book Now. Isi data peserta, pilih metode pembayaran, lalu selesaikan pembayaran untuk mendapatkan konfirmasi booking.',
    },
    {
      question: 'Metode pembayaran apa saja yang tersedia?',
      answer:
        'LaperCakes menyediakan beberapa metode pembayaran seperti QRIS, transfer bank, dan metode pembayaran lain yang tersedia pada halaman checkout.',
    },
    {
      question: 'Apakah kelas yang sudah dibooking bisa dibatalkan?',
      answer:
        'Kebijakan pembatalan dan perubahan jadwal dapat berbeda untuk setiap kelas. Pastikan membaca informasi booking dan ketentuan yang tercantum sebelum melakukan pembayaran.',
    },
    {
      question: 'Apa itu membership LaperCakes?',
      answer:
        'Membership memberikan benefit tambahan bagi pengguna yang ingin mendapatkan pengalaman lebih dari LaperCakes. Tersedia beberapa pilihan membership dengan benefit dan periode berlangganan yang berbeda.',
    },
  ]

  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      id="faq"
      className="bg-[#FFFDF7] px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-4xl">

        {/* HEADER */}
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#A95D6C]">
            FAQ
          </p>

          <h2 className="font-display mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
            Sebelum mulai baking,
            <br />
            mungkin kamu penasaran.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#756F66]">
            Jawaban singkat untuk beberapa hal yang mungkin ingin kamu tahu
            sebelum memilih kelas dan mulai belajar bersama LaperCakes.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl bg-white ring-1 ring-[#EBE5DA] transition ${
                  isOpen ? 'shadow-sm' : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left transition hover:bg-[#FCFAF5] sm:px-6"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-bold leading-6 sm:text-base">
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F4EFE5] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#F1E1B8]' : ''
                    }`}
                  >
                    <ChevronDown size={18} />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6">
                    <div className="border-t border-[#EBE5DA] pt-4">
                      <p className="text-sm leading-7 text-[#756F66]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* BOTTOM NOTE */}
        <div className="mt-10 rounded-2xl bg-[#F7F2E9] px-6 py-5 text-center">
          <p className="text-sm text-[#756F66]">
            Masih punya pertanyaan?
          </p>

          <p className="mt-1 text-sm font-bold text-[#29251F]">
            Cek detail pada halaman kelas sebelum melakukan booking.
          </p>
        </div>

      </div>
    </section>
  )
}

export default FAQ