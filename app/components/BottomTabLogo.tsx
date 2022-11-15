import * as React from "react"
import { StyleProp, View, ViewStyle, Image } from "react-native"
import { observer } from "mobx-react-lite"


export interface BottomTabLogoProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const BottomTabLogo = observer(function BottomTabLogo(props: BottomTabLogoProps) {
  const { style } = props
  const $styles = [style]

  return (
    <View style={$styles}>
     <Image source={require('../../assets/icons/bottom-menu.png')} />
    </View>
  )
})

