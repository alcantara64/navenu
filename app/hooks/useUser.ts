import axios from "axios"
import { useMutation, useQuery } from "react-query"
import { AddListItemPayload, Api } from "../services/api"
import { UserService } from "../services/userService"

const getUserById = async (userId: string) => {
  const api = new Api()
  const  data = await api.get(`/Users/${userId}`)
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
  return useQuery(["userInfo", userId], () => getUserById(userId))
}

export const useUserList = () => {
  return useQuery(["userList"], getUserList, {
    enabled: true,
  })
}
export const createUserListName = async (listName) => {
  const api = new UserService()
  const response = await api.createListName({ listname: listName })
  if (response.kind !== "ok") {
    throw new Error(response.message || "an error occurred")
  } else {
    return response.data
  }
}
export const addItemToUserList = async (newList: AddListItemPayload) => {
  const api = new UserService()
  const response = await api.addItemToList(newList)
  if (response.kind !== "ok") {
    throw new Error(response.message || "an error occurred")
  } else {
    return response.data
  }
}
