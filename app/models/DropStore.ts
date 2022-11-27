import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { DropService } from "../services/dropsService"
import { ErrorModel } from "./Feed"

/**
 * Model description here for TypeScript hints.
 *
 */
const dropImages = types.model({
  image: types.maybe(types.string),
  id: types.maybe(types.string)
})
const DropDetailDropModel = types.model({
  id: types.identifier,
  title: types.maybe(types.string),
  description: types.maybe(types.string),
  type: types.maybe(types.string),
  image: types.maybe(types.string),
  name: types.maybe(types.string),
  intro: types.maybe(types.string),
})
const DropModel = types.model({
  id: types.identifier,
  title: types.maybe(types.string),
  description: types.maybe(types.string),
  type: types.maybe(types.string),
  image: types.maybe(types.string),
  name: types.maybe(types.string),
  parent_category: types.maybe(types.string),
  category: types.maybe(types.string),
  intro: types.maybe(types.string),
  owner: types.maybe(types.string),
  lat: types.maybe(types.string),
  lng: types.maybe(types.string),
  venue_id: types.maybe(types.string),
  venue: types.maybe(types.string),
  distance: types.maybeNull(types.number),
  tags: types.array(types.string),
  drops: types.array(DropDetailDropModel),
  expiration: types.maybe(types.string),
  venue_image: types.maybe(types.string),
  user_code: types.maybe(types.string),
  user_claimed: types.maybe(types.boolean),
  images: types.maybeNull(types.array(dropImages)),
})
export const DropStoreModel = types
  .model("DropStore")
  .props({
    currentDrop: types.maybe(DropModel),
    error: types.optional(ErrorModel, { message: "", isError: false }),
    isLoading: types.maybe(types.boolean),
    showClaimedModal: types.maybe(types.boolean),
    claimedCode: types.maybe(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setError(error: any) {
      self.error = error
    },
    setIsLoading(status: boolean) {
      self.isLoading = status
    },
    async getDropDetail(id: string) {
      this.setIsLoading(true)
      this.setError({ isError: false, message: "" })
      const dropService = new DropService()
      const result = await dropService.getDropDetail(id)

      if (result.kind === "ok") {
        this.setCurrentDrop(result.data)
      } else {
        this.setError({ isError: true, message: "Fetching Drop Details" })
      }
      this.setIsLoading(false)
    },
    setCurrentDrop(value) {
      self.currentDrop = value
    },
    async claimDropCode(dropId:string){
      this.setIsLoading(true)
      this.setError({ isError: false, message: "" })
      const dropService = new DropService();
      const claimedResult= await dropService.claimDrop(dropId);
      if(claimedResult.kind === 'ok'){
       await this.getDropDetail(dropId);
      this.setShowClaimModal(true)
      this.setClaimedCode(claimedResult.claimCode)
      }
      this.setIsLoading(false)
    },
    setShowClaimModal(value:boolean){
      self.showClaimedModal = value
    },
    setClaimedCode(value:string){
      self.claimedCode = value;
    }

  }))

export interface DropStore extends Instance<typeof DropStoreModel> {}
export interface DropStoreSnapshotOut extends SnapshotOut<typeof DropStoreModel> {}
export interface DropStoreSnapshotIn extends SnapshotIn<typeof DropStoreModel> {}
export const createDropStoreDefaultModel = () => types.optional(DropStoreModel, {})
