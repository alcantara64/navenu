import { ApiResponse } from "apisauce"
import { FEED_TYPE } from "../../interface/feed"
import { IUserPreference } from "../../interface/user"
import {
  AddListItemPayload,
  Api,
  DeleUserListPayload,
  ICreateUserListResponse,
  IDeleteUserListResponse,
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
    console.log(response)
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

  async removeCardFromList(payload: DeleUserListPayload) {
    const formData = new FormData()
    formData.append("user_list_id", payload.user_list_id)
    formData.append("id", payload.id)
    formData.append("type", payload.type)
    const response: ApiResponse<IDeleteUserListResponse> = await this.httpClient.post(
      "/UserLists/remove",
      formData,
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
    const response: ApiResponse<any> = await this.httpClient.post(`/Users/preferences`, formData)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data
    return { kind: "ok", data: rawData.data }
  }

  async refreshToken(payload: { refresh_token: string }) {
    const formData = new FormData()
    formData.append(`refresh_token`, payload.refresh_token)

    const response: ApiResponse<{ data: { refresh_token: string; token: string } }> =
      await this.httpClient.post(`/Authentication/refresh`, formData)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data
    return { kind: "ok", data: rawData.data }
  }

  async subScribeToNotification(payload: { type: FEED_TYPE; id: string }) {
    const formData = new FormData()
    formData.append("type", payload.type)
    formData.append("id", payload.id)

    const response: ApiResponse<any> = await this.httpClient.post("/users/subscribe", formData)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data.data
    return { kind: "ok", results: rawData }
  }

  async register(payload: { email: string; password: string }) {
    const formData = new FormData()
    formData.append(`email`, payload.email)
    formData.append(`password`, payload.password)

    const response: ApiResponse<any> = await this.httpClient.post(
      `/Authentication/register`,
      formData,
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const rawData = response.data
    return { kind: "ok", data: rawData.data }
  }

  async socialRegister(payload: {
    email: string
    authType: string
    socialId: string
    firstName?: string
    lastName?: string
    avatar?: string
  }) {
    const formData = new FormData()
    formData.append(`email`, payload.email)
    formData.append(`authType`, payload.authType)
    formData.append(`sid`, payload.socialId)
    formData.append(`firstName`, payload.firstName)
    formData.append(`lastName`, payload.lastName)
    formData.append(`avatar`, payload.avatar)

    const response: ApiResponse<any> = await this.httpClient.post(
      `/Authentication/social`,
      formData,
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const rawData = response.data
    return { kind: "ok", data: rawData.data }
  }

  async savePushNotificationToken(
    payload: {
      deviceType: string
      deviceToken: string
    },
    apiToken: string,
  ) {
    const formData = new FormData()
    formData.append(`device_token`, payload.deviceToken)
    formData.append(`device_type`, payload.deviceType)

    const response: ApiResponse<any> = await this.httpClient.post(
      `/Authentication/token`,
      formData,
      {
        headers: {
          Authorization: apiToken,
        },
      },
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const rawData = response.data
    return { kind: "ok", data: rawData.data }
  }

  async deleteAccount() {
    const response: ApiResponse<any> = await this.httpClient.delete("/Users")
    console.log({ response })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data
    return { kind: "ok", data: rawData }
  }
}
