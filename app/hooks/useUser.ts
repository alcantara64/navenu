import { useQuery, useMutation, useQueryClient } from "react-query"
import { FEED_TYPE } from "../interface/feed"
import { IVenue } from "../interface/venues"
import { AddListItemPayload, Api } from "../services/api"
import { UserService } from "../services/userService"

const getUser = async () => {
  const api = new Api()
  const  data = await api.get(`/Users`)
  return data
}
const getUserList = async () => {
  const api = new UserService()

  const response = await api.getUserList()
  if (response.kind !== "ok") {
    throw new Error(response.message || "an error occurred")
  } else {
    return response.data
  }
}

export const useUser = (userId: string) => {
  return useQuery(["userInfo", userId], () => getUser())
}

export const useUserList = () => {
  return useQuery(["userList"], getUserList)
}
export const createUserListName = async (listName) => {
  const api = new UserService()
  const response = await api.createListName({ listname: listName })
  if (response.kind !== "ok") {
    throw new Error(response.message || "Could not create list name")
  } else {
    return response.data
  }
}
export const addItemToUserList = async (newList: AddListItemPayload) => {
  const api = new UserService()
  const response = await api.addItemToList(newList)
  console.log({response})
  if (response.kind !== "ok") {
    throw new Error(response.message || "Could not add item to list")
  } else {
    return response.data
  }
}
const subscribeToNotification = async (payload: { type: FEED_TYPE; id: string }) => {
  const userService = new UserService()
  const response = await userService.subScribeToNotification(payload)
  if (response.kind !== "ok") {
    throw new Error(response.message || "an error occurred")
  } else {
    return response.results
  }
}
export const useSubscribeToNotification = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: subscribeToNotification,
    mutationKey: "subscribe-to-mutation",
    onMutate: async (newVenue) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["venue", newVenue.id] })
      const previousVenue:IVenue = queryClient.getQueryData(["venue", newVenue.id])
      // Optimistically update to the new value
      queryClient.setQueryData(["venue", newVenue.id], (old: IVenue) => {
        return { ...old, subscribed: !old.subscribed }
      })
      return { previousVenue }
    },
    onError: (err: any, newTodo, context: any) => {
      queryClient.setQueryData(["venue",context.previousVenue.id], context.previousVenue)
      throw new Error(err)
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["venue"] })
    },
  })
}