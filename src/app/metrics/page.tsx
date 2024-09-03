
import { getMetrics } from '@/lib/googleAdsApi';
import {getSession } from '@/lib/token';
import { redirect } from 'next/navigation';
import MetricsTable from '@/components/metrics/table';
import MetricsChart from '@/components/metrics/chart';
import MetricsBar from '@/components/metrics/bar';

export default async function MetricsPage() {
        const session = await getSession();
      
        if (!session.accessToken || !session.refreshToken) {
          redirect("/");
        }

  try {
    const metrics = await getMetrics();
    return(
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4'>Google Ads Metrics</h1>
            <div className='flex flex-col gap-4'>
                <MetricsChart metrics={metrics} />
                <MetricsTable metrics={metrics} />
                <MetricsBar metrics={metrics} />
            </div>
        </div>
    )
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return <div>Error fetching metrics</div>;
  }
}