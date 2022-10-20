import { SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import _ from 'lodash';
import { VenuesService } from "../services/VenuesService";

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
})

const Error = types.model({
  message: types.string,
  isError: types.boolean,
})
export const VenueStore = types
  .model("Venue")
  .props({
    venue: types.optional(types.array(venue), []),
    error: types.optional(Error, {message: '', isError: false}),
    isLoading: types.maybe(types.boolean),
    isFetchingNextPage: types.maybe(types.boolean),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
   
    setVenue(venue){
     self.venue = venue;
    },
    async getVenueDetail(id?:number){
      const  VenuesService = new VenuesService();
     const  result = await VenuesService.getVenueDetail(id);
     if(result.kind === 'ok'){
      console.log( 'venue', result.data);
      this.setVenue(result.data)
     }

    },
    async refetch(){
      this.getVenueDetail(self.id)
    },

  })) 

export interface VenueSnapshotOut extends SnapshotOut<typeof VenueStore> {}
export interface VenueSnapshotIn extends SnapshotIn<typeof VenueStore> {}
export const createVenueDefaultModel = () => types.optional(VenueStore, {})
