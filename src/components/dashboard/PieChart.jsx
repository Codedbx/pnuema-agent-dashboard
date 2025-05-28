"use client"

import { useMemo } from "react"
import { TrendingUp } from "lucide-react"
import { Pie, PieChart as RechartsPieChart, Label } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
}

export function PieChart() {
  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-0 sm:pb-2">
        <CardTitle className="text-lg sm:text-xl text-center">Pie Chart - Donut with Text</CardTitle>
        <CardDescription className="text-sm text-center">January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 px-2 sm:px-6">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[200px] sm:max-h-[250px]">
          <RechartsPieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={40} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-2xl sm:text-3xl font-bold">
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 20} className="fill-muted-foreground text-sm">
                          Visitors
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
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm px-2 sm:px-6">
        <div className="flex items-center gap-2 font-medium leading-none text-sm">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground text-xs sm:text-sm text-center">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
