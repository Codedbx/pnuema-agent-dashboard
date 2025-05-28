import React from 'react';
import { Outlet } from 'react-router-dom';
import AppSidebar from '@/components/dashboard/Sidebar';
import AdminHeader from '@/components/dashboard/AdminHeader';
import { SidebarProvider } from '@/components/ui/sidebar';

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Sidebar */}
        <AppSidebar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header with sidebar trigger */}
          <AdminHeader />
          
          {/* Main scrollable area */}
          <main className="flex-1 p-6 max-w-7xl">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;