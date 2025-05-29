import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import AdminLayout from "./layouts/AdminLayout"
import PublicRoute from "./routes/PublicRoute"
import ScrollToTop from "./components/ScrollToTop"

// Auth Pages
import SignInPage from "./pages/auth/SignInPage"
import SignUpPage from "./pages/auth/SignUpPage"

// Dashboard Pages
import AdminDashboard from "./pages/dashboard/AdminDashboard"
import Bookings from "./pages/dashboard/Bookings"
import Packages from "./pages/dashboard/Packages"
import PackageBuilder from "./pages/dashboard/PackageBuilder"
import PackageDetails from "./pages/dashboard/PackageDetails"
import EditPackage from "./pages/dashboard/EditPackage"
import UserAccess from "./pages/dashboard/UserAccess"
import UserDetails from "./pages/dashboard/UserDetails"
import EditUser from "./pages/dashboard/EditUser"
import CreateUser from "./pages/dashboard/CreateUser"
import RoleManagement from "./pages/dashboard/RoleManagement"
import CreateRole from "./pages/dashboard/CreateRole"
import RoleDetails from "./pages/dashboard/RoleDetails"
import EditRole from "./pages/dashboard/EditRole"
import Invoices from "./pages/dashboard/Invoices"
import Activities from "./pages/dashboard/Activities"
import ActivityDetails from "./pages/dashboard/ActivityDetails"
import EditActivity from "./pages/dashboard/EditActivity"
import CreateActivities from "./pages/dashboard/CreateActivities"

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignInPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          }
        />

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="bookings" element={<Bookings />} />

          {/* Package Management Routes */}
          <Route path="packages" element={<Packages />} />
          <Route path="packages/:id" element={<PackageDetails />} />
          <Route path="packages/:id/edit" element={<EditPackage />} />
          <Route path="package-builder" element={<PackageBuilder />} />

          {/* User Management Routes */}
          <Route path="user-access" element={<UserAccess />} />
          <Route path="users/:userId" element={<UserDetails />} />
          <Route path="users/:userId/edit" element={<EditUser />} />
          <Route path="create-user" element={<CreateUser />} />

          {/* Role Management Routes */}
          <Route path="role-management" element={<RoleManagement />} />
          <Route path="roles/create" element={<CreateRole />} />
          <Route path="roles/:roleId" element={<RoleDetails />} />
          <Route path="roles/:roleId/edit" element={<EditRole />} />

          {/* Activity Management Routes */}
          <Route path="activities" element={<Activities />} />
          <Route path="activities/:packageId/:activityId" element={<ActivityDetails />} />
          <Route path="activities/:packageId/:activityId/edit" element={<EditActivity />} />
          <Route path="create-activities" element={<CreateActivities />} />

            {/* Other Routes */}
            <Route path="invoices" element={<Invoices />} />
          </Route>
          {/* Redirect from root to /admin or /signin based on auth status */}
          <Route path="/" element={<Navigate to="/admin" replace />} />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
  )
}

export default App
