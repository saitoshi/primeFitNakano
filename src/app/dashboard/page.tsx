import './style.css';
import { DashboardMenu } from '../_components/Dashboard/DashboardMenu';
export default function Dashboard() {
  const tabs = ['サービス', 'ブログ', 'ユーザー'];
  return (
    <div className='dashboardContainer'>
      <div>
        <DashboardMenu />
      </div>
    </div>
  );
}
