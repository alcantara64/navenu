import { Share, ViewStyle } from "react-native"
import { IFeed } from "../interface/feed"
import { IUserList } from "../interface/user"
import { IAutoComplete } from "../services/api"
import { categoryColorType } from "../theme"

export const getInitials = function (string) {
  const names = string.split(" ")
  let initials = names[0].substring(0, 1).toUpperCase()

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase()
  }
  return initials
}

export const filterFeeds = (
  feeds: Array<IFeed>,
  typeFilter: Array<string>,
  categoryFilter: Array<string>,
): Array<IFeed> => {
  const filteredList = []

  if (typeFilter.length < 1 && categoryFilter.length < 1) {
    return feeds
  }
  if (typeFilter.length > 0 && categoryFilter.length > 0) {
    feeds?.forEach((feed) => {
      if (typeFilter.includes(feed.type) && categoryFilter.includes(feed.category)) {
        filteredList.push(feed)
      }
    })
  }
  if (typeFilter.length > 0 && categoryFilter.length < 1) {
    feeds?.forEach((feed) => {
      if (typeFilter.includes(feed.type)) {
        filteredList.push(feed)
      }
    })
  }
  if (typeFilter.length < 1 && categoryFilter.length > 0) {
    feeds?.forEach((feed) => {
      if (categoryFilter.includes(feed.category)) {
        filteredList.push(feed)
      }
    })
  }
  return filteredList
}
export const getStyleByCategory = (category, isText?: boolean, noBackground?: boolean) => {
  if (isText) {
    return {
      color: categoryColorType[category] || "transparent",
    }
  }
  const style: ViewStyle = {
    borderColor: categoryColorType[category] || "transparent",
    backgroundColor: categoryColorType[category] || "transparent",
    borderTopColor: categoryColorType[category],
  }
  if (noBackground) {
    delete style.backgroundColor
  }
  return style
}

export const getDropsByID = (id: Array<string>, items: Array<any>) => {
  if (!items || !id) return []
  return items.filter((item) => id.includes(item.id))
}
// transform the result of the category data into a sing array
export const transformAutoCompleteResponseToASingleArray = (data: IAutoComplete) => {
  const transFormedData: Array<{ type: string; display: string }> = []
  if (data.borough && data.borough.length) {
    data.borough.forEach((borough) => {
      transFormedData.push({ type: "Boroughs", display: `Borough:${borough}` })
    })
  }
  if (data.cats && data.cats.length) {
    data.cats.forEach((cat) => {
      transFormedData.push({ type: "Cats", display: `Cat: ${cat}` })
    })
  }
  if (data.location && data.location.length) {
    data.location.forEach((locate) => {
      transFormedData.push({ type: "Locations", display: `Location:${locate}` })
    })
  }
  if (data.tags && data.tags.length) {
    data.tags.forEach((tag) => {
      transFormedData.push({ type: "Tags", display: `Tag:${tag}` })
    })
  }
  return transFormedData
}
/**  
 * Takes a sentence and covert it to a title case for  john to John
 @param sentence
 **/
export const makeTitleCase = (sentence: string) =>{
  if(!sentence)return '';
 
 return sentence
    .split(" ")
    .map(([firstChar, ...rest]) => firstChar.toUpperCase() + rest.join("").toLowerCase())
    .join(" ")
}

export const isItemInUserList = (id: any, DataListData: IUserList) => {
  if(!DataListData) return false
  return Object.keys(DataListData.userlist).some((key) => {
    return DataListData.userlist[key].cards.some((card) => {
      return card.id === id
    })
  })
}
export const getUserListIdByItemId = (id: any, DataListData: IUserList) => {
  let userListId;
  if(DataListData){
    Object.keys(DataListData.userlist).some((key) => {
      return DataListData.userlist[key].cards.some((card) => {

        if( card.id === id){
          userListId = DataListData.userlist[key].user_list_id
          return true
        }
      })
    })
  }
  return userListId;
}
export const shareLink = (title:string, message="Check out Navenu", url="https://www.navenu.com") => {
  Share.share({
    message,
    url,
    title,
  })
}