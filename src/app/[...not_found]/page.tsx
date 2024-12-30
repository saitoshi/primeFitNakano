import Link from 'next/link';
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
