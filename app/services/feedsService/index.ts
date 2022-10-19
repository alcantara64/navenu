import { ApiResponse } from "apisauce";
import { Api, FeedResponse } from "../api"
import { getGeneralApiProblem } from "../api/apiProblem";

export class FeedService {
  private httpClient: Api
  constructor() {
    this.httpClient = new Api()
  }

 async getFeeds( pageNumber=1, cartString?:string,) {
   const queryString = `${pageNumber}?${cartString}`;
    const response:ApiResponse<FeedResponse> =   await this.httpClient.get(`/feed/`);
    if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const rawData = response.data;
      console.log('feedsResponse',rawData);
      
  console.log('feeds', rawData.data.length);
     return {kind: 'ok', feeds: rawData.data}

  }
}
