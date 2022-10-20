import { ApiResponse } from "apisauce"
import { Api, IDropResponse } from "../api"
import { getGeneralApiProblem } from "../api/apiProblem"

export class VenuesService {
  private httpClient: Api
  constructor() {
    this.httpClient = new Api()
  }



  async getVenueDetail(id: string) {
    const response: ApiResponse<IDropResponse> =
      await this.httpClient.get(`/Venues/${id}`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data
    return { kind: "ok", data: rawData }
  }
}
