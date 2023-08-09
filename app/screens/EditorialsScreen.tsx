import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, RefreshControl, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import {
  AppInput,
  ArticleCard,
  ErrorMessage,
  RemoveOrAddToUserList,
  Screen,
  Text,
} from "../../app/components"
import { SkeletonView, TouchableOpacity, View } from "react-native-ui-lib"
import { useArticles } from "../../app/hooks/useArticles"
import { Ionicons } from "@expo/vector-icons"
import { useUserList } from "../../app/hooks/useUser"
import { getUserListIdByItemId, isItemInUserList } from "../../app/utils/transform"
import { UserService } from "../../app/services/userService"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface EditorialsScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"Edittorials">> {}

export const EditorialsScreen: FC<EditorialsScreenProps> = observer(function EdittorialsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const [searchText, setSearchText] = useState("")
  const { data, isError, isRefetching, refetch } = useArticles(1, searchText)

  const [showListModal, setShowListModal] = useState(false)
  const [selectedFeedItem, setSelectedFeedItem] = useState<any>(null)
  const userList = useUserList()
  const [showSearch, setShowSearch] = useState(false)

  const toggleSearch = () => {
    setSearchText("")
    setShowSearch(!showSearch)
  }

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
  if (isError) return <ErrorMessage message={"Error fetching data"}></ErrorMessage>
  return (
    <Screen
      style={$root}
      preset="scroll"
      ScrollViewProps={{
        refreshControl: <RefreshControl refreshing={isRefetching} onRefresh={refetch} />,
      }}
    >
      {showListModal && (
        <RemoveOrAddToUserList
          setShowListModal={setShowListModal}
          selectedFeedItem={selectedFeedItem}
        />
      )}
      <View paddingL-8 paddingR-8>
        {showSearch && (
          <View marginT-10 marginB-10>
            <AppInput
              onTextChange={(text) => {
                setSearchText(text)
              }}
              placeholder="What is the name of the article you are looking for?"
              value={searchText}
              trailingAccessory={
                <TouchableOpacity onPress={toggleSearch}>
                  <Ionicons name="close-sharp" size={24} color="grey" />
                </TouchableOpacity>
              }
            />
          </View>
        )}
        <View row spread marginT-15>
          <Text text="Editorials" />
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
              <View>
                {data?.map((article) => (
                  <ArticleCard
                    key={article.id}
                    item={article}
                    onBookMark={onBookMark}
                    isFeed
                    userListData={userList.data}
                  />
                ))}
              </View>
            )}
            showContent={true}
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
