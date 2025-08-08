'use server';
import { cookies } from 'next/headers';

export async function logoutUser() {
  const cookieStore = await cookies(); 

  cookieStore.set('authToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/',
    maxAge: -1, 
  });

  return { message: 'Successful Logout' };
}


