'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../MainHeader/MainHeader.module.css';
import { Button } from '../ui/button';
import { logoutAdmin } from '@/actions/authentication-actions';

function AdminMainHeader() {
  const { push } = useRouter();
  async function logout() {
    await logoutAdmin();
    // userCtx.logout();
    push('/dashboard/login');
  }

  // future work when checking the context to see if user is signed in
  return (
    <header className={styles.main}>
      <Link className={styles['logo-click']} href="/">
        <p>URL Admin Dashboard</p>
      </Link>

      <nav className={styles['nav-list']}>
        <ul>
          <Button onClick={logout}>Logout</Button>
        </ul>
      </nav>
    </header>
  );
}

export default AdminMainHeader;
