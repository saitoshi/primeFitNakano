import type { Metadata } from 'next';
import { LocationCard } from '../_components/LocationCard/LocationCard';
import { Footer } from '../_components/Footer/Footer';
export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Prime Fit Gym 中野 | 店舗情報',
  keywords: 'パーソナルトレーニング、中野、脱毛、トレーニング、',
  openGraph: {
    title: 'Prime Fit Gym 中野 | サービス',
    type: 'website',
    images: `/image/mainLogo.png`,
  },
};
export default function Location() {
  return (
    <div>
      <LocationCard />

      <Footer />
    </div>
  );
}
