export interface IVenues{
    id:number
    name: string
    lat:number
    distance:string | null
    category:any
    phone: number
    website:string
    price_level:string 
    operating_hours: string | null
    open_now: boolean 
rating: string |  null
    lng: number
    type: "Article" | "location" | "drop"
    image: string 
    short_description: string 
    long_description:string
    address: string
    addr_line_2: string |  null
    addr_line_3:string |  null
    city:string
    status: boolean
    business_email: string |  null
    backgroundImage: string |  null
    borough: string |  null
    state: string
    country:string
    postal_code: string
    tags: Array<string>
    nearby:Array<Object>
    images:Array<Object>
    menu:Array<Object>
    curators:Array<Object>
    articles:Array<Object>
}