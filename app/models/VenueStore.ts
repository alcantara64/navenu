import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { IVenue } from "../interface/venues"

/**
 * Model description here for TypeScript hints.
 */
const venue = types.model({
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
  lat: types.maybe(types.number),
  lng: types.maybe(types.number),
  drops: types.frozen(),
})
export const VenueStoreModel = types
  .model("VenueStore")
  .props({
    showBottomSheet: types.maybe(types.boolean),
    currentVenue: types.frozen(),
  })
  .actions((self) => ({
    setCurrentVenue(currentVenue: IVenue) {
      self.currentVenue = currentVenue
    },

    setBottomSheetStatus(status: boolean) {
      self.showBottomSheet = status
    },
  }))
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface VenueStore extends Instance<typeof VenueStoreModel> {}
export interface VenueStoreSnapshotOut extends SnapshotOut<typeof VenueStoreModel> {}
export interface VenueStoreSnapshotIn extends SnapshotIn<typeof VenueStoreModel> {}
export const createVenueStoreDefaultModel = () => types.optional(VenueStoreModel, {})
