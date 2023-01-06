import { useQuery } from "react-query";
import { DropService } from "../services/dropsService";

const getDropById = async (dropId: string) => {
    const  venueService = new DropService();
    const response = await venueService.getDropDetail(dropId);
    if(response.kind === 'ok'){
     return response.data;
    }else{
     throw new Error('Failed to fetch Drop Detail')
    } 
   };
   
   export const useDrop = (dropId: string) => {
     return useQuery(['drop-detail', dropId], () => getDropById(dropId));
   };