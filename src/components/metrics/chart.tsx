'use client'
import * as React from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Label, Pie, PieChart, Cell } from "recharts"
import { Metric } from '@/types/metrics';

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

const CELL_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const chartConfig = {
  impressions: {
    label: "Impressions",
  },
  clicks: {
    label: "Clicks",
  },
  cost: {
    label: "Cost",
  },
} satisfies ChartConfig

interface MetricPieChartProps {
  data: Array<{ name: string; [key: string]: any }>;
  dataKey: string;
  total: number;
  label: string;
}

function MetricPieChart({ data, dataKey, total, label }: MetricPieChartProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey="name"
          innerRadius={60}
          strokeWidth={5}
        >
               {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={CELL_COLORS[index % CELL_COLORS.length]} />
          ))}
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {total.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      {label}
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}

export default function CampaignChart({ metrics }: { metrics: Metric[] }) {
  const totalImpressions = React.useMemo(() => metrics.reduce((acc, curr) => acc + curr.impressions, 0), [metrics])
  const totalClicks = React.useMemo(() => metrics.reduce((acc, curr) => acc + curr.clicks, 0), [metrics])
  const totalCost = React.useMemo(() => metrics.reduce((acc, curr) => acc + parseFloat(curr.cost), 0), [metrics])

  const impressionsData = metrics.map(metric => ({ name: metric.name, value: metric.impressions }))
  const clicksData = metrics.map(metric => ({ name: metric.name, value: metric.clicks }))
  const costData = metrics.map(metric => ({ name: metric.name, value: parseFloat(metric.cost) }))

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Impressions</CardTitle>
          <CardDescription>Total Impressions</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <MetricPieChart data={impressionsData} dataKey="value" total={totalImpressions} label="Impressions" />
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
        </CardFooter>
      </Card>

      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Clicks</CardTitle>
          <CardDescription>Total Clicks</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <MetricPieChart data={clicksData} dataKey="value" total={totalClicks} label="Clicks" />
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Trending up by 3.7% this month <TrendingUp className="h-4 w-4" />
          </div>
        </CardFooter>
      </Card>

      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Cost</CardTitle>
          <CardDescription>Total Cost</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <MetricPieChart data={costData} dataKey="value" total={totalCost} label="Cost" />
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Trending down by 2.1% this month <TrendingDown className="h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}