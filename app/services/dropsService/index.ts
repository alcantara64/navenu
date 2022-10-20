import { ApiResponse } from "apisauce"
import { Api, IDropResponse } from "../api"
import { getGeneralApiProblem } from "../api/apiProblem"

export class DropService {
  private httpClient: Api
  constructor() {
    this.httpClient = new Api()
  }

  async claimDrop(dropId: string) {
    const response: ApiResponse<{ status: boolean; message: string; data: string }> =
      await this.httpClient.get(`/Drops/claim/${dropId}`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data
    return { kind: "ok", claimcode: rawData }
  }

  async getDropDetail(dropId: string) {
    const response: ApiResponse<IDropResponse> =
      await this.httpClient.get(`/Drops/${dropId}`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data
    return { kind: "ok", data: rawData }
  }
}
