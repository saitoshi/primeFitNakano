import type { Metadata } from 'next';
import { CreateLocationForm } from '../_components/LocationRelated/CreateLocation';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Prime Fit Gym 中野 | 新規店舗追加',
  keywords: 'パーソナルトレーニング、中野、脱毛、トレーニング、',
  openGraph: {
    title: 'Prime Fit Gym 中野 | 新規新規店舗追加',
    type: 'website',
    images: `/image/mainLogo.png`,
  },
};

export default function Page() {
  return (
    <div>
      <div className='pageContainer'>
        <h2>
          <p className='subHeader'>CREATE LOCATION</p>
          <p className='mainHeader'>店舗追加</p>
        </h2>
        <br />
        <CreateLocationForm />
      </div>
    </div>
  );
}
