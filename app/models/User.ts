import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import _ from 'lodash';
import { UserService } from "../services/userService";
import { IUser } from "../interface/user";
import { ErrorModel } from "./Feed"


const Card= types.model({
  id: types.identifier,
  title: types.maybe(types.string),
  description: types.maybe(types.string),
  type: types.maybe(types.string),
  image: types.maybe(types.string),
  name: types.maybe(types.string),
  parent_category: types.maybe(types.string),
  category: types.maybe(types.string),
  distance: types.optional(types.number, 0),
  lat: types.maybe(types.string),
  lng: types.maybe(types.string),
})
const UsersListModel = types.model({
  id:types.identifier,
  name:types.optional(types.string,""),
  cards:types.optional(types.array(Card), []),
})

const UserModel = types.model({
  longitude: types.optional(types.number, 0),
  latitude: types.optional(types.number, 0),
  ID:types.identifier,
  social_id:types.optional(types.string,""),
  user_login:types.optional(types.string,""),
  user_nicename:types.optional(types.string,""),
  user_email:types.optional(types.string,""),
  user_url:types.optional(types.string,""),
  display_name:types.optional(types.string,""),
  last_name:types.optional(types.string,""),
  description:types.optional(types.string,""),
  name:types.optional(types.string,""),
  profession:types.optional(types.string,""),
  short_description:types.optional(types.string,""),
  gender:types.optional(types.string,""),
  home_town:types.optional(types.string,""),
  avatar:types.optional(types.string,""),
  usersList: types.array(UsersListModel),
})

/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model("User")
  .props({
currentUser:types.maybe(UserModel),
usersList:types.maybe(UsersListModel),
    showPreferencesModal: types.maybe(types.boolean),
    error: types.optional(ErrorModel, { message: "", isError: false }),
    isLoading: types.maybe(types.boolean),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    
      setError(error: any) {
        self.error = error
      },
      setIsLoading(status: boolean) {
        self.isLoading = status
      },
      async getUser() {
        this.setIsLoading(true)
        this.setError({ isError: false, message: "" })
        const userService = new UserService()
        const result = await userService.getUser()
  
        if (result.kind === "ok") {
          this.setCurrentUser(result.data)
        } else {
          this.setError({ isError: true, message: "Fetching Your information" })
        }
        this.setIsLoading(false)
      },
      setCurrentUser(value) {
        self.currentUser = value
      },
      togglePreferencesModal(){
        self.showPreferencesModal = !self.showPreferencesModal;
       },
     toggleSaveCard(item:any){
     const isCardSaved = self.usersList.cards.find((card) => card.id === item.id);
     if(isCardSaved ){
    //  self.usersList =  self.usersList.cards.filter((card) => card.id !== item.id );
     }else{
   //    self.usersList  = [...self.usersList.cards , item]
     }
   
     }

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface User extends Instance<typeof UserModel> {}
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> {}
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {}
export const createUserDefaultModel = () => types.optional(UserModel, {})
