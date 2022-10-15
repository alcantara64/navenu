import { Instance, SnapshotOut, types } from "mobx-state-tree"

import { api } from "../services/api"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybe(types.string),
    authEmail: types.optional(types.string, ""),
    authPassword: types.optional(types.string, ""),
    isLoading: types.optional(types.boolean, false),
    longitude: types.optional(types.string, ''),
    latitude: types.optional(types.string, ''),
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken
    },
    get validationErrors() {
      return {
        authEmail: (function () {
          if (store.authEmail.length === 0) return "can't be blank"
          if (store.authEmail.length < 6) return "must be at least 6 characters"
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail))
            return "must be a valid email address"
          return ""
        })(),
        authPassword: (function () {
          if (store.authPassword.length === 0) return "can't be blank"
          if (store.authPassword.length < 6) return "must be at least 6 characters"
          return ""
        })(),
      }
    },
  }))
  .actions((store) => ({
    setAuthToken(value?: string) {
      store.authToken = value
    },
    setLoading(value:boolean){
     store.isLoading = value
    },
    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, "")
    },
    setAuthPassword(value: string) {
      store.authPassword = value.replace(/ /g, "")
    },
    logout() {
      store.authToken = undefined
      store.authEmail = ""
      store.authPassword = ""
    },
     async login() {
      this.setLoading(true)
      const formData = new FormData()
      formData.append("email", store.authEmail)
      formData.append("password", store.authPassword)
      // @ts-ignore
      const result =  await api.login(formData);
      if (result.kind === "ok") {
        this.setAuthToken(result.token);
      }
      this.setLoading(false);
    },
    setLongitudeAndLatitude(longitude, latitude){
      store.longitude = longitude;
      store. latitude = latitude;
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}

