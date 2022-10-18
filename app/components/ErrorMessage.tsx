import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"

export interface ErrorMessageProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  message:string
}

/**
 * Describe your component here
 */
export const ErrorMessage = observer(function ErrorMessage(props: ErrorMessageProps) {
  const { style, message } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <Text>{message}</Text>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}


