import { SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import _ from 'lodash';
import { FeedService } from "../services/feedsService";

/**
 * Model description here for TypeScript hints.
 */
 const Feed = types.model({
  id: types.identifier,
  title: types.maybe(types.string),
  description: types.maybe(types.string),
  type: types.maybe(types.string),
  image: types.maybe(types.string),
  phone: types.maybe(types.string),
  name: types.maybe(types.string),
  parent_category: types.maybe(types.string),
  category: types.maybe(types.string),
  distance: types.maybe(types.string),
  intro: types.maybe(types.string),
  owner: types.maybe(types.string),
  lat: types.maybe(types.number),
  lng: types.maybe(types.number),
})

const Error = types.model({
  message: types.string,
  isError: types.boolean,
})
export const FeedStore = types
  .model("Feed")
  .props({
    feeds: types.optional(types.array(Feed), []),
    pages: types.optional(types.number, 0),
    pageParams: types.maybe(types.number),
    catFilters:types.maybe(types.array(Feed)),
    error: types.optional(Error, {message: '', isError: false}),
    isLoading: types.maybe(types.boolean),
    isFetchingNextPage: types.maybe(types.boolean),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    addCartFilter(value){
     self.catFilters = [] || value
    },
    removeCartFilter(filter){
      self.catFilters = [] || _.without(self.catFilters, filter);
    },
    setFeeds(feeds){
     self.feeds = feeds;
    },
    async getFeeds(pageNumber?:number){
      const  feedsService = new FeedService();
     const  result = await feedsService.getFeeds(pageNumber);
     if(result.kind === 'ok'){
      console.log( 'feeds', result.feeds);
      this.setFeeds(result.feeds)
     }

    },
    async refetch(){
      this.getFeeds(self.pageParams)
    },

    async fetchNextPage(){
      const nextPageNumber =self.pageParams + 1; 
      this.setIsFetchingNextPage(true)
      await this.getFeeds(nextPageNumber)
      this.setCurrentPageNumber(nextPageNumber);
      this.setIsFetchingNextPage(false)
      
    },
     setCurrentPageNumber(pageNumber:number){
     self.pageParams = pageNumber;
    },
    setIsFetchingNextPage(value:boolean){
    self.isFetchingNextPage = value;
    },
  })) 

export interface FeedSnapshotOut extends SnapshotOut<typeof FeedStore> {}
export interface FeedSnapshotIn extends SnapshotIn<typeof FeedStore> {}
export const createFeedDefaultModel = () => types.optional(FeedStore, {})
