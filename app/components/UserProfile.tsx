import * as React from "react"
import { ImageBackground, StyleProp, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, Text, View } from "react-native-ui-lib"
import { FontAwesome5, Ionicons } from "@expo/vector-icons"
import { IUser } from "../interface/user"
import { useNavigation } from "@react-navigation/native"
import { Colors } from "../theme"
import { DropList } from "./DropList"

export interface UserProfileProps {
  /**
   * An optional style override useful for padding & margin.
   */
  user: IUser
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const UserProfile = observer(function UserProfile(props: UserProfileProps) {
  const { user } = props
  const navigation = useNavigation()
  const goBack = () => {
    navigation.goBack()
  }
 const MOCKDROP = [{
  id: 24,
  "type": "drop",
  "venue_id": "3777",
  "venue": "Bob Bob Ricard",
  "venue_image": "https://media.navenu.com/media/venues/10cc14fe79bee9d3d499d8a3a4468486.jpg",
  "image": "https://media.navenu.com/media/venues/790ef2b15452bf457da536559a205877.jpg",
  "lat": "51.51233000000000000000",
  "lng": "-0.13725250000000000000",
  "name": "Free Half a dozen oysters with your Champagne!",
  "description": "Enjoy half a dozen oysters on us when you purchase 2 glasses of champagne! Now that's definitely a reason to press the button!",
  "active": true,
  "expired": false,
  "user_claimed": true,
  "unclaimedCodeCount": 6,
  "NoCodes": false,
  "user_code": "TEST2",
  "owner": "Bob Bob Ricard",
  "parent_category": "Bar",
  "category": "DRINK",
  "campaign": "Bob Bob Ricard",
  "distance": 0.84,
  "percentage_elapsed": 75,
  "expiration": "2023/03/21 00:00:00",
  "tags": [
      "103",
      "157",
      "158",
      "159",
      "130",
      "153",
      "155",
      "135",
      "156"
  ]
},]
  return (
    <>
      <ImageBackground
        source={require("../../assets/images/mock/profile-mock.jpg")}
        resizeMode="cover"
        style={$imagetop}
      >
        <View marginT-10 style={$closeBtn}>
          <TouchableOpacity onPress={goBack}>
            <FontAwesome5 solid name="times-circle" size={27} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={$cardTextContainer}>
          <Text cardSubtitleText>{"TITLE"}</Text>
          <View marginT-4>
            <Text white cardTitle>
              {user.display_name}
            </Text>
          </View>
          <View marginT-10 row style={$horizontalLine}></View>
          <View marginB-15>
            <Text white cardUserName>
              @{user.user_nicename}
            </Text>
          </View>
        </View>
        <View style={$functionBtns}>
          <View flex-1 center spread>
            <TouchableOpacity style={{ marginVertical: 5 }}>
              <Ionicons name="settings-outline" size={27} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View style={$contentContainer}>
        <View style={$mainContent}>
          <View marginT-10 >
            <View style={$dropsContainer}>
            <Text header>MY Drops</Text>
            <View marginT-20>
              <DropList drops={MOCKDROP}/>
            </View>
            <View ><Text center underline>LOAD MORE</Text></View>
            </View>

          </View>

        </View>
      </View>
    </>
  )
})

const $cardTextContainer: TextStyle = {
  alignItems: "baseline",
  marginHorizontal: 6,
  maxWidth: "70%",
  textAlign: "center",
}
const $closeBtn: ViewStyle = {
  right: 15,
  top: 30,
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

const $horizontalLine: ViewStyle = {
  borderWidth: 1,
  borderColor: Colors.white,
  margin: 5,
  width: "10%",
}
const $contentContainer: ViewStyle = {
  borderColor: Colors.do,
  borderStyle: "solid",
  borderTopWidth: 10,
  borderTopRightRadius: 10,
  borderTopLeftRadius: 10,
  backgroundColor: Colors.do,
  position: "relative",
  top: -7,
}
const $mainContent: ViewStyle = {
  borderTopRightRadius: 8,
  backgroundColor: "#F2F2F2",
  borderTopLeftRadius: 8,
  padding: 8,
}

const $dropsContainer:ViewStyle ={
  position: 'relative'
}