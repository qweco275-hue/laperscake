import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  BookOpen,
  Star,
  Clock3,
  RotateCcw,
  Eye,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import MobileBottomNav from '../components/MobileBottomNav'

import {
  getAdminRecipes,
  addAdminRecipe,
  updateAdminRecipe,
  deleteAdminRecipe,
  resetAdminRecipes,
} from '../data/recipeAdminStorage'

function AdminRecipesPage() {
  const [recipeList, setRecipeList] = useState(
    () => getAdminRecipes(),
  )

  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] =
    useState('all')
  const [categoryFilter, setCategoryFilter] =
    useState('all')

  const [modalOpen, setModalOpen] =
    useState(false)

  const [detailRecipe, setDetailRecipe] =
    useState(null)

  const [editingRecipe, setEditingRecipe] =
    useState(null)

  const [deleteTarget, setDeleteTarget] =
    useState(null)

  const filteredRecipes = useMemo(() => {
    const keyword = search
      .toLowerCase()
      .trim()

    return recipeList.filter((recipe) => {
      const matchesSearch =
        !keyword ||
        String(recipe.title || '')
          .toLowerCase()
          .includes(keyword) ||
        String(recipe.description || '')
          .toLowerCase()
          .includes(keyword) ||
        String(recipe.category || '')
          .toLowerCase()
          .includes(keyword)

      const matchesType =
        typeFilter === 'all' ||
        String(recipe.type || '')
          .toLowerCase() ===
          typeFilter.toLowerCase()

      const matchesCategory =
        categoryFilter === 'all' ||
        String(recipe.category || '')
          .toLowerCase() ===
          categoryFilter.toLowerCase()

      return (
        matchesSearch &&
        matchesType &&
        matchesCategory
      )
    })
  }, [
    recipeList,
    search,
    typeFilter,
    categoryFilter,
  ])

  const statistics = useMemo(() => {
    const total = recipeList.length

    const free = recipeList.filter(
      (recipe) =>
        String(recipe.type || '')
          .toLowerCase() === 'free',
    ).length

    const ebook = recipeList.filter(
      (recipe) =>
        String(recipe.type || '')
          .toLowerCase() === 'e-book',
    ).length

    const premium = recipeList.filter(
      (recipe) =>
        String(recipe.type || '')
          .toLowerCase() === 'premium',
    ).length

    return {
      total,
      free,
      ebook,
      premium,
    }
  }, [recipeList])

  const categories = useMemo(() => {
    return [
      ...new Set(
        recipeList
          .map((recipe) => recipe.category)
          .filter(Boolean),
      ),
    ]
  }, [recipeList])

  function openAddModal() {
    setEditingRecipe(null)
    setModalOpen(true)
  }

  function openEditModal(recipe) {
    setEditingRecipe(recipe)
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setEditingRecipe(null)
  }

  function handleSave(formData) {
    if (editingRecipe) {
      const updated = updateAdminRecipe(
        editingRecipe.id,
        formData,
      )

      setRecipeList(updated)
    } else {
      const updated = addAdminRecipe(
        formData,
      )

      setRecipeList(updated)
    }

    closeModal()
  }

  function handleDelete() {
    if (!deleteTarget) return

    const updated = deleteAdminRecipe(
      deleteTarget.id,
    )

    setRecipeList(updated)
    setDeleteTarget(null)
  }

  function handleReset() {
    const confirmed = window.confirm(
      'Reset semua resep ke data awal?',
    )

    if (!confirmed) return

    const updated = resetAdminRecipes()

    setRecipeList(updated)
  }

  function formatPrice(price) {
    if (!price || Number(price) === 0) {
      return 'Gratis'
    }

    return `Rp ${Number(price).toLocaleString(
      'id-ID',
    )}`
  }

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/admin"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#756F66] transition hover:text-[#29251F]"
          >
            <ArrowLeft size={17} />
            Kembali ke Admin Dashboard
          </Link>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#C99624]">
                Admin Panel
              </p>

              <h1 className="font-display text-4xl font-semibold text-[#29251F] sm:text-5xl">
                Recipes
              </h1>

              <p className="mt-3 max-w-2xl text-[#756F66]">
                Kelola resep, e-book, dan konten
                premium LaperCakes.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#EBE5DA] bg-white px-4 py-3 text-sm font-bold text-[#756F66] transition hover:border-[#C99624] hover:bg-[#FFF8E8]"
              >
                <RotateCcw size={17} />
                Reset
              </button>

              <button
                type="button"
                onClick={openAddModal}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#29251F] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#403A31]"
              >
                <Plus size={18} />
                Tambah Resep
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            icon={<BookOpen size={20} />}
            label="Total Resep"
            value={statistics.total}
          />

          <SummaryCard
            icon={<BookOpen size={20} />}
            label="Free"
            value={statistics.free}
          />

          <SummaryCard
            icon={<BookOpen size={20} />}
            label="E-book"
            value={statistics.ebook}
          />

          <SummaryCard
            icon={<Star size={20} />}
            label="Premium"
            value={statistics.premium}
          />
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-3xl border border-[#EBE5DA] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAA39A]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Cari resep..."
                className="form-input pl-11"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(event.target.value)
              }
              className="form-input lg:max-w-[200px]"
            >
              <option value="all">
                Semua Tipe
              </option>
              <option value="free">
                Free
              </option>
              <option value="e-book">
                E-book
              </option>
              <option value="premium">
                Premium
              </option>
            </select>

            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(
                  event.target.value,
                )
              }
              className="form-input lg:max-w-[200px]"
            >
              <option value="all">
                Semua Kategori
              </option>

              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-hidden rounded-3xl border border-[#EBE5DA] bg-white shadow-sm lg:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-[#EBE5DA] bg-[#FFFCF5] text-left">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#756F66]">
                    Recipe
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#756F66]">
                    Type
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#756F66]">
                    Category
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#756F66]">
                    Rating
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#756F66]">
                    Price
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-[#756F66]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredRecipes.map(
                  (recipe) => (
                    <tr
                      key={recipe.id}
                      className="border-b border-[#F1ECE3] last:border-0"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#FFF6DD] text-3xl">
                            {recipe.emoji || '🍰'}
                          </div>

                          <div className="min-w-0">
                            <p className="font-semibold text-[#29251F]">
                              {recipe.title}
                            </p>

                            <p className="mt-1 max-w-sm truncate text-sm text-[#756F66]">
                              {recipe.description ||
                                'Belum ada deskripsi.'}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <TypeBadge
                          type={recipe.type}
                        />
                      </td>

                      <td className="px-6 py-5">
                        <span className="rounded-full bg-[#F4F1EB] px-3 py-1.5 text-xs font-semibold text-[#756F66]">
                          {recipe.category ||
                            '-'}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-1.5">
                          <Star
                            size={15}
                            className="fill-current text-[#C99624]"
                          />

                          <span className="font-semibold text-[#29251F]">
                            {recipe.rating ||
                              '-'}
                          </span>

                          <span className="text-xs text-[#AAA39A]">
                            ({recipe.reviews ||
                              0})
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className="font-semibold text-[#29251F]">
                          {formatPrice(
                            recipe.price,
                          )}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setDetailRecipe(
                                recipe,
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#EBE5DA] text-[#756F66] transition hover:border-[#C99624] hover:bg-[#FFF8E8]"
                            title="Detail"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(
                                recipe,
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#EBE5DA] text-[#756F66] transition hover:border-[#C99624] hover:bg-[#FFF8E8]"
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setDeleteTarget(
                                recipe,
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#F0D9D9] text-[#A95D6C] transition hover:bg-[#FFF1F1]"
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

          {filteredRecipes.length === 0 && (
            <EmptyState />
          )}
        </div>

        {/* Mobile */}
        <div className="space-y-4 lg:hidden">
          {filteredRecipes.map(
            (recipe) => (
              <div
                key={recipe.id}
                className="rounded-3xl border border-[#EBE5DA] bg-white p-5 shadow-sm"
              >
                <div className="flex gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#FFF6DD] text-3xl">
                    {recipe.emoji || '🍰'}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-xl font-semibold text-[#29251F]">
                      {recipe.title}
                    </h3>

                    <p className="mt-1 text-sm text-[#756F66]">
                      {recipe.category ||
                        'Uncategorized'}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <TypeBadge
                        type={recipe.type}
                      />

                      <span className="flex items-center gap-1 rounded-full bg-[#FFF6DD] px-3 py-1 text-xs font-semibold text-[#966D0C]">
                        <Star
                          size={12}
                          className="fill-current"
                        />
                        {recipe.rating ||
                          '-'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="my-5 h-px bg-[#F1ECE3]" />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#AAA39A]">
                      Harga
                    </p>

                    <p className="mt-1 font-semibold text-[#29251F]">
                      {formatPrice(
                        recipe.price,
                      )}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setDetailRecipe(
                          recipe,
                        )
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#EBE5DA] text-[#756F66]"
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        openEditModal(recipe)
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#EBE5DA] text-[#756F66]"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setDeleteTarget(
                          recipe,
                        )
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#F0D9D9] text-[#A95D6C]"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              </div>
            ),
          )}

          {filteredRecipes.length === 0 && (
            <div className="rounded-3xl border border-[#EBE5DA] bg-white">
              <EmptyState />
            </div>
          )}
        </div>
      </main>

      <MobileBottomNav />

      {/* Add / Edit Modal */}
      {modalOpen && (
        <RecipeFormModal
          recipe={editingRecipe}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}

      {/* Detail Modal */}
      {detailRecipe && (
        <RecipeDetailModal
          recipe={detailRecipe}
          onClose={() =>
            setDetailRecipe(null)
          }
        />
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#29251F]/45 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#A95D6C]">
                  Hapus Resep
                </p>

                <h2 className="mt-2 font-display text-2xl font-semibold text-[#29251F]">
                  Yakin ingin menghapus?
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setDeleteTarget(null)
                }
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#EBE5DA]"
              >
                <X size={17} />
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-[#756F66]">
              Resep{' '}
              <strong className="text-[#29251F]">
                {deleteTarget.title}
              </strong>{' '}
              akan dihapus dari data admin.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() =>
                  setDeleteTarget(null)
                }
                className="flex-1 rounded-2xl border border-[#EBE5DA] px-4 py-3 text-sm font-bold text-[#756F66]"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 rounded-2xl bg-[#A95D6C] px-4 py-3 text-sm font-bold text-white"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SummaryCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-3xl border border-[#EBE5DA] bg-white p-5 shadow-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFF6DD] text-[#C99624]">
        {icon}
      </div>

      <p className="text-sm text-[#756F66]">
        {label}
      </p>

      <p className="mt-1 font-display text-2xl font-semibold text-[#29251F]">
        {value}
      </p>
    </div>
  )
}

function TypeBadge({ type }) {
  const normalized = String(
    type || '',
  ).toLowerCase()

  let className =
    'bg-[#F2F0EC] text-[#756F66]'

  if (normalized === 'free') {
    className =
      'bg-[#E7F5EC] text-[#3E7655]'
  }

  if (normalized === 'premium') {
    className =
      'bg-[#FFF0C4] text-[#966D0C]'
  }

  if (normalized === 'e-book') {
    className =
      'bg-[#F6E8EC] text-[#A95D6C]'
  }

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${className}`}
    >
      {type || 'Free'}
    </span>
  )
}

function RecipeFormModal({
  recipe,
  onClose,
  onSave,
}) {
  const [formData, setFormData] =
    useState(() => ({
      title: recipe?.title || '',
      description:
        recipe?.description || '',
      category:
        recipe?.category || 'Cookies',
      type: recipe?.type || 'Free',
      level:
        recipe?.level || 'Beginner',
      duration:
        recipe?.duration || '',
      rating: recipe?.rating || 5,
      reviews: recipe?.reviews || 0,
      price: recipe?.price || 0,
      emoji: recipe?.emoji || '🍰',
    }))

  function handleChange(event) {
    const {
      name,
      value,
    } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    onSave({
      ...formData,
      rating: Number(formData.rating),
      reviews: Number(formData.reviews),
      price: Number(formData.price),
    })
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#29251F]/45 p-4 backdrop-blur-sm">
      <div className="mx-auto my-6 w-full max-w-2xl rounded-[2rem] bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-[2rem] border-b border-[#EBE5DA] bg-white px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#C99624]">
              {recipe
                ? 'Edit Recipe'
                : 'New Recipe'}
            </p>

            <h2 className="mt-1 font-display text-2xl font-semibold text-[#29251F]">
              {recipe
                ? 'Edit Resep'
                : 'Tambah Resep'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EBE5DA] text-[#756F66]"
          >
            <X size={19} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          <FormField
            label="Nama Resep"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Contoh: Classic Chocolate Cake"
            required
          />

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#29251F]">
              Deskripsi
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Deskripsi singkat resep..."
              rows={4}
              className="form-input resize-none"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              label="Kategori"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={[
                'Cookies',
                'Bread',
                'Cake',
                'Pastry',
                'Dessert',
              ]}
            />

            <SelectField
              label="Tipe"
              name="type"
              value={formData.type}
              onChange={handleChange}
              options={[
                'Free',
                'E-book',
                'Premium',
              ]}
            />

            <SelectField
              label="Level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              options={[
                'Beginner',
                'Intermediate',
                'Advanced',
              ]}
            />

            <FormField
              label="Durasi"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="45 menit"
            />

            <FormField
              label="Harga"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="0"
            />

            <FormField
              label="Emoji"
              name="emoji"
              value={formData.emoji}
              onChange={handleChange}
              placeholder="🍰"
            />

            <FormField
              label="Rating"
              name="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
            />

            <FormField
              label="Jumlah Review"
              name="reviews"
              type="number"
              min="0"
              value={formData.reviews}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-[#EBE5DA] px-5 py-3 text-sm font-bold text-[#756F66]"
            >
              Batal
            </button>

            <button
              type="submit"
              className="rounded-2xl bg-[#29251F] px-6 py-3 text-sm font-bold text-white"
            >
              {recipe
                ? 'Simpan Perubahan'
                : 'Tambah Resep'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function RecipeDetailModal({
  recipe,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#29251F]/45 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#EBE5DA] px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#C99624]">
              Recipe Detail
            </p>

            <h2 className="mt-1 font-display text-2xl font-semibold text-[#29251F]">
              {recipe.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EBE5DA]"
          >
            <X size={19} />
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div className="flex items-center gap-4 rounded-3xl bg-[#FFFCF5] p-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#FFF6DD] text-5xl">
              {recipe.emoji || '🍰'}
            </div>

            <div>
              <TypeBadge
                type={recipe.type}
              />

              <p className="mt-2 text-sm text-[#756F66]">
                {recipe.category} ·{' '}
                {recipe.level}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold text-[#29251F]">
              Deskripsi
            </h3>

            <p className="mt-2 text-sm leading-7 text-[#756F66]">
              {recipe.description ||
                'Belum ada deskripsi.'}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <InfoBox
              icon={<Star size={17} />}
              label="Rating"
              value={`${recipe.rating || '-'} (${recipe.reviews || 0})`}
            />

            <InfoBox
              icon={<Clock3 size={17} />}
              label="Durasi"
              value={recipe.duration || '-'}
            />

            <InfoBox
              icon={<BookOpen size={17} />}
              label="Harga"
              value={
                recipe.price
                  ? `Rp ${Number(
                      recipe.price,
                    ).toLocaleString(
                      'id-ID',
                    )}`
                  : 'Gratis'
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoBox({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-[#EBE5DA] p-4">
      <div className="mb-2 text-[#C99624]">
        {icon}
      </div>

      <p className="text-xs text-[#AAA39A]">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-[#29251F]">
        {value}
      </p>
    </div>
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
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#29251F]">
        {label}
      </label>

      <input
        name={name}
        type={type}
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

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#29251F]">
        {label}
      </label>

      <select
        name={name}
        value={value}
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
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF6DD] text-[#C99624]">
        <BookOpen size={27} />
      </div>

      <h3 className="mt-5 font-display text-2xl font-semibold text-[#29251F]">
        Resep tidak ditemukan
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-[#756F66]">
        Coba ubah kata pencarian atau filter
        yang digunakan.
      </p>
    </div>
  )
}

export default AdminRecipesPage