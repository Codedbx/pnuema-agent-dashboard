"use client"

import { Suspense, lazy, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "@/components/theme-provider"
import useAuthStore from "./stores/useAuthStore"

// Routes
import PublicRoute from "./routes/PublicRoute"

import ScrollToTop from "./components/ScrollToTop"

// Layouts
const AdminLayout = lazy(() => import("./layouts/AdminLayout"))

// Auth pages
const SignInPage = lazy(() => import("./pages/auth/SignInPage"))

// Admin pages - import directly for better performance (no need for lazy loading these)
import AdminDashboard from "./pages/dashboard/AdminDashboard"
import Bookings from "./pages/dashboard/Bookings"
import PackageBuilder from "./pages/dashboard/PackageBuilder"
import Packages from "./pages/dashboard/Packages"
import UserAccess from "./pages/dashboard/UserAccess"
import CreateUser from "./pages/dashboard/CreateUser"
import Invoices from "./pages/dashboard/Invoices"
import CreateActivities from "./pages/dashboard/CreateActivities"
import RoleManagement from "./pages/dashboard/RoleManagement"
import Activities from "./pages/dashboard/Activities"
import SignUpPage from "./pages/auth/SignUpPage"

function App() {
  const { checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Toaster position="top-right" />
        <ScrollToTop />

        <Routes>
          {/* Auth routes - using restricted=true to redirect if already logged in */}
          <Route
            path="/signin"
            element={
              <Suspense>
                <PublicRoute restricted={true}>
                  <SignInPage />
                </PublicRoute>
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense>
                <PublicRoute restricted={true}>
                  <SignUpPage />
                </PublicRoute>
              </Suspense>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <Suspense>
                <PublicRoute>
                  <AdminLayout />
                </PublicRoute>
              </Suspense>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="packages" element={<Packages />} />
            <Route path="package-builder" element={<PackageBuilder />} />
            <Route path="create-activities" element={<CreateActivities />} />
            <Route path="user-access" element={<UserAccess />} />
            <Route path="create-user" element={<CreateUser />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="role-management" element={<RoleManagement />} />
            <Route path="activities" element={<Activities />} />
          </Route>

          {/* Redirect from root to /admin or /signin based on auth status */}
          <Route path="/" element={<Navigate to="/admin" replace />} />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
