import * as React from "react"
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"

import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export interface MapButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const MapButton = observer(function MapButton(props: MapButtonProps) {
  const { style } = props
  const $styles = [$container, style]
  const navigation = useNavigation();

  return (
    <TouchableOpacity
    style={$styles}
    onPress={() => navigation.navigate("MapScreen")}
  >
    <FontAwesome5 name="map" size={27} color="#000000" />
  </TouchableOpacity>
  )
})

const $container: ViewStyle = {
  width: 50,
  height: 50,
}
