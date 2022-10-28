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
    const renderItem = ({ item }) => {
      //todo filter by catfilter, doesnt understand how it works
      if (item.type === "location" && selectedFilterTypes.length < 1) {
      
        return <VenueCard item={item} onPress={onVPress} />
      } else {
        if (item.type === FEED_TYPE.location && selectedFilterTypes.includes(item.type)) {
          return <VenueCard item={item} onPress={onVPress} />
        }
      }
      if (item.type === FEED_TYPE.article && selectedFilterTypes.length < 1) {
        return <ArticleCard item={item} />
      } else {
        if (item.type === FEED_TYPE.article && selectedFilterTypes.includes(item.type)) {
          return <ArticleCard item={item} />
        }
      }
      if (item.type === FEED_TYPE.drop  && selectedFilterTypes.length < 1) {
       
        return <DropCard item={item} onPress={onDPress} />
      } else {
        if (item.type === FEED_TYPE.drop && selectedFilterTypes.includes(item.type)) {
          return <DropCard item={item} onPress={onDPress} />
        }
      }
    }
    if (error) return <ErrorMessage message={"Error fetching data"}></ErrorMessage>
    if (isLoading) return <LoadingIndicator />
    return (
      // <Screen style={$root} preset="scroll">
      <FlatList
        data={data?.pages.flat()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        progressViewOffset={18}
        onEndReached={fetchNextPage}
        ListFooterComponent={isFetchingNextPage ? <LoadingIndicator /> : null}
        refreshControl={
          <RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />
        }
      />
      // </Screen>
    )
  })
