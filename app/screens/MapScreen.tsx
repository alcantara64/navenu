import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { ErrorMessage, Screen, Text } from "../components"
import * as Location from "expo-location"
import MapView, { Marker } from "react-native-maps"

import { useStores } from "../models"
import { mapStyle } from "../theme"
import { Images } from "../theme/images"
import { ISuckMapMarker } from "../components/ISuckMapMarker"
import { useFeeds } from "../hooks"
import { LoaderScreen } from "react-native-ui-lib"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const MapScreen: FC<StackScreenProps<AppStackScreenProps, "Map">> = observer(
  function MapScreen() {
    const {
      feedsStore: { catFilters },
    } = useStores()
    const { isLoading, error, data } = useFeeds(catFilters)
    const [errorMsg, setErrorMsg] = useState("")
    const [lat, setLat] = useState(0)
    const [lon, setLon] = useState(0)

    useEffect(() => {
      ;(async () => {
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== "granted") {
          setErrorMsg(errorMsg)
          return
        }
        const knownLocation = await Location.getLastKnownPositionAsync({})
        setLat(knownLocation.coords?.latitude)
        setLon(knownLocation.coords?.longitude)
      })()
    }, [])
    // Pull in navigation via hook
    // const navigation = useNavigation()
    if (isLoading) return <LoaderScreen />
    if (error || errorMsg) return <ErrorMessage message={" an error occurred"}></ErrorMessage>
    return (
      <MapView
        style={$map}
        //  initialRegion={mapRegion}
        initialRegion={{
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.01,
        }}
        customMapStyle={mapStyle}
      >
        <Marker
          coordinate={{
            longitude: parseFloat(lon as any),
            latitude: parseFloat(lat as any),
          }}
          image={Images.NU}
          title="Navenu Member"
          description="This is where you are"
          key="user1"
        ></Marker>
        {data.pages.flat().map((venue, index) => (
          <ISuckMapMarker key={index} venue={venue} />
        ))}
      </MapView>
    )
  },
)

const $map: ViewStyle = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
}
