import { IDrop } from "../../interface/drops"
import { IFeed } from "../../interface/feed"
import { IVenues } from "../../interface/venues"
import { IUser} from "../../interface/user"
export interface ApiFeedResponse {
  status: boolean
  feed: {
    type: "Article" | "location" | "drop"
    id: number
    name: string
    lat: number
    lng: number
    image: string
    phone: number
    parent_category: string
    category: string
    distance: number //Below are for articles and drops
    intro: string
    description: string
    owner: string
    tags: string
    venue: string //Below are for drops only
    venue_id: number
    expiration: Date
  }
  message: string
}

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

export interface LoginResponse {
  token: string
  userId?: string
}

/*
Please refer to 
assets/data/feed.json for example of feed response

//Location array response
  "type": "location",
            "id": "3772",
            "lat": "51.50957990000000000000",
            "lng": "-0.14470930000000000000",
            "image": "https://media.navenu.com/media/venues/e3d2cc79c48842ba8c3137cc4c956caa.jpg",
            "phone": "020 7404 5000",
            "name": "Amazonico London",
            "parent_category": "Sushi",
            "category": "EAT",
            "distance": 1.14
//Article array Response
 {
            "type": "article",
            "id": "339",
            "category": "Article",
            "tags": "",
            "name": "Best Fine Dining Around",
            "description": "Before deciding to pursue her dream and passion of cooking, Chef Dara Sutin graduated from McGill University, then went to work various jobs within Toronto’s corporate food industry. She eventually trained at the renowned Le Cordon Bleu school in London, completing the Grand Diplome program in cuisine and patisserie, the elite culinary arts institute’s most comprehensive training programme. She proceeded to work as a pastry chef at London’s Ottolenghi, before returning to Canada to shift her career into global recipe development and food styling. Using her insights from cooking professionally to help bring food to life, she has made a mighty name for herself creating delicious and easy recipes for cookbooks, magazines and television.  And that’s sort of her “how it started vs. how it's going” situation, if we’re being honest.",
            "intro": "Best Fine Dining Around",
            "image": "https://dev.navenu.com/articles/wp-content/uploads/2021/05/Dara-Sutin-1.jpeg",
            "owner": "Navenu Team",
            "distance": ""
        }

//Drops array response
type:drop
  intro:string
            description:string
            owner:string
            tags:string
            venue:string   //Below are for drops only
            venue_id:number
            expiration:Date
            name: 
            lat:
            id:
            distance:
            category:
            parent:category
            lng:
*/
export interface FeedResponse {
  data: Array<IFeed>
  status
}
export interface IDropResponse {
  data: IDrop
  status: boolean
  message: string
}
export interface IDropsResponse {
  data: Array<IDrop>
  status: boolean
  message: string
}
export interface UserResponse {
  data: Array<IUser>
  status:boolean
  message:string
}
export interface IVenueResponse {
  data: Array<IVenues>
  status: boolean
  message: string
}
