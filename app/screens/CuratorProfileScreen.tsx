import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { BottomSheet, CardList, CuratorDetail, ErrorMessage, LoadingIndicator, Screen, } from "../components"
import { useCurator } from "../hooks/useCurator"
import { View, Text } from "react-native-ui-lib"

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
 const {data, error, isLoading, refetch} = useCurator(curatorId);
 const [showBottomSheet, setShowBottomSheet] = useState(false)
 const [selectedListItem, setSelectedListItem] = useState(null)
 const [showUserListModal, setShowUserListModal] = useState(false)

 const setCurrentListItem = (listItem) => {
  setShowBottomSheet(false)
  setSelectedListItem(listItem)
  setShowUserListModal(true)
}
const removeFromUserList = async (item, listId: any) => {
  // setLoading(true)
  // const userService = new UserService()
  // const response = await userService.removeCardFromList({
  //   type: item.type,
  //   id: item.id,
  //   user_list_id: listId,
  // })

  // if (response.kind === "ok") {
  //   getUser()
  //   setShowUserListModal(false)
  //   setLoading(false)
  // }
}
const onCloseUserListModal = () => {
  setShowUserListModal(false)
}
 if (isLoading) return <LoadingIndicator />;
 if (error) return <ErrorMessage message={'Error occurred looking for curators'}></ErrorMessage>;

  return (
    <>
    <Screen style={$root} preset="scroll">
      <CuratorDetail onSetSelectedList={setCurrentListItem} curator={data} refetch={refetch}></CuratorDetail>
    </Screen>
    <BottomSheet show={showUserListModal} onClose={onCloseUserListModal}>
          <View padding-8>
            <Text header marginT-10>
              {selectedListItem?.userListName}
            </Text>
            <View marginT-15 style={$mapContainer}>
              <CardList
                data={selectedListItem?.cards || []}
                isFeed={false}
                isUserList
                hideRemove
              />
            </View>
          </View>
        </BottomSheet>
    </>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
const $mapContainer: ViewStyle = {
  maxHeight: 400,
}