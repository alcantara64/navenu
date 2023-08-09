import { RecEngineService } from "../../app/services/recEngineService"
import { VenuesService } from "../../app/services/venuesService"
import { useInfiniteQuery, useQuery } from "react-query"

const getVenues = async (
  page: number,
  searchTerm: string,
  categoryFilters: Array<string>,
  borough?: string,
  isMapMode = false,
) => {
  const venueService = new VenuesService()
  let query = `term=${searchTerm}`
  if (borough) {
    query = `term=${searchTerm}&borough=${borough}`
  }
  const response = await venueService.getVenues(page, query, categoryFilters, isMapMode)
  if (response.kind === "ok") {
    return response.data
  } else {
    throw new Error("Failed to fetch Venues")
  }
}

export const useVenues = (
  page = 1,
  searchTerm,
  categoryFilters: Array<string>,
  borough?: string,
  isMapMode = false,
) => {
  return useInfiniteQuery(
    ["venues", searchTerm, categoryFilters, borough, isMapMode],
    ({ pageParam = 0 }) => getVenues(pageParam, searchTerm, categoryFilters, borough, isMapMode),
    {
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage.page_count < lastPage.tot_pages ? lastPage.page_count : undefined
        return nextPage
      },
    },
  )
}

const getRecommendation = async (
  category: string,
  subcategory?: string,
  distance?: string,
  time?: string,
  questions?: { price_level: Array<string>; tags: Array<string>; subCategories: Array<string> },
) => {
  const recEngineService = new RecEngineService()
  const response = await recEngineService.getRecommendation(
    category,
    subcategory,
    distance,
    time,
    questions,
  )
  if (response.kind === "ok") {
    return response.data
  } else {
    throw new Error("Failed to fetch Ve")
  }
}

export const useRecommendation = (
  category: string,
  subcategory?: string,
  distance?: string,
  time?: string,
  questions?: { price_level: Array<string>; tags: Array<string> },
) => {
  return useQuery(
    ["recommendations"],
    () => getRecommendation(category, subcategory, distance, time, questions),
    { enabled: false },
  )
}
const getSubCategories = async () => {
  const recEngineService = new RecEngineService()
  const response = await recEngineService.getSubCategories()
  if (response.kind === "ok") {
    return response.data.data
  } else {
    throw new Error("Could not get subCategories")
  }
}

export const useSubcategories = () => {
  return useQuery(["subcategories"], () => getSubCategories())
}

const getQuestionnaires = async () => {
  const recEngineService = new RecEngineService()
  const response = await recEngineService.getQuestionnaires()
  if (response.kind === "ok") {
    return response.data.data
  } else {
    throw new Error("Could not get questionnaires")
  }
}
export const useQuestionnaires = () => {
  return useQuery(["questionnaires"], () => getQuestionnaires())
}
