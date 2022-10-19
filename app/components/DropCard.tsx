import * as React from "react"
import {
  ImageBackground,
  ImageStyle,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import { CountdownTimer } from "./CountdownTimer"

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
  const { onPress, item } = props


  return (
    <TouchableOpacity
      key={item.id}
      onPress={() => onPress(item)}
      activeOpacity={0.1}
      //on Press of any selector sending the selector value to
      // setSections function which will expand the Accordion accordingly
    >
      <ImageBackground source={{ uri: item.image }} resizeMode="cover" style={$image}>
        <View style={$cardText}>
          <Text style={$aboveText}>{item.owner}</Text>
          <Text
            style={$belowText}
          >
            {item.name}
          </Text>

          <CountdownTimer time={item.expiration} />
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
