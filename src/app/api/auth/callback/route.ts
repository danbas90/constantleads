"use server"

import { NextRequest, NextResponse } from 'next/server';
import { getTokens } from '@/lib/googleAuth';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/session';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    const tokens = await getTokens(code);
    const session = await getIronSession<SessionData>(cookies(),  sessionOptions);
    
    session.accessToken = tokens.access_token!;
    session.refreshToken = tokens.refresh_token!;
    await session.save();

    return NextResponse.redirect(new URL('/metrics', request.url));
  } catch (error) {
    console.error('Error getting tokens:', error);
  }
}