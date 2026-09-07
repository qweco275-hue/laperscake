import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Award,
  CalendarDays,
  Download,
  Eye,
  FileCheck2,
  ShieldCheck,
  Trophy,
} from 'lucide-react'

import Navbar from '../../components/Navbar'
import DashboardSidebar from '../../components/dashboard/DashboardSidebar'
import DashboardMobileNav from '../../components/dashboard/DashboardMobileNav'
import { getDashboard } from '../../utils/dashboardStorage'

function formatDate(dateString) {
  if (!dateString) return '-'

  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function CertificateCard({ certificate, onView }) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-[var(--lc-border)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {/* Certificate Preview */}
      <div className="relative m-4 overflow-hidden rounded-2xl bg-[#fff8e7] p-5">
        <div className="relative aspect-[1.414/1] rounded-xl border-2 border-[var(--lc-mustard)] bg-[#fffdf7] p-5">
          <div className="absolute inset-3 rounded-lg border border-[#e8d9ae]" />

          <div className="relative flex h-full flex-col items-center justify-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--lc-mustard)] text-white">
              <Award size={25} />
            </div>

            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[var(--lc-muted)]">
              LaperCakes Academy
            </p>

            <h3 className="mt-2 font-display text-xl text-[var(--lc-text)]">
              Certificate
            </h3>

            <p className="mt-2 text-[10px] text-[var(--lc-muted)]">
              This certifies that
            </p>

            <p className="mt-1 text-sm font-bold text-[var(--lc-text)]">
              Pandu
            </p>

            <div className="my-2 h-px w-24 bg-[var(--lc-mustard)]" />

            <p className="max-w-[180px] text-[10px] leading-relaxed text-[var(--lc-muted)]">
              has successfully completed
            </p>

            <p className="mt-1 max-w-[190px] text-xs font-bold text-[var(--lc-text)]">
              {certificate.title}
            </p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="px-6 pb-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-[var(--lc-text)]">
            {certificate.title}
          </h3>

          <div className="mt-2 space-y-1.5 text-sm text-[var(--lc-muted)]">
            <p>
              Instructor:{' '}
              <span className="font-medium text-[var(--lc-text)]">
                {certificate.instructor}
              </span>
            </p>

            <p className="flex items-center gap-1.5">
              <CalendarDays size={15} />
              {formatDate(certificate.date)}
            </p>

            <p className="text-xs">
              Certificate ID:{' '}
              <span className="font-semibold text-[var(--lc-text)]">
                {certificate.id}
              </span>
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onView(certificate)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--lc-text)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <Eye size={16} />
            Lihat
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 rounded-xl border border-[var(--lc-border)] px-4 py-3 text-sm font-semibold text-[var(--lc-text)] transition hover:bg-[#faf7ef]"
            title="Print / Save PDF"
          >
            <Download size={16} />
          </button>
        </div>
      </div>
    </article>
  )
}

