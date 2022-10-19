import * as React from "react"
import {
  ImageBackground,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons"
import { View, Text, Button } from "react-native-ui-lib"

export interface DropDropDetailCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  data: any
}

/**
 * Describe your component here
 */
export const DropDropDetailCard = observer(function DropDropDetailCard(
  props: DropDropDetailCardProps,
) {
  const { style, data } = props
  const $styles = [$container, style]

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <View style={$styles}>
      <ImageBackground source={{ uri: data.drop.image }} resizeMode="cover" style={$imageTop}>
        <View style={$closeBtn}>
          <TouchableOpacity onPress={goBack} style={$padding10}>
            <FontAwesome5 name="times-circle" size={27} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={$cardTextContainer}>
          <Text style={$cardText}>{data.drop.category}</Text>
          <Text style={$cardBelowText}>{data.drop.name}</Text>
        </View>
        <View style={$functionBtns}>
          <TouchableWithoutFeedback>
            <TouchableOpacity onPress={() => console.log("Button 1")}>
              <FontAwesome5 name="bell" size={27} color="#FFFFFF" />
            </TouchableOpacity>
          </TouchableWithoutFeedback>
          {/*  <FavouriteButton drop={data.drop} /> */}
        </View>
      </ImageBackground>
      <View flex>
        {data.drop.venue_description && <Text>{data.drop.venue_description}</Text>}
        <View style={{ height: 280, paddingTop: 65 }}>
          <View style={{ justifyContent: "space-evenly" }} flex row>
            <FontAwesome5 name="clock" size={50} color="black" />

            <MaterialIcons name="restaurant-menu" size={50} color="black" />
          </View>
          <View style={{ justifyContent: "space-evenly" }} flex row>
            <FontAwesome5 name="map-marked" size={50} color="black" />

            <FontAwesome5 name="calendar-plus" size={50} color="black" />

            <FontAwesome5 name="uber" size={50} color="black" />
          </View>
          <View style={{ justifyContent: "space-evenly" }} flex row>
            <FontAwesome5 br100 name="phone-alt" size={50} color="black" />

            <FontAwesome5 br100 name="share-alt" size={50} color="black" />
          </View>
        </View>
      </View>
      <Button
        fullWidth
        size="large"
        label="CLAIM CODE"
        marginB-20
        color="black"
        backgroundColor="#daa520"
      />
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
}
const $imageTop: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  width: "100%",
  height: 300,
  justifyContent: "flex-end",
}

const $closeBtn: TextStyle = {
  right: 10,
  top: 25,
  position: "absolute",
}
const $padding10: ViewStyle = {
  marginRight: 10,
}
const $cardTextContainer: ViewStyle = {
  alignItems: "baseline",
  marginHorizontal: 6,
}
const $cardText: TextStyle = {
  marginBottom: 0,
  textTransform: "uppercase",
  color: "#FFFFFF",
  fontWeight: "bold",
  textShadowColor: "#000000",
  fontSize: 14,
  textShadowRadius: 1,
  textShadowOffset: { width: 1, height: 1 },
}
const $cardBelowText: TextStyle = {
  textTransform: "uppercase",
  marginBottom: 15,
  color: "#FFFFFF",
  fontWeight: "bold",
  textShadowColor: "#000000",
  fontSize: 18,
  textShadowRadius: 1,
  textShadowOffset: { width: 1, height: 1 },
}
const $functionBtns: TextStyle = {
   right: 10,
    bottom: 25,
    position: 'absolute',
}
