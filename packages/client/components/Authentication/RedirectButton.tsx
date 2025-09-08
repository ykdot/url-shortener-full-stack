'use client';

import { useRouter } from 'next/navigation';
enum Version {
  ADMIN_LOGIN,
  LOGIN,
  SIGNUP,
}

export default function RedirectButton({
  label,
  version,
}: {
  label: string;
  version: Version;
}) {
  const { push } = useRouter();
  function switchVersion() {
    if (version === Version.LOGIN) {
      push('/signup');
    } else {
      push('/');
    }
  }

  return (
    <button className={'pl-2'} onClick={switchVersion}>
      {label}
    </button>
  );
}
