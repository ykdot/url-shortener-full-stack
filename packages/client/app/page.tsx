import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'URL Shortener',
};

export default function AuthenticationPage() {
  return (
    <div>
      <div className="flex flex-col content-center justify-center px-30 gap-3 min-h-screen bg-no-repeat bg-cover bg-[url(/patterns.png)]">
        <form
          action={''}
          className="flex flex-col items-center justify-center bg-white rounded-2xl gap-3 pt-10 pb-10"
        >
          <h1 className="text-2xl">URL Shortener</h1>
          <h2 className="text-xl">Log In</h2>
          <div className="flex flex-col gap-2">
            <label htmlFor=""></label>
            <input type="text" name="email" id="" placeholder="Email" />
            <input
              type="password"
              name="password"
              id=""
              placeholder="Password"
            />
            <Button>Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
