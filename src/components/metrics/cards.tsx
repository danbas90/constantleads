import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo } from "react";
import { Metric } from '@/types/metrics';

  
export default function TotalMetricsCards({ metrics }: { metrics: Metric[] }) {
    const totals = useMemo(() => {
        return metrics.reduce((acc, metric) => ({
          clicks: acc.clicks + metric.clicks,
          impressions: acc.impressions + metric.impressions,
          cost: acc.cost + parseFloat(metric.cost.replace('$', '')),
        }), { clicks: 0, impressions: 0, cost: 0 });
      }, [metrics]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totals.clicks.toLocaleString()}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Impressions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totals.impressions.toLocaleString()}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totals.cost.toFixed(2)}</div>
        </CardContent>
      </Card>
    </div>
  );
}
