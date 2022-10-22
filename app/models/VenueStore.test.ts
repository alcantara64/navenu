import { VenueStoreModel } from "./VenueStore"

test("can be created", () => {
  const instance = VenueStoreModel.create({})

  expect(instance).toBeTruthy()
})
