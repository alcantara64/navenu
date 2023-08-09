import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ImageBackground, ImageStyle, TextStyle, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "../../app/navigators"
import { Button, Screen } from "../../app/components"
import { View, Text } from "react-native-ui-lib"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Colors } from "../../app/theme"
import { useNavigation } from "@react-navigation/native"
// import { useCopilot } from "react-native-copilot"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

const londonImage = require("../../assets/images/preferences/london.png")
const losAngeles = require("../../assets/images/preferences/los-angeles.jpg")
const dubaiImage = require("../../assets/images/preferences/dubai.png")
const torontoImage = require("../../assets/images/preferences/toronto.png")

interface CityScreenProps extends NativeStackScreenProps<AppStackScreenProps<"City">> {}

export const CityScreen: FC<CityScreenProps> = observer(function CityScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const navigation = useNavigation()
  const [selectedCity, setSelectedCity] = useState("London")
  // const { start } = useCopilot()

  const goHome = () => {
   // start()
    navigation.navigate("Home")
  }
  const CITIES = [
    {
      name: "London",
      image: londonImage,
    },
    {
      name: "Dubai",
      image: dubaiImage,
    },
    {
      name: "Toronto",
      image: torontoImage,
    },
    {
      name: "Los Angeles",
      image: losAngeles,
    },
  ]

  const CityCard = ({ source, title }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedCity(title)
      }}
    >
      <ImageBackground
        source={source}
        style={[$imageContainerStyle, selectedCity !== title && { opacity: 0.3 }]}
        imageStyle={$imageStyle}
      >
        <View style={$imageFilter}></View>
        <View center>
          <Text white header>
            {title}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )

  return (
    <Screen style={$root} preset="scroll">
      <View marginT-15 margin-8>
        {CITIES.map(({ image, name }) => (
          <CityCard key={name} source={image} title={name} />
        ))}

        <View marginT-25>
          <Button onPress={goHome} textStyle={$buttonTextStyle} style={$buttonStyle}>
            NEXT
          </Button>
        </View>
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
const $imageContainerStyle: ViewStyle = {
  padding: 50,
  borderRadius: 8,
  marginTop: 8,
}
const $imageStyle: ImageStyle = {
  borderRadius: 8,
}
const $buttonStyle: ImageStyle = {
  backgroundColor: Colors.ash,
}
const $buttonTextStyle: TextStyle = {
  color: Colors.white,
}
const $imageFilter: ViewStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: 8,
}
