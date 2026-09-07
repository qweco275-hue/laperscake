import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Check,
  Crown,
  Sparkles,
  Star,
  ArrowRight,
  ShieldCheck,
  Gift,
  CircleCheck,
  RotateCcw,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import {
  getMembership,
  cancelMembership,
} from '../utils/membershipStorage'

const plans = [
  {
    id: 'free',
    name: 'Free',
    label: 'Mulai gratis',
    price: 0,
    description:
      'Untuk kamu yang ingin mulai mengenal dunia baking.',
    icon: Sparkles,
    features: [
      'Akses resep gratis',
      'Wishlist kelas & resep',
      'Booking kelas reguler',
      'Simpan progress belajar',
    ],
    button: 'Paket Saat Ini',
    muted: true,
  },

  {
    id: 'member',
    name: 'Baker Member',
    label: 'Paling populer',
    price: 79000,
    period: '/bulan',
    description:
      'Untuk baker yang ingin belajar lebih banyak dan lebih hemat.',
    icon: Star,
    popular: true,
    features: [
      'Semua benefit Free',
      'Akses resep premium pilihan',
      'Diskon 10% semua kelas',
      'Bonus 300 points setiap bulan',
      'Early access kelas baru',
      'Certificate untuk kelas tertentu',
    ],
    button: 'Pilih Baker Member',
  },

  {
    id: 'pro',
    name: 'Baker Pro',
    label: 'Untuk yang serius',
    price: 149000,
    period: '/bulan',
    description:
      'Pengalaman lengkap untuk kamu yang ingin berkembang lebih jauh.',
    icon: Crown,
    features: [
      'Semua benefit Baker Member',
      'Akses seluruh resep premium',
      'Diskon 20% semua kelas',
      'Bonus 750 points setiap bulan',
      'Priority booking',
      'Exclusive masterclass',
      'Bonus e-book setiap bulan',
    ],
    button: 'Pilih Baker Pro',
  },
]

const formatPrice = (price) =>
  new Intl.NumberFormat('id-ID').format(price)

