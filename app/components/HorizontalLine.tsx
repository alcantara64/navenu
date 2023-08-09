import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Colors } from "../theme"
import { View } from "react-native-ui-lib"

export interface HorizontalLineProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  color?: "white" | "black"
}

/**
 * Describe your component here
 */
export const HorizontalLine = observer(function HorizontalLine(props: HorizontalLineProps) {
  const { style, color } = props
  const $styles = [
    $horizontalLine,
    style,
    { borderColor: color === "black" ? Colors.black : Colors.white },
  ]

  return <View row style={$styles}></View>
})

const $horizontalLine: ViewStyle = {
  borderWidth: 1,
  margin: 5,
}
