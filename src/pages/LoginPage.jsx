import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
} from 'lucide-react'
import { loginUser } from '../data/authStorage'

function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (error) {
      setError('')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')

    if (!formData.email || !formData.password) {
      setError('Email dan password wajib diisi.')
      return
    }

    setLoading(true)

    try {
      // Kasih sedikit delay biar transisinya terasa natural
      await new Promise((resolve) => setTimeout(resolve, 500))

      const result = loginUser(formData.email, formData.password)

      if (!result.success) {
        setError(result.message || 'Email atau password salah.')
        setLoading(false)
        return
      }

      // ADMIN → langsung ke Admin Dashboard
      if (result.user?.role === 'admin') {
        navigate('/admin', { replace: true })
        return
      }

      // USER → ke halaman yang sebelumnya ingin diakses,
      // atau ke Dashboard kalau tidak ada tujuan sebelumnya
      const destination = location.state?.from || '/dashboard'

      navigate(destination, { replace: true })
    } catch (err) {
      console.error(err)
      setError('Terjadi kesalahan saat login. Coba lagi.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fffdf7] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-[2rem] overflow-hidden border border-[#ebe5da] shadow-[0_20px_70px_rgba(41,37,31,0.08)]">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex relative bg-[#29251f] text-white p-12 xl:p-16 flex-col justify-between overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#e8b84a]/20" />
          <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-[#bfe5d0]/10" />

          <div className="relative z-10">
            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#e8b84a] text-[#29251f] flex items-center justify-center">
                <span className="font-display text-xl font-bold">L</span>
              </div>

              <div>
                <div className="font-display text-2xl font-semibold">
                  LaperCakes
                </div>
                <div className="text-xs text-white/50">
                  Bake. Learn. Enjoy.
                </div>
              </div>
            </Link>
          </div>

          <div className="relative z-10 max-w-md">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-7">
              <Sparkles size={27} className="text-[#e8b84a]" />
            </div>

            <h1 className="font-display text-5xl xl:text-6xl leading-[1.05] font-semibold mb-6">
              Selamat datang
              <br />
              kembali.
            </h1>

            <p className="text-white/65 text-lg leading-relaxed">
              Lanjutkan perjalanan baking kamu bersama kelas,
              resep, dan komunitas LaperCakes.
            </p>
          </div>

          <div className="relative z-10 text-sm text-white/40">
            © 2026 LaperCakes. All rights reserved.
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-7 sm:p-10 lg:p-14 xl:p-16">
          <div className="max-w-md mx-auto">

            {/* Mobile logo */}
            <div className="lg:hidden mb-10">
              <Link
                to="/"
                className="inline-flex items-center gap-3"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#e8b84a] text-[#29251f] flex items-center justify-center">
                  <span className="font-display text-xl font-bold">L</span>
                </div>

                <div>
                  <div className="font-display text-2xl font-semibold">
                    LaperCakes
                  </div>
                  <div className="text-xs text-[#756f66]">
                    Bake. Learn. Enjoy.
                  </div>
                </div>
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-[#c99624] mb-2">
                WELCOME BACK
              </p>

              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#29251f] leading-tight">
                Masuk ke akun
              </h2>

              <p className="mt-3 text-[#756f66]">
                Masuk untuk mengakses kelas dan aktivitasmu.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-[#29251f] mb-2">
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa39a]"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@email.com"
                    className="form-input pl-11"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-[#29251f] mb-2">
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa39a]"
                  />

                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Masukkan password"
                    className="form-input pl-11 pr-12"
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#aaa39a] hover:text-[#29251f]"
                    aria-label={
                      showPassword
                        ? 'Sembunyikan password'
                        : 'Tampilkan password'
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm font-semibold text-[#a95d6c] hover:underline"
                  onClick={() =>
                    alert(
                      'Fitur lupa password akan tersedia pada pengembangan berikutnya.'
                    )
                  }
                >
                  Lupa password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-[#29251f] text-white py-3.5 px-5 font-semibold flex items-center justify-center gap-2 transition hover:bg-[#403a32] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  'Memproses...'
                ) : (
                  <>
                    Masuk
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Register */}
            <div className="text-center mt-7 text-sm text-[#756f66]">
              Belum punya akun?{' '}
              <Link
                to="/register"
                state={{ from: location.state?.from }}
                className="font-semibold text-[#a95d6c] hover:underline"
              >
                Daftar sekarang
              </Link>
            </div>

           

          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage