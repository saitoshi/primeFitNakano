import type { Metadata } from 'next';
import { Footer } from '../_components/Footer/Footer';
import { ServiceBody } from '../_components/ServiceRelated/ServiceBody';
export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Prime Fit Gym 中野 | サービス',
  keywords: 'パーソナルトレーニング、中野、脱毛、トレーニング、',
  openGraph: {
    title: 'Prime Fit Gym 中野 | サービス',
    type: 'website',
    images: `/image/mainLogo.png`,
  },
};

export default function Service() {
  return (
    <div>
      <ServiceBody />
      <Footer />
    </div>
  );
}
