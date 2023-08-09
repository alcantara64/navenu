import { ApiResponse } from "apisauce"
import { Api, IArticleResponse, IArticlesResponse } from "../api"
import { getGeneralApiProblem } from "../api/apiProblem"

export class ArticleService {
  private httpClient: Api
  constructor() {
    this.httpClient = new Api()
  }

  async getArticleDetail(id: string) {
    const response: ApiResponse<IArticleResponse> = await this.httpClient.get(`/Articles/${id}`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data
    return { kind: "ok", data: rawData }
  }

  async getArticles(page = 1, query: string) {
    const response: ApiResponse<IArticlesResponse> = await this.httpClient.get(
      `/Articles/list/${page}/?${query}`,
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data.data
    return { kind: "ok", data: rawData }
  }
}
