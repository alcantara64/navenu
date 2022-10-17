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
   const {error, isLoading, getFeeds} = feedsStore;
   const feeds =[ {
    type: "location",
    id: "3753",
    lat: 51.51181470000000000000,
    lng: -0.11869520000000000000,
    image: "https:\/\/media.navenu.com\/media\/venues\/74ecdf4cd3a0043869ba634aee9931bb.jpg",
    phone: "020 3499 8651",
    name: "ME London",
    parent_category: "Hotel",
    category: "STAY",
    distance: '0.14'
},
{
    type: "location",
    id: "3766",
    lat: 51.51212240000000000000,
    lng: -0.11863750000000000000,
    image: "https:\/\/media.navenu.com\/media\/venues\/f74fa73843de0278183ce55e9061f14a.jpg",
    phone: "020 7379 6606",
    name: "Radio Rooftop Bar",
    parent_category: "Cocktails",
    category: "DRINK",
    distance: '0.16'
}]
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
  //if (error) return <ErrorMessage message={error.message} ></ErrorMessage>;
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
