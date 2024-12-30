import { CreateService } from '../_components/ServiceRelated/CreateService';
export default function Page() {
  return (
    <div>
      <div className='pageContainer'>
        <h2>
          <p className='subHeader'>CREATE SERVICE</p>
          <p className='mainHeader'>サービス作成</p>
        </h2>
        <br />
        <CreateService />
      </div>
    </div>
  );
}
