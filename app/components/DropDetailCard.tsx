import * as React from "react"
import { ImageBackground, StyleProp, TextStyle, TouchableOpacity, ViewStyle, Image, TouchableHighlight } from "react-native"
import { observer } from "mobx-react-lite"
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons"
import { View, Text, Button } from "react-native-ui-lib"
import { Colors } from "../theme"
import { DropCard } from "./DropCard"
import { FlatList } from "react-native-gesture-handler"
import { Divider } from "./Divider"

export interface DropDropDetailCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  drop: any
}

/**
 * Describe your component here
 */
export const DropDropDetailCard = observer(function DropDropDetailCard(
  props: DropDropDetailCardProps,
) {
  const { style, drop } = props
  const $styles = [$container, style]

  const  drops =  [
                {
                    "id": "24",
                    "type": "drop",
                    "expiration": "24-04-2023",
                    "image": "https://media.navenu.com/media/venues/790ef2b15452bf457da536559a205877.jpg",
                    "name": "Free Half a dozen oysters with your Champagne!",
                    "intro": "Free Half a dozen oysters with your Champagne!",
                    "description": "Enjoy half a dozen oysters on us when you purchase 2 glasses of champagne! Now that's definitely a reason to press the button!"
                }
            ];
const images = [{id:1, image: "https://media.navenu.com/media/venues/790ef2b15452bf457da536559a205877.jpg"}, { id:2,image: "https://media.navenu.com/media/venues/790ef2b15452bf457da536559a205877.jpg"}, {id:3, image: "https://media.navenu.com/media/venues/790ef2b15452bf457da536559a205877.jpg"}]

  const goBack = () => {
    navigation.goBack()
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
          </View>
         
          <View flex-1 center paddingB-20 spread>
            <TouchableOpacity
              style={{ marginVertical: 15 }}
              onPress={() => console.log("Button 1")}
            >
              <MaterialIcons name="ios-share" size={45} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginVertical: 5 }}>
              <FontAwesome5 brand name="bookmark" size={40} color="#FFFFFF" />
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
          <View flex row  spread br10 >
            <Button
              size="large"
              label="CLAIM CODE"
              marginB-10
              color="white"
              borderRadius={10}
              backgroundColor={Colors.orange}
            />
            <Button
              size="medium"
              label="AF56HUP2"
              marginB-10
              color="white"
              
              borderRadius={10}
              backgroundColor={Colors.ash}
            />
          </View>
          {/* <FlatList columnWrapperStyle={$flatListRow} keyExtractor={(item,) => item.id } data={images} numColumns={3}  renderItem={renderItem} /> */}
          <View>
            {drops && drops.map((item) =>(
              <DropCard  key={item.id} onPress={() =>{}} item={item}/>
            ))}
          </View>
          <Divider/>
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
const $flatListRow:ViewStyle = {
  flex: 1,
}
