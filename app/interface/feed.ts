export interface IFeed {
  type: FEED_TYPE
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

export enum FEED_TYPE{
  article =  "article",
  location =  "location",
   drop =  "drop",
   curators = 'curator',

}
export interface IAutoCompletePayload{
  term : string,
  type: FEED_TYPE,
  selected:[]
}