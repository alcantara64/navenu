import axios from 'axios';
import {useQuery} from 'react-query';
import { Api } from '../services/api';

const getVenueById = async (venueId: string) => {
  const api = new Api()
  const {data} = await api.get(
    `venues/${venueId}`,
  );
  return data.data;
};

export const useVenue = (venueId: string) => {
  return useQuery(['venue', venueId], () => getVenueById(venueId));
};
