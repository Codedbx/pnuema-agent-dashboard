import { Outlet, useLocation } from "react-router-dom"
import AppSidebar from "@/components/dashboard/sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AdminHeader from "@/components/dashboard/AdminHeader"
import NotificationsPanel from "@/components/dashboard/NotificationsPanel"

const AdminLayout = () => {
  const location = useLocation()

  // Check if we're on the admin dashboard page (exact match for /admin or /admin/)
  const isAdminDashboard = location.pathname === "/admin" || location.pathname === "/admin/"

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />

        <SidebarInset className="flex-1">
          <AdminHeader />
          <div className="flex flex-1">
            <main className={`flex-1 p-3 sm:p-4 ${isAdminDashboard ? "max-w-none lg:p-0" : "max-w-7xl mx-auto lg:p-6"}`}>
              <Outlet />
            </main>
            {/* {isAdminDashboard && (
              <div className="hidden xl:block">
                <NotificationsPanel />
              </div>
            )} */}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

export default AdminLayout
