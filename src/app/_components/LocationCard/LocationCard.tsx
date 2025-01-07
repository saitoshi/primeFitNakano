'use client';
import './style.css';
import { ILocation } from '@/app/_utils/type';
import React from 'react';
import { LoadingWheel } from '../ConditionalRelated/LoadingWheel';
export const LocationCard = () => {
  const [load, setLoad] = React.useState<boolean>(true);
  const [error, setError] = React.useState<boolean>(false);

  const [location, setLocation] = React.useState<ILocation>();
  React.useEffect(() => {
    const getLocationInfo = async () => {
      const locationResponse = await fetch(
        'api/location/id=677c7907ed0b9acbead8eeb6',
      );
      const locationData = await locationResponse.json();
      if (locationData['status'] !== 201) {
        setError(true);
      } else {
        await setLocation(locationData['location']);
      }
      await setLoad(false);
    };
    if (load) {
      getLocationInfo();
    }
  }, [location]);
  if (load) {
    return <LoadingWheel />;
  }
  if (error) {
    return (
      <div>
        <div className='pageContainer'>
          <h2>
            <p className='subHeader'>ERROR</p>
            <p className='mainHeader'>エラーが発生しました。</p>
          </h2>
          <p>
            エラーが発生しました。時間をおいて、もう一度確認をお願いいたします。
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className='pageContainer'>
      <h2>
        <p className='subHeader'>LOCATION</p>
        <p className='mainHeader'>店舗情報</p>
      </h2>
      <dl className='locationCard'>
        <dt>店舗名</dt>
        <dd>{location.name}</dd>
        <dt>住所</dt>
        <dd>{location.address}</dd>
        <dt>TEL</dt>
        <dd>{location.phoneNumber}</dd>
        <dt>最寄り駅</dt>
        <dd>{location.access}</dd>
      </dl>
    </div>
  );
};
