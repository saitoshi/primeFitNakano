import type { Metadata } from 'next';
import { FaqCard } from '../_components/FaqRelated/FaqCard';
import { Footer } from '../_components/Footer/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Prime Fit Gym 中野 | よくある質問',
  keywords: 'パーソナルトレーニング、中野、脱毛、トレーニング、',
  openGraph: {
    title: 'Prime Fit Gym 中野 | よくある質問',
    type: 'website',
    images: `/image/mainLogo.png`,
  },
};
export default function Faq() {
  return (
    <div id='faqPage'>
      <div className='pageContainer'>
        <h2>
          <p className='subHeader'>FAQ</p>
          <p className='mainHeader'>よくある質問</p>
        </h2>
        <FaqCard />
      </div>
      <Footer />
    </div>
  );
}
