import { IDrop } from "./drops"

export interface IVenue {
  id: number
  name: string
  lat: number
  distance: string | null
  category: any
  phone?: number
  website?: string
  price_level?: string
  operating_hours?: string | null
  open_now?: boolean
  rating?: string | null
  lng: number
  type: "Article" | "location" | "drop"
  image: string
  short_description: string
  long_description: string
  address: string
  addr_line_2: string | null
  addr_line_3: string | null
  city: string
  status: boolean
  business_email: string | null
  backgroundImage: string | null
  borough: string | null
  state: string
  country: string
  postal_code: string
  tags: Array<string>
  nearby: Array<IVenue>
  images?: Array<IGallery>
  menu?: Array<IMenu>
  curators?: Array<ICurators>
  articles?: Array<IArticle>
  drops?: Array<IDrop>
  subscribed: boolean
  menu_url:string
  booking_url:string
}

interface ICurators {
  id: number
  name: string
  image: string
}
export interface IArticle  {
  type: "Article"
  id: number
  name: string
  owner: string
  intro: string
  description: string
  category: any
  image: string
  title: string,
  subscribed:boolean
  mainimage:string
  content:Array<{type:'image'| 'text'| 'subtitle'|'venue_card'|'insert_drop_card'|'insert_curator_card', image?: string, text?:string, subtitle:string,venue?:Array<IVenue>,drop?:Array<IDrop>,curators?:Array<ICurators>}>
}
export interface IGallery {
  id: number
  image: string
}

interface IMenu  {
  id: number
  categories: Array<IMenuCategories>
}

interface IMenuCategories {
  id: number
  name: string
  items: Array<IItems>
}

interface IItems{
  id: number
  name: string
  description: string
  image: string
  price: number
}
