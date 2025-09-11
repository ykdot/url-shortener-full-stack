import { redirect } from 'next/navigation';

export async function GET(  request: Request, { params }: { params: { shortcode: string } }) {
  const { shortcode } = params;
  const userAgent = request.headers.get('user-agent');
  console.log(userAgent);
  const res = await fetch(`http://localhost:3000/urls/${shortcode}`, {
    headers: {
      'User-Agent': userAgent || 'unknown',
    },
  });  
  const data = await res.json();
  if (res.status == 404) {
    return Response.json({ data })
  }
 
  redirect(data.long_url);
}