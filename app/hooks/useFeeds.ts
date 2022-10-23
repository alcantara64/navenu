import { useInfiniteQuery } from "react-query"
import { Api } from "../services/api"

const getFeeds = async ({ pageParam = 1, queryKey }: any) => {
  const api = new Api()

  let queryParams = pageParam
  if (queryKey[1].catFilters !== undefined) {
    const catstr = queryKey[1].catFilters.join(",")
    queryParams = `cats=${catstr}`
  }
  const response = await api.get(`/feed/${queryParams}`)
  return response.data.data
}

export const useFeeds = (catFilters: any) => {
  return useInfiniteQuery(["feed", catFilters], getFeeds, {
    getNextPageParam: (lastPage) => lastPage.pageParam + 1,
    onError: (error) => console.log(error),
    staleTime: 1000 * 60 * 60,
  })
}
