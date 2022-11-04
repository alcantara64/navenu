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
import { categoryColorType, Colors } from "../theme"
import { FontAwesome5 } from "@expo/vector-icons"
import { IFeed } from "../interface/feed"

export interface DropCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  item: any
  onPress: (venue: any) => void
  onBookMark?: (feed: any) => void
  savedFeeds: Array<IFeed>
  isFeed?: boolean,
}

/**
 * Describe your component here
 */
export const DropCard = observer(function DropCard(props: DropCardProps) {
  const { onPress, item, style, onBookMark, savedFeeds, isFeed } = props

  const getStyleByCategory = (category) => {
    return { backgroundColor: categoryColorType[category] || Colors.orange }
  }

  const saveDrop = () => {
    onBookMark(item)
  }

  return (
    <TouchableOpacity key={item.id} onPress={() => onPress(item)} activeOpacity={0.1}>
      <ImageBackground
        source={{ uri: item.image }}
        imageStyle={$imageBackground}
        resizeMode="cover"
        style={$image}
      >
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
                  solid={savedFeeds?.some((feed) => feed.id === item.id)}
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
              marginB-5
              row
              style={[$countDownContainer, getStyleByCategory(item.category)]}
            >
              <Text style={$countdownText}>ENDS IN</Text>
              <CountdownTimer time={item.expiration} />
            </View>
          )}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
})

const $cardTextContainer: TextStyle = {
  //alignItems: "baseline",
  marginHorizontal: 6,
}
const $countdownText: TextStyle = {
  marginBottom: 0,
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
  height: 100,
  marginBottom: 5,
  justifyContent: "center",
}
const $imageBackground: ImageStyle = {
  borderRadius: 6,
}
const $countDownContainer: ViewStyle = {
  backgroundColor: Colors.orange,
  borderRadius: 5,
  padding: 2,
  display: "flex",
  justifyContent: "flex-start",
  maxWidth: "45%",
}
