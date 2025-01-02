import type { Metadata } from 'next';
import { CreateBlog } from '../_components/BlogRelated/CreateBlog';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Prime Fit Gym 中野 | ブログ作成',
  keywords: 'パーソナルトレーニング、中野、脱毛、トレーニング、',
  openGraph: {
    title: 'Prime Fit Gym 中野 | ブログ作成',
    type: 'website',
    images: `/image/mainLogo.png`,
  },
};
export default function Page() {
  return (
    <div>
      <div className='pageContainer'>
        <h2>
          <p className='subHeader'>CREATE BLOG</p>
          <p className='mainHeader'>ブログ作成</p>
        </h2>
        <br />
        <CreateBlog />
      </div>
    </div>
  );
}
