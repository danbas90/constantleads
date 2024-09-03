import { Metric } from '@/types/metrics';

export function exportToCSV(metrics: Metric[], fileName: string) {
  const headers = ['ID', 'Name', 'Status', 'Type', 'Impressions', 'Clicks', 'Cost', 'CTR'];
  const csvContent = [
    headers.join(','),
    ...metrics.map(metric => [
      metric.id,
      `"${metric.name}"`, 
      metric.status,
      metric.type,
      metric.impressions,
      metric.clicks,
      metric.cost,
      ((metric.clicks / metric.impressions) * 100).toFixed(2) + '%'
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}