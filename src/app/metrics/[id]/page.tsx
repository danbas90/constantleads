import { getMetrics } from '@/lib/googleAdsApi';
import { getSession } from '@/lib/token';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import  AreaChart  from '@/components/metrics/areaChart';

interface PageProps {
  params: {
    id: string;
  };
}


export default async function CampaignPage({ params }: PageProps) {
  const session = await getSession();
  
  if (!session.accessToken || !session.refreshToken) {
    redirect("/");
  }

  try {
    const metrics = await getMetrics();
    const campaign = metrics.find(c => c.id === params.id);

    if (!campaign) {
      return <div>Campaign not found</div>;
    }

    return (
      <div className='container mx-auto p-4'>
        <Link href="/metrics" className="text-blue-500 hover:underline mb-4 inline-block">
          &larr; Back to All Metrics
        </Link>
        <h1 className='text-2xl font-bold mb-4'>{campaign.name}</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <div className='bg-white p-4 rounded shadow'>
            <h2 className='text-lg font-semibold mb-2'>Impressions</h2>
            <p>{campaign.impressions}</p>
          </div>
          <div className='bg-white p-4 rounded shadow'>
            <h2 className='text-lg font-semibold mb-2'>Clicks</h2>
            <p>{campaign.clicks}</p>
          </div>
          <div className='bg-white p-4 rounded shadow'>
            <h2 className='text-lg font-semibold mb-2'>Cost</h2>
            <p>${campaign.cost}</p>
          </div>
          <div className='bg-white p-4 rounded shadow'>
            <h2 className='text-lg font-semibold mb-2'>Status</h2>
            <p>{campaign.status}</p>
          </div>
          <div className='bg-white p-4 rounded shadow'>
            <h2 className='text-lg font-semibold mb-2'>Type</h2>
            <p>{campaign.type}</p>
          </div>
        </div>
        <div className='mt-4'>
          <AreaChart />
        </div>
      </div>

    );
  } catch (error) {
    console.error('Error fetching campaign details:', error);
    return <div>Error fetching campaign details</div>;
  }
}
