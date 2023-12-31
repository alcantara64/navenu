import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Web } from "../components"
import { useNavigation } from "@react-navigation/native"
import { View } from "react-native-ui-lib"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `PrivacyPolicy: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const PrivacyPolicyScreen: FC<StackScreenProps<AppStackScreenProps, "PrivacyPolicy">> =
  observer(function PrivacyPolicyScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    const navigation = useNavigation()
    return (
      <Screen style={$root} preset="auto">
        <View marginT-85>
          <Web hideBack url="https://navenu.com/navenu-policies/" onClose={navigation.goBack} />
        </View>
      </Screen>
    )
  })

const $root: ViewStyle = {
  flex: 1,
}
