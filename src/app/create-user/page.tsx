import { CreateUser } from '../_components/UserRelated/CreateUser';
export default function Page() {
  return (
    <div>
      <div className='pageContainer'>
        <h2>
          <p className='subHeader'>ADD USER</p>
          <p className='mainHeader'>ユーザー追加</p>
        </h2>
        <br />
        <CreateUser />
      </div>
    </div>
  );
}
