import { useEffect, useState } from 'react'
import {
  Award,
  Gift,
  Star,
  Trophy,
  Ticket,
  CheckCircle2,
  Lock,
} from 'lucide-react'

import DashboardSidebar from '../../components/dashboard/DashboardSidebar'
import DashboardMobileNav from '../../components/dashboard/DashboardMobileNav'
import { getDashboard } from '../../utils/dashboardStorage'

const rewards = [
  {
    id: 1,
    title: 'Voucher Diskon 25%',
    description: 'Potongan 25% untuk booking kelas baking pilihan.',
    points: 500,
    icon: Ticket,
  },
  {
    id: 2,
    title: 'Free Recipe E-book',
    description: 'Pilih satu e-book premium dari Recipe Library.',
    points: 750,
    icon: Gift,
  },
  {
    id: 3,
    title: 'Free Baking Class',
    description: 'Tukar poin dengan satu kelas baking pilihan.',
    points: 1500,
    icon: Award,
  },
  {
    id: 4,
    title: 'Exclusive Workshop',
    description: 'Akses workshop eksklusif bersama pastry chef.',
    points: 2500,
    icon: Trophy,
  },
]

export default function RewardsPage() {
  const [dashboard, setDashboard] = useState(null)
  const [claimed, setClaimed] = useState([])

  useEffect(() => {
    setDashboard(getDashboard())

    const saved = localStorage.getItem('lapercakes-claimed-rewards')

    if (saved) {
      setClaimed(JSON.parse(saved))
    }
  }, [])

  if (!dashboard) return null

  const points = dashboard.user?.points || 0

  const handleClaim = (reward) => {
    if (points < reward.points) {
      alert(
        `Poin kamu belum cukup. Kamu membutuhkan ${
          reward.points - points
        } poin lagi.`
      )
      return
    }

    if (claimed.includes(reward.id)) {
      alert('Reward ini sudah pernah kamu klaim.')
      return
    }

    const updated = [...claimed, reward.id]

    localStorage.setItem(
      'lapercakes-claimed-rewards',
      JSON.stringify(updated)
    )

    setClaimed(updated)

    alert(`🎉 ${reward.title} berhasil diklaim!`)
  }

  return (
    <div className="min-h-screen bg-[#fffdf7] text-[#29251f]">
      <div className="flex">
        <DashboardSidebar />

        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-7xl px-5 py-8 pb-28 sm:px-8 lg:px-10 lg:py-10 lg:pb-12">

            {/* HEADER */}
            <section className="mb-8">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#fff3cf] px-4 py-2 text-sm font-semibold text-[#9b741c]">
                <Gift size={16} />
                Baker Rewards
              </div>

              <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                Tukarkan poinmu.
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-7 text-[#756f66]">
                Kumpulkan poin dari aktivitasmu di LaperCakes dan tukarkan
                dengan berbagai reward menarik.
              </p>
            </section>

            {/* POINTS */}
            <section className="relative mb-10 overflow-hidden rounded-[28px] bg-[#29251f] p-7 text-white shadow-sm sm:p-9">
              <div className="relative z-10 max-w-2xl">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8b84a] text-[#29251f]">
                  <Star size={28} fill="currentColor" />
                </div>

                <p className="text-sm font-medium text-white/60">
                  Total Baker Points
                </p>

                <div className="mt-1 flex items-end gap-3">
                  <span className="font-display text-5xl font-semibold sm:text-6xl">
                    {points.toLocaleString('id-ID')}
                  </span>

                  <span className="mb-2 text-sm text-white/60">
                    points
                  </span>
                </div>

                <p className="mt-4 max-w-lg text-sm leading-6 text-white/65">
                  Terus ikuti kelas, selesaikan aktivitas, dan kumpulkan lebih
                  banyak poin untuk mendapatkan reward eksklusif.
                </p>
              </div>

              <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full border border-white/10" />
              <div className="absolute -bottom-24 right-20 h-64 w-64 rounded-full border border-white/5" />
            </section>

            {/* CARA MENDAPATKAN POIN */}
            <section className="mb-10">
              <div className="mb-5">
                <h2 className="font-display text-2xl font-semibold">
                  Cara mendapatkan poin
                </h2>

                <p className="mt-1 text-sm text-[#756f66]">
                  Semakin aktif kamu di LaperCakes, semakin banyak poin yang
                  bisa dikumpulkan.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: Award,
                    title: 'Ikuti kelas',
                    points: '+100 poin',
                    desc: 'Setiap booking kelas yang berhasil.',
                  },
                  {
                    icon: Star,
                    title: 'Selesaikan kelas',
                    points: '+150 poin',
                    desc: 'Dapatkan bonus setelah menyelesaikan kelas.',
                  },
                  {
                    icon: Trophy,
                    title: 'Jadi member',
                    points: 'Bonus',
                    desc: 'Nikmati benefit dan reward khusus member.',
                  },
                ].map((item) => {
                  const Icon = item.icon

                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-[#ebe5da] bg-white p-5"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8f2e5] text-[#a4771d]">
                          <Icon size={21} />
                        </div>

                        <span className="rounded-full bg-[#eef8f1] px-3 py-1 text-xs font-bold text-[#4f8065]">
                          {item.points}
                        </span>
                      </div>

                      <h3 className="mt-4 font-semibold">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-[#756f66]">
                        {item.desc}
                      </p>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* REWARDS */}
            <section>
              <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                <div>
                  <h2 className="font-display text-2xl font-semibold">
                    Available Rewards
                  </h2>

                  <p className="mt-1 text-sm text-[#756f66]">
                    Gunakan poinmu untuk mendapatkan benefit eksklusif.
                  </p>
                </div>

                <div className="text-sm font-semibold text-[#756f66]">
                  {rewards.length} rewards
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {rewards.map((reward) => {
                  const Icon = reward.icon
                  const isClaimed = claimed.includes(reward.id)
                  const enoughPoints = points >= reward.points

                  return (
                    <article
                      key={reward.id}
                      className="group rounded-[24px] border border-[#ebe5da] bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="flex gap-5">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#fff3cf] text-[#a4771d]">
                          <Icon size={25} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <h3 className="font-semibold">
                                {reward.title}
                              </h3>

                              <p className="mt-1 text-sm leading-6 text-[#756f66]">
                                {reward.description}
                              </p>
                            </div>

                            <div className="flex items-center gap-1 rounded-full bg-[#f7f1e5] px-3 py-1.5 text-xs font-bold text-[#9b741c]">
                              <Star size={13} fill="currentColor" />
                              {reward.points.toLocaleString('id-ID')}
                            </div>
                          </div>

                          <div className="mt-5 flex items-center justify-between gap-4">
                            {isClaimed ? (
                              <div className="flex items-center gap-2 text-sm font-semibold text-[#4f8065]">
                                <CheckCircle2 size={17} />
                                Sudah diklaim
                              </div>
                            ) : !enoughPoints ? (
                              <div className="flex items-center gap-2 text-sm text-[#756f66]">
                                <Lock size={16} />
                                Kurang {reward.points - points} poin
                              </div>
                            ) : (
                              <span className="text-sm font-semibold text-[#4f8065]">
                                Poin cukup
                              </span>
                            )}

                            <button
                              type="button"
                              onClick={() => handleClaim(reward)}
                              disabled={isClaimed || !enoughPoints}
                              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                                isClaimed || !enoughPoints
                                  ? 'cursor-not-allowed bg-[#f1eee8] text-[#aaa49a]'
                                  : 'bg-[#29251f] text-white hover:bg-[#403a32]'
                              }`}
                            >
                              {isClaimed ? 'Claimed' : 'Tukar Poin'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          </div>
        </main>
      </div>

      <DashboardMobileNav />
    </div>
  )
}