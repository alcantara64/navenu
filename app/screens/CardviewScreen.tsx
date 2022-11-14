import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, RefreshControl, TextStyle, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import {
  AppMap,
  ArticleCard,
  ErrorMessage,
  LoadingIndicator,
  Modal,
  TextInput,
  VenueCard,
} from "../components"
import { DropCard } from "../components/DropCard"
import { useRefreshByUser } from "../hooks/useRefreshByUser"
import { useFeeds } from "../hooks"
import { useStores } from "../models"
import { FEED_TYPE } from "../interface/feed"
import { filterFeeds } from "../utils/transform"
import { View, Text, TouchableOpacity } from "react-native-ui-lib"
import { Colors, typography } from "../theme"
import { addItemToUserList, createUserListName, useUserList } from "../hooks/useUser"
import { useMutation } from "react-query"
import { useSwipe } from "../hooks/useSwipe"
import { IArticle, IVenue } from "../interface/venues"
import { IDrop } from "../interface/drops"
import { MapScreen } from "./MapScreen"

export const CardviewScreen: FC<StackScreenProps<AppStackScreenProps<"Cardview">, undefined>> =
  observer(function CardviewScreen({ navigation }) {
    // Pull in one of our MST stores
    const { feedsStore, authenticationStore } = useStores()
    const {
      catFilters,
      selectedFilterTypes,
      savedFeeds,
      toggleSaveFeed,
      toggleHeaderState,
      showHeaderFilter,
      isMapMode,
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
    const createListNameMutation = useMutation({
      mutationFn: createUserListName,
    })
    const addItemToListMutation = useMutation({
      mutationFn: addItemToUserList
    })
    const { onTouchStart, onTouchEnd } = useSwipe(
      undefined,
      undefined,
      onSwipeUp,
      onSwipeDown,
      6,
    )

   
    function onSwipeUp() {
      setTopBarStatus(true)
    }
    function onSwipeDown() {
      setTopBarStatus(false)
    }

    const onVPress = (venue) => {
      navigation.navigate("VenueDetailScreen", {
        venue,
      })
    }
    const onDPress = (venue) => {
      navigation.navigate("DropScreen", {
        venue,
      })
    }
    const getMoreDate = () => {
      hasNextPage && fetchNextPage()
    }
    const setTopBarStatus = (value:boolean) => {
      if(value && showHeaderFilter) return
      if(!value && showHeaderFilter){
        toggleHeaderState()
      }
      if(value && !showHeaderFilter){
        toggleHeaderState()
      }

    }
    const onBookMark = (item) => {
      userList.refetch()
      setSelectedFeedItem(item);
      setShowListModal(true)
    }
    const addListName = () => {
      createListNameMutation.mutate(listName)
      userList.refetch()
    }
    const onAddItemToUserList = (listItem) =>{
      addItemToListMutation.mutate({user_list_id: listItem?.user_list_id, type: selectedFeedItem?.type, id: selectedFeedItem?.id});
      setShowListModal(false);
    }

    const renderItem = ({ item }) => {
      if (item.type === "location") {
        return (
          <VenueCard
            savedFeeds={savedFeeds}
            isFeed
            onBookMark={onBookMark}
            item={item}
            onPress={onVPress}
          />
        )
      }
      if (item.type === FEED_TYPE.article) {
        return <ArticleCard item={item} />
      }
      if (item.type === FEED_TYPE.drop) {
        return (
          <DropCard
            savedFeeds={savedFeeds}
            isFeed
            onBookMark={toggleSaveFeed}
            item={item}
            onPress={onDPress}
          />
        )
      }
    }
    if (error) return <ErrorMessage message={"Error fetching data"}></ErrorMessage>
    if (isLoading) return <LoadingIndicator />
    if(isMapMode) return<AppMap onSetErrorMessage={(e) => {
      // do something with error
    }}  longitude={longitude} latitude={latitude} onSetLatitude={setLatitude} onSetLongitude={setLongitude}  item={filterFeeds(data.pages.flat(), selectedFilterTypes, catFilters) as any} />
    return (
      <View margin-8>
        {showListModal && (
          <Modal
            show={showListModal}
            body={
              <View center flex style={$centeredView}>
                <View style={$modalView}>
                    <View row>
                      {userList?.data?.userlist &&
                        Object.entries(userList.data.userlist).map((key, index) => (
                          <TouchableOpacity key={index} onPress={() => {onAddItemToUserList(key[1])}}>
                          <Text  left style={$listText}>
                            {" "}
                            {key[0]}{" "}
                          </Text>
                          </TouchableOpacity>
                        ))}
                    </View>
                  
                  {userList.isLoading && <LoadingIndicator />}
                  {userList.error && <Text>an error occurred try again later</Text>}
                  <View style={{ width: "100%" }}>
                    <TextInput
                      onChangeText={(text) => {
                        setListName(text)
                      }}
                      leftIconName={null}
                      rightIcon={"add-to-list"}
                      handlePasswordVisibility={addListName}
                    />
                  </View>
                </View>
              </View>
            }
          ></Modal>
        )}
        <FlatList
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          data={filterFeeds(data.pages.flat(), selectedFilterTypes, catFilters)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          progressViewOffset={18}
          onEndReached={getMoreDate}
          ListFooterComponent={isFetchingNextPage ? <LoadingIndicator /> : null}
          refreshControl={
            <RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />
          }
          extraData={JSON.stringify(catFilters.concat(selectedFilterTypes))}
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
  backgroundColor: "white",
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
  width: "80%",
  borderRadius: 8,
}
