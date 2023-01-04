import * as React from "react"
import { Dimensions, StyleProp, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { IGallery } from "../interface/venues"
import Carousel from "react-native-reanimated-carousel"
import { View, Image } from "react-native-ui-lib"

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
    <View >
    <Carousel<IGallery>
    width={Dimensions.get('screen').width}
    height={150}
    style={$styles}
    loop
    autoPlay
    data={items}
    renderItem={({ item }) => {
      return <Image height={200} source={{uri: item.image}} />
    }}
  />
  </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

