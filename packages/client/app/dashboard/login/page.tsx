import { Metadata } from 'next';

import ModelForm from '@/components/Authentication/ModelForm';
import LoginForm from '@/components/Authentication/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In',
};

enum Version {
  ADMIN_LOGIN,
  LOGIN,
  SIGNUP,
}

function LoginPage() {
  return (
    <div>
      <div className="flex flex-col content-center justify-center px-30 gap-3 min-h-screen bg-no-repeat bg-cover bg-[url(/patterns.png)]">
        <ModelForm version={Version.ADMIN_LOGIN}>
          <LoginForm version={Version.ADMIN_LOGIN} />
        </ModelForm>
      </div>
    </div>
  );
}

export default LoginPage;
