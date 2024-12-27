import { IService } from '../type';

/**
 * @name getSerivces
 * @desc Retrieves all of the services available
 * @return serviceList - The collection of services available
 */
export async function getServices() {
  try {
    const serviceResponses = await fetch('api/service', {
      method: 'GET',
    });
    const serviceData = await serviceResponses.json();
    const services: IService[] = serviceData['services'];
    return services;
  } catch (error) {
    return error;
  }
}

/**
 * @name getService
 * @param _id - unique identifier of the service
 * @return service - The details of that service based on the id
 */
export async function getService(_id: string) {
  try {
    const serviceResponse = await fetch(
      process.env.URL + `api/service/id=${_id}`,
      {
        method: 'GET',
      },
    );
    const serviceData = await serviceResponse.json();

    return serviceData['service'];
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * @name getAvailableServices()
 * @desc gets all of the services that are available to the public
 * @return serviceList
 */
export async function getAvailableServices() {
  try {
    const serviceList: IService[] = [];
    const serviceResponses = await fetch('api/service', {
      method: 'GET',
    });
    const serviceData = await serviceResponses.json();
    await console.log(serviceData['services'][0].status);
    for (let i = 0; i < serviceData['services'].length; i++) {
      if (serviceData['services'][i].status === 'released') {
        await serviceList.push(serviceData['services'][i]);
      }
    }
    return serviceList;
  } catch (error) {
    console.log(error);
    return error;
  }
}
