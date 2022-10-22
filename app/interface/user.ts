//According to assets\data\user_response.json 
export interface IUser{
   ID:number
   social_id:number | null
   user_login:string 
   user_nicename:string 
   user_email:string 
   user_url:string 
   display_name:string 
   last_name:string 
   description:string 
   name:string
   profession:string 
   short_description:string
   gender:string 
   home_town:string 
   avatar:string
   user_preferences:Array<user_preferences>
   savedDeals:Array<savedDeals>
   savedLocations:Array<savedLocations>
   userLists:Array<Object>
}

interface user_preferences extends IUser{
    DO: Array<String>
    EAT:Array<String>
    DRINK:Array<String>
    STAY:Array<String>
    SHOP:Array<String>
    FIT: Array<String>
}
interface savedDeals  extends IUser{
    type:"drop"
    id:number
    name: string
    lat:number
    distance:string | null
    category:any
    lng:number
    image: string
    expiration:Date
    claimcode:string
    venue_id:number
    intro:string
    venue:string
    venue_image:string
}

interface savedLocations  extends IUser{
    type:"location"
    id:number
    name: string
    lat:number
    distance:string | null
    category:any
    lng:number
    image: string
}

//@TODO Emmanuel I dont know the best way to lay this out please refer to assets\data\user_response.json:120 for data structure
interface user_lists   extends IUser{


}