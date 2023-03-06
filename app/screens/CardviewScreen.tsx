import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle, Dimensions } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { AppInput, AppMap, CardList, ErrorMessage, LoadingIndicator, Modal } from "../components"
import { useRefreshByUser } from "../hooks/useRefreshByUser"
import { useFeeds } from "../hooks"
import { useStores } from "../models"
import { filterFeeds, getUserListIdByItemId, isItemInUserList } from "../utils/transform"
import {
  View,
  Text,
  TouchableOpacity,
  SkeletonView,
  RadioGroup,
  RadioButton,
  Button,
} from "react-native-ui-lib"
import { Colors, typography } from "../theme"
import { addItemToUserList, createUserListName, useUserList } from "../hooks/useUser"
import { useMutation, useQueryClient } from "react-query"
import { useSwipe } from "../hooks/useSwipe"
import { IArticle, IVenue } from "../interface/venues"
import { IDrop } from "../interface/drops"
import { Entypo, Ionicons } from "@expo/vector-icons"
import { UserService } from "../services/userService"

export const CardviewScreen: FC<StackScreenProps<AppStackScreenProps<"Cardview">, undefined>> =
  observer(function CardviewScreen() {
    // Pull in one of our MST stores
    const { feedsStore, authenticationStore } = useStores()
    const queryClient = useQueryClient()
    const {
      catFilters,
      selectedFilterTypes,
      toggleSaveFeed,
      toggleHeaderState,
      showHeaderFilter,
      isMapMode,
      setIsSearchMode,
      clearAllFilters,
    } = feedsStore

    const { data, fetchNextPage, isFetchingNextPage, error, isLoading, refetch, hasNextPage } =
      useFeeds(catFilters)
    const { isRefetchingByUser, refetchByUser } = useRefreshByUser({ refetch })
    const userList = useUserList()
    const [showListModal, setShowListModal] = useState(false)
    const [listName, setListName] = useState("")
    const [selectedFeedItem, setSelectedFeedItem] = useState<IVenue | IDrop | IArticle>(null)

    const [longitude, setLongitude] = useState<number>(authenticationStore.longitude)
    const [latitude, setLatitude] = useState<number>(authenticationStore.latitude)
    const [selectedUserList, setSelectedUserList] = useState()

    const createListNameMutation = useMutation({
      mutationFn: createUserListName,
      onSuccess(data, variables, context) {
        userList.refetch()
      },
    })
    useEffect(() => {
      //  clearAllFilters()
      setIsSearchMode(false)
    }, [])
    const addItemToListMutation = useMutation({
      mutationFn: addItemToUserList,
    })
    const { onTouchStart, onTouchEnd } = useSwipe(undefined, undefined, onSwipeUp, onSwipeDown, 6)

    function onSwipeUp() {
      setTopBarStatus(true)
    }
    function onSwipeDown() {
      setTopBarStatus(false)
    }

    const getMoreDate = () => {
      hasNextPage && fetchNextPage()
    }
    const setTopBarStatus = (value: boolean) => {
      if (value && showHeaderFilter) return
      if (!value && showHeaderFilter) {
        toggleHeaderState()
      }
      if (value && !showHeaderFilter) {
        toggleHeaderState()
      }
    }
    const expandableHeaders = (title: string) => (
      <View style={$headerTextContainer} row spread>
        <View>
          <Text style={$labelStyle}>{title}</Text>
        </View>
      </View>
    )
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
      addItemToListMutation.mutate({
        user_list_id: selectedUserList,
        type: selectedFeedItem?.type,
        id: selectedFeedItem?.id,
      },{
        onSuccess:(data, variables, context) => {
        userList.refetch()
      },})
      setShowListModal(false);
      setSelectedUserList(undefined);

    }

    if (error) return <ErrorMessage message={"Error fetching data"}></ErrorMessage>
    if (isMapMode)
      return (
        <AppMap
          onSetErrorMessage={() => {
            // do something with error
          }}
          longitude={longitude}
          latitude={latitude}
          onSetLatitude={setLatitude}
          onSetLongitude={setLongitude}
          useExternalMarkers
          item={filterFeeds(data?.pages.flat(), selectedFilterTypes, catFilters) as any}
        />
      )
    const filteredData = filterFeeds(data?.pages?.flat(), selectedFilterTypes, catFilters)
    return (
      <View margin-8>
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
        <SkeletonView
          height={110}
          width={Dimensions.get("window").width - 16}
          style={$skeletonViewStyle}
          times={6}
          borderRadius={8}
          renderContent={() => (
            <CardList
              onTouchEnd={onTouchEnd}
              onTouchStart={onTouchStart}
              data={filteredData}
              getMoreData={getMoreDate}
              isFetchingNextPage={isFetchingNextPage}
              onBookMark={onBookMark}
              toggleSaveFeed={toggleSaveFeed}
              isFeed={true}
              userList={userList.data}
            />
          )}
          showContent={!isLoading}
        />
      </View>
    )
  })
const $centeredView: ViewStyle = {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.9)",
}
const $listText: TextStyle = {
  color: Colors.mediumGray,
  fontFamily: typography.primary.medium,
}
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
const $skeletonViewStyle: ViewStyle = {
  marginVertical: 3,
}
const $labelStyle: TextStyle = {
  fontFamily: "Inter-Regular",
  fontStyle: "normal",
  fontWeight: "600",
  textTransform: "uppercase",
}
const $headerTextContainer: ViewStyle = {
  alignItems: "center",
}
const $userListLabelStyle: TextStyle = {
  fontFamily: typography.fonts.inter.normal,
  fontWeight: "700",
  textTransform: "uppercase",
  marginRight: 5,
}
const $buttonStyle: ViewStyle = {
  borderRadius: 8,
}
