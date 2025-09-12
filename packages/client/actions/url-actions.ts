'use server';
import { cookies } from 'next/headers';

export async function deleteURL(shortcode: string) {
  const cookie = await cookies();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/users/delete-user-url/${shortcode}`,
    {
      method: 'DELETE',
      headers: {
        Cookie: cookie.toString(),
      },
      credentials: 'include',
    },
  );
  if (response.ok) {
    return { status: 'true', message: 'Successful Delete' };
  } else {
    return { status: 'false', message: 'Unsuccessful Delete' };
  }
}

export async function deleteURLByAdmin(shortcode: string) {
  const cookie = await cookies();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/admin/delete-user-url/${shortcode}`,
    {
      method: 'DELETE',
      headers: {
        Cookie: cookie.toString(),
      },
      credentials: 'include',
    },
  );
  if (response.ok) {
    return { status: true, message: 'Successful Delete' };
  } else {
    return { status: false, message: 'Unsuccessful Delete' };
  }
}

export async function addURL(url: string) {
  const cookie = await cookies();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/urls/create-new-url`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie.toString(),
      },
      body: JSON.stringify({ url: url }),
      credentials: 'include',
    },
  );
  console.log(response);
  if (response.ok) {
    return { status: 'true', message: 'Successful Shortcode Creation' };
  } else {
    return { status: 'false', message: 'Unsuccessful Shortcode Creation' };
  }
}
