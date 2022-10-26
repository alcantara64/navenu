import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Colors } from "../theme"

import { View } from "react-native-ui-lib"
import { Avatar } from "react-native-ui-lib/src/components/avatar"

export interface ProfileButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const ProfileButton = observer(function ProfileButton(props: ProfileButtonProps) {
  const { style } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
     <Avatar label="EA"  size={40}  labelColor={Colors.white} backgroundColor={Colors.orange}/>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

