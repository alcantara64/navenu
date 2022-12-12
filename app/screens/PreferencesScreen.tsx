import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ImageBackground, ImageStyle, TextStyle, ViewStyle } from "react-native"
import {
  Screen,
} from "../components"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import {
  View,
  Text,
  Incubator,
  Button,
} from "react-native-ui-lib"
import { Entypo } from "@expo/vector-icons"

const londonImage = require("../../assets/images/preferences/london.png")
const tokyoImage = require("../../assets/images/preferences/tokyo.png")
const dubaiImage = require("../../assets/images/preferences/dubai.png")
const torontoImage = require("../../assets/images/preferences/toronto.png")

const { TextField } = Incubator
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Preferences: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Preferences" component={PreferencesScreen} />`
// Hint: Look for the 🔥!
//  `<UserProfile user={data}></UserProfile>`
// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const PreferencesScreen: FC<StackScreenProps<AppStackScreenProps, "Settings">> = observer(
  function PreferencesScreen({ route }) {
   
    const [activeStage, setActiveStage] = useState(0);

    // Pull in navigation via hook
    // const navigation = useNavigation()
    const cities = [
      {
        image: londonImage,
        text: "LONDON",
        id: "london",
      },
      {
        image: tokyoImage,
        text: "LOS ANGELES",
        id: "tokyo",
      },
      {
        image: dubaiImage,
        text: "Dubai",
        id: "dubai",
      },
      {
        image: torontoImage,
        text: "TORONTO",
        id: "toronto",
      },
    ]
    return (
      <Screen preset='auto'>
        <View marginT-50 padding-10 flex-1>
          <View row spread marginB-20 style={$headerController}>
            <Entypo name="chevron-left" size={24} color="black" />
            <Text subHeader>PREFERENCES</Text>
            <Text>Skip</Text>
          </View>
          {cities.map((item) => (
            <ImageBackground
              style={$imageContainerStyle}
              resizeMode="cover"
              imageStyle={$imageStyle}
              source={item.image}
              key={item.id}
            >
              <View center flex style={$textContainerStyle}>
                <Text white center header>
                  {item.text}
                </Text>
              </View>
            </ImageBackground>
          ))}
          <Button labelStyle={$labelStyle} backgroundColor={'#333333'} label={'NEXT'} bacl  fullWidth style={$buttonStyle}/>
        </View>
      </Screen>
    )
  },
)

const $imageContainerStyle: ViewStyle = {
  height: 140,
  marginTop: 5,
  marginBottom: 5,
}
const $textContainerStyle: ViewStyle = {
  justifyContent: "center",
  alignContent: "center",
}

const $imageStyle: ImageStyle = {
  borderRadius: 15,
}
const $buttonStyle : ViewStyle ={
  borderRadius: 10,
  marginTop: 15
}
const $labelStyle: TextStyle ={
  padding: 8,
}
const $headerController: ViewStyle ={
  alignContent:'center', alignItems: 'center'
}