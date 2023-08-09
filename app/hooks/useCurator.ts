import { useQuery } from "react-query"
import { CuratorService } from "../services/curatorService"

const getCuratorById = async (curatorId: string) => {
  const curratorService = new CuratorService()
  const response = await curratorService.getCuratorDetail(curatorId)
  if (response.kind === "ok") {
    return response.data.curator
  } else {
    throw new Error("Failed to fetch Curator Detail ")
  }
}
const getCurators = async (searchText: string) => {
  const curratorService = new CuratorService()
  const response = await curratorService.getCurators(1, `searchTerm=${searchText}`)
  if (response.kind === "ok") {
    return response.data.data
  } else {
    throw new Error("Failed to fetch Curator Detail ")
  }
}

export const useCurator = (curatorId: string) => {
  return useQuery(["curator", curatorId], () => getCuratorById(curatorId))
}
export const useCurators = (searchText: string) => {
  return useQuery(["curators", searchText], () => getCurators(searchText))
}
