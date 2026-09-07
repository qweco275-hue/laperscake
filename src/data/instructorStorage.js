const STORAGE_KEY = 'lapercakes-instructors'

const defaultInstructors = [
  {
    id: 'chef-anasya',
    name: 'Chef Anasya',
    role: 'Pastry Chef',
    specialty: 'Cookies & Pastry',
    experience: '8 tahun',
    rating: 4.9,
    reviews: 86,
    classes: 12,
    students: 340,
    location: 'Jakarta',
    status: 'active',
    emoji: '👩‍🍳',
    bio: 'Pastry chef yang fokus pada teknik baking modern dan resep yang mudah dipraktikkan oleh pemula.',
  },
  {
    id: 'chef-rara',
    name: 'Chef Rara',
    role: 'Cake Artist',
    specialty: 'Cake Decoration',
    experience: '7 tahun',
    rating: 4.8,
    reviews: 64,
    classes: 9,
    students: 275,
    location: 'Bandung',
    status: 'active',
    emoji: '👩🏻‍🍳',
    bio: 'Cake artist dengan spesialisasi dekorasi cake, buttercream, dan teknik menghias kue untuk berbagai level.',
  },
  {
    id: 'chef-bima',
    name: 'Chef Bima',
    role: 'Bread Specialist',
    specialty: 'Sourdough & Bread',
    experience: '10 tahun',
    rating: 4.9,
    reviews: 72,
    classes: 8,
    students: 218,
    location: 'Surabaya',
    status: 'active',
    emoji: '👨‍🍳',
    bio: 'Bread specialist yang berpengalaman dalam artisan bread, sourdough, dan teknik fermentasi.',
  },
  {
    id: 'chef-dika',
    name: 'Chef Dika',
    role: 'Baking Instructor',
    specialty: 'Pizza & Focaccia',
    experience: '6 tahun',
    rating: 4.8,
    reviews: 58,
    classes: 7,
    students: 196,
    location: 'Yogyakarta',
    status: 'active',
    emoji: '👨🏻‍🍳',
    bio: 'Instruktur baking yang mengajarkan teknik dasar hingga intermediate dengan pendekatan yang praktis.',
  },
]

export function getInstructors() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (!saved) {
      const initialData = [...defaultInstructors]

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(initialData),
      )

      return initialData
    }

    return JSON.parse(saved)
  } catch (error) {
    console.error(
      'Gagal membaca data instruktur:',
      error,
    )

    return defaultInstructors
  }
}

export function saveInstructors(instructors) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(instructors),
    )

    return instructors
  } catch (error) {
    console.error(
      'Gagal menyimpan data instruktur:',
      error,
    )

    return instructors
  }
}

export function addInstructor(newInstructor) {
  const instructors = getInstructors()

  const instructor = {
    ...newInstructor,
    id: `instructor-${Date.now()}`,
  }

  const updatedInstructors = [
    ...instructors,
    instructor,
  ]

  saveInstructors(updatedInstructors)

  return updatedInstructors
}

export function updateInstructor(id, updatedData) {
  const instructors = getInstructors()

  const updatedInstructors = instructors.map(
    (instructor) =>
      String(instructor.id) === String(id)
        ? {
            ...instructor,
            ...updatedData,
          }
        : instructor,
  )

  saveInstructors(updatedInstructors)

  return updatedInstructors
}

export function deleteInstructor(id) {
  const instructors = getInstructors()

  const updatedInstructors = instructors.filter(
    (instructor) =>
      String(instructor.id) !== String(id),
  )

  saveInstructors(updatedInstructors)

  return updatedInstructors
}

export function resetInstructors() {
  const initialData = [...defaultInstructors]

  saveInstructors(initialData)

  return initialData
}