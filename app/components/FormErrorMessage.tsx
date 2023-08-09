import * as React from "react"
import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"

import { Text } from "./Text"
import { Colors } from "../theme"

export interface FormErrorMessageProps {
  style?: StyleProp<ViewStyle>
  error?: string
  visible?: boolean
}

/**
 * Describe your component here
 */
export const FormErrorMessage = observer(function FormErrorMessage(props: FormErrorMessageProps) {
  const { error, visible } = props
  if (!error || !visible) {
    return null
  }

  return <Text style={$errorText}>{error}</Text>
})

const $errorText: TextStyle = {
  marginLeft: 15,
  color: Colors.red,
  fontSize: 16,
  marginVertical: 8,
  fontWeight: "600",
}
