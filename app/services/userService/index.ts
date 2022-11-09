import { ApiResponse } from "apisauce";
import { Api, FeedResponse, IUserListResponse } from "../api"
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
}
