'use server';
import { cookies } from 'next/headers';

export async function deleteURL(shortcode : string) {
  const cookie = await cookies();
  const response = await fetch(
    `http://localhost:3001/api/users/delete-user-url/${shortcode}`,
    {
      method: 'DELETE',
      headers: {
        Cookie: cookie.toString(),
      },
      credentials: 'include',
    }
  );
  if (response.ok) {
    return { status: 'true', message: 'Successful Delete' };
  }
  else {
    return { status: 'false', message: 'Unsuccessful Delete' };
  }
}


