import axios from "axios"
import { useMutation, useQuery } from "react-query"
import { Api } from "../services/api"
import { UserService } from "../services/userService"

const getUserById = async (userId: string) => {
  const { data } = await axios.get(`https://api.navenu.com/index.php/Users/${userId}`)
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
    enabled: false,
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
