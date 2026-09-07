import { useEffect, useState } from 'react'
import classes from '../data/classes'
import ClassDetail from '../components/classes/ClassDetail'
import BookingCheckout from '../components/classes/BookingCheckout'

function ScheduleSection({ initialMode = 'Semua' }) {
  const [month, setMonth] = useState('September')
  const [mode, setMode] = useState(initialMode)
  const [age, setAge] = useState('Semua')
  const [level, setLevel] = useState('Semua')

  const [classList, setClassList] = useState(classes)

  const [selectedClass, setSelectedClass] = useState(null)
  const [bookingClass, setBookingClass] = useState(null)

  useEffect(() => {
  setMode(initialMode)
}, [initialMode])

  const filteredClasses = classList.filter((item) => {
    const itemMonth = new Date(item.date).toLocaleDateString('id-ID', {
      month: 'long',
    })

    const matchMonth = itemMonth.toLowerCase() === month.toLowerCase()

    const matchMode =
      mode === 'Semua' || item.mode === mode

    const matchAge =
      age === 'Semua' || item.age === age

    const matchLevel =
      level === 'Semua' || item.level === level

    return matchMonth && matchMode && matchAge && matchLevel
  })

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID').format(price)
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
  }

  return (
    <section
      id="jadwal"
      className="bg-white px-5 py-20 sm:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {selectedClass && (
          <ClassDetail
             selectedClass={selectedClass}
             onClose={() => setSelectedClass(null)}
              onBooking={(classData) => {
                setSelectedClass(null)
                setBookingClass(classData)
              }}
   />
  )}
        {bookingClass && (
  <BookingCheckout
    selectedClass={bookingClass}
    onClose={() => setBookingClass(null)}
    onSuccess={() => {

      setClassList((currentClasses) =>
        currentClasses.map((item) =>
          item.id === bookingClass.id
            ? {
                ...item,
                remaining: Math.max(item.remaining - 1, 0),
              }
            : item
        )
      )

      setBookingClass(null)
    }}
  />
)}

        {/* HEADER */}
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#756F66]">
            Jadwal kelas
          </p>

          <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Pilih kelas favorit
            <br className="hidden sm:block" />
            si kecil.
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-[#756F66]">
            Temukan kelas baking sesuai usia, level, dan
            cara belajar yang paling nyaman untuk anak.
          </p>
        </div>

        {/* FILTER */}
        <div className="mt-10 rounded-[2rem] bg-[#FFFDF7] p-5 ring-1 ring-[#EBE5DA] sm:p-6">

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* MONTH */}
            <div>
              <label
                htmlFor="month"
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#756F66]"
              >
                Bulan
              </label>

              <select
                id="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full rounded-xl border border-[#E5DED2] bg-white px-4 py-3 text-sm outline-none focus:border-[#E8B84A] focus:ring-2 focus:ring-[#E8B84A]/20"
              >
                <option>September</option>
              </select>
            </div>

            {/* MODE */}
            <div>
              <label
                htmlFor="mode"
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#756F66]"
              >
                Mode kelas
              </label>

              <select
                id="mode"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full rounded-xl border border-[#E5DED2] bg-white px-4 py-3 text-sm outline-none focus:border-[#E8B84A] focus:ring-2 focus:ring-[#E8B84A]/20"
              >
                <option>Semua</option>
                <option>Online</option>
                <option>Offline</option>
              </select>
            </div>

            {/* AGE */}
            <div>
              <label
                htmlFor="age"
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#756F66]"
              >
                Usia
              </label>

              <select
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full rounded-xl border border-[#E5DED2] bg-white px-4 py-3 text-sm outline-none focus:border-[#E8B84A] focus:ring-2 focus:ring-[#E8B84A]/20"
              >
                <option>Semua</option>
                <option value="5-8">5–8 tahun</option>
                <option value="9-11">9–11 tahun</option>
                <option value="12-14">12–14 tahun</option>
              </select>
            </div>

            {/* LEVEL */}
            <div>
              <label
                htmlFor="level"
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#756F66]"
              >
                Level
              </label>

              <select
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full rounded-xl border border-[#E5DED2] bg-white px-4 py-3 text-sm outline-none focus:border-[#E8B84A] focus:ring-2 focus:ring-[#E8B84A]/20"
              >
                <option>Semua</option>
                <option>Beginner</option>
                <option>Intermediate</option>
              </select>
            </div>

          </div>
        </div>

        {/* RESULT */}
        <div className="mt-10">

          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm font-semibold text-[#756F66]">
              {filteredClasses.length} kelas tersedia
            </p>

            <p className="hidden text-xs text-[#A29B91] sm:block">
              Klik kelas untuk melihat detail
            </p>
          </div>

          {filteredClasses.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {filteredClasses.map((item) => (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-[2rem] border border-[#EBE5DA] bg-[#FFFDF7] transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                >

                  {/* VISUAL */}
                  <div className="relative flex h-44 items-center justify-center bg-[#F4E5D1]">

                    <div className="text-7xl transition duration-200 group-hover:scale-105">
                      {item.name.includes('Cookies')
                        ? '🍪'
                        : item.name.includes('Cupcake')
                          ? '🧁'
                          : item.name.includes('Pizza')
                            ? '🍕'
                            : item.name.includes('Brownies')
                              ? '🍫'
                              : item.name.includes('Cake')
                                ? '🎂'
                                : '🥐'}
                    </div>

                    <span
                      className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${
                        item.mode === 'Online'
                          ? 'bg-[#BFE5D0] text-[#4F8065]'
                          : 'bg-[#F3D7DC] text-[#A95D6C]'
                      }`}
                    >
                      {item.mode}
                    </span>

                  </div>

                  {/* CONTENT */}
                  <div className="p-6">

                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#F4EFE5] px-3 py-1 text-xs font-semibold text-[#756F66]">
                        {item.ageLabel}
                      </span>

                      <span className="rounded-full bg-[#F4EFE5] px-3 py-1 text-xs font-semibold text-[#756F66]">
                        {item.level}
                      </span>
                    </div>

                    <h3 className="font-display mt-4 text-2xl font-semibold">
                      {item.name}
                    </h3>

                    <div className="mt-4 space-y-2 text-sm text-[#756F66]">

                      <p>
                        📅 {formatDate(item.date)}
                      </p>

                      <p>
                        ⏰ {item.time}
                      </p>

                    </div>

                    <div className="mt-5 flex items-end justify-between border-t border-[#EBE5DA] pt-5">

                      <div>
                        <p className="text-xs text-[#A29B91]">
                          Mulai dari
                        </p>

                        <p className="mt-1 text-lg font-bold text-[#29251F]">
                          Rp{formatPrice(item.price)}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-[#A29B91]">
                          Kuota
                        </p>

                        <p
                          className={`mt-1 text-sm font-bold ${
                            item.remaining <= 3
                              ? 'text-[#A95D6C]'
                              : 'text-[#4F8065]'
                          }`}
                        >
                          {item.remaining > 0
                            ? `Tersisa ${item.remaining} slot`
                            : 'Kelas Penuh'}
                        </p>
                      </div>

                    </div>

                    <button
                      onClick={() => setSelectedClass(item)}
                      className="mt-5 w-full rounded-full bg-[#29251F] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#A95D6C]"
                    >
                      Lihat Detail
                    </button>

                  </div>

                </article>
              ))}

            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-[#D8D0C3] bg-[#FFFDF7] px-6 py-16 text-center">

              <div className="text-5xl">
                🥺
              </div>

              <h3 className="font-display mt-4 text-2xl font-semibold">
                Belum ada kelas yang cocok
              </h3>

              <p className="mt-2 text-sm text-[#756F66]">
                Coba ubah filter untuk melihat kelas lainnya.
              </p>

            </div>
          )}

        </div>

      </div>
    </section>
  )
}

export default ScheduleSection