const STORAGE_KEY = 'lapercakes-recipes'

const getData = () => {
  const saved = localStorage.getItem(STORAGE_KEY)

  if (!saved) {
    const initialData = {
      purchased: [],
      wishlist: [],
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData))
    return initialData
  }

  return JSON.parse(saved)
}

const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const getRecipeData = () => {
  return getData()
}

export const getPurchasedRecipes = () => {
  return getData().purchased
}

export const isRecipePurchased = (id) => {
  return getData().purchased.includes(id)
}

export const purchaseRecipe = (id) => {
  const data = getData()

  if (!data.purchased.includes(id)) {
    data.purchased.push(id)
  }

  saveData(data)
}

export const getRecipeWishlist = () => {
  return getData().wishlist
}

export const toggleRecipeWishlist = (id) => {
  const data = getData()

  if (data.wishlist.includes(id)) {
    data.wishlist = data.wishlist.filter((item) => item !== id)
  } else {
    data.wishlist.push(id)
  }

  saveData(data)

  return data.wishlist
}