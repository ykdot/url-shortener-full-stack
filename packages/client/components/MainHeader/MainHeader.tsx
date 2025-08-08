'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './MainHeader.module.css';
import { Button } from '../ui/button';
import { logoutUser } from '@/actions/authentication-actions';
// import webIcon from '@/assets/blood-pressure-icon.png';

function MainHeader() {
  const { push } = useRouter();
  function logout() {
    logoutUser();
    // userCtx.logout();
    push('/login');
  }

  // future work when checking the context to see if user is signed in
  return (
    <header className={styles.main}>
      <Link className={styles['logo-click']} href="/">
        <p>URL Shortener</p>
      </Link>

      <nav className={styles['nav-list']}>
        <ul>
          <Button onClick={logout}>Logout</Button>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
