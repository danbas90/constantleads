"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Metric = "impressions" | "clicks" | "cost"

interface BarChartProps {
    metrics: {
      id: string
      name: string
      status: string
      type: string
      impressions: number
      clicks: number
      cost: string
    }[]
  }
  
export default function MetricBar({ metrics }: BarChartProps) {
  const [selectedMetric, setSelectedMetric] = useState<Metric>("impressions")

  const chartData = metrics.map(campaign => ({
    name: campaign.name,
    value: selectedMetric === "cost" ? parseFloat(campaign.cost) : campaign[selectedMetric]
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Performance per month</CardTitle>
        <CardDescription>Metrics by Campaign</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select onValueChange={(value: Metric) => setSelectedMetric(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="impressions">Impressions</SelectItem>
              <SelectItem value="clicks">Clicks</SelectItem>
              <SelectItem value="cost">Cost</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}