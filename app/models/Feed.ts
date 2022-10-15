import { SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import _ from 'lodash';
import { FeedService } from "../services/feedsService";

/**
 * Model description here for TypeScript hints.
 */
 const Feed = types.model({
  id: types.string,
  title: types.string,
  description: types.string,
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
    pageParams: types.maybe(types.string),
    catFilters:types.maybe(types.array(Feed)),
    error: types.optional(Error, {message: '', isError: false}),
    isLoading: types.maybe(types.boolean),
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

    }
  })) 

export interface FeedSnapshotOut extends SnapshotOut<typeof FeedStore> {}
export interface FeedSnapshotIn extends SnapshotIn<typeof FeedStore> {}
export const createFeedDefaultModel = () => types.optional(FeedStore, {})
