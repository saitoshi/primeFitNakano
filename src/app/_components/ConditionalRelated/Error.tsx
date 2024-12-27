'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const ErrorMsg = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 5000);
  });
  return (
    <>
      <div className='pageContainer'>
        <h2>
          <p className='subHeader'>ERROR</p>
          <p className='mainHeader'>エラーが発生いたしました。</p>
        </h2>
        <p>
          エラーが発生いたしました。後にトップ画面に転送されます。もしも、されない場合お手数ですが、こちらのボタンをクリックしてください。
        </p>
        <div style={{ textAlign: 'center' }}>
          <button id='submitButton'>トップに戻る</button>
        </div>
      </div>
    </>
  );
};
