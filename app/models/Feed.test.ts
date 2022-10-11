import { FeedModel } from "./Feed"

test("can be created", () => {
  const instance = FeedModel.create({})

  expect(instance).toBeTruthy()
})
