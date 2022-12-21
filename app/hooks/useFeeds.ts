import { useInfiniteQuery, useQuery } from "react-query"
import { IAutoCompletePayload } from "../interface/feed"
import { FeedService } from "../services/feedsService"

const getFeeds = async ({ pageParam = 1, queryKey }: any) => {
  let queryParams = pageParam
  if (queryKey[1].catFilters !== undefined) {
    const catstr = queryKey[1].catFilters.join(",")
    queryParams = `cats=${catstr}`
  }
  const feedsService = new FeedService();
  
  const response = await feedsService.getFeeds(queryParams)
  if(response.kind !== 'ok'){
    throw new Error('error in feeds');
  }
  return response.feeds;
}

export const useFeeds = (catFilters: any) => {
  return useInfiniteQuery(["feed", catFilters], getFeeds, {
    getNextPageParam: (lastPage) => {
      // todo nick return next page params from the api
      if(lastPage?.pageParam){
        return lastPage?.pageParam + 1
      }else{
      return undefined
      }

   
    },
    onError: (error) => console.log(error),
    staleTime: 1000 * 60 * 60,
  })
}

const getAutoCompleteSuggestions = async ({queryKey}) => { 
 const payload = queryKey[1]
  const feedsService = new FeedService();
  const response = await feedsService.getAutoCompleteSuggestions(payload)
  if(response.kind !== 'ok'){
    throw new Error('error in feeds');
  }
  return response.results;
}
export const useAutoCompleteFeedsSuggestion = (payload:IAutoCompletePayload) =>{
   return useQuery(['auto-complete', payload],getAutoCompleteSuggestions);
}
