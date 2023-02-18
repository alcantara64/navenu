import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { CuratorDetail, ErrorMessage, LoadingIndicator, Screen, Text } from "../components"
import { useCurator } from "../hooks/useCurator"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `CuratorProfile: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="CuratorProfile" component={CuratorProfileScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const CuratorProfileScreen: FC<StackScreenProps<AppStackScreenProps, "CuratorProfile">> = observer(function CuratorProfileScreen({route}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const curatorId = route.params.curator.id;
 const {data, error, isLoading} = useCurator(curatorId);

 if (isLoading) return <LoadingIndicator />;
 if (error) return <ErrorMessage message={'Error occurred looking for curators'}></ErrorMessage>;

  return (
    <Screen style={$root} preset="scroll">
      <CuratorDetail curator={data}></CuratorDetail>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
