import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  Screen,
} from "../components"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import {
  View,
} from "react-native-ui-lib"

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
export const PreferencesScreen: FC<StackScreenProps<AppStackScreenProps, "Settings">> = observer(
  function PreferencesScreen() {
   
    const [activeStage, setActiveStage] = useState(0);


  
    return (
      <Screen preset='auto'>
        <View marginT-50 padding-10 flex-1>
        </View>
      </Screen>
    )
  },
)


