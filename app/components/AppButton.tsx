import * as React from "react"
import { Pressable, StyleProp, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import { useCallback } from "react"
import { Button } from "react-native-ui-lib"

export interface AppButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
  onPress?: () => void
  activeOpacity?: number
  borderless?: boolean
  title?: string
  disabled?: boolean
  bigButton?: boolean
}

export const AppButton = observer(function AppButton(props: AppButtonProps) {
  const {
    style,
    children,
    bigButton,
    onPress,
    activeOpacity = 0.3,
    borderless,
    title,
    disabled,
  } = props

  const _style = useCallback(({ pressed }) => [style, { opacity: pressed ? activeOpacity : 1 }], [])

  if (borderless) {
    return (
      <Pressable onPress={onPress} style={_style} disabled={disabled}>
        <Text style={$borderlessButtonText}>{title}</Text>
      </Pressable>
    )
  }
  if (bigButton) {
    return (
      <Button
        labelStyle={$labelStyle}
        backgroundColor={"#333333"}
        label={title}
        onPress={onPress}
        disabled={disabled}
        fullWidth
        style={$buttonStyle}
      />
    )
  }

  return (
    <Pressable onPress={onPress} style={_style}>
      {children}
    </Pressable>
  )
})

const $borderlessButtonText: TextStyle = {
  fontSize: 16,
}

const $buttonStyle: ViewStyle = {
  borderRadius: 10,
  marginTop: 15,
}
const $labelStyle: TextStyle = {
  padding: 8,
  fontFamily: typography.primary.normal,
}
