import * as React from "react"
import { StyleProp, ViewStyle, Image, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"

export interface TitleLogoProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const TitleLogo = observer(function TitleLogo(props: TitleLogoProps) {
  const { style } = props
  const $styles = [$container, style]
  console.log($styles);

  return <Image source={require('../../assets/navenu-logo.png')} style={$container} />;
})

const $container: ImageStyle = {
  width: 106,
  height: 13,
}
