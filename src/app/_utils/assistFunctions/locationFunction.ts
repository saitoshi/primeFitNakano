import { ILocation } from '../type';

/**
 * @name getMainLocation
 * @desc Retrieves the main location registered in the system
 * @return locationList
 */
export async function getMainLocation() {
  try {
    const locationResponse = await fetch(
      'api/location/id=677c7907ed0b9acbead8eeb6',
    );
    const locationData = await locationResponse.json();
    const location: ILocation = locationData['location'];
    return location;
  } catch (error) {
    console.error(error);
    return error;
  }
}
