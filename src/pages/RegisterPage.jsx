import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  User,
} from 'lucide-react'
import { registerUser } from '../data/authStorage'

function RegisterPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const from = location.state?.from || '/dashboard'

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (error) {
      setError('')
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('Semua field wajib diisi.')
      return
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Konfirmasi password tidak cocok.')
      return
    }

    setLoading(true)

    setTimeout(() => {
      const result = registerUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      })

      if (!result.success) {
        setError(result.message)
        setLoading(false)
        return
      }

      navigate('/login', {
        replace: true,
        state: {
          from,
          registered: true,
        },
      })
    }, 500)
  }

  return (
    <div className="min-h-screen bg-[#fffdf7]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT */}
        <div className="relative hidden overflow-hidden bg-[#29251f] lg:flex">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#bfe5d0] blur-3xl" />
            <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#e8b84a] blur-3xl" />
          </div>

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight text-white"
            >
              Laper<span className="text-[#e8b84a]">Cakes</span>
            </Link>

            <div className="max-w-xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#e8b84a]">
                Join LaperCakes
              </p>

              <h1 className="font-display text-5xl font-semibold leading-tight text-white xl:text-6xl">
                Satu akun untuk
                <br />
                semua perjalanan baking.
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-white/65">
                Simpan booking, resep, wishlist, sertifikat,
                dan aktivitas baking kamu dalam satu akun.
              </p>
            </div>

            <p className="text-sm text-white/40">
              © 2026 LaperCakes
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">

            <div className="mb-10 lg:hidden">
              <Link
                to="/"
                className="text-2xl font-bold tracking-tight"
              >
                Laper<span className="text-[#c99624]">Cakes</span>
              </Link>
            </div>

            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-[#c99624]">
                Register
              </p>

              <h2 className="font-display text-4xl font-semibold text-[#29251f]">
                Buat akun baru
              </h2>

              <p className="mt-3 text-[#756f66]">
                Daftar dan mulai perjalanan baking kamu.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* NAME */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Nama lengkap
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9b948a]"
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nama lengkap"
                    className="form-input pl-11"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9b948a]"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@email.com"
                    className="form-input pl-11"
                  />
                </div>
              </div>

              {/* PHONE */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Nomor HP
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9b948a]"
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="08xxxxxxxxxx"
                    className="form-input pl-11"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9b948a]"
                  />

                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimal 6 karakter"
                    className="form-input px-11"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#756f66]"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* CONFIRM */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Konfirmasi password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9b948a]"
                  />

                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Ulangi password"
                    className="form-input px-11"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#756f66]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="flex items-start gap-3 py-1">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 accent-[#c99624]"
                />

                <p className="text-xs leading-5 text-[#756f66]">
                  Saya menyetujui syarat penggunaan dan kebijakan
                  privasi LaperCakes.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#29251f] px-5 py-3.5 font-semibold text-white transition hover:bg-[#403a31] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Membuat akun...' : 'Buat akun'}

                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-[#756f66]">
              Sudah punya akun?{' '}
              <Link
                to="/login"
                state={{ from }}
                className="font-bold text-[#a95d6c] hover:underline"
              >
                Masuk
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  )
}

export default RegisterPage