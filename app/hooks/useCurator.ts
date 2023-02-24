import {useQuery} from 'react-query';
import { CuratorService } from '../services/curatorService';


const getCuratorById = async (curatorId: string) => {
 const  curratorService = new CuratorService();
 const response = await curratorService.getCuratorDetail(curatorId);
 if(response.kind === 'ok'){
  return response.data.curator
 }else{
  throw new Error('Failed to fetch Curator Detail ')
 }

 
};

export const useCurator = (curatorId: string) => {
  return useQuery(['curator', curatorId], () => getCuratorById(curatorId));
};