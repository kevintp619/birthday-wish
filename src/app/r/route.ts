import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const databaseId = searchParams.get('t');
  
  if (databaseId) {
    const cookieStore = await cookies();
    cookieStore.set('birthday_db_id', databaseId, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    
    return NextResponse.redirect(new URL('/timer', request.url));
  }
  
  return NextResponse.redirect(new URL('/', request.url));
}
