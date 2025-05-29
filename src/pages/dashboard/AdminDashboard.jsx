import DashboardStatsCards from "@/components/dashboard/DashboardStatCards"
import { GraphComponent } from "@/components/dashboard/GraphComponent"
import { PieChart } from "@/components/dashboard/PieChart"
import TableComponent from "@/components/dashboard/TableComponent"

const AdminDashboard = () => {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 pr-4">
      <DashboardStatsCards />
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 w-full">
        <div className="w-full lg:w-1/2">
          <GraphComponent />
        </div>
        <div className="w-full lg:w-1/2">
          <PieChart />
        </div>
      </div>
      <TableComponent />
    </div>
  )
}

export default AdminDashboard
