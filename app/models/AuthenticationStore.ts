import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { navigate } from "../navigators"

import { api } from "../services/api"
import { UserService } from "../services/userService"
import { getRootStore } from "./helpers/getRootStore"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybe(types.string),
    authEmail: types.optional(types.string, ""),
    authPassword: types.optional(types.string, ""),
    isLoading: types.optional(types.boolean, false),
    longitude: types.optional(types.number, 0),
    latitude: types.optional(types.number, 0),
    errorMessage: types.optional(types.string, ''),
    refreshToken: types.optional(types.string, ''),
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
    setRefreshToken(value:string){
      store.refreshToken = value;
    },
    logout() {
      store.authToken = undefined
      store.authEmail = ""
      store.authPassword = ""
      store.refreshToken = ""
    },
    login: flow(function *() {
      store.errorMessage = '';
      store.isLoading = true
      const formData = new FormData();
      formData.append("email", store.authEmail)
      formData.append("password", store.authPassword)
     const rootStore = getRootStore(store);
      // @ts-ignore
      const result =  yield api.login(formData);
      if (result.kind === "ok") {
        store.authToken = result.token;
        store.refreshToken = result.refresh_token;
        rootStore.userStore.setUserPreferences(result.user_preferences);
        if(result.userLists){
        rootStore.userStore.setUserLists(result.userLists);
        }
        if(!result.user_preferences || !result.user_preferences.DO){
          navigate('PreferencesScreen')
        }
      }else{   
        store.errorMessage = 'incorrect username or password'
      }
      store.isLoading = false
    }),
    async register() {
      this.setErrorMessage('');
      this.setLoading(true)
      const formData = new FormData()
      formData.append("email", store.authEmail)
      formData.append("password", store.authPassword)
      // @ts-ignore
      const api = new UserService();
      const result = await api.register({email: store.authEmail, password: store.authPassword});
      if (result.kind === "ok") {
        this.setAuthToken(result.data.token);
        this.setRefreshToken(result.data.refresh_token);
        const rootStore = getRootStore(store);
        rootStore.userStore.setUserPreferences(result.data.user_preferences || []);
        rootStore.userStore.setUserLists(result.data.userLists);
        navigate('PreferencesScreen')

 

      } else {
       this.setErrorMessage('Something went wrong')
      }
      this.setLoading(false);
    },
    async socialRegister({
      email, 
      socialId, 
      authType,
      firstName = '',
      lastName = '',
      avatar = ''
    }) {
      this.setAuthEmail(email);
      this.setLoading(true)
      const formData = new FormData()
      
      formData.append("email", email)
      formData.append("sid", socialId)
      formData.append("authtype", authType)
      formData.append("firstname", firstName)
      formData.append("lastname", lastName)
      formData.append("avatar", avatar)

      // @ts-ignore
      const api = new UserService();
      const result = await api.socialRegister({email, socialId, authType});
      if (result.kind === "ok") {
        this.setAuthToken(result.data.token);
        this.setRefreshToken(result.data.refresh_token);
      } else {
       this.setErrorMessage('Something went wrong')
      }
      this.setLoading(false);
    },
    setErrorMessage(value: string){
     store.errorMessage = value
    },
    setLongitudeAndLatitude(longitude, latitude){
      store.longitude = longitude;
      store.latitude = latitude;
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}

