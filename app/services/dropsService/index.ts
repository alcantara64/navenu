import { ApiResponse } from "apisauce"
import { IDrop } from "../../interface/drops"
import { Api, IDropResponse, IDropsResponse } from "../api"
import { getGeneralApiProblem } from "../api/apiProblem"

export class DropService {
  private httpClient: Api
  constructor() {
    this.httpClient = new Api()
  }

  async claimDrop(dropId: string) {
    const response: ApiResponse<{ status: boolean; message: string; data: IDrop }> =
      await this.httpClient.get(`/Drops/claim/${dropId}`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data.data
    return { kind: "ok", claimCode: rawData }
  }

  async getDropDetail(dropId: string) {
    const response: ApiResponse<IDropResponse> = await this.httpClient.get(`/Drops/${dropId}`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data.data
    return { kind: "ok", data: rawData }
  }

  async getDrops(page = 0, query: string, category: Array<string>) {
    const categoryFilters = category.length > 0 ? encodeURIComponent(category.toString()) : ""
    const response: ApiResponse<IDropsResponse> = await this.httpClient.get(
      `/Drops/list/${page}/${categoryFilters}?${query}`,
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data.data
    return { kind: "ok", data: rawData }
  }
}
