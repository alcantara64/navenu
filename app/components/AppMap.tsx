import * as React from "react"
import { Dimensions, StyleProp, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { mapStyle } from "../theme"
import { useEffect } from "react"
import * as Location from "expo-location"
import MapView, { Marker } from "react-native-maps"
import { IVenue } from "../interface/venues"
import { IDrop } from "../interface/drops"
import { Images } from "../theme/images"
import { ISuckMapMarker } from "./ISuckMapMarker"
import { View } from "react-native-ui-lib"
import { BottomSheet } from "./BottomSheet"
import { VenueCard } from "./VenueCard"
import { useNavigation } from "@react-navigation/native"

export interface AppMapProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  onSetErrorMessage?: (value:string) =>void,
  onSetLatitude:  (value:number) =>void
  onSetLongitude:  (value:number) =>void
  latitude: number
  longitude: number,
  item: Array<IVenue> | Array<IDrop>
  showBottomSheet?: boolean
  
}

/**
 * Describe your component here
 */
export const AppMap = observer(function AppMap(props: AppMapProps) {
  const { style, latitude, longitude, onSetErrorMessage, onSetLatitude, onSetLongitude, item, showBottomSheet } = props
  const $styles = [$container, style];
const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const { status, } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        onSetErrorMessage('Please turn up location pn your device')
        return
      }
      const knownLocation = await Location.getLastKnownPositionAsync({})
      onSetLatitude(knownLocation.coords?.latitude)
      onSetLongitude(knownLocation.coords?.longitude)
    })()
  }, [])

const onPressVenue  = (venue) =>{
  navigation.navigate('VenueDetailScreen', {
    venue
  })
} 

  return (
    <>
    <MapView
      style={$styles}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.01,
      }}
      customMapStyle={mapStyle}
    >
      <Marker
        coordinate={{
          longitude,
          latitude,
        }}
        image={Images.NU}
        title="Navenu Member"
        description="This is where you are"
        key="user1"
      ></Marker>
      {item.map((venue, index) => (
        <ISuckMapMarker key={index} venue={venue} />
      ))}
    </MapView>
    {showBottomSheet && (<BottomSheet show={showBottomSheet}>
      {item.map((feed) => (
        <VenueCard key={feed.id} item={feed} isFeed={false} onPress={onPressVenue} />
      ))}
      
    </BottomSheet>)}
    </>
  )
})

const $container: ViewStyle = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
}
