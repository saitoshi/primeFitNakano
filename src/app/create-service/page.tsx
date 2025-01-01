import type { Metadata } from 'next';
import { CreateService } from '../_components/ServiceRelated/CreateService';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Prime Fit Gym 中野 | 新規サービス追加',
  keywords: 'パーソナルトレーニング、中野、脱毛、トレーニング、',
  openGraph: {
    title: 'Prime Fit Gym 中野 | 新規サービス追加',
    type: 'website',
    images: `/image/mainLogo.png`,
  },
};
export default function Page() {
  return (
    <div>
      <div className='pageContainer'>
        <h2>
          <p className='subHeader'>CREATE SERVICE</p>
          <p className='mainHeader'>サービス作成</p>
        </h2>
        <br />
        <CreateService />
      </div>
    </div>
  );
}
