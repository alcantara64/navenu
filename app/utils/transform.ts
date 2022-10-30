import { IFeed } from "../interface/feed";

export const getInitials = function (string) {
    const names = string.split(' ');
      let  initials = names[0].substring(0, 1).toUpperCase();
    
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
};

export const filterFeeds = (feeds:Array<IFeed>, typeFilter:Array<string>, categoryFilter:Array<string> ): Array<IFeed> => {
    const filteredList = []
    
    if(typeFilter.length < 1 && categoryFilter.length < 1){
      return feeds
    }
    if(typeFilter.length > 0  && categoryFilter.length > 0){
      feeds?.forEach((feed) => {
        if(typeFilter.includes(feed.type) &&  categoryFilter.includes(feed.category)){
          filteredList.push(feed);
        }
      })
    }
    if(typeFilter.length > 0 && categoryFilter.length < 1){
        feeds?.forEach((feed) => {
          if(typeFilter.includes(feed.type)){
            filteredList.push(feed);
          }
        })
    }
    if(typeFilter.length  < 1 && categoryFilter.length > 0){
      console.log('typeFilter 4',typeFilter.length, categoryFilter.length);
      feeds?.forEach((feed) => {
        if(categoryFilter.includes(feed.category)){
          filteredList.push(feed);
        }
      })
  }
    return filteredList;
}