import { SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import _ from 'lodash';

/**
 * Model description here for TypeScript hints.
 */
 const Feed = types.model({
  id: types.string,
  title: types.string,
})


export const FeedStore = types
  .model("Feed")
  .props({
    feeds: types.array(Feed),
    pages: types.optional(types.number, 0),
    pageParams: types.maybe(types.string),
    catFilters:types.maybe(types.array(Feed)),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    addCartFilter(value){
     self.catFilters = [] || value
    },
    removeCartFilter(filter){
      self.catFilters = [] || _.without(self.catFilters, filter);
    }
  })) 

export interface FeedSnapshotOut extends SnapshotOut<typeof FeedStore> {}
export interface FeedSnapshotIn extends SnapshotIn<typeof FeedStore> {}
export const createFeedDefaultModel = () => types.optional(FeedStore, {})
