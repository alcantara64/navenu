import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
export type IfComponent = JSX.Element | React.FC<any>
export interface IfProps {
  /**
   * An optional style override useful for padding & margin.
   */
  _: boolean
  _then: IfComponent
  _else: IfComponent
}

/**
 * Describe your component here
 */
export const If = observer(function If(props: IfProps) {
  const { _, _else, _then } = props

  return _
    ? typeof _then === "function"
      ? _then({})
      : _then
    : typeof _else === "function"
    ? _else({})
    : _else ?? null
})
