import { SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import _ from 'lodash';
import { FeedService } from "../services/feedsService";
import { FEED_TYPE } from "../interface/feed";

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
  distance: types.optional(types.number, 0),
  intro: types.maybe(types.string),
  owner: types.maybe(types.string),
  lat: types.maybe(types.string),
  lng: types.maybe(types.string),
})

export const ErrorModel = types.model({
  message: types.string,
  isError: types.boolean,
})
export const FeedStore = types
  .model("Feed")
  .props({
    feeds: types.optional(types.array(Feed), []),
    pages: types.optional(types.number, 0),
    pageParams: types.maybe(types.number),
    catFilters:types.optional(types.array(types.string), []),
    error: types.optional(ErrorModel, {message: '', isError: false}),
    isLoading: types.maybe(types.boolean),
    isFetchingNextPage:types.maybe(types.boolean),
    selectedFilterTypes:types.optional(types.array(types.string), [])

  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    addCartFilter(value){
     self.catFilters.push(value)
  
    },
    removeCartFilter(filter){
      self.catFilters =  _.without(self.catFilters, filter);
    },
    setFeeds(feeds){
     self.feeds = feeds;
    },
    setFeedsError(error:any){
      self.error = error;
    },
    setIsLoading(status:boolean){
     self.isLoading = status
    },
    async getFeeds(pageNumber?:number){
      this.setIsLoading(true)
      this.setFeedsError({isError:false, message: ''})
      const  feedsService = new FeedService();
     const  result = await feedsService.getFeeds(pageNumber);
     if(result.kind === 'ok'){

      this.setFeeds(result.feeds)
     }else{
      console.log('error', result)
      this.setFeedsError({isError:true, message:'error getting feeds'})
     }
     this.setIsLoading(false)

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
    addFilterType(filter:FEED_TYPE){
      self.selectedFilterTypes.push(filter)
    },
    removeFilterType(filter:FEED_TYPE){
      self.selectedFilterTypes = _.without(self.selectedFilterTypes, filter);
    }
  })) 

export interface FeedSnapshotOut extends SnapshotOut<typeof FeedStore> {}
export interface FeedSnapshotIn extends SnapshotIn<typeof FeedStore> {}
export const createFeedDefaultModel = () => types.optional(FeedStore, {})
