import { SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import _ from "lodash"
import { VenuesService } from "../services/VenuesService"
import { IVenue } from "../interface/venues"

/**
 * @TODO complete with additional fields please refer to interface IVenues this all just seems very redundant
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
})

const Error = types.model({
  message: types.string,
  isError: types.boolean,
})
export const VenueStore = types
  .model("Venue")
  .props({
    venue: types.optional(types.array(venue), []),
    error: types.optional(Error, { message: "", isError: false }),
    isLoading: types.maybe(types.boolean),
    isFetchingNextPage: types.maybe(types.boolean),
    showBottomSheet: types.maybe(types.boolean),
    currentVenue: types.maybeNull(venue),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setVenue(venue) {
      self.venue = venue
    },
    setCurrentVenue(currentVenue: IVenue) {
      self.currentVenue = currentVenue
    },

    setBottomSheetStatus(status: boolean) {
      self.showBottomSheet = status
    },

    async getVenueDetail(id?: number) {
      const venuesService = new VenuesService()
      const result = await venuesService.getVenueDetail(id)
      if (result.kind === "ok") {
        this.setVenue(result.data)
      }
    },
    async refetch() {
      this.getVenueDetail(self.id)
    },
  }))

export interface VenueSnapshotOut extends SnapshotOut<typeof VenueStore> {}
export interface VenueSnapshotIn extends SnapshotIn<typeof VenueStore> {}
export const createVenueDefaultModel = () => types.optional(VenueStore, {})