function CertificateModal({ certificate, onClose }) {
  if (!certificate) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-[32px] bg-white p-5 shadow-2xl md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[var(--lc-mint-dark)]">
              LaperCakes Academy
            </p>

            <h2 className="mt-1 text-xl font-bold text-[var(--lc-text)]">
              Certificate Detail
            </h2>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f1e8] text-lg text-[var(--lc-text)]"
          >
            ×
          </button>
        </div>

        {/* Certificate */}
        <div className="mt-6 rounded-2xl bg-[#fff8e7] p-4 md:p-8">
          <div className="relative mx-auto aspect-[1.414/1] max-w-2xl rounded-xl border-4 border-[var(--lc-mustard)] bg-[#fffdf7] p-6 shadow-sm md:p-12">
            <div className="absolute inset-4 rounded-lg border-2 border-[#e8d9ae] md:inset-6" />

            <div className="relative flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--lc-mustard)] text-white">
                <Award size={32} />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--lc-muted)]">
                LaperCakes Academy
              </p>

              <h1 className="mt-3 font-display text-3xl text-[var(--lc-text)] md:text-5xl">
                Certificate of Completion
              </h1>

              <p className="mt-5 text-sm text-[var(--lc-muted)]">
                This certificate is proudly presented to
              </p>

              <h2 className="mt-2 font-display text-2xl text-[var(--lc-text)] md:text-4xl">
                Pandu
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-relaxed text-[var(--lc-muted)]">
                for successfully completing the baking class
              </p>

              <h3 className="mt-2 max-w-lg text-lg font-bold text-[var(--lc-text)] md:text-2xl">
                {certificate.title}
              </h3>

              <div className="mt-8 grid w-full max-w-md grid-cols-2 gap-8">
                <div>
                  <div className="mx-auto mb-2 h-px w-28 bg-[var(--lc-text)]" />
                  <p className="text-xs font-semibold text-[var(--lc-text)]">
                    {certificate.instructor}
                  </p>
                  <p className="text-[10px] text-[var(--lc-muted)]">
                    Instructor
                  </p>
                </div>

                <div>
                  <div className="mx-auto mb-2 h-px w-28 bg-[var(--lc-text)]" />
                  <p className="text-xs font-semibold text-[var(--lc-text)]">
                    {formatDate(certificate.date)}
                  </p>
                  <p className="text-[10px] text-[var(--lc-muted)]">
                    Date of Completion
                  </p>
                </div>
              </div>

              <div className="mt-6 text-[10px] text-[var(--lc-muted)]">
                Certificate ID: {certificate.id}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 rounded-xl bg-[var(--lc-text)] px-5 py-3 text-sm font-semibold text-white"
          >
            <Download size={16} />
            Print / Save PDF
          </button>

          <button
            onClick={onClose}
            className="rounded-xl border border-[var(--lc-border)] px-5 py-3 text-sm font-semibold text-[var(--lc-text)]"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CertificatesPage() {
  const [dashboard] = useState(() => getDashboard())
  const [selectedCertificate, setSelectedCertificate] = useState(null)

  const certificates = dashboard.certificates || []

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[var(--lc-cream)]">
        <div className="mx-auto flex max-w-[1500px]">
          <DashboardSidebar />

          <main className="min-w-0 flex-1 px-4 pb-28 pt-8 md:px-8 lg:px-10 lg:pb-12">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--lc-mustard)] text-white">
                  <Trophy size={24} />
                </div>

                <div>
                  <p className="text-sm font-medium text-[var(--lc-muted)]">
                    Your achievements
                  </p>

                  <h1 className="font-display text-3xl text-[var(--lc-text)] md:text-4xl">
                    Certificates
                  </h1>
                </div>
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--lc-muted)]">
                Semua sertifikat kelas yang berhasil kamu selesaikan tersimpan
                di sini.
              </p>
            </div>

            {/* Stats */}
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[var(--lc-border)] bg-white p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff4d6] text-[var(--lc-mustard-dark)]">
                  <Award size={20} />
                </div>

                <p className="text-sm text-[var(--lc-muted)]">
                  Total Certificates
                </p>

                <p className="mt-1 text-2xl font-bold text-[var(--lc-text)]">
                  {certificates.length}
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--lc-border)] bg-white p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f7ee] text-[var(--lc-mint-dark)]">
                  <FileCheck2 size={20} />
                </div>

                <p className="text-sm text-[var(--lc-muted)]">
                  Completed Classes
                </p>

                <p className="mt-1 text-2xl font-bold text-[var(--lc-text)]">
                  {dashboard.completedClasses?.length || 0}
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--lc-border)] bg-white p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#f9e9ed] text-[var(--lc-berry-dark)]">
                  <ShieldCheck size={20} />
                </div>

                <p className="text-sm text-[var(--lc-muted)]">
                  Verified
                </p>

                <p className="mt-1 text-2xl font-bold text-[var(--lc-text)]">
                  {certificates.length}
                </p>
              </div>
            </div>

            {/* Certificates */}
            {certificates.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {certificates.map((certificate) => (
                  <CertificateCard
                    key={certificate.id}
                    certificate={certificate}
                    onView={setSelectedCertificate}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-[28px] border border-dashed border-[var(--lc-border)] bg-white px-6 py-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff4d6] text-[var(--lc-mustard-dark)]">
                  <Award size={30} />
                </div>

                <h2 className="mt-5 text-xl font-bold text-[var(--lc-text)]">
                  Belum ada sertifikat
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--lc-muted)]">
                  Selesaikan kelas baking untuk mendapatkan sertifikat
                  completion dari LaperCakes.
                </p>

                <Link
                  to="/explore"
                  className="mt-6 inline-flex rounded-xl bg-[var(--lc-text)] px-5 py-3 text-sm font-semibold text-white"
                >
                  Explore Classes
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>

      <DashboardMobileNav />

      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </>
  )
}