import { ApiResponse } from "apisauce"
import { IUserPreference } from "../../interface/user"
import {
  AddListItemPayload,
  Api,
  ICreateUserListResponse,
  IUserListResponse,
  UserResponse,
} from "../api"
import { getGeneralApiProblem } from "../api/apiProblem"

export class UserService {
  private httpClient: Api
  constructor() {
    this.httpClient = new Api()
  }

  async getUsers() {
    const response: ApiResponse<UserResponse> = await this.httpClient.get("/users")
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data
    return { kind: "ok", data: rawData.data }
  }

  async getUserList() {
    const response: ApiResponse<IUserListResponse> = await this.httpClient.get("/UserLists/")

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data
    return { kind: "ok", data: rawData.data }
  }

  async uploadAvatarImage(payload: FormData) {
    // upload image to the server
    const response: ApiResponse<any> = await this.httpClient.post("/Users/avatar", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: "ok" }
  }

  async updateDisplayName(payload: { display_name: string }) {
    const bodyFormData = new FormData()
    bodyFormData.append("display_name", payload.display_name)
    const response: ApiResponse<any> = await this.httpClient.post(
      "/Users/displayname",
      bodyFormData,
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: "ok" }
  }

  async updateProfession(payload: { profession: string }) {
    // upload image to the server
    const response: ApiResponse<any> = await this.httpClient.post("/Users/profession", payload)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: "ok" }
  }

  async updateHomeTown(payload: { hometown: string }) {
    // upload image to the server
    const response: ApiResponse<any> = await this.httpClient.post("/Users/hometown", payload)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: "ok" }
  }

  async updateAbout(payload: { about: string }) {
    const bodyFormData = new FormData()
    bodyFormData.append("description", payload.about)
    const response: ApiResponse<any> = await this.httpClient.post("/Users/about", bodyFormData)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: "ok" }
  }

  async createListName(payload) {
    const response: ApiResponse<ICreateUserListResponse> = await this.httpClient.post(
      "/UserLists/listname",
      payload,
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data
    return { kind: "ok", data: rawData.data }
  }

  async addItemToList(payload: AddListItemPayload) {
    const response: ApiResponse<ICreateUserListResponse> = await this.httpClient.post(
      "/UserLists/item",
      payload,
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data
    return { kind: "ok", data: rawData.data }
  }

  async updateUserListItem() {
    const response: ApiResponse<ICreateUserListResponse> = await this.httpClient.put(
      "/UserLists/item",
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data
    return { kind: "ok", data: rawData.data }
  }

  async removeCardFromList(payload) {
    const response: ApiResponse<ICreateUserListResponse> = await this.httpClient.delete(
      "/UserLists/item",
      payload,
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data
    return { kind: "ok", data: rawData.data }
  }

  async clearAllList(id) {
    const response: ApiResponse<ICreateUserListResponse> = await this.httpClient.delete(
      `/UserLists/${id}`,
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data
    return { kind: "ok", data: rawData.data }
  }

  async saveUserPreference(payload: IUserPreference) {
    const formData = new FormData()
    formData.append(`user_preferences`, JSON.stringify(payload))

    const response: ApiResponse<any> = await this.httpClient.post(`/Users/preferences}`, formData)
    console.log(response.data)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data
    return { kind: "ok", data: rawData.data }
  }
}
