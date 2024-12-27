import type { Metadata } from 'next';
import { IDetail, IService } from '@/app/_utils/type';
import './style.css';
type tParams = Promise<{ _id: string }>;
import { getService } from '@/app/_utils/assistFunctions/serviceFunction';
import { ErrorMsg } from '@/app/_components/ConditionalRelated/Error';
import { Footer } from '@/app/_components/Footer/Footer';
export const generateMetadata = async (props: {
  params: tParams;
}): Promise<Metadata> => {
  const { _id } = await props.params;
  const serviceInfo: IService = await getService(_id);

  return {
    title: serviceInfo.title,
    description: serviceInfo.description,
    keywords: ['中野', 'パーソナルトレーニング'],
    openGraph: {
      title: serviceInfo.title,
      description: serviceInfo.description,
      type: 'article',
      images: serviceInfo.thumbnail,
    },
  };
};

export default async function Page(props: { params: tParams }) {
  let error: boolean = false;
  const { _id } = await props.params;
  const serviceInfo = await getService(_id);
  await console.log(serviceInfo);
  if (serviceInfo == null) {
    error = true;
  }
  if (error) {
    return <ErrorMsg />;
  }
  return (
    <>
      <div id='serviceDetail' className='pageContainer'>
        <h2>
          <p className='mainHeader'>{serviceInfo?.title}</p>
        </h2>
        <div className='imgBox'>
          <img className='imgResponsive' src={serviceInfo?.thumbnail} />
        </div>
        <p>{serviceInfo?.description}</p>
        <br />
        <div className='recommendBox'>
          <h4 className='recommendTitle'>
            <p className='subHeader'>RECOMMEND</p>
            <p className='mainHeader'>おすすめな理由</p>
          </h4>
          {serviceInfo?.benefits.map(
            (item: { title: string; description: string }) => {
              return (
                <li className='recommendList' key={item.title}>
                  <b>{item.title}</b> <br /> {item.description}
                </li>
              );
            },
          )}
        </div>
        <div className='flow'>
          <h4 className='recommendTitle'>
            <p className='subHeader'>STEPS</p>
            <p className='mainHeader'>{serviceInfo.title}の流れ</p>
          </h4>
          <div className='rowSplit'>
            <div className='threeCol'>
              <p className='subHeader'>STEP 1</p>
              <b className='stepListTitle'>{serviceInfo?.steps[0].title}</b>
              <br />
              <p>{serviceInfo?.steps[0].description}</p>
            </div>
            <div className='threeCol'>
              <p className='subHeader'>STEP 2</p>
              <b className='stepListTitle'>{serviceInfo?.steps[1].title}</b>
              <br />
              <p>{serviceInfo?.steps[1].description}</p>
            </div>
            <div className='threeCol'>
              <p className='subHeader'>STEP 3</p>
              <b className='stepListTitle'>{serviceInfo?.steps[2].title}</b>
              <br />
              <p>{serviceInfo?.steps[2].description}</p>
            </div>
          </div>
        </div>
        <div id='priceSection'>
          <h4 className='recommendTitle'>
            <p className='subHeader'>COST</p>
            <p className='mainHeader'>{serviceInfo.title}の料金</p>
          </h4>
          {serviceInfo?.campaign.length > 0 ? (
            <>
              {serviceInfo.campaign.map(
                (campaign: { title: string; description: string }) => {
                  return (
                    <div className='campaignBox' key={campaign.title}>
                      <h4>{campaign.title}</h4>
                      <p>{campaign.description}</p>
                    </div>
                  );
                },
              )}
            </>
          ) : (
            <></>
          )}
          <table className='priceListTable'>
            <thead>
              <tr className='priceHead'>
                <th>期限・回数</th>
                <th>料金</th>
              </tr>
            </thead>
            <tbody>
              {serviceInfo?.costs.map((cost: IDetail) => {
                return (
                  <tr className='priceBody' key={cost.title}>
                    <th>{cost.title}</th>
                    <th>{cost.cost}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div id='reviewSection'>
          <h4 className='recommendTitle'>
            <p className='subHeader'>VOICE</p>
            <p className='mainHeader'>お客様の声</p>
          </h4>
          {serviceInfo.reviews.map(
            (review: { title: string; description: string }) => {
              return (
                <div className='reviewBox' key={review.title}>
                  <h4>{review.title}</h4>
                  <p>{review.description}</p>
                </div>
              );
            },
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
