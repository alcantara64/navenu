import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { BottomSheet, ErrorMessage, LoadingIndicator, Screen, UserProfile } from "../components"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { useStores } from "../models"
import { View, Text } from "react-native-ui-lib"
import { IUser } from "../interface/user"
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
  function PreferencesScreen({ route }) {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    // const userId = route.params.user.id;
    const { userStore } = useStores()
    const { isLoading, error, getUser,  usersList, currentUser, userDrops} = userStore;
    const [showBottomSheet, setShowBottomSheet] = useState(true);

    const closeBottomSheet = () => {
      setShowBottomSheet(false);
    }
    const openBottomSheet = () => {
      setShowBottomSheet(true);
    }

    useEffect(() => {
     getUser()
    }, [])
    if (error.isError) return <ErrorMessage message={'Error occurred'}></ErrorMessage>;
    if (isLoading) return <LoadingIndicator />;
    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (<>
      <Screen style={$root} preset="scroll">
        <UserProfile user={currentUser} userList={usersList} userDrops={userDrops} />
      </Screen>
      <BottomSheet show={showBottomSheet} onClose={closeBottomSheet}><View bg-red><Text>Hello</Text></View></BottomSheet>
      </>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
