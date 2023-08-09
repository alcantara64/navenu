import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { PdfViewer, Screen, Text } from "../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `TermsOfUse: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="TermsOfUse" component={TermsOfUseScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const TermsOfUseScreen: FC<StackScreenProps<AppStackScreenProps, "TermsOfUse">> = observer(
  function TermsOfUseScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    const source = { uri: "https://media.navenu.com/NavenuTermsofService.pdf", cache: true }
    return (
      <Screen style={$root} preset="scroll">
        <PdfViewer source={source} />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
