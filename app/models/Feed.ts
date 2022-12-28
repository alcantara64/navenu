import { SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import _ from "lodash"
import { FEED_TYPE } from "../interface/feed"

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
    catFilters: types.optional(types.array(types.string), []),
    error: types.optional(ErrorModel, { message: "", isError: false }),
    isLoading: types.maybe(types.boolean),
    isFetchingNextPage: types.maybe(types.boolean),
    selectedFilterTypes: types.optional(types.array(types.string), []),
    showHeaderFilter: types.maybe(types.boolean),
    savedFeeds: types.optional(types.array(Feed), []),
    isMapMode: types.maybe(types.boolean),
    isSearchMode: types.maybe(types.boolean),
    searchFilterType: types.maybe(
     types.string
    ),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    addCartFilter(value) {
      self.catFilters.push(value)
    },
    removeCartFilter(filter) {
      self.catFilters = _.without(self.catFilters, filter)
    },
    setFeeds(feeds) {
      self.feeds = feeds
    },
    setFeedsError(error: any) {
      self.error = error
    },
    setIsLoading(status: boolean) {
      self.isLoading = status
    },

    async setMapMode(status: boolean) {
      self.isMapMode = status
    },

    addFilterType(filter: FEED_TYPE) {
      self.selectedFilterTypes.push(filter)
    },
    removeFilterType(filter: FEED_TYPE) {
      self.selectedFilterTypes = _.without(self.selectedFilterTypes, filter)
    },
    toggleHeaderState() {
      self.showHeaderFilter = !self.showHeaderFilter
    },
    toggleSaveFeed(item: any) {
      const isFeedAvailable = self.savedFeeds.find((feed) => feed.id === item.id)
      if (isFeedAvailable) {
        self.savedFeeds = self.savedFeeds.filter((feed) => feed.id !== item.id)
      } else {
        self.savedFeeds = [...self.savedFeeds, item]
      }
    },
    setIsSearchMode(status: boolean) {
      self.isSearchMode = status
    },
    setSearchFilterType(filterType: any) {
      self.searchFilterType = filterType
    },
  }))

export interface FeedSnapshotOut extends SnapshotOut<typeof FeedStore> {}
export interface FeedSnapshotIn extends SnapshotIn<typeof FeedStore> {}
export const createFeedDefaultModel = () => types.optional(FeedStore, {})
