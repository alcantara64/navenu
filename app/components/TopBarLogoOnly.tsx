import * as React from "react"
import { StyleProp, View, ViewStyle, Image, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"

export interface TopBarLogoOnlyProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const TopBarLogoOnly = observer(function TopBarLogoOnly(props: TopBarLogoOnlyProps) {
  const { style } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
    <View >
      <Image source={require('../../assets/icon-navenu.png')} style={$logo} />
    </View>
  </View>
  )
})

const $container: ViewStyle = {
  height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',

    width: '100%',
}

const $logo: ImageStyle = {
  marginTop: 19,
}
