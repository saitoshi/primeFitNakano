'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const SuccessMsg = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('/dashboard');
    }, 5000);
  });
  return (
    <>
      <div className='pageContainer'>
        <h2>
          <p className='subHeader'>SUCCESS</p>
          <p className='mainHeader'>登録が完了いたしました。</p>
        </h2>
        <p>
          数秒後に管理画面に転送されます。もしも、されない場合お手数ですが、こちらのボタンをクリックしてください。
        </p>
        <div style={{ textAlign: 'center' }}>
          <button id='submitButton'>トップに戻る</button>
        </div>
      </div>
    </>
  );
};
