import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { View, Text } from "react-native-ui-lib"

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
      <Text text70red>{message}</Text>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}


