import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

const DashboardStatsCards = () => {
  const stats = [
    {
      title: "Total bookings",
      value: "721K",
      change: "+11.02%",
      trend: "up",
    },
    {
      title: "Customers served",
      value: "367K",
      change: "-0.03%",
      trend: "down",
    },
    {
      title: "Upcoming trips",
      value: "1,156",
      change: "+15.03%",
      trend: "up",
    },
    {
      title: "Active Users",
      value: "239K",
      change: "+6.08%",
      trend: "up",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {stats.map((stat, index) => {
        return (
          <Card key={index} className="relative overflow-hidden bg-slate-50/50 border-slate-200/50">
            <CardHeader className="pb-2 px-4 sm:px-5 lg:px-6 pt-4 sm:pt-5 lg:pt-6">
              <CardTitle className="text-sm sm:text-base font-normal text-slate-600">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6">
              <div className="text-lg lg:text-2xl font-bold text-slate-900 mb-2">{stat.value}</div>
              <div className="flex items-center space-x-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                ) : (
                  <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 flex-shrink-0" />
                )}
                <span
                  className={`text-sm sm:text-base font-medium ${
                    stat.trend === "up" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default DashboardStatsCards
