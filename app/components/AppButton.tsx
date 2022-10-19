import * as React from "react"
import { Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import { useCallback } from "react"
import { Colors } from "react-native-ui-lib"

export interface AppButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode;
  onPress? : () => void;
  activeOpacity?: number,
  borderless?: boolean,
  title?: string


}


export const AppButton = observer(function AppButton(props: AppButtonProps) {
  const { style, children, onPress, activeOpacity = 0.3, borderless, title } = props;
 

  const _style = useCallback(({ pressed }) => [
    style,
    { opacity: pressed ? activeOpacity : 1 }
  ], []);

  if (borderless) {
    return (
      <Pressable onPress={onPress} style={_style}>
        <Text style={$borderlessButtonText}>{title}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={_style}>
      {children}
    </Pressable>
  )
})

const $borderlessButtonText: TextStyle = {
  fontSize: 16,
  color: Colors.blue
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}
