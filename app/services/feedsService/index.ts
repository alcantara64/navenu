import { ApiResponse } from "apisauce";
import { Api, FeedResponse } from "../api"
import { getGeneralApiProblem } from "../api/apiProblem";

export class FeedService {
  private httpClient: Api
  constructor() {
    this.httpClient = new Api()
  }

 async getFeeds(queryParams?: string) {
    const response:ApiResponse<FeedResponse> =   await this.httpClient.get(`/feed/${queryParams}`);
    if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const rawData = response.data.data;
     return {kind: 'ok', feeds: rawData}

  }
}
