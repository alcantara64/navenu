import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const DropStoreModel = types
  .model("DropStore")
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface DropStore extends Instance<typeof DropStoreModel> {}
export interface DropStoreSnapshotOut extends SnapshotOut<typeof DropStoreModel> {}
export interface DropStoreSnapshotIn extends SnapshotIn<typeof DropStoreModel> {}
export const createDropStoreDefaultModel = () => types.optional(DropStoreModel, {})
