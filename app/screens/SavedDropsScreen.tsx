import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `SavedDrops: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="SavedDrops" component={SavedDropsScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const SavedDropsScreen: FC<StackScreenProps<AppStackScreenProps, "SavedDrops">> = observer(
  function SavedDropsScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen style={$root} preset="scroll">
        <Text text="savedDrops" />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
