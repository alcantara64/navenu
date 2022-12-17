import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ImageBackground, ImageStyle, TextStyle, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen } from "../components"
import { TouchableOpacity, View, Text, Button } from "react-native-ui-lib"
import { Entypo } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

const londonImage = require("../../assets/images/preferences/london.png")
const tokyoImage = require("../../assets/images/preferences/tokyo.png")
const dubaiImage = require("../../assets/images/preferences/dubai.png")
const torontoImage = require("../../assets/images/preferences/toronto.png")

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const LocationScreen: FC<StackScreenProps<AppStackScreenProps, "Location">> = observer(
  function LocationScreen() {
    const navigation = useNavigation()

    const onBackPress = () => {
      navigation.goBack()
    }
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
      <Screen preset="auto">
        <View marginT-50 padding-10 flex-1>
          <View row spread marginB-20 style={$headerController}>
            <TouchableOpacity onPress={onBackPress}>
              <Entypo name="chevron-left" size={24} color="black" />
            </TouchableOpacity>
            <Text subHeader>PREFERENCES</Text>
            <Text>Skip</Text>
          </View>
          {cities.map((item) => (
            <ImageBackground
              style={[$imageContainerStyle, item.id !== "london" ? blurImage : null]}
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
          <Button
            labelStyle={$labelStyle}
            backgroundColor={"#333333"}
            label={"NEXT"}
            bacl
            fullWidth
            style={$buttonStyle}
          />
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
const $buttonStyle: ViewStyle = {
  borderRadius: 10,
  marginTop: 15,
}
const $labelStyle: TextStyle = {
  padding: 8,
}
const $headerController: ViewStyle = {
  alignContent: "center",
  alignItems: "center",
}
const blurImage: ViewStyle = {
  opacity: 0.3,
}
