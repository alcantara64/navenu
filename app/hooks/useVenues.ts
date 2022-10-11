import axios from 'axios';
import {useQuery} from 'react-query';

const getVenues = async () => {
  const {data} = await axios.get(`https://api.navenu.com/index.php/venues/`);
  return data;
};

export const useVenues = () => {
  return useQuery('venues', getVenues);
};
