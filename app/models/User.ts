import { Instance, SnapshotIn, SnapshotOut, types,getParent ,flow} from "mobx-state-tree"
import _ from 'lodash';
import { UserService } from "../services/userService";
import { IUser } from "../interface/user";
import { ErrorModel } from "./Feed"


export const Card= types.model("Card",{
  id: types.identifierNumber,
  title: types.maybe(types.string),
  description: types.maybe(types.string),
  type: types.enumeration("type", ["Article", "Location", "Drop"]),
  image: types.maybe(types.string),
  name: types.maybe(types.string),
  category: types.enumeration("category", ["EAT", "STAY", "DO","DRINK","FIT","SEE"]),
  sub_category: types.maybe(types.string),
  distance: types.optional(types.number, 0),
  lat: types.maybe(types.string),
  lng: types.maybe(types.string),
  claimCode:types.maybe(types.string),
  venue_image: types.optional(types.string,''),
  venue:types.maybe(types.string),
  active: types.maybe(types.boolean),
  expired:types.maybe(types.boolean),
  user_claimed: types.maybe(types.boolean),
  NoCodes: types.maybe(types.boolean),
  user_code: types.maybe(types.string),
})


export const UsersListModel = types.model("UsersList",{
  user_list_id: types.identifierNumber,
  listname:types.string,
  cards: types.optional(types.array(Card), []),
  error: types.optional(ErrorModel, { message: "", isError: false }),
  isLoading: types.maybe(types.boolean),
})  .views((self) => ({
  get list() {
      return getParent(self)
  },

}))
.actions((self) => {dw22z
  function markLoading(loading) {
    self.isLoading = loading
}

 function updateList(json) {
      json.forEach((cardJson) => {
          self.cards.put(cardJson)
      })
  }

const loadCards=flow(function* loadCards(){
  try {
    const userService = new UserService()
    const result = userService.getUserList()
    updateList(result.data)
    markLoading(false)
  } catch (err) {
    console.error("Failed to load books ", err)
}
})

  return {
      updateList,
      loadCards
  }
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

})

/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model("User")
  .props({
currentUser:types.map(UserModel),
usersList:types.map(UsersListModel),
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


  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface User extends Instance<typeof UserModel> {}
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> {}
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {}
export const createUserDefaultModel = () => types.optional(UserModel, {})
