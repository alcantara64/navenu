import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, RefreshControl } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { ArticleCard, ErrorMessage, LoadingIndicator, VenueCard } from "../components"
import { DropCard } from "../components/DropCard"
import { useRefreshByUser } from "../hooks/useRefreshByUser"
import { useFeeds } from "../hooks"

export const CardviewScreen: FC<StackScreenProps<AppStackScreenProps<"Cardview">, undefined>> =
  observer(function CardviewScreen({ navigation }) {
    // Pull in one of our MST stores
    //const { feedsStore } = useStores()
    // const { error, isLoading, isFetchingNextPage, fetchNextPage, refetch, getFeeds, feeds } =
    //   feedsStore
   
    const  {data, fetchNextPage, hasNextPage, isFetchingNextPage, error, isLoading, status, refetch}  = useFeeds({})
    const { isRefetchingByUser, refetchByUser } = useRefreshByUser({ refetch })

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
      if (item.type === "location") return <VenueCard item={item} onPress={onVPress} />
      if (item.type === "article") return <ArticleCard item={item} />
      if (item.type === "drop") return <DropCard item={item} onPress={onDPress} />
    }
    if (error) return <ErrorMessage message={'Error fetching data'}></ErrorMessage>
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
