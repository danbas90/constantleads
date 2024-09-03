"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Metric } from "@/types/metrics";
import { Input } from "@/components/ui/input";
import { exportToCSV } from "@/lib/csvExport";

type SortKey = "name" | "impressions" | "clicks" | "cost" | "ctr";
type SortOrder = "asc" | "desc";

export default function MetricsTable({ metrics }: { metrics: Metric[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAndSortedMetrics = useMemo(() => {
    return metrics
      .filter(
        (metric) =>
          metric.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          metric.id.includes(searchTerm) ||
          metric.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
          metric.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          metric.impressions.toString().includes(searchTerm) ||
          metric.clicks.toString().includes(searchTerm) ||
          metric.cost.includes(searchTerm)
      )
      .sort((a, b) => {
        if (sortKey === "name" || sortKey === "cost") {
          return sortOrder === "asc"
            ? a[sortKey].localeCompare(b[sortKey])
            : b[sortKey].localeCompare(a[sortKey]);
        } else if (sortKey === "ctr") {
          const ctrA = a.clicks / a.impressions;
          const ctrB = b.clicks / b.impressions;
          return sortOrder === "asc" ? ctrA - ctrB : ctrB - ctrA;
        } else {
          return sortOrder === "asc"
            ? a[sortKey] - b[sortKey]
            : b[sortKey] - a[sortKey];
        }
      });
  }, [metrics, searchTerm, sortKey, sortOrder]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleExportCSV = () => {
    exportToCSV(filteredAndSortedMetrics, "metrics_export.csv");
  };

  return (
    <Card>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <Input
            placeholder="Search metrics..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            className=" w-60"
          />
          <Button onClick={handleExportCSV}>Export to CSV</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              {["name", "impressions", "clicks", "cost", "ctr"].map((key) => (
                <TableHead key={key}>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort(key as SortKey)}
                    className="flex items-center"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedMetrics.map((metric) => (
              <TableRow key={metric.id}>
                <TableCell>
                  <Link
                    href={`/metrics/${metric.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {metric.name}
                  </Link>
                </TableCell>
                <TableCell>{metric.impressions}</TableCell>
                <TableCell>{metric.clicks}</TableCell>
                <TableCell>{metric.cost}</TableCell>
                <TableCell>
                  {((metric.clicks / metric.impressions) * 100).toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
