import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const VenueStoreModel = types
  .model("VenueStore")
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface VenueStore extends Instance<typeof VenueStoreModel> {}
export interface VenueStoreSnapshotOut extends SnapshotOut<typeof VenueStoreModel> {}
export interface VenueStoreSnapshotIn extends SnapshotIn<typeof VenueStoreModel> {}
export const createVenueStoreDefaultModel = () => types.optional(VenueStoreModel, {})
