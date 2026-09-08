import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import ExplorePage from './pages/ExplorePage'
import SchedulePage from './pages/SchedulePage'
import ClassDetailPage from './pages/ClassDetailPage'

import InstructorsPage from './pages/InstructorsPage'
import InstructorProfilePage from './pages/InstructorProfilePage'

import EventsPage from './pages/EventsPage'

import RecipeStore from './pages/RecipeStore'
import RecipeMarketplace from './pages/RecipeMarketplace'
import RecipeDetailPage from './pages/RecipeDetailPage'
import MyRecipesPage from './pages/MyRecipesPage'
import RecipesPage from './pages/RecipesPage'

import CommunityPage from './pages/CommunityPage'
import BlogPage from './pages/BlogPage'
import BlogDetailPage from './pages/BlogDetailPage'
import MembershipPage from './pages/MembershipPage'

import DashboardPage from './pages/DashboardPage'
import MyBookingsPage from './pages/dashboard/MyBookingsPage'
import MyClassesPage from './pages/MyClassesPage'
import CertificatesPage from './pages/dashboard/CertificatesPage'
import RewardsPage from './pages/dashboard/RewardsPage'
import WishlistPage from './pages/dashboard/WishlistPage'

import CheckoutPage from './pages/CheckoutPage'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

import ProtectedRoute from './components/ProtectedRoute'

import AdminPage from './pages/AdminPage'
import AdminClassesPage from './pages/AdminClassesPage'
import AdminInstructorsPage from './pages/AdminInstructorsPage'
import AdminBookingsPage from './pages/AdminBookingsPage'
import AdminUsersPage from './pages/AdminUsersPage'
import AdminRecipesPage from './pages/AdminRecipesPage'
import AdminAnalyticsPage from './pages/AdminAnalyticsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            AUTH
        ========================= */}

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* =========================
            PUBLIC
        ========================= */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* =========================
            EXPLORE
        ========================= */}

        <Route
          path="/explore"
          element={<ExplorePage />}
        />

        <Route
          path="/explore/all"
          element={<ExplorePage type="all" />}
        />

        <Route
          path="/explore/online"
          element={<ExplorePage type="online" />}
        />

        <Route
          path="/explore/offline"
          element={<ExplorePage type="offline" />}
        />

        <Route
          path="/explore/workshops"
          element={<ExplorePage type="workshops" />}
        />

        <Route
          path="/explore/private"
          element={<ExplorePage type="private" />}
        />

        <Route
          path="/explore/corporate"
          element={<ExplorePage type="corporate" />}
        />

        {/* =========================
            KELAS
        ========================= */}

        <Route
          path="/kelas"
          element={<SchedulePage />}
        />

        <Route
          path="/classes"
          element={<SchedulePage />}
        />

        <Route
          path="/classes/:id"
          element={<ClassDetailPage />}
        />

        {/* =========================
            MY CLASSES
        ========================= */}

        <Route
          path="/my-classes"
          element={
            <ProtectedRoute>
              <MyClassesPage />
            </ProtectedRoute>
          }
        />

        {/* =========================
            INSTRUCTORS
        ========================= */}

        <Route
          path="/instructors"
          element={<InstructorsPage />}
        />

        <Route
          path="/instructors/:id"
          element={<InstructorProfilePage />}
        />

        {/* =========================
            EVENTS
        ========================= */}

        <Route
          path="/events"
          element={<EventsPage />}
        />

        {/* =========================
            RECIPES PUBLIC
        ========================= */}

        <Route
          path="/recipes"
          element={<RecipesPage />}
        />

        <Route
          path="/resep"
          element={<RecipeStore />}
        />

        <Route
          path="/recipes/store"
          element={<RecipeStore />}
        />

        <Route
          path="/recipes/marketplace"
          element={<RecipeMarketplace />}
        />

        <Route
          path="/recipes/free"
          element={<RecipesPage type="free" />}
        />

        <Route
          path="/recipes/ebooks"
          element={<RecipesPage type="ebooks" />}
        />

        <Route
          path="/recipes/premium"
          element={<RecipesPage type="premium" />}
        />

        <Route
          path="/recipes/:id"
          element={<RecipeDetailPage />}
        />

        {/* =========================
            MY RECIPES
        ========================= */}

        <Route
          path="/my-recipes"
          element={
            <ProtectedRoute>
              <MyRecipesPage />
            </ProtectedRoute>
          }
        />

        {/* =========================
            COMMUNITY
        ========================= */}

        <Route
          path="/community"
          element={<CommunityPage />}
        />

        {/* =========================
            BLOG
        ========================= */}

        <Route
          path="/blog"
          element={<BlogPage />}
        />

        <Route
          path="/blog/:id"
          element={<BlogDetailPage />}
        />

        {/* =========================
            MEMBERSHIP
        ========================= */}

        <Route
          path="/membership"
          element={<MembershipPage />}
        />

        {/* =========================
            USER DASHBOARD
        ========================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/bookings"
          element={
            <ProtectedRoute>
              <MyBookingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/classes"
          element={
            <ProtectedRoute>
              <MyClassesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/recipes"
          element={
            <ProtectedRoute>
              <MyRecipesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/certificates"
          element={
            <ProtectedRoute>
              <CertificatesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/rewards"
          element={
            <ProtectedRoute>
              <RewardsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/wishlist"
          element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          }
        />

        {/* =========================
            CHECKOUT
        ========================= */}

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        {/* =========================
            ADMIN ONLY
        ========================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/classes"
          element={
            <ProtectedRoute adminOnly>
              <AdminClassesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/instructors"
          element={
            <ProtectedRoute adminOnly>
              <AdminInstructorsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute adminOnly>
              <AdminBookingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute adminOnly>
              <AdminUsersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/recipes"
          element={
            <ProtectedRoute adminOnly>
              <AdminRecipesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute adminOnly>
              <AdminAnalyticsPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App