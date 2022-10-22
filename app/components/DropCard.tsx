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

export interface DropCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  item: any
  onPress: (venue: any) => void
}

/**
 * Describe your component here
 */
export const DropCard = observer(function DropCard(props: DropCardProps) {
  const { onPress, item, style } = props
  return (
    <TouchableOpacity
      key={item.id}
      onPress={() => onPress(item)}
      activeOpacity={0.1}

      //on Press of any selector sending the selector value to
      // setSections function which will expand the Accordion accordingly
    >
      <ImageBackground
        source={{ uri: item.image }}
        imageStyle={$imageBackground}
        resizeMode="cover"
        style={$image}
      >
        <View padding-4>
          <View style={$cardText}>
            <Text style={$belowText}>{item.name}</Text>
            <Text style={$aboveText}>{item.owner}</Text>
          </View>
          {item.expiration && (
            <View marginL-4 row style={$countDownContainer}>
              <Text style={$countdownText}>ENDS IN</Text>
               <CountdownTimer time={item.expiration} />
            </View>
          )}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
})

const $cardText: TextStyle = {
  alignItems: "baseline",
  marginHorizontal: 6,
}
const $aboveText: TextStyle = {
  marginBottom: 0,
  color: "#FFFFFF",

  fontSize: 12,
}
const $countdownText: TextStyle = {
  marginBottom: 0,
  color: "#FFFFFF",
  fontWeight: "bold",
  marginRight: 4,

  fontSize: 16,
}
const $belowText: TextStyle = {
  marginBottom: 0,
  color: "#FFFFFF",
  fontWeight: "bold",

  fontSize: 18,
}

const $image: ImageStyle = {
  flex: 1,
  width: "100%",
  height: 125,
  marginBottom: 5,
  justifyContent: "center",
}
const $imageBackground: ImageStyle = {
  borderRadius: 6,
}
const $countDownContainer: ViewStyle = {
  backgroundColor: Colors.orange,
  width: "50%",
  borderRadius: 5,
  padding: 5,
}
