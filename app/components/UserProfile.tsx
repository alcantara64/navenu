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
  FontAwesome5
} from "@expo/vector-icons"
import { IUser,IUserList } from "../interface/user"
import { useNavigation } from "@react-navigation/native"
import { Colors } from "../theme"
import { getInitials } from "../utils/transform"

import { DropCard } from "./DropCard"

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

  const $lineDivider = [$horizontalLine, $bigDivider]
  return (
    <>
      <ImageBackground source={{ uri: user.avatar }} resizeMode="cover" style={$imagetop}>
        <View marginT-10 style={$closeBtn}>
          <TouchableOpacity onPress={goBack}>
            <FontAwesome5 solid name="times-circle" size={27} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={$cardtext}>
          <Text text80BL style={$categoryText}>
            {user.profession}
          </Text>
          <Text text60BL white style={$venueNameText}>
            {user.name}
          </Text>
          <View row style={$horizontalLine}></View>
          <Text text90 white style={$venueNameText}>
            {user.home_town}
          </Text>
        </View>
        <View style={$functionBtns}>
          <View flex-1 center spread>
            
            <TouchableOpacity style={{ marginVertical: 5 }}>
              <FontAwesome5 name="gear" size={40} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View style={$contentContainer}>
      
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
  borderWidth: 1,
  borderColor: Colors.orange,
}
const $curatorTextColor: TextStyle = {
  color: Colors.orange,
}
