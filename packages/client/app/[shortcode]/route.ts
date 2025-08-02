import { redirect } from 'next/navigation';

export async function GET(  request: Request, { params }: { params: { shortcode: string } }) {
  const { shortcode } = await params;
  const res = await fetch(`http://localhost:3000/urls/${shortcode}`);
  const data = await res.json();
  if (res.status == 404) {
    return Response.json({ data })
  }
 
  redirect(data.long_url);
}