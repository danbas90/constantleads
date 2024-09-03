import { OAuth2Client } from 'google-auth-library';

const clientId = process.env.GOOGLE_ADS_CLIENT_ID!;
const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET!;
const redirectUri = 'http://localhost:3000/api/auth/callback/';

export const oAuth2Client = new OAuth2Client(clientId, clientSecret, redirectUri);

export function getAuthUrl() {
  return oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/adwords'],
  });
}

export async function getTokens(code: string) {
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  return tokens;
}