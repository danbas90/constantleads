import { OAuth2Client } from 'google-auth-library';

const clientId = process.env.GOOGLE_ADS_CLIENT_ID!;
const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET!;
const redirectUri = process.env.GOOGLE_AUTH_REDIRECT_URI!;

export const oAuth2Client = new OAuth2Client(clientId, clientSecret, redirectUri);

export function getAuthUrl() {
  return oAuth2Client.generateAuthUrl({
    access_type: 'online',
    scope: ['https://www.googleapis.com/auth/adwords'],
  });
}

export async function getTokens(code: string) {
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  return tokens;
}