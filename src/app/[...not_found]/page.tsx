import type { Metadata } from 'next';
export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Prime Fit Gym 中野 | ページが見つかりませんでした',
  keywords: 'パーソナルトレーニング、中野、脱毛、トレーニング、',
  openGraph: {
    title: 'Prime Fit Gym 中野 | トップ',
    type: 'website',
    images: `/image/mainLogo.png`,
  },
};
export default function Page() {
  return (
    <div id='notFound' className='pageContainer'>
      <h2>
        <p className='subHeader'>NOT FOUND</p>
        <p className='mainHeader'>
          アクセスしようとしたページは削除または変更された可能性があります。
        </p>
      </h2>
    </div>
  );
}
