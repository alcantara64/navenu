import { ApiResponse } from "apisauce"
import { Api, ISubCategoryResponse, IVenueResponse, IVenuesResponse } from "../api"
import { getGeneralApiProblem } from "../api/apiProblem"

export class RecEngineService {
  private httpClient: Api
  constructor() {
    this.httpClient = new Api()
  }

  async getSubCategories() {
    const response: ApiResponse<ISubCategoryResponse> = await this.httpClient.get(
      `/Venues/categories`,
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data
    return { kind: "ok", data: rawData }
  }

  async getRecommendation(
    category: string,
    subcategory?: string,
    distance?: string,
    time?: string,
    questions?: { price_level: Array<string>; tags: Array<string>; subCategories: Array<string> },
  ) {
    const formData = new FormData()
    formData.append("category", category)
    // if(subcategory){
    //   formData.append('subcategory', subcategory)
    // }
    if (distance) {
      formData.append("geo", distance)
    }
    if (time) {
      formData.append("timeofday", time)
    }
    if (questions && questions.price_level.length > 0) {
      console.log(questions.price_level.toString())
      formData.append("price_levels", questions.price_level.toString())
    }
    if (questions && questions.tags.length > 0) {
      formData.append("tags", questions.tags.toString())
    }
    if (questions && questions.subCategories.length > 0) {
      formData.append("subcategory", questions.subCategories.toString())
    }
    console.log(JSON.stringify(formData))
    const response: ApiResponse<IVenuesResponse> = await this.httpClient.post(
      `/Venues/recommend`,
      formData,
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data.data
    return { kind: "ok", data: rawData }
  }

  async getQuestionnaires() {
    const response: ApiResponse<any> = await this.httpClient.get(`/Venues/rec_template`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data
    return { kind: "ok", data: rawData }
  }
}
