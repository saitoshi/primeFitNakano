import styles from './page.module.css';
import type { Metadata } from 'next';
import { CSSProperties } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Prime Fit Gym 中野 | トップ',
  keywords: 'パーソナルトレーニング、中野、脱毛、トレーニング、',
  openGraph: {
    title: 'Prime Fit Gym 中野 | トップ',
    type: 'website',
    images: `/image/mainLogo.png`,
  },
};
export default function Home() {
  const introImgContainer: CSSProperties = {
    display: 'flex',
    margin: '0 10px 96px 10px',
  };
  return <div className={styles.page}></div>;
}
