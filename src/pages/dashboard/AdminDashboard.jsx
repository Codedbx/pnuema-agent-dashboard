import DashboardStatsCards from "@/components/dashboard/DashboardStatCards"
import { GraphComponent } from "@/components/dashboard/GraphComponent"
import NotificationsPanel from "@/components/dashboard/NotificationsPanel"
import { PieChart } from "@/components/dashboard/PieChart"
import TableComponent from "@/components/dashboard/TableComponent"

const AdminDashboard = () => {
  return (
    <div className="flex">
      <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6 p-2 sm:p-4 lg:pr-4 mx-auto max-w-md md:max-w-lg lg:max-w-full overflow-hidden">
        <DashboardStatsCards />
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6 w-full min-w-0">
          <div className="w-full lg:w-1/2 min-w-0">
            <GraphComponent />
          </div>
          <div className="w-full lg:w-1/2 min-w-0">
            <PieChart />
          </div>
        </div>
        <div className="w-full min-w-0">
          <TableComponent />
        </div>
      </div>
      <div className="hidden xl:block">
        <NotificationsPanel />
      </div>
    </div>
  )
}

export default AdminDashboard
