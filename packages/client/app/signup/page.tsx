import { Metadata } from 'next';

import ModelForm from '@/components/Authentication/ModelForm';
import { SignUpForm } from '@/components/Authentication/SignUpForm';
import styles from './Authentication.module.css';

export const metadata: Metadata = {
  title: 'Sign Up',
};

enum Version {
  LOGIN,
  SIGNUP,
}

function SignUpPage() {
  return (
    <div>
      <div className="flex flex-col content-center justify-center px-30 gap-3 min-h-screen bg-no-repeat bg-cover bg-[url(/patterns.png)]">
        <ModelForm version={Version.SIGNUP}>
          <SignUpForm />
        </ModelForm>
      </div>
    </div>
  );
}

export default SignUpPage;
