import recipes from './recipes'

const STORAGE_KEY = 'lapercakes-admin-recipes'

export function getAdminRecipes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (!saved) {
      const initialData = [...recipes]

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(initialData),
      )

      return initialData
    }

    return JSON.parse(saved)
  } catch (error) {
    console.error(
      'Gagal membaca data resep:',
      error,
    )

    return recipes
  }
}

export function saveAdminRecipes(recipeData) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(recipeData),
    )

    return recipeData
  } catch (error) {
    console.error(
      'Gagal menyimpan data resep:',
      error,
    )

    return recipeData
  }
}

export function addAdminRecipe(newRecipe) {
  const currentRecipes = getAdminRecipes()

  const recipe = {
    ...newRecipe,
    id: `recipe-${Date.now()}`,
  }

  const updatedRecipes = [
    ...currentRecipes,
    recipe,
  ]

  saveAdminRecipes(updatedRecipes)

  return updatedRecipes
}

export function updateAdminRecipe(
  id,
  updatedData,
) {
  const currentRecipes = getAdminRecipes()

  const updatedRecipes = currentRecipes.map(
    (recipe) =>
      String(recipe.id) === String(id)
        ? {
            ...recipe,
            ...updatedData,
          }
        : recipe,
  )

  saveAdminRecipes(updatedRecipes)

  return updatedRecipes
}

export function deleteAdminRecipe(id) {
  const currentRecipes = getAdminRecipes()

  const updatedRecipes = currentRecipes.filter(
    (recipe) =>
      String(recipe.id) !== String(id),
  )

  saveAdminRecipes(updatedRecipes)

  return updatedRecipes
}

export function resetAdminRecipes() {
  const initialData = [...recipes]

  saveAdminRecipes(initialData)

  return initialData
}