import { ApiResponse } from "apisauce"
import { Api, IDropResponse } from "../api"
import { getGeneralApiProblem } from "../api/apiProblem"

export class DropService {
  private httpClient: Api
  constructor() {
    this.httpClient = new Api()
  }

  async claimDrop(venueId: string) {
    const response: ApiResponse<{ status: boolean; message: string; data: string }> =
      await this.httpClient.get(`/Drop/claims/${venueId}`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data
    return { kind: "ok", claim: rawData }
  }

  async getDropDetail(dropId: string) {
    const response: ApiResponse<IDropResponse> =
      await this.httpClient.get(`/Drop/${dropId}`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data
    return { kind: "ok", claim: rawData }
  }
}
