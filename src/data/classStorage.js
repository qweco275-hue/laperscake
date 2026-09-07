import defaultClasses from './classes'

const STORAGE_KEY = 'lapercakes-classes'

function notifyClassUpdate() {
  window.dispatchEvent(new Event('classesUpdated'))
  window.dispatchEvent(new Event('storage'))
}

export function getClasses() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (!saved) {
      const initialData = [...defaultClasses]

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(initialData),
      )

      return initialData
    }

    const parsed = JSON.parse(saved)

    if (!Array.isArray(parsed)) {
      const initialData = [...defaultClasses]

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(initialData),
      )

      return initialData
    }

    return parsed
  } catch (error) {
    console.error(
      'Gagal membaca data kelas:',
      error,
    )

    return [...defaultClasses]
  }
}

export function saveClasses(classes) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(classes),
    )

    notifyClassUpdate()

    return classes
  } catch (error) {
    console.error(
      'Gagal menyimpan data kelas:',
      error,
    )

    return classes
  }
}

export function addClass(newClass) {
  const classes = getClasses()

  const newItem = {
    ...newClass,
    id:
      newClass.id ||
      `class-${Date.now()}`,
  }

  const updatedClasses = [
    ...classes,
    newItem,
  ]

  saveClasses(updatedClasses)

  return newItem
}

export function updateClass(
  id,
  updatedData,
) {
  const classes = getClasses()

  const updatedClasses = classes.map(
    (item) =>
      String(item.id) === String(id)
        ? {
            ...item,
            ...updatedData,
          }
        : item,
  )

  saveClasses(updatedClasses)

  return updatedClasses.find(
    (item) =>
      String(item.id) === String(id),
  )
}

export function deleteClass(id) {
  const classes = getClasses()

  const updatedClasses =
    classes.filter(
      (item) =>
        String(item.id) !== String(id),
    )

  saveClasses(updatedClasses)

  return updatedClasses
}

export function resetClasses() {
  const initialData = [
    ...defaultClasses,
  ]

  saveClasses(initialData)

  return initialData
}