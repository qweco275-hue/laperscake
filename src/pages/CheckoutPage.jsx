import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Check,
  CreditCard,
  Lock,
  ShieldCheck,
  Smartphone,
  WalletCards,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import { purchaseRecipe } from '../utils/recipeStorage'
import { activateMembership } from '../utils/membershipStorage'

const membershipPlans = {
  member: {
    id: 'member',
    name: 'Baker Member',
    monthly: 79000,
    yearly: 790000,
    description:
      'Untuk baker yang ingin belajar lebih banyak dan lebih hemat.',
  },

  pro: {
    id: 'pro',
    name: 'Baker Pro',
    monthly: 149000,
    yearly: 1490000,
    description:
      'Pengalaman lengkap untuk kamu yang ingin berkembang lebih jauh.',
  },
}

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID').format(price)
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#ebe5da] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#c99624] focus:ring-2 focus:ring-[#e8b84a]/20"
      />
    </div>
  )
}

function PaymentOption({
  value,
  selected,
  onChange,
  icon,
  title,
  description,
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
        selected
          ? 'border-[#c99624] bg-[#fffaf0]'
          : 'border-[#ebe5da] bg-white hover:border-[#cfc7ba]'
      }`}
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          selected
            ? 'bg-[#e8b84a] text-[#29251f]'
            : 'bg-[#f5f1e9] text-[#756f66]'
        }`}
      >
        {icon}
      </div>

      <div className="flex-1">
        <p className="text-sm font-bold">
          {title}
        </p>

        <p className="mt-1 text-xs text-[#756f66]">
          {description}
        </p>
      </div>

      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
          selected
            ? 'border-[#c99624] bg-[#c99624]'
            : 'border-[#d8d0c4]'
        }`}
      >
        {selected && (
          <Check
            size={12}
            className="text-white"
          />
        )}
      </div>
    </button>
  )
}

function CheckoutPage() {
  const location = useLocation()
  const navigate = useNavigate()

  const recipe = location.state?.recipe

  const params = new URLSearchParams(
    window.location.search
  )

  const checkoutType =
    params.get('type') || 'recipe'

  const planId = params.get('plan')
  const billing =
    params.get('billing') || 'monthly'

  const isMembership =
    checkoutType === 'membership'

  const membershipPlan =
    membershipPlans[planId]

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const [paymentMethod, setPaymentMethod] =
    useState('qris')

  const [processing, setProcessing] =
    useState(false)

  const [success, setSuccess] =
    useState(false)

  const [orderId, setOrderId] =
    useState('')

  // ===============================
  // VALIDATION
  // ===============================

  if (!isMembership && !recipe) {
    return (
      <div className="min-h-screen bg-[#fffdf7]">
        <Navbar />

        <div className="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center px-6 text-center">

          <div>
            <h1 className="font-display text-3xl font-semibold">
              Checkout tidak tersedia
            </h1>

            <p className="mt-3 text-sm text-[#756f66]">
              Pilih resep atau membership terlebih dahulu.
            </p>

            <button
              onClick={() => navigate('/membership')}
              className="mt-6 rounded-xl bg-[#29251f] px-6 py-3 text-sm font-bold text-white"
            >
              Kembali
            </button>
          </div>

        </div>

        <Footer />
      </div>
    )
  }

  if (isMembership && !membershipPlan) {
    return (
      <div className="min-h-screen bg-[#fffdf7]">
        <Navbar />

        <div className="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center px-6 text-center">

          <div>
            <h1 className="font-display text-3xl font-semibold">
              Paket tidak ditemukan
            </h1>

            <p className="mt-3 text-sm text-[#756f66]">
              Silakan pilih membership kembali.
            </p>

            <button
              onClick={() => navigate('/membership')}
              className="mt-6 rounded-xl bg-[#29251f] px-6 py-3 text-sm font-bold text-white"
            >
              Pilih Membership
            </button>
          </div>

        </div>

        <Footer />
      </div>
    )
  }

  // ===============================
  // PRICE
  // ===============================

  const total = isMembership
    ? billing === 'yearly'
      ? membershipPlan.yearly
      : membershipPlan.monthly
    : recipe.price

  // ===============================
  // PAYMENT
  // ===============================

  const handlePayment = () => {
    if (!name || !email || !phone) {
      alert('Lengkapi data terlebih dahulu.')
      return
    }

    setProcessing(true)

    setTimeout(() => {
      const generatedId = isMembership
        ? `LC-MEM-${Date.now()
            .toString()
            .slice(-8)}`
        : `LC-RCP-${Date.now()
            .toString()
            .slice(-8)}`

      if (isMembership) {
        activateMembership(
          membershipPlan.id,
          billing
        )
      } else {
        purchaseRecipe(recipe.id)
      }

      setOrderId(generatedId)
      setProcessing(false)
      setSuccess(true)
    }, 1500)
  }

  // ===============================
  // SUCCESS
  // ===============================

  if (success) {
    return (
      <div className="min-h-screen bg-[#fffdf7]">
        <Navbar />

        <main className="px-6 py-16 lg:px-10">

          <div className="mx-auto max-w-2xl">

            <div className="rounded-[2rem] border border-[#ebe5da] bg-white p-8 text-center shadow-sm sm:p-12">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e8f5ed]">
                <Check
                  size={38}
                  className="text-[#4f8065]"
                />
              </div>

              <p className="mt-6 text-sm font-bold uppercase tracking-wider text-[#4f8065]">
                Pembayaran Berhasil
              </p>

              <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                {isMembership
                  ? 'Membership kamu sudah aktif!'
                  : 'Resep berhasil dibeli!'}
              </h1>

              <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#756f66]">
                {isMembership
                  ? `Selamat! ${membershipPlan.name} sekarang aktif di akun kamu.`
                  : `Kamu sekarang sudah memiliki akses ke ${recipe.title}.`}
              </p>

              <div className="mt-8 rounded-2xl bg-[#faf7f0] p-5 text-left">

                <div className="flex items-center justify-between border-b border-[#ebe5da] pb-4">
                  <span className="text-sm text-[#756f66]">
                    Nomor transaksi
                  </span>

                  <span className="text-sm font-bold">
                    {orderId}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <span className="text-sm text-[#756f66]">
                    Total
                  </span>

                  <span className="text-lg font-bold">
                    Rp{formatPrice(total)}
                  </span>
                </div>

              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">

                <button
                  onClick={() =>
                    navigate(
                      isMembership
                        ? '/dashboard'
                        : `/recipes/${recipe.id}`
                    )
                  }
                  className="flex-1 rounded-xl bg-[#29251f] px-5 py-3.5 text-sm font-bold text-white transition hover:opacity-90"
                >
                  {isMembership
                    ? 'Buka Dashboard'
                    : 'Akses Resep'}
                </button>

                <button
                  onClick={() =>
                    navigate(
                      isMembership
                        ? '/membership'
                        : '/my-recipes'
                    )
                  }
                  className="flex-1 rounded-xl border border-[#29251f] bg-white px-5 py-3.5 text-sm font-bold transition hover:bg-[#29251f] hover:text-white"
                >
                  {isMembership
                    ? 'Lihat Membership'
                    : 'Resep Saya'}
                </button>

              </div>

            </div>

          </div>

        </main>

        <Footer />
      </div>
    )
  }

  // ===============================
  // CHECKOUT
  // ===============================

  return (
    <div className="min-h-screen bg-[#fffdf7] text-[#29251f]">

      <Navbar />

      <main className="px-6 py-10 lg:px-10 lg:py-16">

        <div className="mx-auto max-w-6xl">

          {/* BACK */}
          <button
            onClick={() =>
              navigate(
                isMembership
                  ? '/membership'
                  : `/recipes/${recipe.id}`
              )
            }
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#756f66] hover:text-[#29251f]"
          >
            <ArrowLeft size={17} />
            Kembali
          </button>

          {/* HEADER */}
          <div className="mb-10">

            <span className="text-sm font-bold uppercase tracking-wider text-[#a95d6c]">
              {isMembership
                ? 'Membership Checkout'
                : 'Recipe Checkout'}
            </span>

            <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              {isMembership
                ? 'Lengkapi pembayaran membership'
                : 'Selesaikan pembelian resep'}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#756f66]">
              {isMembership
                ? 'Isi data dan pilih metode pembayaran untuk mengaktifkan membership LaperCakes.'
                : 'Isi data pembeli dan pilih metode pembayaran untuk mendapatkan akses resep.'}
            </p>

          </div>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">

            {/* LEFT */}
            <div className="space-y-6">

              {/* DATA PEMBELI */}
              <section className="rounded-3xl border border-[#ebe5da] bg-white p-6 sm:p-8">

                <h2 className="font-display text-2xl font-semibold">
                  Data Pembeli
                </h2>

                <p className="mt-2 text-sm text-[#756f66]">
                  Data ini digunakan untuk konfirmasi transaksi.
                </p>

                <div className="mt-6 grid gap-5">

                  <Input
                    label="Nama lengkap"
                    value={name}
                    onChange={setName}
                    placeholder="Masukkan nama lengkap"
                  />

                  <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="nama@email.com"
                  />

                  <Input
                    label="Nomor WhatsApp"
                    type="tel"
                    value={phone}
                    onChange={setPhone}
                    placeholder="08xxxxxxxxxx"
                  />

                </div>

              </section>

              {/* PAYMENT */}
              <section className="rounded-3xl border border-[#ebe5da] bg-white p-6 sm:p-8">

                <h2 className="font-display text-2xl font-semibold">
                  Metode Pembayaran
                </h2>

                <div className="mt-6 space-y-3">

                  <PaymentOption
                    value="qris"
                    selected={
                      paymentMethod === 'qris'
                    }
                    onChange={setPaymentMethod}
                    icon={
                      <Smartphone size={20} />
                    }
                    title="QRIS"
                    description="Bayar menggunakan aplikasi bank atau e-wallet."
                  />

                  <PaymentOption
                    value="bank_transfer"
                    selected={
                      paymentMethod ===
                      'bank_transfer'
                    }
                    onChange={setPaymentMethod}
                    icon={
                      <WalletCards size={20} />
                    }
                    title="Transfer Bank"
                    description="Transfer melalui rekening bank."
                  />

                  <PaymentOption
                    value="card"
                    selected={
                      paymentMethod === 'card'
                    }
                    onChange={setPaymentMethod}
                    icon={
                      <CreditCard size={20} />
                    }
                    title="Kartu"
                    description="Visa atau Mastercard."
                  />

                </div>

                {/* PAYMENT INFO */}

                {paymentMethod === 'qris' && (
                  <div className="mt-5 rounded-2xl bg-[#faf7f0] p-5">

                    <p className="text-sm font-bold">
                      QRIS Demo
                    </p>

                    <div className="mt-4 flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-[#d8d0c4] bg-white">

                      <div className="text-center">

                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-xl bg-[#29251f] text-white">
                          QR
                        </div>

                        <p className="mt-3 text-xs text-[#756f66]">
                          Scan QRIS untuk simulasi pembayaran
                        </p>

                      </div>

                    </div>

                  </div>
                )}

                {paymentMethod ===
                  'bank_transfer' && (
                  <div className="mt-5 rounded-2xl bg-[#faf7f0] p-5">

                    <p className="text-sm font-bold">
                      Transfer ke rekening
                    </p>

                    <p className="mt-3 text-lg font-bold">
                      BCA
                    </p>

                    <p className="mt-1 text-xl font-bold tracking-wide">
                      1234567890
                    </p>

                    <p className="mt-1 text-sm text-[#756f66]">
                      a.n. LaperCakes
                    </p>

                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="mt-5 rounded-2xl bg-[#faf7f0] p-5">

                    <p className="text-sm font-bold">
                      Kartu Demo
                    </p>

                    <p className="mt-2 text-sm text-[#756f66]">
                      Pembayaran kartu hanya simulasi
                      untuk MVP.
                    </p>

                  </div>
                )}

              </section>

            </div>

            {/* RIGHT */}
            <aside className="h-fit lg:sticky lg:top-24">

              <div className="rounded-3xl border border-[#ebe5da] bg-white p-6 shadow-sm sm:p-7">

                <h2 className="font-display text-2xl font-semibold">
                  Ringkasan
                </h2>

                {/* PRODUCT */}
                <div className="mt-6 flex gap-4">

                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#fff5d8] text-3xl">
                    {isMembership
                      ? '👑'
                      : recipe.emoji}
                  </div>

                  <div>

                    <p className="font-bold">
                      {isMembership
                        ? membershipPlan.name
                        : recipe.title}
                    </p>

                    <p className="mt-1 text-sm text-[#756f66]">
                      {isMembership
                        ? billing === 'yearly'
                          ? 'Paket tahunan'
                          : 'Paket bulanan'
                        : recipe.type}
                    </p>

                  </div>

                </div>

                <div className="my-6 h-px bg-[#ebe5da]" />

                {/* PRICE */}
                <div className="space-y-4">

                  <div className="flex items-center justify-between text-sm">

                    <span className="text-[#756f66]">
                      Harga
                    </span>

                    <span>
                      Rp{formatPrice(total)}
                    </span>

                  </div>

                  {isMembership &&
                    billing === 'yearly' && (
                      <div className="flex items-center justify-between text-sm">

                        <span className="text-[#756f66]">
                          Periode
                        </span>

                        <span>
                          1 tahun
                        </span>

                      </div>
                    )}

                  <div className="h-px bg-[#ebe5da]" />

                  <div className="flex items-center justify-between">

                    <span className="font-bold">
                      Total
                    </span>

                    <span className="text-2xl font-bold">
                      Rp{formatPrice(total)}
                    </span>

                  </div>

                </div>

                {/* PAY BUTTON */}
                <button
                  onClick={handlePayment}
                  disabled={processing}
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#29251f] px-5 py-4 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {processing ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      Bayar Rp{formatPrice(total)}
                    </>
                  )}

                </button>

                {/* SECURITY */}
                <div className="mt-5 flex gap-3 rounded-2xl bg-[#f7f3ec] p-4">

                  <Lock
                    size={18}
                    className="mt-0.5 shrink-0 text-[#4f8065]"
                  />

                  <p className="text-xs leading-5 text-[#756f66]">
                    Pembayaran aman dan terenkripsi.
                    Transaksi ini merupakan simulasi
                    untuk MVP LaperCakes.
                  </p>

                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#756f66]">

                  <ShieldCheck size={14} />

                  Secure Checkout

                </div>

              </div>

            </aside>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  )
}

export default CheckoutPage