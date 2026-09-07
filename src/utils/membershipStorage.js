const STORAGE_KEY = 'lapercakes-membership'

const defaultMembership = {
  plan: 'free',
  status: 'active',
  billing: 'monthly',
  startedAt: null,
}

export function getMembership() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (!saved) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultMembership)
      )

      return defaultMembership
    }

    return JSON.parse(saved)
  } catch {
    return defaultMembership
  }
}

export function saveMembership(data) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  )

  return data
}

export function activateMembership(plan, billing = 'monthly') {
  const membership = {
    plan,
    status: 'active',
    billing,
    startedAt: new Date().toISOString(),
  }

  saveMembership(membership)

  return membership
}

export function cancelMembership() {
  const membership = getMembership()

  const updated = {
    ...membership,
    plan: 'free',
    status: 'active',
  }

  saveMembership(updated)

  return updated
}

export function isMembershipActive(plan) {
  const membership = getMembership()

  return (
    membership.status === 'active' &&
    membership.plan === plan
  )
}