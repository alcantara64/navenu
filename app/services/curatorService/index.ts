import { ApiResponse } from "apisauce"
import { Api, ICuratorResponse, } from "../api"
import { getGeneralApiProblem } from "../api/apiProblem"

export class CuratorService {
  private httpClient: Api
  constructor() {
    this.httpClient = new Api()
  }



  async getCuratorDetail(id:string) {
    const response: ApiResponse<ICuratorResponse> =
      await this.httpClient.get(`/Curator/${id}`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data
    return { kind: "ok", data: rawData }
  }
}