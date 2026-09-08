import { Navigate, useLocation } from 'react-router-dom'
import { getCurrentUser } from '../data/authStorage'

function ProtectedRoute({ children, adminOnly = false }) {
  const location = useLocation()
  const user = getCurrentUser()

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname + location.search,
        }}
      />
    )
  }

  if (adminOnly && user.role !== 'admin') {
    return (
      <Navigate
        to="/"
        replace
      />
    )
  }

  return children
}

export default ProtectedRoute