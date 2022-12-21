import { ApiResponse } from "apisauce"
import { IAutoCompletePayload } from "../../interface/feed"
import { Api, AutoCompleteResponse, FeedResponse } from "../api"
import { getGeneralApiProblem } from "../api/apiProblem"

export class FeedService {
  private httpClient: Api
  constructor() {
    this.httpClient = new Api()
  }

  async getFeeds(queryParams?: string) {
    const response: ApiResponse<FeedResponse> = await this.httpClient.get(`/feed/${queryParams}`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data.data
    return { kind: "ok", feeds: rawData }
  }

  async getAutoCompleteSuggestions(payload: IAutoCompletePayload) {
    const formData = new FormData()
    formData.append("term", payload.term)
    formData.append("type", payload.type)
    if (!payload.selected.length) {
      formData.append("selected[parentCategory][]", "")
    } else {
      payload.selected.forEach((category) => {
        formData.append("selected[parentCategory][]", category)
      })
    }
    const response: ApiResponse<AutoCompleteResponse> = await this.httpClient.post(
      "/feed/autocomplete",
      formData,
    )
    console.log(response.data)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data.data
    return { kind: "ok", results: rawData }
  }
}
