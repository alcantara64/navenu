import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { ErrorMessage,  LoadingIndicator,  Screen, UserProfile } from "../components"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { View } from "react-native-ui-lib"
import { useUser } from "../hooks/useUser"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Preferences: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Preferences" component={PreferencesScreen} />`
// Hint: Look for the 🔥!
//  `<UserProfile user={data}></UserProfile>`
// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore 
export const PreferencesScreen: FC<StackScreenProps<AppStackScreenProps, "Settings">> = observer(function PreferencesScreen({route}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // const userId = route.params.user.id;
 const { data, error, isLoading } = useUser('1241');

  if (error) return <ErrorMessage message={'Error occurred'}></ErrorMessage>;
  if (isLoading) return <LoadingIndicator />;
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">

    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
