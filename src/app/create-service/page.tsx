import { CreateService } from '../_components/ServiceRelated/CreateService';
export default function Page() {
  return (
    <div>
      <div className='pageContainer'>
        <h2>
          <p className='subHeader'>CREATE BLOG</p>
          <p className='mainHeader'>ブログ作成</p>
        </h2>
        <br />
        <CreateService />
      </div>
    </div>
  );
}
