import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { DropStoreModel } from "./DropStore"
import { AuthenticationStoreModel } from "./AuthenticationStore"
import { FeedStore } from "./Feed"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  dropStore: types.optional(DropStoreModel, {} as any),
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  feedsStore: types.optional(FeedStore, {}), 
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
