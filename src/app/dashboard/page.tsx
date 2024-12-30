import './style.css';
import { DashboardMenu } from '../_components/Dashboard/DashboardMenu';
export default function Dashboard() {
  return (
    <div className='dashboardContainer'>
      <div>
        <DashboardMenu />
      </div>
    </div>
  );
}
