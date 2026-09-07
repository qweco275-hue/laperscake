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
            PUBLIC
        ========================= */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* EXPLORE */}
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

        {/* Navbar "Kelas" */}
        <Route
          path="/kelas"
          element={<SchedulePage />}
        />

        {/* URL lama tetap diarahkan ke halaman kelas */}
        <Route
          path="/classes"
          element={<SchedulePage />}
        />

        {/* Detail kelas */}
        <Route
          path="/classes/:id"
          element={<ClassDetailPage />}
        />

        {/* =========================
            MY CLASSES
        ========================= */}

        <Route
          path="/my-classes"
          element={<MyClassesPage />}
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
            RECIPES
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

        <Route
          path="/my-recipes"
          element={<MyRecipesPage />}
        />

        {/* =========================
            COMMUNITY
        ========================= */}

        <Route
          path="/community"
          element={<CommunityPage />}
        />

        <Route
          path="/blog"
          element={<BlogPage />}
        />
        <Route
          path="/blog/:id"
          element={<BlogDetailPage />}
        />

        <Route
          path="/membership"
          element={<MembershipPage />}
        />

        {/* =========================
            USER DASHBOARD
        ========================= */}

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="/dashboard/bookings"
          element={<MyBookingsPage />}
        />

        <Route
          path="/dashboard/classes"
          element={<MyClassesPage />}
        />

        <Route
          path="/dashboard/recipes"
          element={<MyRecipesPage />}
        />

        <Route
          path="/dashboard/certificates"
          element={<CertificatesPage />}
        />

        <Route
          path="/dashboard/rewards"
          element={<RewardsPage />}
        />

        <Route
          path="/dashboard/wishlist"
          element={<WishlistPage />}
        />

        {/* =========================
            CHECKOUT
        ========================= */}

        <Route
          path="/checkout"
          element={<CheckoutPage />}
        />

        {/* =========================
            ADMIN
        ========================= */}

        <Route
          path="/admin"
          element={<AdminPage />}
        />

        <Route
          path="/admin/classes"
          element={<AdminClassesPage />}
        />

        <Route
          path="/admin/instructors"
          element={<AdminInstructorsPage />}
        />

        <Route
          path="/admin/bookings"
          element={<AdminBookingsPage />}
        />

        <Route
          path="/admin/users"
          element={<AdminUsersPage />}
        />

        <Route
          path="/admin/recipes"
          element={<AdminRecipesPage />}
        />

        <Route
          path="/admin/analytics"
          element={<AdminAnalyticsPage />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App