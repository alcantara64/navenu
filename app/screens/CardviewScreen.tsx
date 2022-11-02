import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, RefreshControl } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { ArticleCard, ErrorMessage, LoadingIndicator, VenueCard } from "../components"
import { DropCard } from "../components/DropCard"
import { useRefreshByUser } from "../hooks/useRefreshByUser"
import { useFeeds } from "../hooks"
import { useStores } from "../models"
import { FEED_TYPE } from "../interface/feed"
import { filterFeeds } from "../utils/transform"
import { View } from "react-native-ui-lib"

export const CardviewScreen: FC<StackScreenProps<AppStackScreenProps<"Cardview">, undefined>> =
  observer(function CardviewScreen({ navigation }) {
    // Pull in one of our MST stores
    const { feedsStore } = useStores()
    const { catFilters, selectedFilterTypes } = feedsStore

    const { data, fetchNextPage, isFetchingNextPage, error, isLoading, refetch } = useFeeds({})
    const { isRefetchingByUser, refetchByUser } = useRefreshByUser({ refetch });
    const [filterChangeCount, setFilterChange ] = useState(0);
    useEffect(() => {
      setFilterChange(filterChangeCount + 1)
    }, [JSON.stringify(selectedFilterTypes), JSON.stringify(catFilters)])
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
    const filteredList = filterFeeds(data?.pages.flat(), selectedFilterTypes, catFilters);
    const renderItem = ({ item }) => {
      if (item.type === "location") {
      
        return <VenueCard item={item} onPress={onVPress} />
      } 
      if (item.type === FEED_TYPE.article) {
        return <ArticleCard item={item} />
      } 
      if (item.type === FEED_TYPE.drop ) {
       
        return <DropCard item={item} onPress={onDPress} />
      } 
    }
    if (error) return <ErrorMessage message={"Error fetching data"}></ErrorMessage>
    if (isLoading) return <LoadingIndicator />
    return (
       <View margin-8>
      <FlatList
        data={[...filteredList]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        progressViewOffset={18}
        onEndReached={fetchNextPage}
        ListFooterComponent={isFetchingNextPage ? <LoadingIndicator /> : null}
        refreshControl={
          <RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />
        }
        extraData={JSON.stringify(catFilters.concat(selectedFilterTypes))}
      />
     </View>
    )
  })
