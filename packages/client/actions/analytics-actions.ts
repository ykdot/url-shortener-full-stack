'use server';
import { cookies } from 'next/headers';

// this is a server side function, so need to use next/headers to access cookies from the client side
export async function getMainAnalyticsData(days: number) {
  const cookie = await cookies();
  const response = await fetch(
    `${process.env.ACTUAL_SERVER_API_URL}/analytics/main/${days}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie.toString(),
      },
    },
  );
  const data = await response.json();
  return data;
}

export async function getURLTable(
  filter: string,
  order: string,
  page: string,
  wordFilter: string,
) {
  const cookie = await cookies();
  const response = await fetch(
    `${process.env.ACTUAL_SERVER_API_URL}/analytics/url-table/${filter}/${order}/${page}/${wordFilter}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie.toString(),
      },
    },
  );
  const data = await response.json();
  return data;
}
