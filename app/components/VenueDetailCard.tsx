import * as React from "react"
import {
  ImageBackground,
  StyleProp,
  TextStyle,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, Text, View, TabController } from "react-native-ui-lib"
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons"
import { IVenue } from "../interface/venues"
import { useNavigation } from "@react-navigation/native"
import { Colors } from "../theme"

export interface VenueDetailCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  venue: IVenue
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const VenueDetailCard = observer(function VenueDetailCard(props: VenueDetailCardProps) {
  const { venue } = props
  const navigation = useNavigation()
  const goBack = () => {
    navigation.goBack()
  }
  return (
    <>
      <ImageBackground source={{ uri: venue.image }} resizeMode="cover" style={$imagetop}>
        <View marginT-10 style={$closeBtn}>
          <TouchableOpacity onPress={goBack}>
            <FontAwesome5 solid name="times-circle" size={27} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={$cardtext}>
          <Text text80BL style={$categoryText}>
            {venue.category}
          </Text>
          <Text text60BL white style={$venueNameText}>
            {venue.name}
          </Text>
          <View row style={$horizontalLine}></View>
          <Text text90 white style={$venueNameText}>
            {venue.address}
          </Text>
        </View>
        <View style={$functionBtns}>
          <View flex-1 center spread>
            <TouchableOpacity
              style={{ marginVertical: 15 }}
              onPress={() => console.log("Button 1")}
            >
              <MaterialIcons name="ios-share" size={45} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginVertical: 5 }}>
              <FontAwesome5 name="bookmark" size={40} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          {/*  <FavouriteButton venue={venue.venue} /> */}
        </View>
      </ImageBackground>
      <View style={$contentContainer}>
        <View flex style={$venueContent}>
          <View marginT-20 padding-15>
            <Text text60>HEADLINE</Text>
            <Text marginT-15>{venue.long_description}</Text>

            <Text marginT-15>VISIT SITE</Text>
          </View>
        </View>
      </View>
    </>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $contentCenter: ViewStyle = { justifyContent: "space-evenly" }
const $contentCard: ViewStyle = { marginHorizontal: 8, marginBottom: 8 }

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
const $contactinfo: ViewStyle = {
  flexDirection: "column",
  justifyContent: "center",
}
const $cardtext: TextStyle = {
  alignItems: "baseline",
  marginHorizontal: 6,
  maxWidth: "70%",
  textAlign: "center",
}
const $closeBtn: ViewStyle = {
  right: 10,
  top: 25,
  position: "absolute",
}
const $functionBtns: ViewStyle = {
  right: 10,
  bottom: 10,
  position: "absolute",
}
const $imagetop: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  width: "100%",
  height: 300,
  justifyContent: "flex-end",
}
const $image: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  width: "100%",
  height: 75,
  justifyContent: "flex-end",
}
const $categoryText: TextStyle = {
  marginBottom: 0,
  color: "#FFFFFF",
  textTransform: "uppercase",
}
const $venueNameText: TextStyle = {
  marginBottom: 15,
  textTransform: "uppercase",
}
const $horizontalLine: ViewStyle = {
  borderWidth: 1,
  borderColor: Colors.white,
  margin: 5,
  width: "10%",
}
const $contentContainer: ViewStyle = {
  borderColor: Colors.orange,
  borderStyle: "solid",
  borderTopWidth: 10,
  borderTopRightRadius: 10,
  borderTopLeftRadius: 10,
  backgroundColor: Colors.orange,
  position: "relative",
  top: -7,
}
const $venueContent: ViewStyle = {
  borderTopRightRadius: 15,
  backgroundColor: "#F2F2F2",
  borderTopLeftRadius: 15,
}
