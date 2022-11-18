import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { DropStoreModel } from "./DropStore"
import { VenueStoreModel } from "./VenueStore"
import { UserStoreModel } from "./User"
import { AuthenticationStoreModel } from "./AuthenticationStore"
import { FeedStore } from "./Feed"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  dropStore: types.optional(DropStoreModel, {} as any),
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  feedsStore: types.optional(FeedStore, {}), 
  userStore: types.optional(UserStoreModel, {}), 
  venueStore: types.optional(VenueStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
