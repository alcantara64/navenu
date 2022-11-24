import * as React from "react"
import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { IGallery } from "../interface/venues"
import Carousel from "react-native-reanimated-carousel"
import { View, Text, Image } from "react-native-ui-lib"

export interface GalleryProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  items: Array<IGallery>

}

/**
 * Describe your component here
 */
export const Gallery = observer(function Gallery(props: GalleryProps) {
  const { style, items } = props
  const $styles = [$container, style]

  return (
    <View>
      <View marginB-5 marginT-10>
        <Text sectionHeader>Gallery</Text>
      </View>
    <Carousel<IGallery>
    width={40}
    style={$styles}
    data={items}
    renderItem={({ item }) => {
      return <Image source={{uri: item.image}} />
    }}
  />
  </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

