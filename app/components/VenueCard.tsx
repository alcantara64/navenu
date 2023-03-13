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
import { calculatePreciseDistance, verticalScale } from "../utils/metrics"
import { Colors, typography } from "../theme"
import { IFeed } from "../interface/feed"
import { FontAwesome5 } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { IVenue } from "../interface/venues"
import { isItemInUserList } from "../utils/transform"
import { IUserList } from "../interface/user"

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
  userListData?:IUserList
  onRemoveFromUserList?: (feed:any) => void
  isUserList?:boolean;
  currentUserLatitude: number;
  currentUserLongitude: number;
  hideRemove?: boolean;

}

/**
 * Describe your component here
 */
export const VenueCard = observer(function VenueCard(props: VenueCardProps) {
  const { item, isFeed =true, onBookMark, userListData, onRemoveFromUserList, isUserList, currentUserLatitude, currentUserLongitude, hideRemove } = props
  const navigation = useNavigation();

  const onPressVenue  = (venue) =>{
    navigation.navigate('VenueDetailScreen', {
      venue
    })
  } 

  const saveDrop = () => {
    onBookMark(item)
  }
  const removeFromUserList = () => {
    onRemoveFromUserList(item)

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
          <Text style={$topText}>{item.category}</Text>
          <Text style={$belowText}>{item.name}</Text>
          <Text style={$address}>{item.address}</Text>
          <Text bottom style={$bottomText}>@ {item.name}</Text>
       { (item.lat && item.lng && currentUserLatitude && currentUserLongitude) && <Text white>{calculatePreciseDistance({firstCoordinateLatitude: item.lat, firstCoordinateLongitude: item.lng, secondCoordinateLatitude: currentUserLatitude,secondCoordinateLongitude: currentUserLongitude })} km away </Text>}
        </View>
        {isFeed && <View flex-1 right>
              <TouchableOpacity onPress={saveDrop}>
                <FontAwesome5
                  solid={isItemInUserList(item.id, userListData)}
                  name="bookmark"
                  size={20}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>}
            {isUserList && !isFeed && !hideRemove && <View flex-1 right>
              <TouchableOpacity onPress={removeFromUserList}>
                <FontAwesome5
                  solid
                  name="times-circle"
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
