"use client"

import { useMemo } from "react"
import { TrendingUp } from "lucide-react"
import { Pie, PieChart as RechartsPieChart, Label } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { location: "united-states", bookings: 386, fill: "var(--color-united-states)" },
  { location: "mexico", bookings: 308, fill: "var(--color-mexico)" },
  { location: "canada", bookings: 225, fill: "var(--color-canada)" },
  { location: "other", bookings: 81, fill: "var(--color-other)" },
]

const chartConfig = {
  bookings: {
    label: "Bookings",
  },
  "united-states": {
    label: "United States",
    color: "hsl(var(--chart-1))",
  },
  mexico: {
    label: "Mexico",
    color: "hsl(var(--chart-2))",
  },
  canada: {
    label: "Canada",
    color: "hsl(var(--chart-3))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-4))",
  },
}

export function PieChart() {
  const totalBookings = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.bookings, 0)
  }, [])

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-2 sm:pb-4 px-3 sm:px-4 lg:px-6">
        <CardTitle className="text-base sm:text-lg lg:text-xl text-center">Bookings by Location</CardTitle>
        <CardDescription className="text-xs sm:text-sm text-center">January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-2 px-2 sm:px-3 lg:px-6">
        <div className="w-full overflow-hidden">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[160px] sm:max-h-[180px] lg:max-h-[200px] w-full"
          >
            <RechartsPieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="bookings"
                nameKey="location"
                innerRadius={40}
                outerRadius={70}
                strokeWidth={2}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-base sm:text-lg lg:text-2xl font-bold"
                          >
                            {totalBookings.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 14}
                            className="fill-muted-foreground text-xs sm:text-sm"
                          >
                            Bookings
                          </tspan>
                        </text>
                      )
                    }
                    return null
                  }}
                />
              </Pie>
            </RechartsPieChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-1 sm:gap-2 text-sm px-3 sm:px-4 lg:px-6 pt-2 sm:pt-4">
        <div className="flex items-center gap-1 sm:gap-2 font-medium leading-none text-xs sm:text-sm text-center">
          Trending up by 12.3% this month <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
        </div>
        <div className="leading-none text-muted-foreground text-xs sm:text-sm text-center">
          Showing total bookings by location for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
