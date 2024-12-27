'use client';
import { useState, useEffect } from 'react';
import { IService } from '@/app/_utils/type';
import { LoadingWheel } from '../ConditionalRelated/LoadingWheel';
import { ServiceCard } from './ServiceCard';
export const ServiceBody = () => {
  const [serviceList, setServiceList] = useState<IService[]>();
  const [load, setLoad] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const serviceResponses = await fetch('api/service', {
          method: 'GET',
        });
        const serviceData = await serviceResponses.json();
        const services: IService[] = serviceData['services'];
        await setServiceList(services);
        await setLoad(false);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };
    fetchService();
  }, []);

  if (load) {
    return (
      <div className='pageContainer'>
        <LoadingWheel />
      </div>
    );
  } else if (serviceList === undefined) {
    return (
      <div className='pageContainer'>
        <h2>
          <p className='subHeader'>SERVICE</p>
          <p className='mainHeader'>提供サービス</p>
          <p className='pageDescription'>
            エラーが発生いたしました。後ほど、もう一度確認してください。
          </p>
        </h2>
      </div>
    );
  } else if (error) {
    return (
      <div className='pageContainer'>
        <h2>
          <p className='subHeader'>SERVICE</p>
          <p className='mainHeader'>提供サービス</p>
          <p className='pageDescription'>
            エラーが発生いたしました。後ほど、もう一度確認してください。
          </p>
        </h2>
      </div>
    );
  }
  return (
    <div id='servicePage' className='pageContainer'>
      <h2>
        <p className='subHeader'>SERVICE</p>
        <p className='mainHeader'>提供サービス</p>
        <p className='pageDescription'>
          現在、Prime Fitでは以下のサービスを提供しております。
        </p>
      </h2>
      <ul className='cardList'>
        {serviceList?.map((service: IService) => {
          return <ServiceCard key={service._id} service={service} />;
        })}
      </ul>
    </div>
  );
};
