import './style.css';

export const LoadingWheel = () => {
  return (
    <div className='pageContainer'>
      <h2>
        <p className='subHeader'>LOADING...</p>
        <p className='mainHeader'>読み込み中</p>
        <div style={{ textAlign: 'center' }}></div>
      </h2>
      <div className='modalBody'>
        <div className='loader'></div>
      </div>
    </div>
  );
};
