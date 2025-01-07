import type { Metadata } from 'next';
import { EditServiceForm } from '@/app/_components/ServiceRelated/EditService';
import { IService } from '@/app/_utils/type';
type tParams = Promise<{ _id: string }>;
import { getService } from '@/app/_utils/assistFunctions/serviceFunction';
import { ErrorMsg } from '@/app/_components/ConditionalRelated/Error';
export const generateMetadata = async (props: {
  params: tParams;
}): Promise<Metadata> => {
  const { _id } = await props.params;
  const serviceInfo: IService = await getService(_id);

  return {
    title: serviceInfo.title,
    description: serviceInfo.description,
    keywords: serviceInfo.title,
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
  if (serviceInfo === null || serviceInfo === undefined) {
    error = true;
  }
  if (error) {
    return <ErrorMsg />;
  }
  return (
    <>
      <div id='editService' className='pageContainer'>
        <h2>
          <p className='subHeader'>EDIT SERVICE</p>
          <p className='mainHeader'>{serviceInfo?.title}を編集する</p>
        </h2>
        <EditServiceForm service={serviceInfo} />
      </div>
    </>
  );
}
