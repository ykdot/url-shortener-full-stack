'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function checkAdminAuthorization() {
  const cookie = await cookies();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/admin/check-authorization`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie.toString(),
      },
      credentials: 'include',
    },
  );
  const data = await response.json();
  if (!response.ok) {
    redirect('/dashboard/login');
  }
}
