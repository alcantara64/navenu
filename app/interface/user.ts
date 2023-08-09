import { IDrop } from "./drops"
import { IArticle, IVenue } from "./venues"

export interface IUser {
  ID: string
  social_id: string | null
  user_login: string
  user_nicename: string
  user_email: string
  user_url: string
  display_name: string
  last_name: string
  description: string
  name: string
  profession: string
  short_description: string
  gender: string
  home_town: string
  avatar: string
  //    user_preferences:Array<user_preferences>
  //    savedDeals:Array<savedDeals>
  //    savedLocations:Array<savedLocations>
  //    userLists:Array<Record<string, unknown>>
}

export interface IUserPreference {
  DO: Array<string>
  EAT: Array<string>
  DRINK: Array<string>
  STAY: Array<string>
  SHOP: Array<string>
  FIT: Array<string>
}
export interface ISavedDeal {
  type: "drop"
  id: number
  name: string
  lat: number
  distance: string | null
  category: any
  lng: number
  image: string
  expiration: Date
  claimcode: string
  venue_id: number
  intro: string
  venue: string
  venue_image: string
}

export interface ISavedLocation {
  type: "location"
  id: number
  name: string
  lat: number
  distance: string | null
  category: any
  lng: number
  image: string
}

export interface ICurator {
  ID: string
  social_id: null | string
  user_nicename: string
  user_email: string
  display_name: string
  last_name: string
  description: string
  name: string
  profession: string
  avatar: string
  short_description: string
  gender: string
  home_town: string
  image: string
  drops: Array<IDrop>
  venues: Array<IVenue>
  subscribed: boolean
  userLists: Record<string, unknown>
}
export interface IUserList {
  userlist: Record<string, ListItem>
}
export interface IUserRegistration {
  email: string
  password: string
}
type ListItem = {
  user_list_id: string
  cards: Array<IDrop | IVenue | IArticle>
}
