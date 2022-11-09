import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, RefreshControl, TextStyle, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { ArticleCard, ErrorMessage, LoadingIndicator, Modal, TextInput, VenueCard } from "../components"
import { DropCard } from "../components/DropCard"
import { useRefreshByUser } from "../hooks/useRefreshByUser"
import { useFeeds } from "../hooks"
import { useStores } from "../models"
import { FEED_TYPE } from "../interface/feed"
import { filterFeeds } from "../utils/transform"
import { View, Text, TouchableOpacity } from "react-native-ui-lib"
import { Colors, typography } from "../theme"
import { useUserList } from "../hooks/useUser"

export const CardviewScreen: FC<StackScreenProps<AppStackScreenProps<"Cardview">, undefined>> =
  observer(function CardviewScreen({ navigation }) {
    // Pull in one of our MST stores
    const { feedsStore } = useStores()
    const {
      catFilters,
      selectedFilterTypes,
      savedFeeds,
      toggleSaveFeed,
      toggleHeaderState,
      showHeaderFilter,
    } = feedsStore

    const { data, fetchNextPage, isFetchingNextPage, error, isLoading, refetch, hasNextPage } =
      useFeeds(catFilters)
    const { isRefetchingByUser, refetchByUser } = useRefreshByUser({ refetch })
    const userList = useUserList();
    const [showListModal, setShowListModal] = useState(false);




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
    const hidTopBar = () => {
      showHeaderFilter && toggleHeaderState()
    }
    const onBookMark = (item) =>{
      userList.refetch();
      setShowListModal(true)
    }
    console.log('fetchData ==>', userList.data)

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
    return (
      <View margin-8>
        {showListModal && <Modal show={showListModal} body={
          <View center flex style={$centeredView}>
            <View style={$modalView}>
             <TouchableOpacity>
            <View row>
            {Object.keys(userList.data.userlist).map((key, index) =>(
          <Text key={index} left style={$listText}> {key} </Text>
          
          ))}
          
          </View>
          </TouchableOpacity> 
          {userList.isLoading && <LoadingIndicator />}
          {userList.error && <Text>an error occurred try again later</Text>}
          <View style={{width:'100%'}}>
            <TextInput leftIconName={null} rightIcon={null} handlePasswordVisibility={false}/>
          </View>
          </View>
          </View>
        }></Modal>}
        <FlatList
          onScroll={hidTopBar}
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
const $listText:TextStyle = {
  color: Colors.mediumGray,
  fontFamily: typography.primary.medium,
}
const $modalView: ViewStyle = {

  backgroundColor: "white",
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  padding: 15,
  alignItems: 'flex-start',
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowRadius: 8,
  elevation: 5,
  // borderTopWidth: 10,
  width:"80%",
  borderRadius: 8,
}