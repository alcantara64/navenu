import { useQuery } from "react-query"
import { ArticleService } from "../services/articleService"

const getArticleById = async (articleId: string) => {
  const venueService = new ArticleService()
  const response = await venueService.getArticleDetail(articleId)
  if (response.kind === "ok") {
    return response.data.data
  } else {
    throw new Error("Failed to fetch Article")
  }
}
const getArticles = async (page = 1, searchText) => {
  const venueService = new ArticleService()
  const response = await venueService.getArticles(page, `searchTerm=${searchText}`)
  if (response.kind === "ok") {
    return response.data
  } else {
    throw new Error("Failed to fetch Articles")
  }
}

export const useArticle = (articleId: string) => {
  return useQuery(["article", articleId], () => getArticleById(articleId))
}
export const useArticles = (page = 1, searchTerm) => {
  return useQuery(["articles", page, searchTerm], () => getArticles(page, searchTerm))
}
