import type { Metadata } from 'next';
import { LinkManagementComponent } from "@/components/AdminDashboard/LinkManagementComponent";
import MainAnalyticsComponent from "@/components/AdminDashboard/MainAnalyticsComponent";
import { columns, payments } from "@/components/AdminDashboard/columns";
import styles from '../user/[username]/page.module.css';
import AdminMainHeader from '@/components/AdminMainHeader/AdminMainHeader';
import { getMainAnalyticsData } from '@/actions/analytics-actions';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
};

export default async function AdminPage() {
  let mainData = await getMainAnalyticsData(7);
  console.log(mainData);

  if (mainData.data.total_clicks == null) {
    mainData = {
      total_clicks: "0",
      distinct_links: "0",
      most_frequent_short_code: `No links in the past 7 days`
    }
  }

  return (
    <>
    <AdminMainHeader />
      <div className={styles['container']}>
        <MainAnalyticsComponent initialData={mainData}/>
        <LinkManagementComponent columns={columns} data={payments}/>
      </div>    
    </>

  );
}
