import { Instance, SnapshotIn, SnapshotOut, types, getParent, destroy, flow } from "mobx-state-tree"
import _ from "lodash"
import { Api } from "../services/api"
import { ErrorModel } from "./Feed"
import { UserService } from "../services/userService"
import { DropModel } from "./DropStore"

/*  Below you will find 1 parent model and 3 children model
 *
 *   UserStore = Is the parent model that contains the 3 children below:
 *
 *   UserModel = Represents the Users information
 *   UserListsModel = Represents a User list that contains an array of Card
 *        Card = Represents each card in a user list (UserListsModel)
 *
 *  References i based this off of https://github.com/ecklf/react-hooks-mobx-state-tree/blob/main/src/models/Cart.ts
 */

// Model for each Card saved in the UserLists
export const Card = types
  .model("Card", {
    id: types.identifierNumber,
    title: types.maybe(types.string),
    description: types.maybe(types.string),
    type: types.enumeration("type", ["Article", "Location", "Drop"]),
    image: types.maybe(types.string),
    name: types.maybe(types.string),
    category: types.enumeration("category", ["EAT", "STAY", "DO", "DRINK", "FIT", "SEE"]),
    sub_category: types.maybe(types.string),
    distance: types.optional(types.number, 0),
    lat: types.maybe(types.string),
    lng: types.maybe(types.string),
    claimCode: types.optional(types.string, ""),
    venue_image: types.optional(types.string, ""),
    venue: types.optional(types.string, ""),
    active: types.maybe(types.boolean),
    expired: types.maybe(types.boolean),
    user_claimed: types.maybe(types.boolean),
    NoCodes: types.maybe(types.boolean),
    user_code: types.optional(types.string, ""),
  })
  .actions((self) => ({
    // Removes Card from List
    remove() {
      getParent<typeof UsersListModel>(self, 2).remove(self)
    },
  }))

// Model for  Users lists
export const UsersListModel = types
  .model("UsersList", {
    user_list_id: types.identifierNumber,
    listname: types.string,
    // Where our cards are stored
    cards: types.optional(types.array(Card), []),
    error: types.optional(ErrorModel, { message: "", isError: false }),
    isLoading: types.maybe(types.boolean),
  })
  .views((self) => ({
    // Saw this in an example not sure if it works
    get list() {
      return getParent(self)
    },
  }))
  .actions((self) => ({
    // Change the listname
    // @TODO how to update database?
    changeName(newName: string) {
      self.listname = newName
    },
    // Adding Card to UserListModel.cards
    addCard(card: SnapshotIn<typeof Card> | Instance<typeof Card>) {
      self.cards.push(card)
    },
    // Remove Card from UserListModel.cards
    remove(item: SnapshotIn<typeof Card>) {
      destroy(item)
    },
  }))

// User Model stores User info
const UserModel = types
  .model({
    longitude: types.optional(types.number, 0),
    latitude: types.optional(types.number, 0),
    ID: types.identifier,
    social_id: types.optional(types.string, ""),
    user_login: types.optional(types.string, ""),
    user_nicename: types.optional(types.string, ""),
    user_email: types.optional(types.string, ""),
    user_url: types.optional(types.string, ""),
    display_name: types.optional(types.string, ""),
    last_name: types.optional(types.string, ""),
    description: types.optional(types.string, ""),
    name: types.optional(types.string, ""),
    profession: types.optional(types.string, ""),
    short_description: types.optional(types.string, ""),
    gender: types.optional(types.string, ""),
    home_town: types.optional(types.string, ""),
    avatar: types.optional(types.string, ""),
  })
  .actions((self) => ({
    // Change user fields according to mock up
    // @TODO how to update database?
    changeName(newName: string) {
      self.display_name = newName
    },
    changeAvatar(newName: string) {
      self.avatar = newName
    },
    changeDescription(newDescription: string) {
      self.description = newDescription
    },
    changeHometown(newHometown: string) {
      self.home_town = newHometown
    },
    changeShortDescription(newShort: string) {
      self.short_description = newShort
    },
    changeGender(newGender: string) {
      self.gender = newGender
    },
    changeProfession(newProfession: string) {
      self.profession = newProfession
    },
  }))
/**
 * Main Model store that contains user info and user list
 * @TODO add user preferences
 */
export const UserStoreModel = types
  .model("User")
  .props({
    // Current UserModel
    currentUser: types.maybe(UserModel),
    // UserLists
     usersList: types.frozen(),
    // State for toggling display of user preferences bottom sheet
    showPreferencesModal: types.maybe(types.boolean),
    //  user saved deals
    userDrops: types.optional(types.array(DropModel), []),
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
    // Attempting to load User data from api into current user model
    getUser: flow(function* () {
      self.isLoading = true
      self.error = { isError: false, message: "" }
      const userService = new UserService()
      const response = yield userService.getUsers();
      
      if (response.kind === "ok") {
        // FIll UserModel with API Data
        self.currentUser = response.data.user
        // Fill UserListModel with API DATA
        self.usersList = response.data.userLists;
        self.userDrops = response.data.savedDeals;
      } else {
        self.error = { isError: true, message: "Error Fetching Your information" }
      }
      self.isLoading = false
    }),
    // setting current user. easy because its a flat object
    setCurrentUser(value) {
      self.currentUser = value
    },
    // @TODO need help
    // Trying to save data from API to UserLists Model
    setUserLists(value) {
      // making userLists easier to deal with
      const lists = value.userLists
      // Setting List name
      // emmanuel - why this?
      const listnames = Object.keys(lists)
      // loop through array of listnames
      for (const l in listnames) {
      }
      // loop through each list
      for (const x in lists) {
        // self.userLists.listname=Object.keys(input.userLists)
      }
    },
    // Method to toggle display of user settings bottom sheet in mockup
    togglePreferencesModal() {
      self.showPreferencesModal = !self.showPreferencesModal
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface User extends Instance<typeof UserStoreModel> {}
export interface UserSnapshotOut extends SnapshotOut<typeof UserStoreModel> {}
export interface UserSnapshotIn extends SnapshotIn<typeof UserStoreModel> {}
export const createUserDefaultModel = () => types.optional(UserStoreModel, {})
