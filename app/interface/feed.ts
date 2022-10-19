export interface IFeed {
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
