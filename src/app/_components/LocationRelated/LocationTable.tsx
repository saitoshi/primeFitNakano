'use client';
import { useState, useEffect } from 'react';
import './style.css';
import Link from 'next/link';
import { ILocation } from '@/app/_utils/type';

export const LocationTable = () => {
  const [load, setLoad] = useState<boolean>(true);
  const [locations, setLocations] = useState<[ILocation]>();
  const [error, setError] = useState<boolean>(false);
  const [serverErr, setServerErr] = useState<boolean>(false);

  useEffect(() => {
    const fetchLocations = async () => {
      const locationResponse = await fetch('/api/location');
      const locationData = await locationResponse.json();
      await console.log(locationData);
      if (locationData['status'] !== 201) {
        if (locationData['status'] === 500) {
          setServerErr(true);
        } else {
          await setError(true);
        }
      }
      if (locationData['status'] === 201) {
        await setLocations(locationData['locations']);
      }
      await setLoad(false);
    };
    if (load) {
      fetchLocations();
    }
  }, []);

  if (load) {
    return (
      <div>
        <p>読み込み中</p>
      </div>
    );
  }
  if (error) {
    return (
      <p>
        エラーが発生しました。時間をおいて、もう一度確認をお願いいたします。
      </p>
    );
  }
  if (serverErr) {
    return (
      <p>
        エラーが発生しました。時間をおいて、もう一度確認をお願いいたします。
      </p>
    );
  }
  return (
    <>
      <div id='locationList'>
        <h2 className='listHeader'>
          <p className='subHeader'>LOCATION</p>
          <p className='mainHeader'>店舗情報</p>
        </h2>
        <ul className='responsive-table'>
          <li className='tableHeader'>
            <div className='blog col-1'>店舗名</div>
            <div className='blog col-2'>アクセス</div>
            <div className='blog col-3'>住所</div>
            <div className='blog col-4'>電話番号</div>
            <div className='blog col-5'>編集</div>
          </li>
          {locations?.map((location: ILocation) => {
            return (
              <li className='tableRow' key={location._id}>
                <div className='blog col-1'>{location.name}</div>
                <div className='blog col-2'>{location.access}</div>
                <div className='blog col-3'>{location.address}</div>
                <div className='blog col-4'>{location.phoneNumber}</div>
                <div className='blog col-5'>
                  <Link
                    href={`/edit-location/${location._id}`}
                    style={{ textDecoration: 'none' }}>
                    <button className='edit-button'>&#x270E;</button>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
