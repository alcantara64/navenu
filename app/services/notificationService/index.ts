import { ApiResponse } from "apisauce";
import { Api, FeedResponse } from "../api"
import { getGeneralApiProblem } from "../api/apiProblem";

export class NotificationService{
    private httpClient: Api
    constructor() {
      this.httpClient = new Api()
    }
    
    async getNotifications() {
        const response: ApiResponse<FeedResponse> =
          await this.httpClient.get(`/users/subscriptions`)
        if (!response.ok) {
          const problem = getGeneralApiProblem(response)
          if (problem) return problem
        }
        const rawData = response.data.data
        return { kind: "ok", notifications: rawData }
      }
}