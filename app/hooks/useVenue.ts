import axios from 'axios';
import {useQuery} from 'react-query';

const getVenueById = async (venueId: string) => {
  const {data} = await axios.get(
    `https://api.navenu.com/index.php/venues/${venueId}`,
  );
  return data;
};

export const useVenue = (venueId: string) => {
  return useQuery(['venue', venueId], () => getVenueById(venueId));
};
