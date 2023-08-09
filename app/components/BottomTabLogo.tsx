import * as React from "react"
import { StyleProp, View, ViewStyle, Image, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"

export interface BottomTabLogoProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  isFocused?: boolean
}

/**
 * Describe your component here
 */
export const BottomTabLogo = observer(function BottomTabLogo(props: BottomTabLogoProps) {
  const { style, isFocused } = props
  const $styles = [style]

  return (
    <View style={$styles}>
      {isFocused && <View style={$focusedStyle} />}
      <Image
        style={[!isFocused && $focusedOpacity, $imageStyle]}
        source={require("../../assets/icons/Logo-black.png")}
      />
    </View>
  )
})

const $focusedStyle: ViewStyle = {
  position: "absolute",
  backgroundColor: "#B9DAFE",
  opacity: 0.6,
  top: -4,
  left: 0,
  right: 0,
  bottom: -4,
  shadowOpacity: 0.2,
}
const $focusedOpacity: ImageStyle = {
  opacity: 0.4,
}
const $imageStyle: ImageStyle = {
  width: 55,
  height: 25,
}
