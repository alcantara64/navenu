import { DropStoreModel } from "./DropStore"

test("can be created", () => {
  const instance = DropStoreModel.create({})

  expect(instance).toBeTruthy()
})
