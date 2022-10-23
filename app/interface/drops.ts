import { FEED_TYPE } from "./feed"


export interface IDrop  {
    type: FEED_TYPE.drop
    id: number
    name: string
    lat: number
    distance: number | null
    category: any
    lng: number
    image: string
    expiration: string,
    code?: string 
    claimed: boolean 
    venue_id: string
    intro: string
    venue: string
    description: string
    venue_image: string
    tags: Array<string>
    drops?: Array<IDrop>
  }