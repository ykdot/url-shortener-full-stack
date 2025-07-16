import { Button } from '@/components/ui/button';

export default function SignUpForm() {
  return (
    <form
      action={''}
      className="flex flex-col items-center justify-center bg-white rounded-2xl gap-3 pt-10 pb-10"
    >
      <h1 className="text-2xl">URL Shortener</h1>
      <h2 className="text-xl">Sign Up</h2>
      <div className="flex flex-col gap-2">
        <label htmlFor=""></label>
        <input type="text" name="email" id="" placeholder="Email" />
        <input type="password" name="password" id="" placeholder="Password" />
        <input
          type="password"
          name="password"
          id=""
          placeholder="Reenter Password"
        />
        <Button>Login</Button>
      </div>
    </form>
  );
}
