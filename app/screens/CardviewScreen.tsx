import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { ArticleCard, ErrorMessage, LoadingIndicator, Screen, VenueCard } from "../components"
import { DropCard } from "../components/DropCard"
import { useStores } from "../models"
import { useNavigation } from "@react-navigation/native"

export const CardviewScreen: FC<StackScreenProps<AppStackScreenProps, "Cardview">> = observer(function CardviewScreen() {
  // Pull in one of our MST stores
  const navigation = useNavigation();
   const { feedsStore } = useStores();
   const {error, isLoading, feeds, getFeeds} = feedsStore;
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
    if (item.type === 'drop') return <DropCard item={item} onDPress={onDPress}  />;
  };
  if (error) return <ErrorMessage message={error.message} ></ErrorMessage>;
  if (isLoading) return <LoadingIndicator />;
  return (
    <Screen style={$root} preset="scroll">
      <FlatList
        data={feeds}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        progressViewOffset={18}
       // onEndReached={() => ()}
        //     ListFooterComponent={isFetchingNextPage ? <LoadingIndicator /> : null}
        // refreshControl={
        //   <RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />
        // }
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
