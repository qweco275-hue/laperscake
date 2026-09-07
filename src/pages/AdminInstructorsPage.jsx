import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Star,
  Users,
  BookOpen,
  MapPin,
  RotateCcw,
  ChefHat,
  CheckCircle2,
  UserRound,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import MobileBottomNav from '../components/MobileBottomNav'

import {
  getInstructors,
  addInstructor,
  updateInstructor,
  deleteInstructor,
  resetInstructors,
} from '../data/instructorStorage'

function AdminInstructorsPage() {
  const [instructors, setInstructors] = useState(
    () => getInstructors(),
  )

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [specialtyFilter, setSpecialtyFilter] =
    useState('all')

  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    specialty: '',
    experience: '',
    rating: '5.0',
    reviews: '0',
    classes: '0',
    students: '0',
    location: '',
    status: 'active',
    emoji: '👨‍🍳',
    bio: '',
  })

  const specialties = useMemo(() => {
    return [
      ...new Set(
        instructors
          .map((item) => item.specialty)
          .filter(Boolean),
      ),
    ]
  }, [instructors])

  const filteredInstructors = useMemo(() => {
    const keyword = search.toLowerCase().trim()

    return instructors.filter((instructor) => {
      const matchesSearch =
        !keyword ||
        instructor.name
          ?.toLowerCase()
          .includes(keyword) ||
        instructor.role
          ?.toLowerCase()
          .includes(keyword) ||
        instructor.specialty
          ?.toLowerCase()
          .includes(keyword) ||
        instructor.location
          ?.toLowerCase()
          .includes(keyword)

      const matchesStatus =
        statusFilter === 'all' ||
        instructor.status === statusFilter

      const matchesSpecialty =
        specialtyFilter === 'all' ||
        instructor.specialty === specialtyFilter

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSpecialty
      )
    })
  }, [
    instructors,
    search,
    statusFilter,
    specialtyFilter,
  ])

  const summary = useMemo(() => {
    const active = instructors.filter(
      (item) => item.status === 'active',
    ).length

    const totalStudents = instructors.reduce(
      (total, item) =>
        total + Number(item.students || 0),
      0,
    )

    const totalClasses = instructors.reduce(
      (total, item) =>
        total + Number(item.classes || 0),
      0,
    )

    const averageRating =
      instructors.length > 0
        ? instructors.reduce(
            (total, item) =>
              total + Number(item.rating || 0),
            0,
          ) / instructors.length
        : 0

    return {
      total: instructors.length,
      active,
      totalStudents,
      totalClasses,
      averageRating,
    }
  }, [instructors])

  const openAddModal = () => {
    setEditingId(null)

    setFormData({
      name: '',
      role: '',
      specialty: '',
      experience: '',
      rating: '5.0',
      reviews: '0',
      classes: '0',
      students: '0',
      location: '',
      status: 'active',
      emoji: '👨‍🍳',
      bio: '',
    })

    setModalOpen(true)
  }

  const openEditModal = (instructor) => {
    setEditingId(instructor.id)

    setFormData({
      name: instructor.name || '',
      role: instructor.role || '',
      specialty: instructor.specialty || '',
      experience: instructor.experience || '',
      rating: String(instructor.rating ?? 5),
      reviews: String(instructor.reviews ?? 0),
      classes: String(instructor.classes ?? 0),
      students: String(instructor.students ?? 0),
      location: instructor.location || '',
      status: instructor.status || 'active',
      emoji: instructor.emoji || '👨‍🍳',
      bio: instructor.bio || '',
    })

    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingId(null)
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.name.trim()) {
      alert('Nama instruktur wajib diisi.')
      return
    }

    if (!formData.role.trim()) {
      alert('Role instruktur wajib diisi.')
      return
    }

    if (!formData.specialty.trim()) {
      alert('Spesialisasi wajib diisi.')
      return
    }

    const instructorData = {
      ...formData,
      rating: Number(formData.rating || 0),
      reviews: Number(formData.reviews || 0),
      classes: Number(formData.classes || 0),
      students: Number(formData.students || 0),
    }

    if (editingId) {
      const updated = updateInstructor(
        editingId,
        instructorData,
      )

      setInstructors(updated)
    } else {
      const updated = addInstructor(
        instructorData,
      )

      setInstructors(updated)
    }

    closeModal()
  }

  const handleDelete = (instructor) => {
    const confirmed = window.confirm(
      `Hapus instruktur "${instructor.name}"?`,
    )

    if (!confirmed) return

    const updated = deleteInstructor(
      instructor.id,
    )

    setInstructors(updated)
  }

  const handleReset = () => {
    const confirmed = window.confirm(
      'Reset semua data instruktur ke data awal?',
    )

    if (!confirmed) return

    const updated = resetInstructors()

    setInstructors(updated)
  }

  return (
    <div className="min-h-screen bg-[#f8f6f1] text-[#29251f]">
      <Navbar />

      <main className="mx-auto max-w-[1500px] px-4 pb-28 pt-8 sm:px-6 lg:px-8 lg:pb-12">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              to="/admin"
              className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-[#756f66] transition hover:text-[#29251f]"
            >
              <ArrowLeft size={16} />
              Kembali ke Admin Dashboard
            </Link>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#29251f] px-3 py-1.5 text-xs font-bold text-white">
              <ChefHat size={14} />
              ADMIN / INSTRUCTORS
            </div>

            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Kelola Instruktur
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#756f66] sm:text-base">
              Kelola profil chef dan instruktur yang
              mengajar kelas di LaperCakes.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-full border border-[#ded7ca] bg-white px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <RotateCcw size={16} />
              Reset
            </button>

            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex items-center gap-2 rounded-full bg-[#29251f] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <Plus size={17} />
              Tambah Instruktur
            </button>
          </div>
        </div>

        {/* SUMMARY */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            icon={UserRound}
            label="Total Instruktur"
            value={summary.total}
            description="Chef terdaftar"
            iconBg="bg-[#f9e0e4]"
            iconColor="text-[#a95d6c]"
          />

          <SummaryCard
            icon={CheckCircle2}
            label="Instruktur Aktif"
            value={summary.active}
            description="Sedang tersedia"
            iconBg="bg-[#dff3e7]"
            iconColor="text-[#4f8065]"
          />

          <SummaryCard
            icon={BookOpen}
            label="Total Kelas"
            value={summary.totalClasses}
            description="Kelas yang diajar"
            iconBg="bg-[#fff0c9]"
            iconColor="text-[#a57a22]"
          />

          <SummaryCard
            icon={Users}
            label="Total Students"
            value={summary.totalStudents}
            description={`Rating rata-rata ${summary.averageRating.toFixed(1)}`}
            iconBg="bg-[#e8e1f7]"
            iconColor="text-[#735a9c]"
          />
        </section>

        {/* FILTER */}
        <section className="mt-6 rounded-[28px] border border-[#e8e2d8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9b948a]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Cari nama, role, spesialisasi, atau lokasi..."
                className="form-input pl-11"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:w-[430px]">
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className="form-input"
              >
                <option value="all">
                  Semua Status
                </option>
                <option value="active">
                  Aktif
                </option>
                <option value="inactive">
                  Tidak Aktif
                </option>
              </select>

              <select
                value={specialtyFilter}
                onChange={(event) =>
                  setSpecialtyFilter(event.target.value)
                }
                className="form-input"
              >
                <option value="all">
                  Semua Spesialisasi
                </option>

                {specialties.map((specialty) => (
                  <option
                    key={specialty}
                    value={specialty}
                  >
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* RESULT HEADER */}
        <div className="mb-4 mt-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold">
              {filteredInstructors.length} instruktur
            </p>

            <p className="mt-1 text-xs text-[#756f66]">
              Menampilkan data sesuai filter
            </p>
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <section className="hidden overflow-hidden rounded-[28px] border border-[#e8e2d8] bg-white shadow-sm lg:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px]">
              <thead>
                <tr className="border-b border-[#eee9e0] bg-[#faf8f3] text-left">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#756f66]">
                    Instruktur
                  </th>

                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-[#756f66]">
                    Spesialisasi
                  </th>

                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-[#756f66]">
                    Rating
                  </th>

                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-[#756f66]">
                    Kelas
                  </th>

                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-[#756f66]">
                    Students
                  </th>

                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-[#756f66]">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-[#756f66]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredInstructors.map(
                  (instructor) => (
                    <tr
                      key={instructor.id}
                      className="border-b border-[#f0ebe3] last:border-0 hover:bg-[#fffdf9]"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fff0c9] text-2xl">
                            {instructor.emoji}
                          </div>

                          <div>
                            <p className="text-sm font-bold">
                              {instructor.name}
                            </p>

                            <p className="mt-1 text-xs text-[#756f66]">
                              {instructor.role}
                            </p>

                            <p className="mt-1 inline-flex items-center gap-1 text-xs text-[#9b948a]">
                              <MapPin size={12} />
                              {instructor.location ||
                                'Indonesia'}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-5">
                        <span className="rounded-full bg-[#f8f6f1] px-3 py-1.5 text-xs font-bold">
                          {instructor.specialty}
                        </span>
                      </td>

                      <td className="px-4 py-5">
                        <div className="flex items-center gap-1.5">
                          <Star
                            size={15}
                            className="fill-[#e8b84a] text-[#e8b84a]"
                          />

                          <span className="text-sm font-bold">
                            {Number(
                              instructor.rating || 0,
                            ).toFixed(1)}
                          </span>
                        </div>

                        <p className="mt-1 text-[11px] text-[#9b948a]">
                          {instructor.reviews || 0}{' '}
                          reviews
                        </p>
                      </td>

                      <td className="px-4 py-5">
                        <p className="text-sm font-bold">
                          {instructor.classes || 0}
                        </p>

                        <p className="mt-1 text-[11px] text-[#9b948a]">
                          kelas
                        </p>
                      </td>

                      <td className="px-4 py-5">
                        <p className="text-sm font-bold">
                          {instructor.students || 0}
                        </p>

                        <p className="mt-1 text-[11px] text-[#9b948a]">
                          students
                        </p>
                      </td>

                      <td className="px-4 py-5">
                        <StatusBadge
                          status={instructor.status}
                        />
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(
                                instructor,
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f8f6f1] text-[#756f66] transition hover:bg-[#fff0c9] hover:text-[#9b741f]"
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                instructor,
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f8f6f1] text-[#756f66] transition hover:bg-[#f9e0e4] hover:text-[#a95d6c]"
                            title="Hapus"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>

          {filteredInstructors.length === 0 && (
            <EmptyState />
          )}
        </section>

        {/* MOBILE CARDS */}
        <section className="space-y-4 lg:hidden">
          {filteredInstructors.map(
            (instructor) => (
              <div
                key={instructor.id}
                className="rounded-[26px] border border-[#e8e2d8] bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fff0c9] text-2xl">
                      {instructor.emoji}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">
                        {instructor.name}
                      </p>

                      <p className="mt-1 text-xs text-[#756f66]">
                        {instructor.role}
                      </p>

                      <p className="mt-1 flex items-center gap-1 text-xs text-[#9b948a]">
                        <MapPin size={12} />
                        {instructor.location ||
                          'Indonesia'}
                      </p>
                    </div>
                  </div>

                  <StatusBadge
                    status={instructor.status}
                  />
                </div>

                <div className="mt-5">
                  <span className="inline-flex rounded-full bg-[#f8f6f1] px-3 py-1.5 text-xs font-bold">
                    {instructor.specialty}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  <MiniInfo
                    icon={Star}
                    label="Rating"
                    value={Number(
                      instructor.rating || 0,
                    ).toFixed(1)}
                  />

                  <MiniInfo
                    icon={BookOpen}
                    label="Kelas"
                    value={instructor.classes || 0}
                  />

                  <MiniInfo
                    icon={Users}
                    label="Students"
                    value={
                      instructor.students || 0
                    }
                  />
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      openEditModal(instructor)
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#f8f6f1] px-4 py-3 text-sm font-bold"
                  >
                    <Pencil size={15} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(instructor)
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#f9e0e4] px-4 py-3 text-sm font-bold text-[#a95d6c]"
                  >
                    <Trash2 size={15} />
                    Hapus
                  </button>
                </div>
              </div>
            ),
          )}

          {filteredInstructors.length === 0 && (
            <EmptyState />
          )}
        </section>
      </main>

      <MobileBottomNav />

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-[30px] bg-white shadow-2xl">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-[#eee9e0] px-5 py-5 sm:px-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#756f66]">
                  {editingId
                    ? 'Edit Data'
                    : 'Data Baru'}
                </p>

                <h2 className="mt-1 font-display text-2xl font-semibold">
                  {editingId
                    ? 'Edit Instruktur'
                    : 'Tambah Instruktur'}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8f6f1] text-[#756f66] transition hover:bg-[#eee9e0]"
              >
                <X size={18} />
              </button>
            </div>

            {/* MODAL BODY */}
            <form
              onSubmit={handleSubmit}
              className="max-h-[calc(92vh-88px)] overflow-y-auto px-5 py-6 sm:px-7"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  label="Nama Instruktur"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Contoh: Chef Anasya"
                  required
                />

                <FormField
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Contoh: Pastry Chef"
                  required
                />

                <FormField
                  label="Spesialisasi"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  placeholder="Contoh: Cookies & Pastry"
                  required
                />

                <FormField
                  label="Pengalaman"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Contoh: 8 tahun"
                />

                <FormField
                  label="Lokasi"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Contoh: Jakarta"
                />

                <FormField
                  label="Emoji"
                  name="emoji"
                  value={formData.emoji}
                  onChange={handleChange}
                  placeholder="👨‍🍳"
                />

                <FormField
                  label="Rating"
                  name="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={handleChange}
                />

                <FormField
                  label="Jumlah Reviews"
                  name="reviews"
                  type="number"
                  min="0"
                  value={formData.reviews}
                  onChange={handleChange}
                />

                <FormField
                  label="Jumlah Kelas"
                  name="classes"
                  type="number"
                  min="0"
                  value={formData.classes}
                  onChange={handleChange}
                />

                <FormField
                  label="Jumlah Students"
                  name="students"
                  type="number"
                  min="0"
                  value={formData.students}
                  onChange={handleChange}
                />

                <div>
                  <label className="mb-2 block text-xs font-bold text-[#756f66]">
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="active">
                      Aktif
                    </option>

                    <option value="inactive">
                      Tidak Aktif
                    </option>
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-xs font-bold text-[#756f66]">
                  Bio
                </label>

                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tulis bio singkat instruktur..."
                  rows={4}
                  className="form-input resize-none"
                />
              </div>

              {/* MODAL ACTION */}
              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full border border-[#ded7ca] px-6 py-3 text-sm font-bold"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="rounded-full bg-[#29251f] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  {editingId
                    ? 'Simpan Perubahan'
                    : 'Tambah Instruktur'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

/* =========================
   COMPONENTS
========================= */

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
  iconBg,
  iconColor,
}) {
  return (
    <div className="rounded-[24px] border border-[#e8e2d8] bg-white p-5 shadow-sm">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-2xl ${iconBg} ${iconColor}`}
      >
        <Icon size={20} />
      </div>

      <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-[#756f66]">
        {label}
      </p>

      <p className="mt-1 font-display text-4xl font-semibold tracking-tight">
        {value}
      </p>

      <p className="mt-2 text-xs text-[#756f66]">
        {description}
      </p>
    </div>
  )
}

function StatusBadge({ status }) {
  const isActive = status === 'active'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold ${
        isActive
          ? 'bg-[#dff3e7] text-[#3e7255]'
          : 'bg-[#f1eee8] text-[#756f66]'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isActive
            ? 'bg-[#4f8065]'
            : 'bg-[#9b948a]'
        }`}
      />

      {isActive ? 'Aktif' : 'Tidak Aktif'}
    </span>
  )
}

function MiniInfo({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl bg-[#f8f6f1] p-3">
      <Icon
        size={15}
        className="text-[#4f8065]"
      />

      <p className="mt-2 text-sm font-bold">
        {value}
      </p>

      <p className="mt-0.5 text-[10px] text-[#756f66]">
        {label}
      </p>
    </div>
  )
}

function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  min,
  max,
  step,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold text-[#756f66]">
        {label}
        {required && (
          <span className="ml-1 text-[#a95d6c]">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        step={step}
        className="form-input"
      />
    </div>
  )
}

function EmptyState() {
  return (
    <div className="px-5 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f8f6f1]">
        <ChefHat
          size={24}
          className="text-[#756f66]"
        />
      </div>

      <h3 className="mt-4 font-display text-xl font-semibold">
        Instruktur tidak ditemukan
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#756f66]">
        Coba ubah kata pencarian atau filter yang
        digunakan.
      </p>
    </div>
  )
}

export default AdminInstructorsPage