import { ApiResponse } from "apisauce"
import { IAutoCompletePayload, ISearchPayLoad } from "../../interface/feed"
import { makeTitleCase } from "../../utils/transform"
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
    formData.append("type", payload.type === 'curator'? 'curators': payload.type)
    if (payload.selected.length) {
      payload.selected.forEach((category) => {
        formData.append("selected[parentCategory][]", category)
      })
    } 
    const response: ApiResponse<AutoCompleteResponse> = await this.httpClient.post(
      "/feed/autocomplete",
      formData,
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data.data
    return { kind: "ok", results: rawData }
  }

  async search(payload: ISearchPayLoad) {
    const formData = new FormData()
    formData.append("type", payload.type === 'curator'? 'curators':payload.type)
    if(payload.categories.length){
      payload.categories.forEach((category) => {
      formData.append(`selected[${category.type.toLowerCase()}][]`, category.display.split(':')[1].toLowerCase() )
      })
    }
    if (payload.selected.length) {
      payload.selected.forEach((parentCategory) => {
        formData.append("selected[parentCategory][]", parentCategory)
      })
    }
    const response: ApiResponse<FeedResponse> = await this.httpClient.post(
      "/feed/searchByType",
      formData,
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data.data
    return { kind: "ok", results: rawData }
  }
  
}
