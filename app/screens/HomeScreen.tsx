import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen } from "../components"
import { useStores } from "../models"
import { useNavigation } from "@react-navigation/native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Home: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Home" component={HomeScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const HomeScreen: FC<StackScreenProps<AppStackScreenProps, "Home">> = observer(function HomeScreen() {

 const { feedsStore } = useStores();
//  const {data} = feedsStore;

 const navigation = useNavigation();
//  const { data, error, isLoading, refetch, fetchNextPage } = feedsStore;
//  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

//  const onVPress = (venue) => {
//    navigation.navigate('VenueDetailScreen', {
//      venue,
//    });
//  };
//  const onDPress = (venue) => {
//    navigation.navigate('DropScreen', {
//      venue,
//    });
//  };
  // const navigation = useNavigation()
  // const renderItem = ({ item }) => {
  //   if (item.type === 'location') return <VenueCard item={item} onPress={onVPress} />;
  //   if (item.type === 'article') return <ArticleCard item={item} />;
  //   if (item.type === 'drop') return <DropCard item={item} onPress={onDPress} />;
  // };
  // if (error) return <ErrorMessage message={error.message}></ErrorMessage>;
  // if (isLoading) return <LoadingIndicator />;
  return (
    <Screen style={root} preset="scroll">
    <View style={$container}>
      {/* <FlatList
        data={data?.feed}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        progressViewOffset={18}
        onEndReached={() => fetchNextPage()}
        //     ListFooterComponent={isFetchingNextPage ? <LoadingIndicator /> : null}
        refreshControl={
          <RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />
        }
      /> */}
    </View>
    </Screen>
  )
})
const root :ViewStyle ={

}
const $container: ViewStyle = {
  flexDirection: 'column',
  flex: 1,
  backgroundColor: '#FFFFFF',

}
