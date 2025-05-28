import { Outlet } from "react-router-dom"
import AppSidebar from "@/components/dashboard/Sidebar"
import AdminHeader from "@/components/dashboard/AdminHeader"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />

        <SidebarInset className="flex-1">
          <AdminHeader />
          <main className="flex-1 p-6 max-w-7xl">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

export default AdminLayout
