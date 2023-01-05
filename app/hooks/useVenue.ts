import {useQuery} from 'react-query';
import { VenuesService } from '../services/venuesService';

const getVenueById = async (venueId: string) => {
 const  venueService = new VenuesService();
 const response = await venueService.getVenueDetail(venueId);
 if(response.kind === 'ok'){
  return response.data.data
 }else{
  throw new Error('Failed to fetch Venue Detail')
 }

 
};

export const useVenue = (venueId: string) => {
  return useQuery(['venue', venueId], () => getVenueById(venueId));
};
