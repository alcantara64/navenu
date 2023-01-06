import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { ErrorMessage, LoadingIndicator, NearByVenues, Screen, } from "../components"
import { View } from "react-native-ui-lib"
import { useVenue } from "../hooks/useVenue"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `VenueDetail: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="VenueDetail" component={VenueDetailScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const VenueDetailScreen: FC<StackScreenProps<AppStackScreenProps, "VenueDetail">> = observer(function VenueDetailScreen({route}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const venueId = route.params.venue.id;
  const { data, error, isLoading } = useVenue(venueId);

  if (error) return <ErrorMessage message={'Error occurred'}></ErrorMessage>;
  if (isLoading) return <LoadingIndicator />;
  return (
    <Screen style={$root} preset="auto">
        <View style={$container}>
      
        <NearByVenues venues={data?.nearby} />
  
    </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
const $container:ViewStyle =  {
  flex: 1,
  backgroundColor: "#F2F2F2",
};