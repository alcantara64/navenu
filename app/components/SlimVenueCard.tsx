import * as React from "react"
import { ImageBackground, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { useNavigation } from "@react-navigation/native"
import { Card, TouchableOpacity, Text } from "react-native-ui-lib"
import { IVenue } from "../interface/venues"

export interface SlimVenueCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  venue: IVenue
}

/**
 * Describe your component here
 */
export const SlimVenueCard = observer(function SlimVenueCard(props: SlimVenueCardProps) {
  const { style, venue } = props
  const $styles = [$container, style]
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      key={venue.id}
      onPress={() => navigation.navigate("VenueDetailScreen", { venue })}
      activeOpacity={0.9}
    >
      <Card key={venue.id} style={$card}>
        <ImageBackground source={{ uri: venue.image }} resizeMode="cover" style={$image}>
          <View style={$overlay}></View>
          <View style={$cardtext}>
            <Text
              white
              text90
              style={{
                marginBottom: 0,
                textTransform: "uppercase",
              }}
            >
              {venue.category}
            </Text>
            <Text
              white
              text60
              style={{
                marginBottom: 0,
                textTransform: "uppercase",
              }}
            >
              {venue.name}
            </Text>
            <Text white text100T>
              {venue.distance} km away
            </Text>
          </View>
        </ImageBackground>
      </Card>
    </TouchableOpacity>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $cardtext: TextStyle = {
  alignItems: "baseline",
  marginHorizontal: 6,
}
const $card: ViewStyle = {
  height: 75,
  marginBottom: 4,
  width: "100%",
}
const $overlay: ViewStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: "black",
  opacity: 0.5,
}

const $image: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  width: "100%",
  height: 75,
  justifyContent: "flex-end",
}
