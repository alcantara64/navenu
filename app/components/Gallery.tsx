import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import { IGallery } from "../interface/venues"
import Carousel from "react-native-reanimated-carousel"

export interface GalleryProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  items: IGallery

}

/**
 * Describe your component here
 */
export const Gallery = observer(function Gallery(props: GalleryProps) {
  const { style } = props
  const $styles = [$container, style]

  return (
    <Carousel<{ color: string }>
    width={40}
    data={[{ color: "red" }, { color: "purple" }, { color: "yellow" }]}
    renderItem={({ color }) => {
      return <View style={{ backgroundColor: color, flex: 1 }} />
    }}
  />
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}
