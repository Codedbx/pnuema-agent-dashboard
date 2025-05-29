import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const chartData = [
  { month: "Jan", bookings: 18000000 },
  { month: "Feb", bookings: 22000000 },
  { month: "Mar", bookings: 19000000 },
  { month: "Apr", bookings: 24000000 },
  { month: "May", bookings: 8000000 },
  { month: "Jun", bookings: 21000000 },
]

const chartConfig = {
  bookings: {
    label: "Bookings",
    color: "hsl(var(--chart-1))",
  },
}

export function GraphComponent() {
  const formatYAxis = (value) => {
    if (value >= 1000000) {
      return `${value / 1000000}M`
    }
    return value.toString()
  }

  const getBarColor = (index) => {
    const colors = [
      "hsl(var(--chart-1))", // Blue
      "hsl(var(--chart-2))", // Green
      "hsl(220 14.3% 25.9%)", // Dark gray/black
      "hsl(var(--chart-3))", // Light blue
      "hsl(220 14.3% 65.9%)", // Gray
      "hsl(var(--chart-2))", // Green
    ]
    return colors[index % colors.length]
  }

  return (
    <Card className="w-full bg-slate-50/50 border-slate-200/50">
      <CardHeader className="pb-2 sm:pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
          <CardTitle className="text-base sm:text-lg font-medium text-slate-900">Total bookings</CardTitle>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="whitespace-nowrap">View by:</span>
            <Select defaultValue="month">
              <SelectTrigger className="w-20 h-8 text-sm border-slate-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <div className="w-full overflow-x-auto">
          <div className="min-w-[300px]">
            <ChartContainer config={chartConfig} className="min-h-[200px] sm:min-h-[240px] lg:min-h-[280px] w-full">
              <BarChart data={chartData} margin={{ left: 10, right: 10, top: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  fontSize={12}
                  className="text-slate-600"
                />
                <YAxis
                  tickFormatter={formatYAxis}
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  className="text-slate-600"
                  domain={[0, 30000000]}
                  ticks={[0, 10000000, 20000000, 30000000]}
                  width={40}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      formatter={(value) => [formatYAxis(value), "Bookings"]}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                  }
                />
                {chartData.map((entry, index) => (
                  <Bar
                    key={entry.month}
                    dataKey="bookings"
                    fill={getBarColor(index)}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={60}
                  />
                ))}
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
