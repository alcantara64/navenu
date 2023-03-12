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
  const PAGE_WIDTH =Dimensions.get("screen").width;
  return (
    <View >
    <Carousel<IGallery>
    width={Dimensions.get('screen').width}
    height={250}
    scrollAnimationDuration={300}
    autoPlayInterval={1900}
    style={$styles}
    loop
    autoPlay
    data={items}
    renderItem={({ item }) => {
      return  <View
      style={{
          flex: 1,
          borderWidth: 2,
          justifyContent: 'center',
      }}
  ><Image height={250} width={PAGE_WIDTH*.99} source={{uri: item.image}} /></View>
    }}
  />
  </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

