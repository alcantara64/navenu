import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, RefreshControl, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { ArticleCard, ErrorMessage, LoadingIndicator, Screen, Text, VenueCard } from "../components"
import { DropCard } from "../components/DropCard"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../models"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Cardview: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Cardview" component={CardviewScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const CardviewScreen: FC<StackScreenProps<AppStackScreenProps, "Cardview">> = observer(function CardviewScreen() {
  // Pull in one of our MST stores
   const { feedsStore } = useStores();
   const {error, isLoading, feeds} = feedsStore;


  //  const navigation = useNavigation()
   const renderItem = ({ item }) => {
    if (item.type === 'location') return <VenueCard item={item} onPress={() => {}} />;
    if (item.type === 'article') return <ArticleCard item={item} />;
    if (item.type === 'drop') return <DropCard item={item}  />;
  };
  if (error) return <ErrorMessage message={error.message}></ErrorMessage>;
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
