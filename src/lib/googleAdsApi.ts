import { GoogleAdsApi } from 'google-ads-api';
import { getSession } from './token';
import fakeGoogleAdsData from './fakeGoogleAdsData.json';

const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID!;

export async function getMetrics() {
  const { accessToken, refreshToken } = await getSession();
  if (!accessToken) {
    throw new Error('Not authenticated');
  }

  const client = new GoogleAdsApi({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!, //cant get developer token on test account
  });

  try {
    const customer = client.Customer({
      customer_id: customerId,
      login_customer_id: customerId,
      refresh_token: refreshToken!,
    });
        
    const campaigns = await customer.report({
      entity: 'campaign',
      attributes: [
        'campaign.id',
        'campaign.name',
        'campaign.status',
        'campaign.advertising_channel_type',
      ],
      metrics: [
        'metrics.impressions',
        'metrics.clicks',
        'metrics.cost_micros',
      ],
      constraints: {
        'campaign.status': 'ENABLED',
      },
      limit: 20,
    });

    const formattedCampaigns = campaigns.map((campaign: any) => ({
        id: campaign.campaign.id,
        name: campaign.campaign.name,
        status: campaign.campaign.status,
        type: campaign.campaign.advertising_channel_type,
        impressions: campaign.metrics.impressions,
        clicks: campaign.metrics.clicks,
        cost: (Number(campaign.metrics.cost_micros) / 1000000).toFixed(2),
      }));

    return formattedCampaigns;
  } catch (error) {
    return fakeGoogleAdsData;
  }
}