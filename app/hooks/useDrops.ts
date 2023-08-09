import { useQuery } from "react-query"
import { DropService } from "../services/dropsService"

const getDropById = async (dropId: string) => {
  const venueService = new DropService()
  const response = await venueService.getDropDetail(dropId)
  if (response.kind === "ok") {
    return response.data
  } else {
    throw new Error("Failed to fetch Drop Detail")
  }
}
export const useDrop = (dropId: string) => {
  return useQuery(["drop-detail", dropId], () => getDropById(dropId))
}

const getDrops = async (page = 1, searchTerm: string, category: Array<string>) => {
  const venueService = new DropService()
  const query = `searchTerm=${searchTerm}`
  const response = await venueService.getDrops(page, query, category)
  if (response.kind === "ok") {
    return response.data
  } else {
    throw new Error("Failed to get drops")
  }
}
export const useDrops = (page: number, searchTerm: string, category: Array<string>) => {
  return useQuery(["drops", page, searchTerm, category], () => getDrops(page, searchTerm, category))
}
