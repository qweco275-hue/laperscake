import { useMemo, useState } from 'react'
import {
  CalendarDays,
  Clock3,
  Edit3,
  Filter,
  Layers3,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  Users,
  X,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import MobileBottomNav from '../components/MobileBottomNav'

import {
  getClasses,
  addClass,
  updateClass,
  deleteClass,
  resetClasses,
} from '../data/classStorage'

const emptyForm = {
  name: '',
  date: '',
  time: '',
  mode: 'Online',
  category: 'Cookies',
  audience: 'All Ages',
  ageLabel: '5-14 tahun',
  level: 'Beginner',
  price: '',
  remaining: '',
  rating: '5',
  reviews: '0',
  instructor: '',
  instructorRole: 'Baking Instructor',
  description: '',
  longDescription: '',
  highlights: '',
  ingredients: '',
  equipment: '',
  curriculum: '',
}

const categories = [
  'Cookies',
  'Cake',
  'Bread',
  'Pastry',
  'Dessert',
  'Workshop',
  'Other',
]

const levels = [
  'Beginner',
  'Intermediate',
  'Advanced',
]

const audiences = [
  'Kids',
  'Family',
  'All Ages',
  'Adult/18+',
]

function AdminClassesPage() {
  const [classes, setClasses] = useState(() => getClasses())

  const [search, setSearch] = useState('')
  const [modeFilter, setModeFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')

  const [showFilters, setShowFilters] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState(emptyForm)

  const filteredClasses = useMemo(() => {
    const keyword = search.toLowerCase().trim()

    return classes
      .filter((item) => {
        const matchesSearch =
          !keyword ||
          item.name?.toLowerCase().includes(keyword) ||
          item.instructor?.toLowerCase().includes(keyword)

        const matchesMode =
          modeFilter === 'All' ||
          item.mode === modeFilter

        const matchesCategory =
          categoryFilter === 'All' ||
          item.category === categoryFilter

        return (
          matchesSearch &&
          matchesMode &&
          matchesCategory
        )
      })
      .sort((a, b) => {
        return (
          new Date(a.date || 0) -
          new Date(b.date || 0)
        )
      })
  }, [
    classes,
    search,
    modeFilter,
    categoryFilter,
  ])

  const onlineCount = classes.filter(
    (item) => item.mode === 'Online',
  ).length

  const offlineCount = classes.filter(
    (item) => item.mode === 'Offline',
  ).length

  const instructorCount = new Set(
    classes
      .map((item) => item.instructor)
      .filter(Boolean),
  ).size

  function refreshClasses() {
    setClasses(getClasses())
  }

  function openAddModal() {
    setEditingId(null)
    setFormData({
      ...emptyForm,
    })
    setShowModal(true)
  }

  function openEditModal(item) {
    setEditingId(item.id)

    setFormData({
      ...emptyForm,
      ...item,
      highlights: Array.isArray(item.highlights)
        ? item.highlights.join('\n')
        : item.highlights || '',
      ingredients: Array.isArray(item.ingredients)
        ? item.ingredients.join('\n')
        : item.ingredients || '',
      equipment: Array.isArray(item.equipment)
        ? item.equipment.join('\n')
        : item.equipment || '',
      curriculum: Array.isArray(item.curriculum)
        ? item.curriculum.join('\n')
        : item.curriculum || '',
    })

    setShowModal(true)
  }

  function closeModal() {
    setShowModal(false)
    setEditingId(null)
    setFormData({
      ...emptyForm,
    })
  }

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function convertList(value) {
    return value
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!formData.name.trim()) {
      alert('Nama kelas wajib diisi.')
      return
    }

    if (!formData.date) {
      alert('Tanggal kelas wajib diisi.')
      return
    }

    if (!formData.time.trim()) {
      alert('Jam kelas wajib diisi.')
      return
    }

    if (!formData.instructor.trim()) {
      alert('Nama instruktur wajib diisi.')
      return
    }

    const payload = {
      ...formData,

      price: Number(formData.price || 0),
      remaining: Number(formData.remaining || 0),
      rating: Number(formData.rating || 0),
      reviews: Number(formData.reviews || 0),

      highlights: convertList(
        formData.highlights,
      ),

      ingredients: convertList(
        formData.ingredients,
      ),

      equipment: convertList(
        formData.equipment,
      ),

      curriculum: convertList(
        formData.curriculum,
      ),
    }

    if (editingId) {
      updateClass(editingId, payload)
    } else {
      addClass(payload)
    }

    refreshClasses()
    closeModal()
  }

  function handleDelete(item) {
    const confirmed = window.confirm(
      `Hapus kelas "${item.name}"?`,
    )

    if (!confirmed) return

    deleteClass(item.id)
    refreshClasses()
  }

  function handleReset() {
    const confirmed = window.confirm(
      'Reset semua data kelas ke data awal?',
    )

    if (!confirmed) return

    resetClasses()
    refreshClasses()
  }

  function resetFilters() {
    setSearch('')
    setModeFilter('All')
    setCategoryFilter('All')
  }

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#29251f]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-28 pt-28 sm:px-6 lg:px-8 lg:pb-12">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold text-[#4f8065]">
              Admin Management
            </p>

            <h1 className="font-display text-4xl font-semibold">
              Kelola Kelas
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#756f66]">
              Tambahkan, edit, dan kelola seluruh kelas
              baking LaperCakes.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-2xl border border-[#ebe5da] bg-white px-4 py-3 text-sm font-semibold hover:bg-[#faf8f2]"
            >
              <RotateCcw size={17} />
              Reset Data
            </button>

            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#29251f] px-5 py-3 text-sm font-semibold text-white hover:bg-[#3a342c]"
            >
              <Plus size={18} />
              Tambah Kelas
            </button>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <SummaryCard
            label="Total Kelas"
            value={classes.length}
            icon={<Layers3 size={19} />}
          />

          <SummaryCard
            label="Online"
            value={onlineCount}
            icon={<span>⌁</span>}
          />

          <SummaryCard
            label="Offline"
            value={offlineCount}
            icon={<span>⌂</span>}
          />

          <SummaryCard
            label="Instruktur"
            value={instructorCount}
            icon={<Users size={19} />}
          />
        </div>

        <div className="mb-5 rounded-3xl border border-[#ebe5da] bg-white p-4">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa39a]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Cari kelas atau instruktur..."
                className="form-input pl-11"
              />
            </div>

            <button
              type="button"
              onClick={() =>
                setShowFilters(!showFilters)
              }
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#ebe5da] px-5 py-3 text-sm font-semibold hover:bg-[#faf8f2]"
            >
              <Filter size={17} />
              Filter
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 grid gap-4 border-t border-[#ebe5da] pt-4 sm:grid-cols-2">
              <FilterSelect
                label="Mode"
                value={modeFilter}
                onChange={setModeFilter}
                options={[
                  'All',
                  'Online',
                  'Offline',
                ]}
              />

              <FilterSelect
                label="Kategori"
                value={categoryFilter}
                onChange={setCategoryFilter}
                options={[
                  'All',
                  ...categories,
                ]}
              />
            </div>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-[#756f66]">
            Menampilkan{' '}
            <strong className="text-[#29251f]">
              {filteredClasses.length}
            </strong>{' '}
            kelas
          </p>

          {(search ||
            modeFilter !== 'All' ||
            categoryFilter !== 'All') && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-semibold text-[#a95d6c]"
            >
              Reset filter
            </button>
          )}
        </div>

        <div className="hidden overflow-hidden rounded-3xl border border-[#ebe5da] bg-white lg:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-[#ebe5da] bg-[#faf8f2] text-left">
                  <th className="px-6 py-4 text-xs uppercase tracking-wider text-[#756f66]">
                    Kelas
                  </th>

                  <th className="px-6 py-4 text-xs uppercase tracking-wider text-[#756f66]">
                    Jadwal
                  </th>

                  <th className="px-6 py-4 text-xs uppercase tracking-wider text-[#756f66]">
                    Mode
                  </th>

                  <th className="px-6 py-4 text-xs uppercase tracking-wider text-[#756f66]">
                    Instruktur
                  </th>

                  <th className="px-6 py-4 text-xs uppercase tracking-wider text-[#756f66]">
                    Harga
                  </th>

                  <th className="px-6 py-4 text-xs uppercase tracking-wider text-[#756f66]">
                    Kuota
                  </th>

                  <th className="px-6 py-4 text-right text-xs uppercase tracking-wider text-[#756f66]">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredClasses.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#f0ebe2] last:border-0 hover:bg-[#fffdf7]"
                  >
                    <td className="px-6 py-5">
                      <p className="font-semibold">
                        {item.name}
                      </p>

                      <div className="mt-2 flex gap-2">
                        <Badge>
                          {item.category}
                        </Badge>

                        <Badge>
                          {item.level}
                        </Badge>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <p className="font-semibold">
                        {formatDate(item.date)}
                      </p>

                      <p className="mt-1 flex items-center gap-1 text-sm text-[#756f66]">
                        <Clock3 size={14} />
                        {item.time}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <ModeBadge
                        mode={item.mode}
                      />
                    </td>

                    <td className="px-6 py-5">
                      <p className="font-medium">
                        {item.instructor || '-'}
                      </p>

                      <p className="mt-1 text-xs text-[#756f66]">
                        {item.instructorRole || 'Instructor'}
                      </p>
                    </td>

                    <td className="px-6 py-5 font-semibold">
                      {formatCurrency(item.price)}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          Number(item.remaining) <= 2
                            ? 'bg-[#fbecef] text-[#a95d6c]'
                            : 'bg-[#edf7f1] text-[#4f8065]'
                        }`}
                      >
                        {item.remaining ?? 0}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(item)
                          }
                          className="rounded-xl border border-[#ebe5da] p-2.5 hover:bg-[#faf8f2]"
                        >
                          <Edit3 size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(item)
                          }
                          className="rounded-xl border border-[#f0d8dd] p-2.5 text-[#a95d6c] hover:bg-[#fdf3f5]"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredClasses.length === 0 && (
            <EmptyState
              onReset={resetFilters}
            />
          )}
        </div>

        <div className="space-y-3 lg:hidden">
          {filteredClasses.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-[#ebe5da] bg-white p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold">
                    {item.name}
                  </h2>

                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge>
                      {item.category}
                    </Badge>

                    <Badge>
                      {item.level}
                    </Badge>

                    <ModeBadge
                      mode={item.mode}
                    />
                  </div>
                </div>

                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      openEditModal(item)
                    }
                    className="rounded-xl border border-[#ebe5da] p-2"
                  >
                    <Edit3 size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(item)
                    }
                    className="rounded-xl border border-[#f0d8dd] p-2 text-[#a95d6c]"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <InfoItem
                  icon={<CalendarDays size={15} />}
                  label="Tanggal"
                  value={formatDate(item.date)}
                />

                <InfoItem
                  icon={<Clock3 size={15} />}
                  label="Jam"
                  value={item.time || '-'}
                />

                <InfoItem
                  icon={<Users size={15} />}
                  label="Instruktur"
                  value={item.instructor || '-'}
                />

                <InfoItem
                  icon={<span>Rp</span>}
                  label="Harga"
                  value={formatCurrency(item.price)}
                />
              </div>

              <div className="mt-4 flex justify-between rounded-2xl bg-[#faf8f2] px-4 py-3">
                <span className="text-sm text-[#756f66]">
                  Kuota tersisa
                </span>

                <strong className="text-sm">
                  {item.remaining ?? 0}
                </strong>
              </div>
            </div>
          ))}

          {filteredClasses.length === 0 && (
            <div className="rounded-3xl border border-[#ebe5da] bg-white">
              <EmptyState
                onReset={resetFilters}
              />
            </div>
          )}
        </div>
      </main>

      <MobileBottomNav />

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#29251f]/50 p-4">
          <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white">
            <div className="flex items-center justify-between border-b border-[#ebe5da] px-6 py-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#4f8065]">
                  Admin
                </p>

                <h2 className="mt-1 font-display text-2xl font-semibold">
                  {editingId
                    ? 'Edit Kelas'
                    : 'Tambah Kelas'}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl p-2 hover:bg-[#faf8f2]"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto p-6"
            >
              <div className="space-y-8">
                <FormSection
                  title="Informasi Dasar"
                  description="Informasi utama kelas."
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      label="Nama kelas"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Classic Cookies Masterclass"
                      required
                      className="sm:col-span-2"
                    />

                    <FormField
                      label="Tanggal"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />

                    <FormField
                      label="Jam"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      placeholder="10:00-12:00"
                      required
                    />

                    <SelectField
                      label="Mode"
                      name="mode"
                      value={formData.mode}
                      onChange={handleChange}
                      options={[
                        'Online',
                        'Offline',
                      ]}
                    />

                    <SelectField
                      label="Kategori"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      options={categories}
                    />

                    <SelectField
                      label="Level"
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      options={levels}
                    />

                    <SelectField
                      label="Audience"
                      name="audience"
                      value={formData.audience}
                      onChange={handleChange}
                      options={audiences}
                    />

                    <FormField
                      label="Age label"
                      name="ageLabel"
                      value={formData.ageLabel}
                      onChange={handleChange}
                      placeholder="5-14 tahun"
                    />
                  </div>
                </FormSection>

                <FormSection
                  title="Instruktur"
                  description="Informasi instruktur."
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      label="Nama instruktur"
                      name="instructor"
                      value={formData.instructor}
                      onChange={handleChange}
                      placeholder="Chef Anasya"
                      required
                    />

                    <FormField
                      label="Role instruktur"
                      name="instructorRole"
                      value={formData.instructorRole}
                      onChange={handleChange}
                      placeholder="Pastry Chef"
                    />
                  </div>
                </FormSection>

                <FormSection
                  title="Harga & Kuota"
                  description="Atur harga dan kuota kelas."
                >
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <FormField
                      label="Harga"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="150000"
                      min="0"
                    />

                    <FormField
                      label="Kuota"
                      name="remaining"
                      type="number"
                      value={formData.remaining}
                      onChange={handleChange}
                      placeholder="10"
                      min="0"
                    />

                    <FormField
                      label="Rating"
                      name="rating"
                      type="number"
                      value={formData.rating}
                      onChange={handleChange}
                      min="0"
                      max="5"
                      step="0.1"
                    />

                    <FormField
                      label="Reviews"
                      name="reviews"
                      type="number"
                      value={formData.reviews}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                </FormSection>

                <FormSection
                  title="Deskripsi"
                  description="Informasi yang akan dibaca peserta."
                >
                  <div className="space-y-4">
                    <TextAreaField
                      label="Deskripsi singkat"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Tulis deskripsi singkat kelas..."
                    />

                    <TextAreaField
                      label="Deskripsi lengkap"
                      name="longDescription"
                      value={formData.longDescription}
                      onChange={handleChange}
                      placeholder="Jelaskan pengalaman belajar dan materi kelas..."
                    />
                  </div>
                </FormSection>

                <FormSection
                  title="Detail Kelas"
                  description="Satu item per baris."
                >
                  <div className="grid gap-4 lg:grid-cols-2">
                    <TextAreaField
                      label="Highlights"
                      name="highlights"
                      value={formData.highlights}
                      onChange={handleChange}
                      placeholder={
                        'Belajar teknik dasar\nResep lengkap\nPraktik bersama chef'
                      }
                    />

                    <TextAreaField
                      label="Ingredients"
                      name="ingredients"
                      value={formData.ingredients}
                      onChange={handleChange}
                      placeholder={
                        'Tepung\nButter\nGula\nTelur'
                      }
                    />

                    <TextAreaField
                      label="Equipment"
                      name="equipment"
                      value={formData.equipment}
                      onChange={handleChange}
                      placeholder={
                        'Oven\nMixer\nSpatula\nBowl'
                      }
                    />

                    <TextAreaField
                      label="Curriculum"
                      name="curriculum"
                      value={formData.curriculum}
                      onChange={handleChange}
                      placeholder={
                        'Introduction\nPreparation\nBaking\nFinishing'
                      }
                    />
                  </div>
                </FormSection>
              </div>

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#ebe5da] pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-2xl border border-[#ebe5da] px-5 py-3 text-sm font-semibold hover:bg-[#faf8f2]"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#29251f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3a342c]"
                >
                  <Plus size={17} />

                  {editingId
                    ? 'Simpan Perubahan'
                    : 'Tambah Kelas'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function SummaryCard({
  label,
  value,
  icon,
}) {
  return (
    <div className="rounded-3xl border border-[#ebe5da] bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#756f66]">
            {label}
          </p>

          <p className="mt-2 font-display text-3xl font-semibold">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#fff4d8] text-[#c99624]">
          {icon}
        </div>
      </div>
    </div>
  )
}

function Badge({ children }) {
  return (
    <span className="rounded-full bg-[#f5f1e9] px-2.5 py-1 text-[11px] font-semibold text-[#756f66]">
      {children}
    </span>
  )
}

function ModeBadge({ mode }) {
  return (
    <span
      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
        mode === 'Online'
          ? 'bg-[#edf7f1] text-[#4f8065]'
          : 'bg-[#fff4d8] text-[#9a741f]'
      }`}
    >
      {mode}
    </span>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <label>
      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#756f66]">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="form-input"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option === 'All'
              ? 'Semua'
              : option}
          </option>
        ))}
      </select>
    </label>
  )
}

function InfoItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl bg-[#faf8f2] p-3">
      <div className="flex items-center gap-2 text-[#756f66]">
        {icon}

        <span className="text-xs">
          {label}
        </span>
      </div>

      <p className="mt-1 truncate text-sm font-semibold">
        {value}
      </p>
    </div>
  )
}

function EmptyState({ onReset }) {
  return (
    <div className="py-16 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#faf8f2]">
        <Search size={22} />
      </div>

      <h3 className="font-display text-xl font-semibold">
        Kelas tidak ditemukan
      </h3>

      <p className="mt-2 text-sm text-[#756f66]">
        Coba ubah pencarian atau filter.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-5 rounded-xl bg-[#29251f] px-4 py-2.5 text-sm font-semibold text-white"
      >
        Reset Filter
      </button>
    </div>
  )
}

function FormSection({
  title,
  description,
  children,
}) {
  return (
    <section>
      <div className="mb-4">
        <h3 className="font-semibold">
          {title}
        </h3>

        <p className="mt-1 text-sm text-[#756f66]">
          {description}
        </p>
      </div>

      {children}
    </section>
  )
}

function FormField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  min,
  max,
  step,
  className = '',
}) {
  return (
    <label className={className}>
      <span className="mb-2 block text-sm font-semibold">
        {label}

        {required && (
          <span className="ml-1 text-[#a95d6c]">
            *
          </span>
        )}
      </span>

      <input
        type={type}
        name={name}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        step={step}
        className="form-input"
      />
    </label>
  )
}

function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-semibold">
        {label}
      </span>

      <textarea
        name={name}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        rows={5}
        className="form-input resize-y"
      />
    </label>
  )
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-semibold">
        {label}
      </span>

      <select
        name={name}
        value={value ?? ''}
        onChange={onChange}
        className="form-input"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

function formatCurrency(value) {
  return new Intl.NumberFormat(
    'id-ID',
    {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    },
  ).format(Number(value || 0))
}

function formatDate(value) {
  if (!value) return '-'

  return new Intl.DateTimeFormat(
    'id-ID',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    },
  ).format(
    new Date(`${value}T00:00:00`),
  )
}

export default AdminClassesPage