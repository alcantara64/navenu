import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, TextStyle, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "../../app/navigators"
import {
  DropList,
  ErrorMessage,
  FilterBar,
  Modal,
  Screen,
  Text as AppText,
  AppInput,
  LoadingIndicator,
  EmptyState,
} from "../../app/components"
import {
  SkeletonView,
  View,
  Text,
  TouchableOpacity,
  RadioGroup,
  Button,
  RadioButton,
} from "react-native-ui-lib"
import { useDrops } from "../../app/hooks/useDrops"
import _ from "lodash"
import { getUserListIdByItemId, isItemInUserList } from "../../app/utils/transform"
import { addItemToUserList, createUserListName, useUserList } from "../../app/hooks/useUser"
import { UserService } from "../../app/services/userService"
import { Entypo, Ionicons } from "@expo/vector-icons"
import { Colors } from "../../app/theme/colors"
import { typography } from "../../app/theme"
import { useMutation } from "react-query"
import { IDrop } from "../../app/interface/drops"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface DropsScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Drops">> {}

export const DropsScreen: FC<DropsScreenProps> = observer(function DropsScreen() {
  const [searchText, setSearchText] = useState("")
  const [categoryFilters, setCategoryFilters] = useState([])
  //userlist
  const [showListModal, setShowListModal] = useState(false)
  const [selectedUserList, setSelectedUserList] = useState()
  const [selectedFeedItem, setSelectedFeedItem] = useState<IDrop>(null)
  const [listName, setListName] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  // query
  const { data, isError, isLoading, refetch } = useDrops(0, searchText, categoryFilters)
  const userList = useUserList()
  const createListNameMutation = useMutation({
    mutationFn: createUserListName,
    onSuccess(data, variables, context) {
      userList.refetch()
    },
  })
  const toggleSearch = () => {
    setSearchText("")
    setShowSearch(!showSearch)
  }
  const addItemToListMutation = useMutation({
    mutationFn: addItemToUserList,
  })

  const onRemoveFilters = (value: string) => {
    const dropsCategoryFilters = _.without(categoryFilters, value)
    setCategoryFilters(dropsCategoryFilters)
  }
  const onAddFilters = (value: string) => {
    const newCategoryFilter = [...categoryFilters, value]
    setCategoryFilters(newCategoryFilter)
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
  const addListName = () => {
    createListNameMutation.mutate(listName)
    setListName("")
  }
  const onAddItemToUserList = () => {
    addItemToListMutation.mutate(
      {
        user_list_id: selectedUserList,
        type: selectedFeedItem?.type,
        id: selectedFeedItem?.id,
      },
      {
        onSuccess: (data, variables, context) => {
          userList.refetch()
        },
      },
    )
    setShowListModal(false)
    setSelectedUserList(undefined)
  }
  const expandableHeaders = (title: string) => (
    <View style={$headerTextContainer} row spread>
      <View>
        <Text style={$labelStyle}>{title}</Text>
      </View>
    </View>
  )
  if (isError)
    return (
      <View flex-1 centerH centerV>
        <EmptyState
          preset="generic"
          buttonOnPress={() => refetch()}
          heading="A Sever Error Occurred"
          content="Please give it sometime and try again"
        />
      </View>
    )

  return (
    <Screen style={$root} preset="scroll">
      {showListModal && (
        <Modal
          show={showListModal}
          body={
            <View bottom flex style={$centeredView}>
              <View style={$modalView}>
                <View marginB-10 row spread width={"100%"}>
                  <Text header center>
                    SAVE TO LIST
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setShowListModal(false)
                    }}
                  >
                    <Ionicons name="close-circle-sharp" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <View width={"100%"} spread>
                  <RadioGroup
                    onValueChange={(userListId) => {
                      setSelectedUserList(userListId)
                    }}
                    style={{ flexWrap: "wrap" }}
                    row
                  >
                    {userList?.data?.userlist &&
                      Object.entries(userList.data.userlist).map(
                        (key, index) =>
                          key[0] && (
                            <RadioButton
                              color={Colors.stay}
                              labelStyle={$userListLabelStyle}
                              key={index}
                              marginB-10
                              value={`${userList.data.userlist[key[0]]?.user_list_id}`}
                              label={expandableHeaders(
                                `${key[0]} (${userList.data.userlist[key[0]]?.cards?.length})`,
                              )}
                            />
                          ),
                      )}
                  </RadioGroup>
                </View>

                {userList.isLoading && <LoadingIndicator />}
                {userList.error && <Text>an error occurred fetching userList</Text>}
                <View marginB-15 style={{ width: "100%" }}>
                  <View marginT-10>
                    <AppInput
                      value={listName}
                      onTextChange={(text) => {
                        setListName(text)
                      }}
                      trailingAccessory={
                        <TouchableOpacity onPress={addListName}>
                          <Entypo name="add-to-list" size={24} color="black" />
                        </TouchableOpacity>
                      }
                      placeholder="add to a new list"
                    />
                    <View marginT-10>
                      <Button
                        onPress={onAddItemToUserList}
                        style={$buttonStyle}
                        disabled={!selectedUserList}
                        backgroundColor={Colors.stay}
                        fullWidth
                        label={"ADD TO LIST "}
                        labelStyle={$userListLabelStyle}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          }
        ></Modal>
      )}
      <View marginT-10 paddingL-8 paddingR-8>
        <FilterBar
          showCatFilters
          onSearch={setSearchText}
          searchText={searchText}
          showSearch={showSearch}
          onRemoveCatFilters={onRemoveFilters}
          categoryFilters={categoryFilters}
          onCloseSearch={toggleSearch}
          onSetCatFilters={onAddFilters}
          searchPlaceholder="what is the name of the drop you are looking for?"
        />
        {!isLoading && data?.length < 1 && (
          <View marginT-60 centerH centerV>
            <EmptyState
              heading="No Drops Available"
              // button="Let's Try this again"
              buttonOnPress={refetch}
            />
          </View>
        )}

        {(isLoading || data?.length > 0) && (
          <View>
            <View row spread marginT-10={!showSearch}>
              <AppText text="New Drops" />
              {!showSearch && (
                <TouchableOpacity onPress={toggleSearch}>
                  <Ionicons name="search" size={24} color="grey" />
                </TouchableOpacity>
              )}
            </View>
            <View marginT-10>
              <SkeletonView
                height={110}
                width={Dimensions.get("window").width - 16}
                style={$skeletonViewStyle}
                times={6}
                borderRadius={8}
                renderContent={() => (
                  <View>
                    {
                      <DropList
                        drops={data || []}
                        hideBookmark={false}
                        onBookMark={onBookMark}
                        userList={userList.data}
                      />
                    }
                  </View>
                )}
                showContent={!isLoading}
              />
            </View>
          </View>
        )}
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
const $centeredView: ViewStyle = {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.9)",
}

// userlist
const $modalView: ViewStyle = {
  backgroundColor: "#F2F2F2",
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  padding: 15,
  alignItems: "flex-start",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowRadius: 8,
  elevation: 5,
  // borderTopWidth: 10,
  width: "100%",
  borderRadius: 8,
}

const $userListLabelStyle: TextStyle = {
  fontFamily: typography.fonts.inter.normal,
  fontWeight: "700",
  textTransform: "uppercase",
  marginRight: 5,
}
const $headerTextContainer: ViewStyle = {
  alignItems: "center",
}
const $buttonStyle: ViewStyle = {
  borderRadius: 8,
}
const $labelStyle: TextStyle = {
  fontFamily: "Inter-Regular",
  fontStyle: "normal",
  fontWeight: "600",
  textTransform: "uppercase",
}
