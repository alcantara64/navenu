import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, RefreshControl, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { ArticleCard, ErrorMessage, LoadingIndicator, Screen, VenueCard } from "../components"
import { DropCard } from "../components/DropCard"
import { useStores } from "../models"
import { useNavigation } from "@react-navigation/native"
import { useRefreshByUser } from "../hooks/useRefreshByUser"

export const CardviewScreen: FC<StackScreenProps<AppStackScreenProps<'Cardview'>, undefined>> = observer(function CardviewScreen() {
  // Pull in one of our MST stores
  const navigation = useNavigation();
   const { feedsStore } = useStores();
   const {error, isLoading, isFetchingNextPage, fetchNextPage, refetch, getFeeds} = feedsStore;
   const { isRefetchingByUser, refetchByUser } = useRefreshByUser({refetch});
   const feeds = require('../../assets/data/feed.json').data
  
   useEffect(() => {
    getFeeds();
   }, [])



   const onVPress = (venue) => {
    navigation.navigate('VenueDetailScreen', {
      venue,
    });
  };
  const onDPress = (venue) => {
    navigation.navigate('DropScreen', {
      venue,
    });
  };
   const renderItem = ({ item }) => {
    if (item.type === 'location') return <VenueCard item={item} onPress={onVPress} />;
    if (item.type === 'article') return <ArticleCard item={item} />;
    if (item.type === 'drop') return <DropCard item={item} onPress={onDPress}  />;
  };
  if (error.isError) return <ErrorMessage message={error.message} ></ErrorMessage>;
  if (isLoading) return <LoadingIndicator />;
  return (
    // <Screen style={$root} preset="scroll">
      <FlatList
        data={feeds}
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

const $root: ViewStyle = {
  flex: 1,
}
