import * as React from "react"
import { OpaqueColorValue, StyleProp, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface MIconProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  name: any
  size: number
  color?: string | OpaqueColorValue;
}

/**
 * Describe your component here
 */
export const MIcon = observer(function MIcon(props: MIconProps) {
  const { style, name, size, color } = props


  return (
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={color}
      style={style}
    />
  );
})

