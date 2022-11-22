import * as React from "react"
import {
  ImageBackground,
  StyleProp,
  TextStyle,
  ViewStyle,
  ImageStyle,
  Linking,
} from "react-native"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, Text, View, Avatar } from "react-native-ui-lib"
import {
  FontAwesome5,
  MaterialIcons,
  Ionicons,
  AntDesign,
  SimpleLineIcons,
} from "@expo/vector-icons"
import { IVenue } from "../interface/venues"
import { useNavigation } from "@react-navigation/native"
import { Colors, typography } from "../theme"
import { getInitials, getStyleByCategory } from "../utils/transform"
import { openLinkInBrowser } from "../utils/openLinkInBrowser"
import { DropCard } from "./DropCard"

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
  const onCallPhone = () => {
    Linking.openURL(`tel:${venue.phone}`)
  }
  const onLinkPress = () => {
    openLinkInBrowser(venue.website)
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
          <Text text90 white marginB-5 style={$venueNameAddress}>
            {venue.address}
          </Text>
        </View>
        <View style={$functionBtns}>
          <View flex-1 center spread>
            <TouchableOpacity
              style={{ marginVertical: 10 }}
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
      <View style={{...$contentContainer, ...getStyleByCategory(venue.category)}}>
        <View flex padding-15 style={$venueContent}>
          <View marginT-5 padding-8>
            <Text text60>HEADLINE</Text>
            <Text marginT-5 style={$longDescription}>{venue.long_description}</Text>
            <TouchableOpacity onPress={onLinkPress}>
              <Text style={$linkUrl} marginT-15>
                VISIT SITE
              </Text>
            </TouchableOpacity>
          </View>
          <View row style={$lineDivider}></View>
          <View style={$boxWrapper} row marginT-10>
            <TouchableOpacity onPress={onCallPhone}>
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
            {/* <TouchableOpacity>
              <View padding-20 style={$boxContainer}>
                <AntDesign name="calendar" size={24} color="white" />
              </View>
              <Text center marginT-8>
                {" "}
                BOOK
              </Text>
            </TouchableOpacity> */}
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
          {venue.curators && venue.curators.length && (
            <View marginT-20 row>
              <View row flex-2>
                {venue.curators.slice(0, 3).map((curator, index) => {
                  const $dynamicStyle: any = {
                    borderColor: Colors.orange,
                  }
                  if (index === 1) {
                    $dynamicStyle.borderColor = Colors.stay
                    $dynamicStyle.left = "-45%"
                  }
                  if (index === 2) {
                    $dynamicStyle.borderColor = Colors.stay
                    $dynamicStyle.left = "-90%"
                  }

                  return (
                    <Avatar
                      size={60}
                      key={curator.id}
                      containerStyle={{ ...$imageContainer, ...$dynamicStyle }}
                      label={getInitials(curator.name)}
                      labelColor={Colors.white}
                      backgroundColor={$dynamicStyle.borderColor}
                      imageStyle={$roundedImage}
                      source={{ uri: curator.image }}
                    />
                  )
                })}
              </View>
              <View flex-4 center row>
                {venue.curators.slice(3).length > 0 && (
                  <Text style={$curatorTextColor} text20BL>
                    {" "}
                    + {venue.curators.slice(3).length}
                  </Text>
                )}
                <View marginL-10>
                  <Text>CURATORS</Text>
                  <Text>MENTIONED</Text>
                  <Text>THIS VENUE</Text>
                </View>
              </View>
            </View>
          )}
         {venue.drops && venue.drops.length > 0 && <View  marginV-15> 
            <Text text70 >DROPS</Text>

            <View marginT-15>
           { venue.drops.map((drop) =>(<DropCard key={drop.id} item={drop} onPress={() => {}} />))}   
            </View>
          </View>}
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
  right: 5,
  bottom: 5,
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
  fontFamily: typography.fonts.bourtonbase.normal,
  fontSize:14
}
const $venueNameText: TextStyle = {
  marginBottom: 15,
  textTransform: "uppercase",
  fontFamily: typography.fonts.bourtonbase.normal,
  fontSize: 22,
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
  borderWidth: 1,
  borderColor: Colors.orange,
}
const $curatorTextColor: TextStyle = {
  color: Colors.orange,
}
const $venueNameAddress: TextStyle ={
  fontFamily: 'inter',
  fontWeight: '400',
  fontStyle: 'normal',
}
const $longDescription : TextStyle ={
  fontFamily: 'inter',
  fontWeight: '400',
  fontSize: 12,
}
