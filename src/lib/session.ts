import { SessionOptions } from 'iron-session';

export interface SessionData {
  accessToken?: string;
  refreshToken?: string;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'google-auth',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax' as const,
    path: '/',
  },
};