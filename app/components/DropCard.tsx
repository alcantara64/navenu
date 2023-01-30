import * as React from "react"
import {
  ImageBackground,
  ImageStyle,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"

import { Text } from "./Text"
import { CountdownTimer } from "./CountdownTimer"
import { View } from "react-native-ui-lib"
import { Colors } from "../theme"
import { FontAwesome5 } from "@expo/vector-icons"
import { IFeed } from "../interface/feed"
import { useNavigation } from "@react-navigation/native"
import { getStyleByCategory, isItemInUserList } from '../utils/transform'
import { IUserList } from "../interface/user"

export interface DropCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  item: any
  onBookMark?: (feed: any) => void
  savedFeeds?: Array<IFeed>
  isFeed?: boolean,
  userListData?: IUserList
}

/**
 * Describe your component here
 */
export const DropCard = observer(function DropCard(props: DropCardProps) {
  const { item, onBookMark, isFeed, userListData } = props
  const navigation = useNavigation();


  const saveDrop = () => {
    onBookMark(item)
  }
  const onDropPress = (venue) => {
    navigation.navigate("DropScreen", {
      venue,
    })
  }

  return (
    <TouchableOpacity style={$dropCardContainer} key={item.id} onPress={() => onDropPress(item)} activeOpacity={0.1}>
      <ImageBackground
        source={{ uri: item.image }}
        imageStyle={$imageBackground}
        resizeMode="cover"
        style={$image}
      >
        <View style={$imageFilter} />
        <View paddingL-4 marginT-5>
          <View row style={$cardTextContainer}>
            <View flex-7>
              <Text numberOfLines={2} style={$belowText}>
                {item.name}
              </Text>
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
          </View>
          {item.expiration && (
            <View
              marginL-4
              paddingL-4
              marginT-15
              marginB-8
              row
              style={[$countDownContainer, getStyleByCategory(item.category)]}
            >
              <Text style={$countdownText}>ENDS IN</Text>
              <CountdownTimer time={item.expiration} />
            </View>
          )}
         {item.expired && (<View marginB-8 style={$expiredDroContainer}><Text style={$expiredText}> EXPIRED</Text></View>)}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
})

const $dropCardContainer:ViewStyle = {
  minHeight: 100,
}
const $cardTextContainer: TextStyle = {
  marginHorizontal: 6,
}
const $imageFilter: ViewStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}
const $countdownText: TextStyle = {
  color: "#FFFFFF",
  marginRight: 4,
  fontFamily: "bourtonbasedrop",
}
const $belowText: TextStyle = {
  marginBottom: 0,
  color: "#FFFFFF",
  fontFamily: "bourtonbase",
  textTransform: "uppercase",
  fontSize: 22,
  letterSpacing: 1.76,
}

const $image: ImageStyle = {
  flex: 1,
  width: "100%",
  marginBottom: 5,
  justifyContent: "center",
}
const $imageBackground: ImageStyle = {
  borderRadius: 6,
}
const $countDownContainer: ViewStyle = {
  borderRadius: 5,
  padding: 2,
  display: "flex",
  alignSelf: "flex-start",
  alignItems: 'center',
  justifyContent: 'center'
}
const $expiredDroContainer: ViewStyle = {
  backgroundColor: Colors.ash,
  alignSelf: "flex-start",
  borderRadius: 5,
}

const $expiredText: TextStyle = {
  fontFamily: "bourtonbasedrop",
  color: Colors.white,
  padding: 2,
  letterSpacing: 1.3,
}
