'use client';
import { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './MainHeader.module.css';
import { Button } from '../ui/button';
// import webIcon from '@/assets/blood-pressure-icon.png';
// import { logout } from '@/actions/auth-action';

function MainHeader() {
  function signout() {
    // logout();
    // userCtx.logout();
  }

  // future work when checking the context to see if user is signed in
  const date: Date = new Date();
  return (
    <header className={styles.main}>
      <Link className={styles['logo-click']} href="/">
        {/* <Image src={webIcon} width={35} alt="Blood Pressure Icon" priority /> */}
        <p>URL Shortener</p>
      </Link>

      <nav className={styles['nav-list']}>
        <ul>
          <Button>Logout</Button>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
