'use client';
import Link from 'next/link';
import { IService } from '@/app/_utils/type';
import '../components.style.css';

type serviceInputs = {
  service: IService;
};
export const ServiceCard = ({ service }: serviceInputs) => {
  return (
    <li className='cardItem'>
      <Link className='cardLink' href={`/service/${service._id}`}>
        <div className='cardMainImg'>
          <img
            className='cardImg'
            src={service.thumbnail}
            alt={service.title}
          />
        </div>
        <div className='text-section'>
          <h2 className='cardTitleSection'>{service.title}</h2>
          <div className='cardDetails'>
            <p className='cardDescription'>{service.description}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};
