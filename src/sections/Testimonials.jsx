function Testimonials() {
  const testimonials = [
    {
      quote:
        'Aku baru mulai belajar baking dan ternyata kelasnya gampang banget diikuti. Penjelasan instructornya jelas, jadi nggak takut salah.',
      name: 'Nadia Putri',
      role: 'Home Baker',
      location: 'Yogyakarta',
      emoji: '👩🏻‍🍳',
    },
    {
      quote:
        'Sourdough class-nya detail banget. Dari awal bikin starter sampai ngerti cara membaca adonan, semuanya dijelaskan step by step.',
      name: 'Raka Pratama',
      role: 'Baking Enthusiast',
      location: 'Jakarta',
      emoji: '👨🏻‍🍳',
    },
    {
      quote:
        'Aku suka karena bisa pilih online atau datang langsung ke studio. Kelasnya bukan cuma belajar resep, tapi benar-benar dapat pengalaman baking.',
      name: 'Sarah Anindita',
      role: 'Home Baker',
      location: 'Bandung',
      emoji: '👩🏼‍🍳',
    },
  ]

  return (
    <section
      id="testimoni"
      className="bg-[#F4EFE5] px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#A95D6C]">
            Kata Mereka
          </p>

          <h2 className="font-display mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
            Dari dapur mereka,
            <br />
            lahir cerita baru.
          </h2>

          <p className="mt-5 text-base leading-7 text-[#756F66]">
            Setiap orang punya alasan berbeda untuk mulai baking. Yang sama,
            mereka menikmati prosesnya bersama LaperCakes.
          </p>
        </div>

        {/* TESTIMONIAL CARDS */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">

          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.name}
              className={`group rounded-[2rem] p-7 shadow-sm ring-1 ring-[#EBE5DA] transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8 ${
                index === 1
                  ? 'bg-[#D98C9B] text-white'
                  : 'bg-white'
              }`}
            >

              {/* STARS */}
              <div
                className={`text-lg tracking-[0.12em] ${
                  index === 1 ? 'text-white' : 'text-[#E8B84A]'
                }`}
              >
                ★★★★★
              </div>

              {/* QUOTE */}
              <p
                className={`mt-6 text-base leading-7 ${
                  index === 1 ? 'text-white/90' : 'text-[#514B43]'
                }`}
              >
                “{testimonial.quote}”
              </p>

              {/* USER */}
              <div className="mt-8 flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-xl ${
                    index === 1
                      ? 'bg-white/20'
                      : 'bg-[#F4E5D1]'
                  }`}
                >
                  {testimonial.emoji}
                </div>

                <div>
                  <p
                    className={`text-sm font-bold ${
                      index === 1 ? 'text-white' : 'text-[#29251F]'
                    }`}
                  >
                    {testimonial.name}
                  </p>

                  <p
                    className={`mt-0.5 text-xs ${
                      index === 1
                        ? 'text-white/70'
                        : 'text-[#756F66]'
                    }`}
                  >
                    {testimonial.role} · {testimonial.location}
                  </p>
                </div>
              </div>

            </article>
          ))}

        </div>

        {/* TRUST STATS */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-8">
          <div className="flex items-center gap-2">
            <span className="text-[#E8B84A]">★★★★★</span>
            <span className="text-sm font-bold text-[#29251F]">
              4.9/5
            </span>
          </div>

          <div className="hidden h-1 w-1 rounded-full bg-[#A29B91] sm:block" />

          <p className="text-sm font-medium text-[#756F66]">
            Pengalaman belajar yang disukai komunitas baking
          </p>
        </div>

      </div>
    </section>
  )
}

export default Testimonials