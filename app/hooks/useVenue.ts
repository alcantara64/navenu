import {useQuery} from 'react-query';
import { Api } from '../services/api';
import { IVenue } from '../interface/venues';
import { ApiResponse } from 'apisauce';

const getVenueById = async (venueId: string) => {
  const api = new Api()
  const { data } : ApiResponse<{data:IVenue}> = await api.get(
    `venues/${venueId}`,
  );
  return data.data;
};

export const useVenue = (venueId: string) => {
  return useQuery(['venue', venueId], () => getVenueById(venueId));
};
