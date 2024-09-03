import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { SessionData, sessionOptions } from './session'; 

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  const accessToken = session.accessToken;
  const refreshToken = session.refreshToken;

  return { accessToken, refreshToken };
}