import * as React from "react"
import { ImageBackground, StyleProp, TextStyle, ViewStyle, Image, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, Text, View } from "react-native-ui-lib"
import {
  FontAwesome5,
  MaterialIcons,
  Ionicons,
  AntDesign,
  SimpleLineIcons,
} from "@expo/vector-icons"
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
  const $lineDivider = [$horizontalLine, $bigDivider]
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
        </View>
      </ImageBackground>
      <View style={$contentContainer}>
        <View flex padding-15 style={$venueContent}>
          <View marginT-5 padding-15>
            <Text text60>HEADLINE</Text>
            <Text marginT-15>{venue.long_description}</Text>

            <Text style={$linkUrl} marginT-15>
              VISIT SITE
            </Text>
          </View>
          <View row style={$lineDivider}></View>
          <View style={$boxWrapper} row>
            <TouchableOpacity>
              <View padding-20 style={$boxContainer}>
                <Ionicons name="call-outline" size={24} color="white" />
              </View>
              <Text center marginT-8>
                {" "}
                CALL
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <View padding-20 style={$boxContainer}>
                <AntDesign name="clockcircleo" size={24} color="white" />
              </View>
              <Text center marginT-8>
                {" "}
                HOUR
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <View padding-20 style={$boxContainer}>
                <SimpleLineIcons name="book-open" size={24} color="white" />
              </View>
              <Text center marginT-8>
                {" "}
                MENU
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <View padding-20 style={$boxContainer}>
                <AntDesign name="calendar" size={24} color="white" />
              </View>
              <Text center marginT-8>
                {" "}
                BOOK
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <View padding-20 style={$boxContainer}>
                <FontAwesome5 name="map-marker-alt" size={26} color="white" />
              </View>
              <Text center marginT-8>
                {" "}
                MAP
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <View padding-20 style={$boxContainer}>
                <FontAwesome5 name="taxi" size={24} color="white" />
              </View>
              <Text center marginT-8>
                RIDE
              </Text>
            </TouchableOpacity>
          </View>
          <View marginT-20 row>
            <View row flex-4>
              <View style={{ ...$imageContainer }}>
                <Image style={$roundedImage} source={{ uri: venue.image }} />
              </View>
              <View style={{ ...$imageContainer, left: -40 }}>
                <Image style={$roundedImage} source={{ uri: venue.image }} />
              </View>
              <View style={{ ...$imageContainer, left: -80 }}>
                <Image style={$roundedImage} source={{ uri: venue.image }} />
              </View>
            </View>
            <View flex-4 center row>
              <Text text20 > + 13</Text>
              <View marginL-5>
                <Text>CURATORS</Text>
                <Text>MENTIONED</Text>
                <Text>THIS VENUE</Text>
              </View>
            </View>
          </View>
          {/* <View> no drops from endpoint
            <Text>Drops</Text>
            <View>

            </View>
          </View> */}
        </View>
      </View>
    </>
  )
})

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
  padding: 15,
}
const $linkUrl: TextStyle = {
  color: Colors.orange,
  textDecorationColor: Colors.orange,
  textDecorationLine: "underline",
}
const $bigDivider: ViewStyle = {
  borderColor: "#909090",
  width: "95%",
}
const $boxContainer: ViewStyle = {
  backgroundColor: Colors.ash,
  borderRadius: 15,
  marginRight: 5,
}
const $boxWrapper: ViewStyle = {
  justifyContent: "flex-start",
  flexWrap: "wrap",
}
const $roundedImage: ImageStyle = {
  height: 70,
  width: 70,
  borderRadius: 35,
}
const $imageContainer: ViewStyle = {
  borderRadius: 40,
  borderWidth: 1,
  borderColor: Colors.orange,
  position: "relative",
}
