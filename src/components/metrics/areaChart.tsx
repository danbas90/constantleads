"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A stacked area chart"

const chartData = [
  { month: "January", impressions: 186, clicks: 80 },
  { month: "February", impressions: 305, clicks: 200 },
  { month: "March", impressions: 237, clicks: 120 },
  { month: "April", impressions: 73, clicks: 190 },
  { month: "May", impressions: 209, clicks: 130 },
  { month: "June", impressions: 214, clicks: 140 },
]

const chartConfig = {
  impressions: {
    label: "impressions",
    color: "hsl(var(--chart-1))",
  },
  clicks: {
    label: "clicks",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function Component() {
  return (
    <Card>
      <CardHeader>
        <CardTitle> Impressions and Clicks </CardTitle>
        <CardDescription>
            Showing total impressions and clicks for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[400px] w-full" config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            height={500} 
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="clicks"
              type="natural"
              fill="var(--color-clicks)"
              fillOpacity={0.4}
              stroke="var(--color-clicks)"
              stackId="a"
            />
            <Area
              dataKey="impressions"
              type="natural"
              fill="var(--color-impressions)"
              fillOpacity={0.4}
              stroke="var(--color-impressions)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>

      </CardFooter>
    </Card>
  )
}
