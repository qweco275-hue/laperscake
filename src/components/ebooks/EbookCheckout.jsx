import { useState } from 'react'

function EbookCheckout({ selectedEbook, onClose }) {
  const [paymentMethod, setPaymentMethod] = useState('Transfer Bank')
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const randomNumber = Math.floor(1000 + Math.random() * 9000)

    setOrderNumber(`LC-EB-${randomNumber}`)
    setIsConfirmed(true)
  }

  if (isConfirmed) {
    return (
      <div className="fixed inset-0 z-[110] flex items-end justify-center bg-[#29251F]/50 p-0 sm:items-center sm:p-5">
        <div className="w-full max-w-xl rounded-t-[2rem] bg-[#FFFDF7] p-7 sm:rounded-[2rem] sm:p-9">

          <div className="text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#BFE5D0] text-2xl">
              ✓
            </div>

            <p className="mt-5 text-sm font-bold uppercase tracking-[0.12em] text-[#4F8065]">
              Pembayaran Dikonfirmasi
            </p>

            <h2 className="font-display mt-3 text-3xl font-semibold">
              Pesanan berhasil!
            </h2>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#756F66]">
              Terima kasih, {formData.name}. Link download ebook akan
              dikirim ke email yang kamu masukkan.
            </p>

          </div>

          <div className="mt-7 rounded-2xl bg-white p-5 ring-1 ring-[#EBE5DA]">

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-[#A29B91]">
                  Nomor Pesanan
                </p>

                <p className="mt-1 font-bold">
                  {orderNumber}
                </p>
              </div>

              <span className="rounded-full bg-[#BFE5D0] px-3 py-1.5 text-xs font-bold text-[#4F8065]">
                Berhasil
              </span>
            </div>

            <div className="mt-5 border-t border-[#EBE5DA] pt-5">

              <p className="text-xs text-[#A29B91]">
                Ebook
              </p>

              <p className="mt-1 font-semibold">
                {selectedEbook.title}
              </p>

              <p className="mt-2 text-lg font-bold">
                {formatPrice(selectedEbook.price)}
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full rounded-full bg-[#29251F] px-5 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
          >
            Selesai
          </button>

        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-center bg-[#29251F]/50 p-0 sm:items-center sm:p-5">

      <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-[2rem] bg-[#FFFDF7] p-6 sm:rounded-[2rem] sm:p-8">

        {/* HEADER */}
        <div className="flex items-start justify-between gap-5">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#A95D6C]">
              Checkout Ebook
            </p>

            <h2 className="font-display mt-2 text-3xl font-semibold">
              Satu langkah lagi.
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4EFE5] text-lg"
            aria-label="Tutup checkout"
          >
            ×
          </button>

        </div>

        {/* PRODUCT */}
        <div className="mt-7 flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-[#EBE5DA]">

          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#F4E5D1] text-3xl">
            {selectedEbook.emoji}
          </div>

          <div className="min-w-0">
            <p className="text-xs text-[#A29B91]">
              Ebook
            </p>

            <h3 className="mt-1 font-display text-lg font-semibold leading-tight">
              {selectedEbook.title}
            </h3>

            <p className="mt-1 font-bold">
              {formatPrice(selectedEbook.price)}
            </p>
          </div>

        </div>

        <form onSubmit={handleSubmit}>

          {/* DATA PEMBELI */}
          <div className="mt-7">

            <h3 className="font-display text-xl font-semibold">
              Data Pembeli
            </h3>

            <div className="mt-4 space-y-4">

              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-semibold"
                >
                  Nama Lengkap
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Contoh: Bunda Aira"
                  required
                  className="mt-2 w-full rounded-xl border border-[#EBE5DA] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E8B84A] focus:ring-2 focus:ring-[#E8B84A]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nama@email.com"
                  required
                  className="mt-2 w-full rounded-xl border border-[#EBE5DA] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E8B84A] focus:ring-2 focus:ring-[#E8B84A]/20"
                />
              </div>

            </div>

          </div>

          {/* PAYMENT */}
          <div className="mt-7">

            <h3 className="font-display text-xl font-semibold">
              Metode Pembayaran
            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">

              <button
                type="button"
                onClick={() => setPaymentMethod('Transfer Bank')}
                className={`rounded-2xl border p-4 text-left transition ${
                  paymentMethod === 'Transfer Bank'
                    ? 'border-[#E8B84A] bg-[#F4E5D1]'
                    : 'border-[#EBE5DA] bg-white'
                }`}
              >
                <p className="font-bold">
                  🏦 Transfer Bank
                </p>

                <p className="mt-1 text-xs text-[#756F66]">
                  BCA • LaperCakes
                </p>

              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('QRIS')}
                className={`rounded-2xl border p-4 text-left transition ${
                  paymentMethod === 'QRIS'
                    ? 'border-[#E8B84A] bg-[#F4E5D1]'
                    : 'border-[#EBE5DA] bg-white'
                }`}
              >
                <p className="font-bold">
                  ▦ QRIS
                </p>

                <p className="mt-1 text-xs text-[#756F66]">
                  Scan untuk membayar
                </p>

              </button>

            </div>

            {/* PAYMENT INFO */}
            <div className="mt-4 rounded-2xl bg-[#F4EFE5] p-5">

              {paymentMethod === 'Transfer Bank' ? (
                <>
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#756F66]">
                    Rekening Pembayaran
                  </p>

                  <p className="mt-2 text-xl font-bold">
                    1234567890
                  </p>

                  <p className="mt-1 text-sm text-[#756F66]">
                    BCA • a.n. LaperCakes
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#756F66]">
                    QRIS
                  </p>

                  <div className="mt-3 flex h-32 items-center justify-center rounded-xl bg-white">
                    <div className="text-center">
                      <p className="text-4xl">▦</p>
                      <p className="mt-1 text-xs text-[#A29B91]">
                        Dummy QRIS
                      </p>
                    </div>
                  </div>
                </>
              )}

            </div>

          </div>

          {/* TOTAL */}
          <div className="mt-7 flex items-center justify-between border-t border-[#EBE5DA] pt-5">

            <span className="text-sm font-semibold text-[#756F66]">
              Total Pembayaran
            </span>

            <span className="text-xl font-bold">
              {formatPrice(selectedEbook.price)}
            </span>

          </div>

          <button
            type="submit"
            className="mt-5 w-full rounded-full bg-[#D98C9B] px-5 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#A95D6C]"
          >
            Konfirmasi Pembayaran →
          </button>

          <p className="mt-3 text-center text-xs leading-5 text-[#A29B91]">
            Ini adalah simulasi pembayaran untuk MVP.
          </p>

        </form>

      </div>

    </div>
  )
}

export default EbookCheckout