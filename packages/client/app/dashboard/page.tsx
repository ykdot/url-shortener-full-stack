import type { Metadata } from 'next';
import { LinkManagementComponent } from "@/components/AdminDashboard/LinkManagementComponent";
import MainAnalyticsComponent from "@/components/AdminDashboard/MainAnalyticsComponent";
import { columns, payments } from "@/components/AdminDashboard/columns";
import styles from '../user/[username]/page.module.css';
import AdminMainHeader from '@/components/AdminMainHeader/AdminMainHeader';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
};

export default function AdminPage() {
  return (
    <>
    <AdminMainHeader />
      <div className={styles['container']}>
        <MainAnalyticsComponent />
        <LinkManagementComponent columns={columns} data={payments}/>
      </div>    
    </>

  );
}
