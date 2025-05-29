import DashboardStatsCards from "@/components/dashboard/DashboardStatCards"
import { GraphComponent } from "@/components/dashboard/GraphComponent"
import { PieChart } from "@/components/dashboard/PieChart"
import TableComponent from "@/components/dashboard/TableComponent"


const AdminDashboard = () => {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6 p-2 sm:p-4 lg:pr-4">
      <DashboardStatsCards />
      <div className="flex flex-col xl:flex-row gap-3 sm:gap-4 lg:gap-6 w-full">
        <div className="w-full xl:w-1/2">
          <GraphComponent />
        </div>
        <div className="w-full xl:w-1/2">
          <PieChart />
        </div>
      </div>
      <TableComponent />
    </div>
  )
}

export default AdminDashboard
