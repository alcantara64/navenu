import * as React from "react"
import { ImageBackground, StyleProp, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons"
import { View, Text, Button } from "react-native-ui-lib"
import { Colors } from "../theme"
import { DropCard } from "./DropCard"
import { useState } from "react"
import Carousel from "react-native-reanimated-carousel"
import { IDrop } from "../interface/drops"
import { VenueCard } from "."

export interface DropDropDetailCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  drop: IDrop
  navigation: any
}

/**
 * Describe your component here
 */
export const DropDropDetailCard = observer(function DropDropDetailCard(
  props: DropDropDetailCardProps,
) {
  const { style, drop, navigation } = props
  const $styles = [$container, style]
  const [bookmark, setBookmark] = useState(false);
  

  const goBack = () => {
    navigation.goBack()
  }
  const saveDrop = () => {
    setBookmark(!bookmark)
  }
  const onMenuPress = () => {

  }

  // const renderItem = ({ item, index, separators }) =>(
  //   <TouchableHighlight key={item.id}>
  //  {/* <Image  source={item.image} /> */}
  //   <View><Image  source={{uri:item.image}} style={{
  //                   width:80,
  //                   height:40,
  //                   resizeMode:'contain',
  //                   margin:8
  //               }} /></View>
  //   </TouchableHighlight>
  // )

  return (
    <View style={$styles}>
      <ImageBackground source={{ uri: drop.image }} resizeMode="cover" style={$imageTop}>
        <View style={$closeBtn} center>
          <TouchableOpacity onPress={goBack} style={$padding10}>
            <Ionicons name="ios-close-circle-sharp" solid size={35} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View flex row style={$cardTextContainer}>
          <View flex-8 bottom>
            <Text style={$cardText}>{drop.category}</Text>
            <Text style={$cardBelowText}>{drop.name}</Text>
            <View></View>
          </View>

          <View flex-1 center paddingB-20 spread>
            <TouchableOpacity
              style={{ marginVertical: 15 }}
              onPress={() => console.log("Button 1")}
            >
              <MaterialIcons name="ios-share" size={45} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={saveDrop} style={{ marginVertical: 5 }}>
              <FontAwesome5 solid={bookmark} name="bookmark" size={40} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View style={$contentContainer}>
        <View flex style={$dropContent} padding-20>
          {drop.description && (
            <View>
              <Text text70>{drop.description}</Text>
            </View>
          )}
          <View flex row marginB-10 marginT-10 spread br10>
            <Button
              size="large"
              label="CLAIM CODE"
              color="white"
              borderRadius={10}
              backgroundColor={Colors.orange}
            />
            <Button
              size="large"
              label="AF56HUP2"
              color="white"
              borderRadius={10}
              backgroundColor={Colors.ash}
            />
          </View>
          <View row>
            <Carousel<{ color: string }>
              width={40}
              data={[{ color: "red" }, { color: "purple" }, { color: "yellow" }]}
              renderItem={({ color }) => {
                return <View style={{ backgroundColor: color, flex: 1 }} />
              }}
            />
          </View>
          <View row style={$horizontalLine}></View>
          <View row marginT-20 marginB-10>
            <Text text60>The Venue</Text>
          </View>

          <View>
           <VenueCard item={{name:drop.venue, category:drop.category, image:drop.venue_image, distance: drop.distance || 0}} onPress={onMenuPress}/>
          </View>

          <View row marginT-20 marginB-10>
            <Text text60>The DROPS</Text>
          </View>
          <View>
            {drop &&
              drop.drops.map((item) => <DropCard key={item.id} onPress={() => {}} item={item} />)}
          </View>
          <View row style={$horizontalLine}></View>
        </View>
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: "transparent",
}
const $imageTop: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  width: "100%",
  height: 300,
  justifyContent: "flex-end",
}

const $closeBtn: TextStyle = {
  right: 3,
  top: 25,
  position: "absolute",
}
const $padding10: ViewStyle = {
  marginRight: 10,
}
const $cardTextContainer: ViewStyle = {
  alignItems: "baseline",
  marginHorizontal: 10,
  position: "absolute",
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
const $dropContent: ViewStyle = {
  borderTopRightRadius: 15,
  backgroundColor: "#F2F2F2",
  borderTopLeftRadius: 15,
}
const $flatListRow: ViewStyle = {
  flex: 1,
}

const $horizontalLine: ViewStyle = {
  borderWidth: 1,
  borderColor: Colors.black,
  margin: 5,
}
