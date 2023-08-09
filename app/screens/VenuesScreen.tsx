import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Dimensions, FlatList } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "../../app/navigators"
import {
  ErrorMessage,
  FilterBar,
  RemoveOrAddToUserList,
  Screen,
  VenueCard,
  Text as AppText,
  EmptyState,
  AppMap,
} from "../../app/components"
import { useUserList } from "../../app/hooks/useUser"
import { IVenue } from "../../app/interface/venues"
import { getUserListIdByItemId, isItemInUserList } from "../../app/utils/transform"
import { UserService } from "../../app/services/userService"
import { View, SkeletonView, Text, ScrollBar, TouchableOpacity } from "react-native-ui-lib"
import _ from "lodash"
import { useVenues } from "../../app/hooks"
import { useStores } from "../../app/models"
import { RefreshControl } from "react-native-gesture-handler"
import { Colors } from "../../app/theme"
import { Ionicons } from "@expo/vector-icons"

const BOROUGHS = [
  "Tower Hamlets",
  "Westminster",
  "Kingston upon Thames",
  "Hounslow",
  "Richmond upon Thames",
  "Islington",
  "Hackney",
  "Kensington and Chelsea",
  "Southwark",
  "Camden",
  "Lambeth",
]
interface VenuesScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Venues">> {}

export const VenuesScreen: FC<VenuesScreenProps> = observer(function VenuesScreen() {
  const {
    authenticationStore,
    feedsStore: { isMapMode },
  } = useStores()

  const [longitude, setLongitude] = useState<number>(authenticationStore.longitude)
  const [latitude, setLatitude] = useState<number>(authenticationStore.latitude)
  const [selectedBorough, setSelectedBorough] = useState("")

  const [searchText, setSearchText] = useState("")
  const [categoryFilters, setCategoryFilters] = useState([])
  const [showListModal, setShowListModal] = useState(false)
  const [selectedFeedItem, setSelectedFeedItem] = useState<IVenue>(null)
  const [showSearch, setShowSearch] = useState(false)
  const { data, isError, isLoading, isRefetching, hasNextPage, fetchNextPage, refetch } = useVenues(
    0,
    searchText,
    categoryFilters,
    selectedBorough,
    isMapMode,
  )
  const userList = useUserList()

  const onRemoveFilters = (value: string) => {
    const dropsCategoryFilters = _.without(categoryFilters, value)
    setCategoryFilters(dropsCategoryFilters)
  }
  const onAddFilters = (value: string) => {
    const newCategoryFilter = [...categoryFilters, value]
    setCategoryFilters(newCategoryFilter)
  }
  const onSelectBorough = (value: string) => {
    if (value !== selectedBorough) {
      setSelectedBorough(value)
    } else {
      setSelectedBorough("")
    }
  }
  const refresh = () => {
    setCategoryFilters([])
    setSearchText("")
  }
  const toggleSearch = () => {
    setSearchText("")
    setShowSearch(!showSearch)
  }
  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
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
  // if (!isLoading && data.length < 1)
  //   return (
  //     <View flex-1 centerV>
  //       <EmptyState
  //         preset="generic"
  //         heading="No Matching Venues, yet…."
  //         buttonOnPress={refresh}
  //         button="refresh data"
  //       />
  //     </View>
  //   )
  if (isMapMode)
    return (
      <AppMap
        onSetErrorMessage={() => {
          // do something with error
        }}
        item={data?.pages.map((page) => page.data).flat() || []}
        longitude={longitude}
        latitude={latitude}
        onSetLatitude={setLatitude}
        onSetLongitude={setLongitude}
        useExternalMarkers
      ></AppMap>
    )
  return (
    <View style={$root}>
      {showListModal && (
        <RemoveOrAddToUserList
          setShowListModal={setShowListModal}
          selectedFeedItem={selectedFeedItem}
        />
      )}
      <View marginT-10 paddingL-8 paddingR-8>
        <FilterBar
          showCatFilters
          onSearch={setSearchText}
          searchText={searchText}
          showSearch={showSearch}
          onRemoveCatFilters={onRemoveFilters}
          categoryFilters={categoryFilters}
          onSetCatFilters={onAddFilters}
          onCloseSearch={toggleSearch}
          searchPlaceholder="What venue are  you looking for?"
        />
        <ScrollBar>
          <View style={$boroughContainer} marginT-8 marginB-8 spread row>
            {BOROUGHS.map((value) => (
              <TouchableOpacity
                style={[
                  $boroughButton,
                  { backgroundColor: selectedBorough === value ? Colors.ash : Colors.faded },
                ]}
                key={value}
                onPress={() => {
                  onSelectBorough(value)
                }}
              >
                <Text white text-70>
                  {value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollBar>
        <View row spread>
          <AppText text="For You" />
          {!showSearch && (
            <TouchableOpacity onPress={toggleSearch}>
              <Ionicons name="search" size={24} color="grey" />
            </TouchableOpacity>
          )}
        </View>
        {!isLoading && data?.pages.map((page) => page.data).flat()?.length < 1 && (
          <View marginT-60 centerV centerH>
            <EmptyState
              preset="generic"
              heading="No Matching Venues, yet…."
              buttonOnPress={refresh}
              button="refresh data"
            />
          </View>
        )}

        <View marginT-10>
          <SkeletonView
            height={110}
            width={Dimensions.get("window").width - 16}
            style={$skeletonViewStyle}
            times={6}
            borderRadius={8}
            renderContent={() => (
              <View style={{ maxHeight: Dimensions.get("window").height - 300 }}>
                <FlatList
                  data={data?.pages.map((page) => page.data).flat()}
                  renderItem={({ item }) => (
                    <VenueCard
                      key={item.id}
                      item={item}
                      isFeed
                      onBookMark={onBookMark}
                      userListData={userList.data}
                      currentUserLatitude={latitude}
                      currentUserLongitude={longitude}
                    />
                  )}
                  refreshing={isRefetching}
                  keyExtractor={(item) => item.id.toString()}
                  onEndReached={loadMore}
                  refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
                />
              </View>
            )}
            showContent={!isLoading}
          />
        </View>
      </View>
    </View>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
const $skeletonViewStyle: ViewStyle = {
  marginVertical: 3,
}
const $boroughButton: ViewStyle = {
  backgroundColor: Colors.faded,
  padding: 8,
  borderRadius: 8,
}
const $boroughContainer: ViewStyle = {
  gap: 4,
}
