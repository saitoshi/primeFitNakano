import './style.css';
import type { Metadata } from 'next';
import { DashboardMenu } from '../_components/Dashboard/DashboardMenu';
export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Prime Fit Gym 中野 | 管理画面',
  keywords: 'パーソナルトレーニング、中野、脱毛、トレーニング、',
  openGraph: {
    title: 'Prime Fit Gym 中野 | 管理画面',
    type: 'website',
    images: `/image/mainLogo.png`,
  },
};
export default function Dashboard() {
  return (
    <div className='dashboardContainer'>
      <div>
        <DashboardMenu />
      </div>
    </div>
  );
}
