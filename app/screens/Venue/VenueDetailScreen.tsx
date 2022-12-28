import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../../navigators"
import { 
  ErrorMessage, 
  Gallery, 
  LoadingIndicator, 
  NearByVenues, 
  Screen, 
} from "../../components"
import { VenueDetailCard } from "./components/VenueDetailCard"
import { View } from "react-native-ui-lib"
import { useVenue } from "../../hooks/useVenue"
import { useStores } from "../../models"

// @ts-ignore
export const VenueDetailScreen: FC<StackScreenProps<AppStackScreenProps, "VenueDetail">> = observer(function VenueDetailScreen({route}) {
  // Pull in one of our MST stores
  const { authenticationStore } = useStores()
  const venueId = route.params.venue.id;
  const { data, error, isLoading } = useVenue(venueId);
  const [destinationDirections, setDestinationDirections] = useState<any>(null)
  const [latitude, setLatitude] = useState(authenticationStore.latitude)
  const [longitude, setLongitude] = useState(authenticationStore.longitude)

  if (error) return <ErrorMessage message={'Error occurred'}></ErrorMessage>;
  if (isLoading) return <LoadingIndicator />;

  const createUberUrl = (
    pickupLatitude: number, 
    pickupLongitude: number, 
    pickupNickname: string, 
    dropoffLatitude: number, 
    dropoffLongitude: number, 
    dropoffNickname: string
  ) => {
    return `uber://?action=setPickup&pickup[latitude]=${pickupLatitude}&pickup[longitude]=${pickupLongitude}&pickup[nickname]=${pickupNickname}&dropoff[latitude]=${dropoffLatitude}&dropoff[longitude]=${dropoffLongitude}&dropoff[nickname]=${dropoffNickname}`;
  };


  return (
    <Screen style={$root} preset="auto">
      <View style={$container}>
        <VenueDetailCard 
          venue={data} 
          setDestinationDirections={setDestinationDirections} 
          createUberUrl={() => createUberUrl(latitude, longitude, 'Current Location', data.lat, data.lng, data.name)}
        />
        {data?.images?.length > 0 && <Gallery items={data.images} />}
        {data?.nearby && latitude && longitude ? (
          <NearByVenues 
            venues={data?.nearby} 
            destinationDirections={{
              origin: {
                latitude,
                longitude
              },
              destination: destinationDirections
            }}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />
        ) : null}
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
const $container:ViewStyle =  {
  flex: 1,
  height: "100%",
  backgroundColor: "#F2F2F2",
};