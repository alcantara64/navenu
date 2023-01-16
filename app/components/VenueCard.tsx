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
import { useNavigation } from "@react-navigation/native"
import { IVenue } from "../interface/venues"

export interface VenueCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  onPress?: (item: any) => void
  item: IVenue,
  isFeed?: boolean
  onBookMark?: (feed: any) => void
  savedFeeds?: Array<IFeed>
}

/**
 * Describe your component here
 */
export const VenueCard = observer(function VenueCard(props: VenueCardProps) {
  const { item, isFeed =true, onBookMark, savedFeeds } = props
  const navigation = useNavigation();

  const onPressVenue  = (venue) =>{
    navigation.navigate('VenueDetailScreen', {
      venue
    })
  } 

  const saveDrop = () => {
    onBookMark(item)
  }

  return (
    <TouchableOpacity
      key={item.id}
      onPress={() => onPressVenue(item)}
      activeOpacity={0.1}
    >
      <FastImage
        source={{ uri: item.image, priority: FastImage.priority.high }}
        imageStyle={$imageBackground}
        resizeMode="cover"
        style={$image}
      >
        <View style={$imageFilter} />

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
const $imageFilter: ViewStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
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
