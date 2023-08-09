import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import {
  AppInput,
  EmptyState,
  ErrorMessage,
  RemoveOrAddToUserList,
  Screen,
  Text,
} from "../../app/components"
import { SkeletonView, TouchableOpacity, View } from "react-native-ui-lib"
import { useCurators } from "../../app/hooks/useCurator"
import { CuratorCard } from "../../app/components/CuratorCard"
import { Ionicons } from "@expo/vector-icons"
import { UserService } from "../../app/services/userService"
import { getUserListIdByItemId, isItemInUserList } from "../../app/utils/transform"
import { useUserList } from "../../app/hooks/useUser"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"r

interface CuratorsScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Curators">> {}

export const CuratorsScreen: FC<CuratorsScreenProps> = observer(function CuratorsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const [searchText, setSearchText] = useState("")
  const { data = [], isError, isLoading } = useCurators(searchText)
  const [showListModal, setShowListModal] = useState(false)
  const [selectedFeedItem, setSelectedFeedItem] = useState<any>(null)
  const userList = useUserList()
  const [showSearch, setShowSearch] = useState(false)

  const onBookMark = async (item) => {
    if (!isItemInUserList(item.id, userList.data)) {
      setSelectedFeedItem(item)
      setShowListModal(true)
    } else {
      const userService = new UserService()
      const userListId = getUserListIdByItemId(item.id, userList.data)
      await userService.removeCardFromList({
        user_list_id: userListId,
        type: item.type,
        id: item.id,
      })
    }
    userList.refetch()
  }
  const toggleSearch = () => {
    setSearchText("")
    setShowSearch(!showSearch)
  }
  if (isError) return <ErrorMessage message={"Error fetching data"}></ErrorMessage>
  // if(data?.length < 1) return  <EmptyState preset="generic" heading="EmptyState Heading" content="EmptyState Content"/>
  return (
    <Screen style={$root} preset="scroll">
      {showListModal && (
        <RemoveOrAddToUserList
          setShowListModal={setShowListModal}
          selectedFeedItem={selectedFeedItem}
        />
      )}
      <View marginT-40 paddingL-8 paddingR-8>
        {showSearch && (
          <View marginT-10 marginB-10>
            <AppInput
              onTextChange={(text) => {
                setSearchText(text)
              }}
              value={searchText}
              placeholder="What is the name of the curator you are searching for?"
              trailingAccessory={
                <TouchableOpacity onPress={toggleSearch}>
                  <Ionicons name="close-sharp" size={24} color="grey" />
                </TouchableOpacity>
              }
            />
          </View>
        )}
        <View row spread>
          <Text text="curators" />
          {!showSearch && (
            <TouchableOpacity onPress={toggleSearch}>
              <Ionicons name="search" size={24} color="grey" />
            </TouchableOpacity>
          )}
        </View>
        <View marginT-8>
          <SkeletonView
            height={110}
            width={Dimensions.get("window").width - 16}
            style={$skeletonViewStyle}
            times={6}
            borderRadius={8}
            renderContent={() => (
              <View style={$listContainer} row spread>
                {data?.map((curator) => (
                  <CuratorCard
                    key={curator.ID}
                    curator={curator}
                    onBookMark={onBookMark}
                    isFeed
                    userListData={userList.data}
                  />
                ))}
              </View>
            )}
            showContent={!isLoading}
          />
        </View>
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
const $skeletonViewStyle: ViewStyle = {
  marginVertical: 3,
}
const $listContainer: ViewStyle = { width: "100%", flexWrap: "wrap", gap: 8 }
