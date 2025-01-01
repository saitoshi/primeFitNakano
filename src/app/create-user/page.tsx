import type { Metadata } from 'next';
import { CreateUser } from '../_components/UserRelated/CreateUser';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Prime Fit Gym 中野 | 新規ユーザー登録',
  keywords: 'パーソナルトレーニング、中野、脱毛、トレーニング、',
  openGraph: {
    title: 'Prime Fit Gym 中野 | 新規ユーザー登録',
    type: 'website',
    images: `/image/mainLogo.png`,
  },
};
export default function Page() {
  return (
    <div>
      <div className='pageContainer'>
        <h2>
          <p className='subHeader'>ADD USER</p>
          <p className='mainHeader'>ユーザー追加</p>
        </h2>
        <br />
        <CreateUser />
      </div>
    </div>
  );
}
