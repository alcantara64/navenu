import * as React from "react"
import { StyleProp, ViewStyle, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { View, Text } from "react-native-ui-lib"


export interface ErrorMessageProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  message?:string
}

/**
 * Describe your component here
 */
export const ErrorMessage = observer(function ErrorMessage(props: ErrorMessageProps) {
  const { style, message } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <Image source={require('../../assets/Logo-white.png')} />
      <Text text70red>{message || 'Ops! something went wrong!' }</Text>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}


