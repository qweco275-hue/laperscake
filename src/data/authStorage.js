const USERS_KEY = 'lapercakes-users'
const SESSION_KEY = 'lapercakes-session'

const DEFAULT_ADMIN = {
  id: 'admin-001',
  name: 'LaperCakes Admin',
  email: 'admin@lapercakes.id',
  phone: '081234567890',
  password: 'admin123',
  role: 'admin',
  createdAt: new Date().toISOString(),
}

function ensureUsers() {
  try {
    const saved = localStorage.getItem(USERS_KEY)

    if (!saved) {
      const initialUsers = [DEFAULT_ADMIN]
      localStorage.setItem(USERS_KEY, JSON.stringify(initialUsers))
      return initialUsers
    }

    const users = JSON.parse(saved)

    if (!Array.isArray(users)) {
      localStorage.setItem(USERS_KEY, JSON.stringify([DEFAULT_ADMIN]))
      return [DEFAULT_ADMIN]
    }

    const hasAdmin = users.some(
      (user) => user.email?.toLowerCase() === DEFAULT_ADMIN.email.toLowerCase()
    )

    if (!hasAdmin) {
      const updatedUsers = [...users, DEFAULT_ADMIN]
      localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers))
      return updatedUsers
    }

    return users
  } catch (error) {
    console.error('Gagal membaca data users:', error)
    return [DEFAULT_ADMIN]
  }
}

export function getUsers() {
  return ensureUsers()
}

export function registerUser(userData) {
  const users = ensureUsers()

  const email = userData.email.trim().toLowerCase()

  const existingUser = users.find(
    (user) => user.email.toLowerCase() === email
  )

  if (existingUser) {
    return {
      success: false,
      message: 'Email sudah terdaftar.',
    }
  }

  const newUser = {
    id: `user-${Date.now()}`,
    name: userData.name.trim(),
    email,
    phone: userData.phone.trim(),
    password: userData.password,
    role: 'user',
    createdAt: new Date().toISOString(),
  }

  const updatedUsers = [...users, newUser]

  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers))

  return {
    success: true,
    user: sanitizeUser(newUser),
  }
}

export function loginUser(email, password) {
  const users = ensureUsers()

  const user = users.find(
    (item) =>
      item.email.toLowerCase() === email.trim().toLowerCase() &&
      item.password === password
  )

  if (!user) {
    return {
      success: false,
      message: 'Email atau password salah.',
    }
  }

  const safeUser = sanitizeUser(user)

  localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser))

  window.dispatchEvent(new Event('authChanged'))

  return {
    success: true,
    user: safeUser,
  }
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY)

  window.dispatchEvent(new Event('authChanged'))
}

export function getCurrentUser() {
  try {
    const saved = localStorage.getItem(SESSION_KEY)

    if (!saved) {
      return null
    }

    return JSON.parse(saved)
  } catch (error) {
    console.error('Gagal membaca session:', error)
    return null
  }
}

export function isLoggedIn() {
  return Boolean(getCurrentUser())
}

export function isAdmin() {
  const user = getCurrentUser()
  return user?.role === 'admin'
}

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt,
  }
}