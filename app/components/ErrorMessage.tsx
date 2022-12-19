import * as React from "react"
import { StyleProp, ViewStyle, Image, TextStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { View } from "react-native-ui-lib"
import { Text } from '../components/Text';


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
  const { style } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <Image source={require('../../assets/Logo-white.png')} />
      <Text size="xl" style={$errorTitle}>{'Ops! something went wrong!'}</Text>
      <Text size="xxs" style={$errorSubtitle}>WE'RE LOOKING INTO</Text>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $errorTitle: TextStyle = {
  width: 200,
  lineHeight: 35,
  textAlign: 'center',
  marginTop: 23,
}

const $errorSubtitle = {
  marginTop: 21, 
  fontFamily: 'Inter-Regular',
}

