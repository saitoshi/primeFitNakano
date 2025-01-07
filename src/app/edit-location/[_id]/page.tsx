import type { Metadata } from 'next';
import { EditLocationForm } from '@/app/_components/LocationRelated/EditLocationForm';
type tParams = Promise<{ _id: string }>;
import { ErrorMsg } from '@/app/_components/ConditionalRelated/Error';

export const generateMetadata = async (props: {
  params: tParams;
}): Promise<Metadata> => {
  const { _id } = await props.params;
  const locationInfo = await fetch(process.env.URL + `/api/location/id=${_id}`);
  const locationData = await locationInfo.json();

  return {
    title: locationData['location'].name,
    description: locationData['location'].description,
    openGraph: {
      title: locationData['location'].name,
      description: locationData['location'].description,
      type: 'article',
    },
  };
};

export default async function Page(props: { params: tParams }) {
  let error: boolean = false;
  const { _id } = await props.params;
  let location;
  const locationInfo = await fetch(process.env.URL + `/api/location/id=${_id}`);
  const locationData = await locationInfo.json();
  if (locationData['status'] !== 201) {
    error = true;
  } else {
    location = await locationData['location'];
  }
  if (error) {
    return <ErrorMsg />;
  }
  return (
    <>
      <div id='editService' className='pageContainer'>
        <h2>
          <p className='subHeader'>EDIT LOCATION</p>
          <p className='mainHeader'>{location?.name}を編集する</p>
        </h2>
        <EditLocationForm location={location} />
      </div>
    </>
  );
}
