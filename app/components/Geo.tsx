import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "./Text"
import { useEffect, useState } from "react"

export interface GeoProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const Geo = observer(function Geo(props: GeoProps) {
  const { style } = props
  const $styles = [$container, style]
  const [initialPosition, setInitialPosition] = useState("unknown")
  const [lastPosition, setlastPositionialPosition] = useState("unknown")
  let watchID = null

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = JSON.stringify(position)
        setInitialPosition(initialPosition)
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    )
    watchID = navigator.geolocation.watchPosition((position) => {
      const lastPosition = JSON.stringify(position)
      setlastPositionialPosition(lastPosition)
    })
    return () => {
      navigator.geolocation.clearWatch(watchID)
    }
  }, [])

  return (
    <View style={$styles}>
      <Text style={$text}>Initial position:</Text>

      <Text>{initialPosition}</Text>

      <Text style={$text}>Current position:</Text>

      <Text>{lastPosition}</Text>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  alignItems: "center",
  marginTop: 50,
}

const $text: TextStyle = {
  fontSize: 30,
  color: "red",
}
