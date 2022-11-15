import * as React from "react"
import { Dimensions, StyleProp, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { mapStyle } from "../theme"
import { useEffect, useState } from "react"
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
import { FEED_TYPE } from "../interface/feed"
import { DropCard } from "./DropCard"

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
  const { style, latitude, longitude, onSetErrorMessage, onSetLatitude, onSetLongitude, item, } = props
  const $styles = [$container, style];
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const [currentFeed, setCurrentFeed ] = useState<IDrop | IVenue | null>(null)

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


const handleBottomSheetClose = () => {
  setShowBottomSheet(false)
}
const handleMarkerPressed = (feed:IDrop | IVenue) => {
   setCurrentFeed(feed)
   setShowBottomSheet(true);
}

  return (
    <>
    <MapView
      style={$styles}
      initialRegion={{
        latitude:51.507351,
        longitude: -0.127758,
        latitudeDelta: 0,
        longitudeDelta: -0,
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
        <ISuckMapMarker onMarkerPressed={handleMarkerPressed} key={index} venue={venue} />
      ))}
    </MapView>
    {showBottomSheet && (<BottomSheet show={showBottomSheet} onClose={handleBottomSheetClose}>
        
        {currentFeed?.type === FEED_TYPE.location && (<VenueCard item={currentFeed}   />)}
        {currentFeed?.type === FEED_TYPE.drop && (<DropCard item={currentFeed} isFeed  />)}
  
      
    </BottomSheet>)}
    </>
  )
})

const $container: ViewStyle = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
}
