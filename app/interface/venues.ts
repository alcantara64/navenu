import { IDrop } from "./drops"

export interface IVenues {
  id: number
  name: string
  lat: number
  distance: string | null
  category: any
  phone: number
  website: string
  price_level: string
  operating_hours: string | null
  open_now: boolean
  rating: string | null
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
  nearby: Array<INearby>
  images: Array<IGallery>
  menu: Array<IMenu>
  curators: Array<ICurators>
  articles: Array<IArticles>
  drops: Array<IDrop>
}

interface INearby extends IVenues {
  type: "location"
  id: number
  name: string
  lat: number
  distance: string | null
  category: any
  lng: number
  image: string
}
interface ICurators extends IVenues {
  id: number
  name: string
  image: string
}
interface IArticles extends IVenues {
  type: "Article"
  id: number
  name: string
  owner: string
  intro: string
  description: string
  category: any
  image: string
}
export interface IGallery {
  id: number
  image: string
}

interface IMenu extends IVenues {
  id: number
  categories: Array<IMenuCategories>
}

interface IMenuCategories extends IMenu {
  id: number
  name: string
  items: Array<IItems>
}

interface IItems extends IMenuCategories {
  id: number
  name: string
  description: string
  image: string
  price: number
}
