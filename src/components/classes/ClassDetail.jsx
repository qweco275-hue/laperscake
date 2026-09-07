import { X, Clock, CalendarDays, Users, MapPin, UserRound } from 'lucide-react'

function ClassDetail({ selectedClass, onClose, onBooking }) {
  if (!selectedClass) return null

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID').format(price)
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const foodEmoji = selectedClass.name.includes('Cookies')
    ? '🍪'
    : selectedClass.name.includes('Cupcake')
      ? '🧁'
      : selectedClass.name.includes('Pizza')
        ? '🍕'
        : selectedClass.name.includes('Brownies')
          ? '🍫'
          : selectedClass.name.includes('Cake')
            ? '🎂'
            : '🥐'

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[#29251F]/50 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[2rem] bg-[#FFFDF7] shadow-2xl sm:rounded-[2rem]"
        onClick={(e) => e.stopPropagation()}
      >

        {/* HEADER */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#EBE5DA] bg-[#FFFDF7]/95 px-5 py-4 backdrop-blur sm:px-7">

          <p className="text-sm font-bold text-[#756F66]">
            Detail Kelas
          </p>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4EFE5] transition hover:bg-[#EBE5DA]"
            aria-label="Tutup detail kelas"
          >
            <X size={20} />
          </button>

        </div>

        {/* VISUAL */}
        <div className="relative flex h-52 items-center justify-center bg-[#F4E5D1] sm:h-64">

          <div className="text-[100px]">
            {foodEmoji}
          </div>

          <span
            className={`absolute left-5 top-5 rounded-full px-4 py-2 text-xs font-bold ${
              selectedClass.mode === 'Online'
                ? 'bg-[#BFE5D0] text-[#4F8065]'
                : 'bg-[#F3D7DC] text-[#A95D6C]'
            }`}
          >
            {selectedClass.mode}
          </span>

        </div>

        {/* CONTENT */}
        <div className="p-5 sm:p-7">

          {/* TITLE */}
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[#F4EFE5] px-3 py-1 text-xs font-semibold text-[#756F66]">
              {selectedClass.ageLabel}
            </span>

            <span className="rounded-full bg-[#F4EFE5] px-3 py-1 text-xs font-semibold text-[#756F66]">
              {selectedClass.level}
            </span>
          </div>

          <h2 className="font-display mt-4 text-3xl font-semibold sm:text-4xl">
            {selectedClass.name}
          </h2>

          <p className="mt-4 text-sm leading-6 text-[#756F66]">
            {selectedClass.description}
          </p>

          {/* INFO */}
          <div className="mt-7 grid gap-3 sm:grid-cols-2">

            <div className="rounded-2xl bg-white p-4 ring-1 ring-[#EBE5DA]">
              <div className="flex items-start gap-3">
                <CalendarDays
                  size={20}
                  className="mt-0.5 text-[#A95D6C]"
                />

                <div>
                  <p className="text-xs text-[#A29B91]">
                    Tanggal
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {formatDate(selectedClass.date)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 ring-1 ring-[#EBE5DA]">
              <div className="flex items-start gap-3">
                <Clock
                  size={20}
                  className="mt-0.5 text-[#A95D6C]"
                />

                <div>
                  <p className="text-xs text-[#A29B91]">
                    Waktu
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {selectedClass.time}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 ring-1 ring-[#EBE5DA]">
              <div className="flex items-start gap-3">
                <Clock
                  size={20}
                  className="mt-0.5 text-[#4F8065]"
                />

                <div>
                  <p className="text-xs text-[#A29B91]">
                    Durasi
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {selectedClass.duration}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 ring-1 ring-[#EBE5DA]">
              <div className="flex items-start gap-3">
                <UserRound
                  size={20}
                  className="mt-0.5 text-[#4F8065]"
                />

                <div>
                  <p className="text-xs text-[#A29B91]">
                    Mentor
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {selectedClass.instructor}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* LOCATION */}
          <div className="mt-3 rounded-2xl bg-white p-4 ring-1 ring-[#EBE5DA]">
            <div className="flex items-start gap-3">
              {selectedClass.mode === 'Online' ? (
                <span className="text-xl">💻</span>
              ) : (
                <MapPin
                  size={20}
                  className="mt-0.5 text-[#A95D6C]"
                />
              )}

              <div>
                <p className="text-xs text-[#A29B91]">
                  Lokasi / Platform
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {selectedClass.location}
                </p>
              </div>
            </div>
          </div>

          {/* INGREDIENTS */}
          <div className="mt-7">

            <h3 className="font-display text-xl font-semibold">
              Bahan yang digunakan
            </h3>

            <div className="mt-3 flex flex-wrap gap-2">
              {selectedClass.ingredients.map((ingredient) => (
                <span
                  key={ingredient}
                  className="rounded-full bg-[#EFF8F3] px-3 py-2 text-xs font-semibold text-[#4F8065]"
                >
                  {ingredient}
                </span>
              ))}
            </div>

          </div>

          {/* BOOKING */}
          <div className="mt-8 rounded-[1.5rem] bg-[#29251F] p-5 text-white sm:p-6">

            <div className="flex items-end justify-between gap-4">

              <div>
                <p className="text-xs text-white/60">
                  Harga kelas
                </p>

                <p className="mt-1 text-2xl font-bold">
                  Rp{formatPrice(selectedClass.price)}
                </p>
              </div>

              <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-xs text-white/60">
                  <Users size={14} />
                  Kuota
                </div>

                <p
                  className={`mt-1 text-sm font-bold ${
                    selectedClass.remaining <= 3
                      ? 'text-[#F3D7DC]'
                      : 'text-[#BFE5D0]'
                  }`}
                >
                  {selectedClass.remaining > 0
                    ? `Tersisa ${selectedClass.remaining} slot`
                    : 'Kelas Penuh'}
                </p>
              </div>

            </div>

            <button
              onClick={() => onBooking(selectedClass)}
              disabled={selectedClass.remaining === 0}
              className="mt-5 w-full rounded-full bg-[#E8B84A] px-5 py-4 text-sm font-bold text-[#29251F] transition hover:bg-[#D9A936] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {selectedClass.remaining > 0
                ? 'Booking Kelas'
                : 'Kelas Penuh'}
            </button>

          </div>

        </div>

      </div>
    </div>
  )
}

export default ClassDetail