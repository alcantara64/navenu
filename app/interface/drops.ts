import { FEED_TYPE } from "./feed"

// export interface IDrop{
//     description:string
//     owner:string
//     venue:string   //Below are for drops only
//     venue_id:number
//     expiration:Date
//     name: string
//     lat:number
//     id:string
//     distance:string | null
//     category:any
//     parent:any
//     lng: number
//     type: "Article" | "location" | "drop"
//     image: string;
//     intro: string
//     venue_image: string
//     tags: Array<string>
// }

export interface IDrop  {
    type: FEED_TYPE.drop
    id: number
    name: string
    lat: number
    distance: number | null
    category: any
    lng: number
    image: string
    expiration: Date
    claimcode?: string
    venue_id: string
    intro: string
    venue: string
    description: string
    venue_image: string
    tags: Array<string>
    drops?: Array<IDrop>
  }