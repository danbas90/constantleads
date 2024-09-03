'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Metric } from '@/types/metrics';


type SortKey = 'name' | 'impressions' | 'clicks' | 'cost' | 'ctr';
type SortOrder = 'asc' | 'desc';

export default function MetricsTable({ metrics }: { metrics: Metric[] }) {
    const [sortKey, setSortKey] = useState<SortKey>('name');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  
    const sortedMetrics = [...metrics].sort((a, b) => {
      if (sortKey === 'name' || sortKey === 'cost' ) {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (sortKey === 'ctr') {
        const ctrA = a.clicks / a.impressions;
        const ctrB = b.clicks / b.impressions;
        return sortOrder === 'asc' ? ctrA - ctrB : ctrB - ctrA;
      } else {
        return sortOrder === 'asc' ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey];
      }
    });
  
    const handleSort = (key: SortKey) => {
      if (key === sortKey) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortKey(key);
        setSortOrder('asc');
      }
    };
  
  return (
    <Card>
    <Table>
      <TableHeader>
        <TableRow>
          {['name', 'impressions', 'clicks', 'cost', 'ctr'].map((key) => (
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
        {sortedMetrics.map((metric) => (
          <TableRow key={metric.id}>
            <TableCell><Link href={`/metrics/${metric.id}`} className="text-blue-500 hover:underline">{metric.name}                  </Link>
            </TableCell>
            <TableCell>{metric.impressions}</TableCell>
            <TableCell>{metric.clicks}</TableCell>
            <TableCell>{metric.cost}</TableCell>
            <TableCell>{((metric.clicks / metric.impressions) * 100).toFixed(2)}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </Card>
  );
}