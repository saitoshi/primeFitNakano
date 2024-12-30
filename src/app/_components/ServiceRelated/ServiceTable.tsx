'use client';
import { useState, useEffect } from 'react';
import { getServices } from '@/app/_utils/assistFunctions/serviceFunction';
import { IService } from '@/app/_utils/type';
import Link from 'next/link';
import './style.css';

export const ServiceTable = () => {
  const [load, setLoad] = useState<boolean>(true);
  const [serviceList, setServiceList] = useState<IService[]>();
  const [isError, setIsError] = useState<boolean>(false);
  const errorMsg: string = 'エラーが発生いたしました。';
  useEffect(() => {
    const fetchServices = async () => {
      const services = await getServices();
      if (services.length === 0) {
        await setIsError(true);
      }
      await setServiceList(services);
      await setLoad(false);
    };
    if (load) {
      fetchServices();
    }
  }, [load]);

  if (load) {
    return (
      <div className='pageSection' id='loadMessage'>
        読み込み中...
      </div>
    );
  } else if (isError) {
    <div className='pageSection' id='errorMessage'>
      <span className='errorMsg'>{errorMsg}</span>
    </div>;
  }
  return (
    <>
      <div id='serviceList'>
        <h2 className='listHeader'>
          <p className='subHeader'>SERVICE ARCHIVE</p>
          <p className='mainHeader'>サービス</p>
        </h2>
        <ul className='responsive-table'>
          <li className='tableHeader'>
            <div className='blog col-1'>サービス名</div>
            <div className='blog col-2'>概要</div>
            <div className='blog col-3'>サムネ画像</div>
            <div className='blog col-4'>公開・非公開</div>
            <div className='blog col-5'>編集</div>
            <div className='blog col-6'>作成日</div>
          </li>
          {serviceList?.map((service: IService) => {
            return (
              <li className='tableRow' key={service._id}>
                <div className='blog col-1'>{service.title}</div>
                <div className='blog col-2'>{service.description}</div>
                <div className='blog col-3'>
                  <div className='imgBox'>
                    <img
                      src={service.thumbnail}
                      className='imgResponsive'></img>
                  </div>
                </div>
                <div className='blog col-4'>
                  {service.status === 'draft' ? <p>非公開</p> : <p>公開</p>}
                </div>
                <div className='blog col-5'>
                  <Link
                    href={`/edit-service/${service._id}`}
                    style={{ textDecoration: 'none' }}>
                    <button className='edit-button'>&#x270E;</button>
                  </Link>
                </div>
                <div className='blog col-6'>
                  {service.publishedDate.toString().split('T')[0]}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
