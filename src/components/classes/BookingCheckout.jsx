import { useState } from 'react'
import { CheckCircle2, Copy, CreditCard, X } from 'lucide-react'
import { addBooking } from '../../data/dashboardStorage'
import { updateClass } from '../../data/classStorage'

function BookingCheckout({
  selectedClass,
  onClose,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  })

  const [paymentMethod, setPaymentMethod] =
    useState('bank_transfer')

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [bookingNumber, setBookingNumber] =
    useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (loading) return

    const currentRemaining = Number(
      selectedClass.remaining || 0,
    )

    // Cegah booking kalau slot sudah habis
    if (currentRemaining <= 0) {
      alert('Maaf, slot kelas ini sudah penuh.')
      return
    }

    setLoading(true)

    setTimeout(() => {
      const generatedBookingNumber = `LC-${selectedClass.date.replaceAll(
        '-',
        '',
      )}-${Math.floor(1000 + Math.random() * 9000)}`

      const bookingData = {
        bookingNumber: generatedBookingNumber,
        classId: selectedClass.id,
        className: selectedClass.name,
        date: selectedClass.date,
        time: selectedClass.time,
        mode: selectedClass.mode,
        category: selectedClass.category,
        price: selectedClass.price,
        status: 'confirmed',
        createdAt: new Date().toISOString(),

        customerName: formData.name,
        customerPhone: formData.phone,
        customerEmail: formData.email,

        paymentMethod,
      }

      // 1. Simpan booking
      addBooking(bookingData)

      // 2. Kurangi slot kelas sebanyak 1
      updateClass(selectedClass.id, {
        remaining: Math.max(
          0,
          currentRemaining - 1,
        ),
      })

      setBookingNumber(generatedBookingNumber)
      setSuccess(true)
      setLoading(false)
    }, 1000)
  }

  const handleClose = () => {
    if (loading) return

    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#29251F]/50 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* HEADER */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#EBE5DA] bg-white px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#A19A91]">
              Booking kelas
            </p>

            <h2 className="mt-1 font-display text-xl font-semibold text-[#29251F]">
              {success
                ? 'Booking berhasil'
                : 'Lengkapi booking'}
            </h2>
          </div>

          <button
            onClick={handleClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFFDF7] text-[#756F66] transition hover:bg-[#F1ECE4]"
          >
            <X size={18} />
          </button>
        </div>

        {success ? (
          <SuccessContent
            bookingNumber={bookingNumber}
            selectedClass={selectedClass}
            onClose={onSuccess}
          />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-5 sm:p-6"
          >
            {/* CLASS SUMMARY */}
            <div className="rounded-2xl bg-[#FFFDF7] p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-[#A19A91]">
                    Kelas
                  </p>

                  <h3 className="mt-1 font-display text-lg font-semibold text-[#29251F]">
                    {selectedClass.name}
                  </h3>

                  <p className="mt-2 text-xs text-[#756F66]">
                    {selectedClass.date} •{' '}
                    {selectedClass.time}
                  </p>
                </div>

                <p className="shrink-0 font-bold text-[#29251F]">
                  {formatCurrency(
                    selectedClass.price,
                  )}
                </p>
              </div>
            </div>

            {/* DATA PESERTA */}
            <div className="mt-6">
              <h3 className="text-sm font-bold text-[#29251F]">
                Data peserta
              </h3>

              <div className="mt-4 space-y-4">
                <FormField
                  label="Nama lengkap"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  required
                />

                <FormField
                  label="Nomor WhatsApp"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="08xxxxxxxxxx"
                  required
                />

                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nama@email.com"
                  required
                />
              </div>
            </div>

            {/* PAYMENT */}
            <div className="mt-7">
              <h3 className="text-sm font-bold text-[#29251F]">
                Metode pembayaran
              </h3>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">

                <PaymentOption
                  value="bank_transfer"
                  active={
                    paymentMethod ===
                    'bank_transfer'
                  }
                  onClick={() =>
                    setPaymentMethod(
                      'bank_transfer',
                    )
                  }
                  icon={<CreditCard size={18} />}
                  title="Transfer Bank"
                  description="BCA"
                />

                <PaymentOption
                  value="qris"
                  active={
                    paymentMethod === 'qris'
                  }
                  onClick={() =>
                    setPaymentMethod('qris')
                  }
                  icon={<span className="text-lg">▦</span>}
                  title="QRIS"
                  description="Scan QR untuk bayar"
                />
              </div>
            </div>

            {/* PAYMENT DETAIL */}
            <div className="mt-5 rounded-2xl border border-[#EBE5DA] p-4">
              {paymentMethod ===
              'bank_transfer' ? (
                <div>
                  <p className="text-xs font-semibold text-[#A19A91]">
                    Transfer ke rekening
                  </p>

                  <div className="mt-2 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-[#29251F]">
                        BCA
                      </p>

                      <p className="text-sm text-[#756F66]">
                        1234567890
                      </p>

                      <p className="text-xs text-[#756F66]">
                        a.n. LaperCakes
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        navigator.clipboard?.writeText(
                          '1234567890',
                        )
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFFDF7] text-[#756F66]"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-xs font-semibold text-[#A19A91]">
                    QRIS
                  </p>

                  <div className="mx-auto mt-3 flex h-32 w-32 items-center justify-center rounded-2xl bg-[#29251F] text-6xl text-white">
                    ▦
                  </div>

                  <p className="mt-3 text-xs text-[#756F66]">
                    Scan QRIS untuk melakukan
                    pembayaran
                  </p>
                </div>
              )}
            </div>

            {/* TOTAL */}
            <div className="mt-6 flex items-center justify-between border-t border-[#EBE5DA] pt-5">
              <div>
                <p className="text-xs text-[#A19A91]">
                  Total pembayaran
                </p>

                <p className="mt-1 font-display text-2xl font-semibold text-[#29251F]">
                  {formatCurrency(
                    selectedClass.price,
                  )}
                </p>
              </div>

              <span className="rounded-full bg-[#BFE5D0]/50 px-3 py-1.5 text-xs font-bold text-[#4F8065]">
                {selectedClass.remaining || 0}{' '}
                slot tersisa
              </span>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className={`mt-6 flex w-full items-center justify-center rounded-2xl px-5 py-3.5 text-sm font-bold transition ${
                loading
                  ? 'cursor-not-allowed bg-[#E7E1D8] text-[#9B948A]'
                  : 'bg-[#29251F] text-white hover:bg-[#4F8065]'
              }`}
            >
              {loading
                ? 'Memproses booking...'
                : 'Konfirmasi Booking'}
            </button>

            <p className="mt-3 text-center text-[11px] leading-5 text-[#A19A91]">
              Dengan melanjutkan, kamu menyetujui
              proses booking dan pembayaran LaperCakes.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

function SuccessContent({
  bookingNumber,
  selectedClass,
  onClose,
}) {
  return (
    <div className="p-6 text-center sm:p-10">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#BFE5D0]/60">
        <CheckCircle2
          size={42}
          className="text-[#4F8065]"
        />
      </div>

      <h3 className="mt-6 font-display text-3xl font-semibold text-[#29251F]">
        Booking berhasil! 🎉
      </h3>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#756F66]">
        Booking kamu sudah tercatat. Simpan nomor
        booking berikut untuk melihat detailnya.
      </p>

      <div className="mx-auto mt-6 max-w-sm rounded-2xl bg-[#FFFDF7] p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#A19A91]">
          Booking number
        </p>

        <p className="mt-2 font-mono text-xl font-bold text-[#29251F]">
          {bookingNumber}
        </p>
      </div>

      <div className="mx-auto mt-5 max-w-sm rounded-2xl border border-[#EBE5DA] p-4 text-left">
        <p className="text-xs text-[#A19A91]">
          Kelas
        </p>

        <p className="mt-1 text-sm font-bold text-[#29251F]">
          {selectedClass.name}
        </p>

        <p className="mt-2 text-xs text-[#756F66]">
          {selectedClass.date} •{' '}
          {selectedClass.time}
        </p>
      </div>

      <button
        onClick={onClose}
        className="mt-7 w-full rounded-2xl bg-[#29251F] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#4F8065] sm:max-w-sm"
      >
        Selesai
      </button>
    </div>
  )
}

function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold text-[#29251F]">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="form-input"
      />
    </div>
  )
}

function PaymentOption({
  active,
  onClick,
  icon,
  title,
  description,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
        active
          ? 'border-[#C99624] bg-[#FFF3D4]'
          : 'border-[#EBE5DA] bg-white hover:border-[#DCD4C7]'
      }`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#4F8065]">
        {icon}
      </div>

      <div>
        <p className="text-sm font-bold text-[#29251F]">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-[#756F66]">
          {description}
        </p>
      </div>
    </button>
  )
}

function formatCurrency(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0))
}

export default BookingCheckout