function MembershipPage() {
  const [billing, setBilling] = useState('monthly')
  const [membership, setMembership] = useState(getMembership())
  const [isProcessing, setIsProcessing] = useState(false)

  const handleActivate = (plan) => {
    // =========================================
    // KEMBALI KE FREE
    // =========================================
    if (
      plan.id === 'free' &&
      membership.plan !== 'free'
    ) {
      const currentPlanName =
        membership.plan === 'pro'
          ? 'Baker Pro'
          : 'Baker Member'

      const confirmed = window.confirm(
        `Yakin ingin kembali ke paket Free?\n\nMembership ${currentPlanName} akan dihentikan dan benefit premium tidak lagi tersedia.`
      )

      if (!confirmed) return

      setIsProcessing(true)

      setTimeout(() => {
        const updated = cancelMembership()

        setMembership(updated)
        setIsProcessing(false)

        window.alert(
          'Membership berhasil dikembalikan ke paket Free.'
        )
      }, 500)

      return
    }

    // =========================================
    // PAKET FREE SUDAH AKTIF
    // =========================================
    if (
      plan.id === 'free' &&
      membership.plan === 'free'
    ) {
      return
    }

    // =========================================
    // PAKET YANG SAMA
    // =========================================
    if (plan.id === membership.plan) {
      return
    }

    // =========================================
    // PAKET BERBAYAR → CHECKOUT
    // =========================================
    window.location.href =
      `/checkout?type=membership&plan=${plan.id}&billing=${billing}`
  }

  return (
    <div className="min-h-screen bg-[#fffdf7] text-[#29251f]">
      <Navbar />

      {/* =========================================
          HERO
      ========================================= */}
      <section className="px-6 pb-16 pt-16 lg:px-10 lg:pt-24">
        <div className="mx-auto max-w-6xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ebe5da] bg-white px-4 py-2 text-sm font-semibold">
            <Crown
              size={16}
              className="text-[#c99624]"
            />

            LaperCakes Membership
          </div>

          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Pilih cara belajar baking
            <br />

            <span className="text-[#a95d6c]">
              yang paling cocok buat kamu.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#756f66] sm:text-lg">
            Dapatkan lebih banyak resep, kelas, diskon,
            dan pengalaman belajar baking dalam satu
            membership.
          </p>

          {/* =========================================
              CURRENT MEMBERSHIP STATUS
          ========================================= */}
          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-[#ebe5da] bg-white p-4 shadow-sm">

            <div className="flex items-center justify-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f5ed]">
                <CircleCheck
                  size={20}
                  className="text-[#4f8065]"
                />
              </div>

              <div className="text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8b847a]">
                  Membership kamu
                </p>

                <p className="font-display text-lg font-semibold">
                  {membership.plan === 'free'
                    ? 'Free'
                    : membership.plan === 'member'
                      ? 'Baker Member'
                      : 'Baker Pro'}
                </p>
              </div>

            </div>

          </div>

          {/* =========================================
              BILLING
          ========================================= */}
          <div className="mt-8 inline-flex rounded-full border border-[#ebe5da] bg-white p-1">

            <button
              onClick={() => setBilling('monthly')}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                billing === 'monthly'
                  ? 'bg-[#29251f] text-white'
                  : 'text-[#756f66]'
              }`}
            >
              Bulanan
            </button>

            <button
              onClick={() => setBilling('yearly')}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                billing === 'yearly'
                  ? 'bg-[#29251f] text-white'
                  : 'text-[#756f66]'
              }`}
            >
              Tahunan

              <span className="ml-2 text-xs text-[#4f8065]">
                Hemat
              </span>
            </button>

          </div>
        </div>
      </section>

      {/* =========================================
          PLANS
      ========================================= */}
      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">

          {plans.map((plan) => {
            const Icon = plan.icon

            const displayPrice =
              billing === 'yearly' &&
              plan.price > 0
                ? Math.round(
                    (plan.price * 10) / 12
                  )
                : plan.price

            const isActive =
              membership.plan === plan.id

            const isDowngrade =
              plan.id === 'free' &&
              membership.plan !== 'free'

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-3xl border bg-white p-7 shadow-sm ${
                  plan.popular
                    ? 'border-[#e8b84a] shadow-lg'
                    : 'border-[#ebe5da]'
                } ${
                  isActive
                    ? 'ring-2 ring-[#4f8065]/20'
                    : ''
                }`}
              >

                {/* =================================
                    POPULAR BADGE
                ================================= */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#e8b84a] px-4 py-1.5 text-xs font-bold">
                    PALING POPULER
                  </div>
                )}

                {/* =================================
                    ACTIVE BADGE
                ================================= */}
                {isActive && (
                  <div className="absolute right-5 top-5 flex items-center gap-1 rounded-full bg-[#e8f5ed] px-3 py-1.5 text-xs font-bold text-[#4f8065]">
                    <CircleCheck size={13} />
                    Aktif
                  </div>
                )}

                {/* =================================
                    PLAN HEADER
                ================================= */}
                <div className="mb-6 flex items-start justify-between">

                  <div>

                    <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff5d8]">
                      <Icon
                        size={21}
                        className="text-[#c99624]"
                      />
                    </div>

                    <h2 className="font-display text-2xl font-semibold">
                      {plan.name}
                    </h2>

                    <p className="mt-2 text-sm text-[#756f66]">
                      {plan.description}
                    </p>

                  </div>

                </div>

                {/* =================================
                    PRICE
                ================================= */}
                <div className="mb-7">

                  <span className="text-4xl font-bold">
                    Rp{formatPrice(displayPrice)}
                  </span>

                  {plan.price > 0 && (
                    <span className="ml-1 text-sm text-[#756f66]">
                      {billing === 'yearly'
                        ? '/bulan*'
                        : plan.period}
                    </span>
                  )}

                  {billing === 'yearly' &&
                    plan.price > 0 && (
                      <p className="mt-2 text-xs text-[#4f8065]">
                        Dibayar Rp
                        {formatPrice(
                          plan.price * 10
                        )}
                        /tahun
                      </p>
                    )}

                </div>

                <div className="mb-7 h-px bg-[#ebe5da]" />

                {/* =================================
                    FEATURES
                ================================= */}
                <div className="flex-1 space-y-4">

                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3"
                    >

                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e8f5ed]">
                        <Check
                          size={13}
                          className="text-[#4f8065]"
                        />
                      </div>

                      <span className="text-sm leading-6">
                        {feature}
                      </span>

                    </div>
                  ))}

                </div>

                {/* =================================
                    BUTTON
                ================================= */}
                <button
                  disabled={
                    isProcessing ||
                    (plan.id === 'free' &&
                      membership.plan === 'free')
                  }
                  onClick={() =>
                    handleActivate(plan)
                  }
                  className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold transition ${
                    isActive
                      ? 'bg-[#4f8065] text-white'
                      : isDowngrade
                        ? 'border border-[#d98c9b] bg-white text-[#a95d6c] hover:bg-[#fdf1f3]'
                        : plan.popular
                          ? 'bg-[#29251f] text-white hover:opacity-90'
                          : 'border border-[#29251f] bg-white hover:bg-[#29251f] hover:text-white'
                  } ${
                    isProcessing
                      ? 'cursor-wait opacity-60'
                      : ''
                  }`}
                >

                  {isProcessing &&
                  isDowngrade ? (
                    <>
                      <RotateCcw
                        size={16}
                        className="animate-spin"
                      />
                      Memproses...
                    </>
                  ) : isActive ? (
                    <>
                      <CircleCheck size={17} />
                      Membership Aktif
                    </>
                  ) : isDowngrade ? (
                    <>
                      Kembali ke Free
                    </>
                  ) : (
                    <>
                      {plan.button}
                      <ArrowRight size={17} />
                    </>
                  )}

                </button>

                {/* =================================
                    DOWNGRADE INFO
                ================================= */}
                {isDowngrade && (
                  <p className="mt-3 text-center text-xs leading-5 text-[#8b847a]">
                    Kamu akan kehilangan benefit
                    membership premium setelah kembali
                    ke Free.
                  </p>
                )}

              </div>
            )
          })}

        </div>

        <p className="mx-auto mt-6 max-w-6xl text-center text-xs text-[#8b847a]">
          *Harga tahunan ditampilkan sebagai rata-rata
          biaya per bulan. Pembayaran tahunan akan
          dihitung sekaligus.
        </p>
      </section>

      {/* =========================================
          BENEFITS
      ========================================= */}
      <section className="border-y border-[#ebe5da] bg-white px-6 py-20 lg:px-10">

        <div className="mx-auto max-w-6xl">

          <div className="max-w-2xl">

            <span className="text-sm font-bold uppercase tracking-wider text-[#a95d6c]">
              Kenapa Membership?
            </span>

            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Lebih banyak belajar,
              <br />
              lebih banyak baking.
            </h2>

          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {[
              {
                icon: Gift,
                title: 'Lebih hemat',
                text: 'Dapatkan diskon khusus membership untuk berbagai kelas baking.',
              },
              {
                icon: Sparkles,
                title: 'Konten eksklusif',
                text: 'Nikmati resep, e-book, dan masterclass yang tidak tersedia untuk pengguna biasa.',
              },
              {
                icon: ShieldCheck,
                title: 'Pengalaman lebih lengkap',
                text: 'Kelola kelas, resep, points, certificate, dan rewards dari satu akun.',
              },
            ].map((item) => {

              const Icon = item.icon

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-[#ebe5da] p-6"
                >

                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f7efe9]">
                    <Icon
                      size={21}
                      className="text-[#a95d6c]"
                    />
                  </div>

                  <h3 className="font-display text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#756f66]">
                    {item.text}
                  </p>

                </div>
              )
            })}

          </div>

        </div>

      </section>

      {/* =========================================
          CTA
      ========================================= */}
      <section className="px-6 py-20 lg:px-10">

        <div className="mx-auto max-w-4xl rounded-[2rem] bg-[#29251f] px-7 py-12 text-center text-white sm:px-12">

          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#e8b84a] text-[#29251f]">
            <Crown size={25} />
          </div>

          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Siap naik level?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/65">
            Pilih membership yang sesuai dan mulai
            pengalaman baking yang lebih lengkap
            bersama LaperCakes.
          </p>

          <Link
            to="/explore"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#e8b84a] px-6 py-3.5 text-sm font-bold text-[#29251f] transition hover:opacity-90"
          >
            Mulai Eksplorasi
            <ArrowRight size={17} />
          </Link>

        </div>

      </section>

      <Footer />
    </div>
  )
}

export default MembershipPage