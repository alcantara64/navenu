import * as React from "react"
import {
  ImageBackground,
  ImageStyle,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native"
import { View, Text } from "react-native-ui-lib"
import { observer } from "mobx-react-lite"
import FastImage from "react-native-fast-image"
import { verticalScale } from "../utils/metrics"
import { Colors, typography } from "../theme"
import { IFeed } from "../interface/feed"
import { FontAwesome5 } from "@expo/vector-icons"

export interface VenueCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  onPress: (item: any) => void
  item: { image: string; category: string; name: string; distance: number, id: number, address: string },
  isFeed?: boolean
  onBookMark?: (feed: any) => void
  savedFeeds: Array<IFeed>
}

/**
 * Describe your component here
 */
export const VenueCard = observer(function VenueCard(props: VenueCardProps) {
  const { onPress, item, isFeed =true, onBookMark, savedFeeds } = props

  const saveDrop = () => {
    onBookMark(item)
  }

  return (
    <TouchableOpacity
      key={item.id}
      onPress={() => onPress(item)}
      activeOpacity={0.1}
      //on Press of any selector sending the selector value to
      // setSections function which will expand the Accordion accordingly
    >
      <FastImage
        source={{ uri: item.image, priority: FastImage.priority.high }}
        imageStyle={$imageBackground}
        resizeMode="cover"
        style={$image}
      >
        <View row style={$itemContainer}>
        <View flex-7 marginT-5 style={$cardtext}>
          <Text style={$topText}>{item.name}</Text>
          <Text style={$belowText}>{item.category}</Text>
          <Text style={$address}>{item.address}</Text>
          <Text bottom style={$bottomText}>@ {item.name}</Text>
        </View>
        {isFeed && <View flex-1 right>
              <TouchableOpacity onPress={saveDrop}>
                <FontAwesome5
                  solid={savedFeeds?.some((feed) => feed.id === item.id)}
                  name="bookmark"
                  size={20}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>}
        </View>
      </FastImage>
    </TouchableOpacity>
  )
})

const $cardtext: ViewStyle = {
  alignItems: "baseline",
}
const $address: TextStyle = {
  fontFamily: 'Inter-Regular',
  color: Colors.white,
  fontSize: 10,
  textTransform: 'capitalize',
  marginBottom: 10,
  fontStyle: 'normal'
}
const $itemContainer:ViewStyle ={ 
  marginHorizontal: 6,
}
const $topText: TextStyle = {
  marginBottom: 0,
  color: "#FFFFFF",
  textTransform: "uppercase",
  fontSize: 10,
  lineHeight: 9,
  fontFamily: typography.primary.normal,

}

const $bottomText: TextStyle = {
  marginTop: 0,
  color: "#FFFFFF",
  fontSize: 11,
}

const $image: ImageStyle = {
  flex: 1,
  width: "100%",
  minHeight: verticalScale(110),
  marginBottom: 5,
  justifyContent: "center",
  borderRadius:6,
}
const $belowText: TextStyle = {
  marginBottom: 0,
  color: "#FFFFFF",
  textTransform: "uppercase",
  fontWeight: "bold",

  fontSize: 18,
}
const $imageBackground: ImageStyle = {
  borderRadius: 6,
}
