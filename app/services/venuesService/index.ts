import { ApiResponse } from "apisauce"
import { Api, IVenueResponse, IVenuesResponse } from "../api"
import { getGeneralApiProblem } from "../api/apiProblem"

export class VenuesService {
  private httpClient: Api
  constructor() {
    this.httpClient = new Api()
  }

  async getVenueDetail(id: string) {
    const response: ApiResponse<IVenueResponse> = await this.httpClient.get(`/Venues/${id}`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data
    return { kind: "ok", data: rawData }
  }

  async getVenues(page = 0, query: string, category: Array<string>, isMapMode: boolean) {
    const categoryFilters = category.length > 0 ? encodeURIComponent(category.toString()) : ""
    let url = `/Venues/list/${page}/${categoryFilters}?${query}`
    if (isMapMode) {
      url = `/Venues/all/${categoryFilters}`
    }

    const response: ApiResponse<IVenuesResponse> = await this.httpClient.get(url)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data
    return { kind: "ok", data: rawData }
  }
}
