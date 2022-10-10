import * as React from "react"
import { StyleProp, TextStyle, ViewStyle, Image, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"

export interface NavenuButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ImageStyle>
}

/**
 * Describe your component here
 */
export const NavenuButton = observer(function NavenuButton(props: NavenuButtonProps) {
  const { style } = props
  const $styles = [$container, style]

  return (
    <Image source={require("../../assets/icon.png")} style={$styles} />
  );
});

const $container: ImageStyle = {
  width: 50,
  height: 50,
}
