import DashboardStatsCards from '@/components/dashboard/DashboardStatCards'
import { GraphComponent } from '@/components/dashboard/GraphComponent'
import { PieChart } from '@/components/dashboard/PieChart'
import TableComponent from '@/components/dashboard/TableComponent'
import React from 'react'

const AdminDashboard = () => {
  return ( 
    <div className='flex flex-col gap-6'>
      <DashboardStatsCards />
      <div className='flex gap-6 w-full'>
        <GraphComponent />
        <PieChart />
      </div>
      <TableComponent />
    </div>
  )
}

export default AdminDashboard
