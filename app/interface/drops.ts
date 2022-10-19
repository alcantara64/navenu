export interface IDrop{
    description:string
    owner:string
    venue:string   //Below are for drops only
    venue_id:number
    expiration:Date
    name: string
    lat:number
    id:string
    distance:string | null
    category:any
    parent:any
    lng: number
    type: "Article" | "location" | "drop"
    image: string;
    intro: string
    venue_image: string
    tags: Array<string>
}