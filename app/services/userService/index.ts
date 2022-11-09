import { ApiResponse } from "apisauce";
import { Api, FeedResponse, ICreateUserListResponse, IUserListResponse } from "../api"
import { getGeneralApiProblem } from "../api/apiProblem";

export class UserService {
  private httpClient: Api
  constructor() {
    this.httpClient = new Api()
  }

 async getUserById(userId: string) {
    const response:ApiResponse<FeedResponse> =   await this.httpClient.get(`/Users/${userId}`);
    if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const rawData = response.data;
      
  
     return {kind: 'ok', data: rawData.data}

  }

  async getUserList(){
    const response:ApiResponse<IUserListResponse> =   await this.httpClient.get('/UserLists/');
    if(!response.ok){
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data;
    return {kind: 'ok', data: rawData.data}
  }

  async createListName(payload){
   
    const response: ApiResponse<ICreateUserListResponse>  =   await this.httpClient.post('/UserLists/listname', payload);
    if(!response.ok){
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data;
    return {kind: 'ok', data: rawData.data}
  }

  async addUserToList(payload){
   
    const response: ApiResponse<ICreateUserListResponse>  =   await this.httpClient.post('/UserLists/item', payload);
    if(!response.ok){
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data;
    return {kind: 'ok', data: rawData.data}
  }

  async updateUserToList(){
    const response: ApiResponse<ICreateUserListResponse>  =   await this.httpClient.put('/UserLists/item');
    if(!response.ok){
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data;
    return {kind: 'ok', data: rawData.data}
  }

  async removeCardFromList(payload){
    const response: ApiResponse<ICreateUserListResponse>  =   await this.httpClient.delete('/UserLists/item',payload);
    if(!response.ok){
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data;
    return {kind: 'ok', data: rawData.data}
  }

  async clearAllList(id){
    const response: ApiResponse<ICreateUserListResponse>  =   await this.httpClient.delete(`/UserLists/item/${id}`);
    if(!response.ok){
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data;
    return {kind: 'ok', data: rawData.data}
  }
}
