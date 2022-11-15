import * as React from "react"
import { ImageBackground, StyleProp, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { View, Text } from "react-native-ui-lib"
import { useEffect, useState } from "react"
import * as Location from "expo-location"
import { CategoryFilterBar } from "./CategoryFilterBar"
import { Card } from "react-native-paper"
import MapView, { Marker } from "react-native-maps"
import { useNavigation } from "@react-navigation/native"
const MapMarker = require("../../assets/icons/nu.png")

export interface MapProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  venues
  lat
  lng
}

/**
 * Describe your component here
 */
export const Map = observer(function Map(props: MapProps) {
  const { style, venues, lat, lng } = props
  const $styles = [$container, style]
  const navigation = useNavigation()

  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  useEffect(() => {
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied")
        return
      }

      const location = await Location.getCurrentPositionAsync({})
      setLocation(location)
    })()
  }, [])

  let text = "Waiting.."
  if (errorMsg) {
    text = errorMsg
  } else if (location) {
    text = JSON.stringify(location)
  }
  // console.log(text);
  const mapStyle = [
    { featureType: "all", elementType: "geometry.fill", stylers: [{ weight: "2.00" }] },
    { featureType: "all", elementType: "geometry.stroke", stylers: [{ color: "#9c9c9c" }] },
    { featureType: "all", elementType: "labels.text", stylers: [{ visibility: "on" }] },
    { featureType: "landscape", elementType: "all", stylers: [{ color: "#f2f2f2" }] },
    { featureType: "landscape", elementType: "geometry.fill", stylers: [{ color: "#ffffff" }] },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.fill",
      stylers: [{ color: "#ffffff" }],
    },
    { featureType: "poi", elementType: "all", stylers: [{ visibility: "off" }] },
    { featureType: "road", elementType: "all", stylers: [{ saturation: -100 }, { lightness: 45 }] },
    { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#eeeeee" }] },
    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#7b7b7b" }] },
    { featureType: "road", elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
    { featureType: "road.highway", elementType: "all", stylers: [{ visibility: "simplified" }] },
    { featureType: "road.arterial", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { featureType: "transit", elementType: "all", stylers: [{ visibility: "off" }] },
    {
      featureType: "water",
      elementType: "all",
      stylers: [{ color: "#46bcec" }, { visibility: "on" }],
    },
    { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#c8d7d4" }] },
    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#070707" }] },
    { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
  ]

  return (
    <View style={$styles}>
      <CategoryFilterBar />
      <MapView
        style={$mapView}
        initialRegion={{
          latitude: parseFloat(lat),
          longitude: parseFloat(lng),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        // region={smallMapRegion}
        customMapStyle={mapStyle}
      >
        {venues.venues.map((venue) => {
          const lat1 = parseFloat(venue.lat)
          const lng1 = parseFloat(venue.lng)
          return (
            <Marker
              key={venue.id}
              coordinate={{ latitude: lat1, longitude: lng1 }}
              image={MapMarker}
            />
          )
        })}
      </MapView>
      <View flex>
        <Text>{text}</Text>
      </View>
      <View flex>
        {venues.venues.map((venue) => (
          <TouchableOpacity
            key={venue.id}
            onPress={() => navigation.push("VenueDetailScreen", { venue })}
            activeOpacity={0.9}
            //on Press of any selector sending the selector value to
            // setSections function which will expand the Accordion accordingly
          >
            <Card key={venue.id} style={$card}>
              <ImageBackground source={{ uri: venue.image }} resizeMode="cover" style={$image}>
                <View style={$overlay}></View>
                <View style={$cardtext}>
                  <Text style={$imageText}>{venue.category}</Text>
                  <Text style={$imageTextSec}>{venue.name}</Text>
                  <Text style={$imageTextThird}>{venue.distance} km away</Text>
                </View>
              </ImageBackground>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
})

const $mapView: ViewStyle = {
  alignSelf: "stretch",
  flex: 1,
  minHeight: 350,
  width: "100%",
}
const $container: ViewStyle = {
  flex: 1,
  backgroundColor: "#fff",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
}
const $card: ViewStyle = {
  height: 75,
  marginBottom: 4,
  width: "100%",
}
const $overlay: ViewStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: "black",
  opacity: 0.5,
}
const $cardtext: ViewStyle = {
  alignItems: "baseline",
  marginHorizontal: 6,
}
const $image: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  width: "100%",
  height: 75,
  justifyContent: "flex-end",
}
const $imageText: TextStyle = {
  marginBottom: 0,
  textTransform: "uppercase",
  color: "#FFFFFF",
  fontWeight: "bold",
  textShadowColor: "#000000",
  fontSize: 12,
  textShadowRadius: 2,
  textShadowOffset: { width: 2, height: 2 },
}
const $imageTextSec: TextStyle = {
  marginBottom: 0,
  color: "#FFFFFF",
  textTransform: "uppercase",
  fontWeight: "bold",
  textShadowColor: "#000000",
  fontSize: 16,
  textShadowRadius: 2,
  textShadowOffset: { width: 2, height: 2 },
}
const $imageTextThird: TextStyle = {
  marginBottom: 15,
  color: "#FFFFFF",

  textShadowColor: "#000000",
  fontSize: 11,
  textShadowRadius: 2,
  textShadowOffset: { width: 2, height: 2 },
}
