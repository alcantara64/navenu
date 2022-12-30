import { useNavigation } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import _ from "lodash"
import { observer } from "mobx-react-lite"
import React, { FC, useMemo } from "react"
import { 
  ViewStyle, 
  ImageBackground, 
  TextStyle, 
} from "react-native"
import { Carousel, View, Text, Button, Image } from "react-native-ui-lib"

import { typography, Colors } from "../theme"

const welcomeLogo = require("../../assets/NavenuWhite.png")

export const WelcomeScreen: FC = observer(function WelcomeScreen() {
  const carousel = React.createRef<typeof Carousel>()
  const navigation = useNavigation()

  const gotoLoginScreen = () => {
    navigation.navigate("Login")
  }

  const goToSignupScreen = () => {
    navigation.navigate("SignUp")
  }

  const Pages = useMemo(
    () => [
      {
        image: require("../../assets/images/slider01.jpeg"),
        bottomTextHeader: "CONNECT",
        bottomTextFirst: "WITH THE VERY BEST LOCATIONS",
        bottomTextSecond: "LIFESTYLES AND COMMUNITY LEADERS.",
        showAuthButtons: false,
      },
      {
        image: require("../../assets/images/slider02.jpeg"),
        bottomTextHeader: "DISCOVER",
        bottomTextFirst: "YOUR PICK OF TRUSTED INSIDER",
        bottomTextSecond: "RECOMMENDATIONS, ON-DEMAND..",
        showAuthButtons: false,
      },
      {
        image: require("../../assets/images/slider03.jpeg"),
        bottomTextHeader: "TAKE ADVANTAGE",
        bottomTextFirst: "OF DYNAMIC WEEKLY DROPS",
        bottomTextSecond: "EVENTS. EXPERIENCES. ITEMS.",
        showAuthButtons: true,
      },
    ],
    [],
  )

  const onPagePress = (index: number) => {
    if (carousel && carousel.current) {
      carousel.current.goToPage(index, true)
    }
  }

  return (
    <View>
      <StatusBar translucent />
      <Carousel
        ref={carousel}
        containerStyle={$carouselContainer}
        loop
        autoplay
        pageControlProps={{
          size: 10,
          onPagePress,
          color: Colors.white,
          inactiveColor: Colors.ash,
          containerStyle: {
            alignSelf: "center",
            position: "absolute",
            bottom: 30,
          },
        }}
        pageControlPosition={Carousel.pageControlPositions.OVER}
      >
        {Pages.map(
          ({ image, bottomTextHeader, bottomTextFirst, bottomTextSecond, showAuthButtons }, i) => {
            return (
              <View flex centerV key={i}>
                <ImageBackground style={{ flex: 1 }} source={image}>
                  <View marginT-50 center>
                    <Image white source={welcomeLogo} />
                  </View>
                  <View style={$buttomTextContainer}>
                    <Text style={$bottomTextHeader} center>
                      {bottomTextHeader}
                    </Text>
                    <Text style={$bottomTextSmall} center>
                      {bottomTextFirst}{" "}
                    </Text>
                    <Text style={$bottomTextSmall} center>
                      {bottomTextSecond}{" "}
                    </Text>
                    {showAuthButtons && (
                      <View row center>
                        <Button
                          marginR-5
                          backgroundColor={Colors.ash}
                          borderRadius={15}
                          labelStyle={$buttonLabelStyle}
                          label={"SIGN UP"}
                          onPress={goToSignupScreen}
                        />
                        <Button
                          onPress={gotoLoginScreen}
                          marginL-5
                          size={Button.sizes.large}
                          borderRadius={15}
                          backgroundColor={Colors.ash}
                          label={"LOGIN"}
                          labelStyle={$buttonLabelStyle}
                        />
                      </View>
                    )}
                  </View>
                </ImageBackground>
              </View>
            )
          },
        )}
      </Carousel>
    </View>
  )
})

const $buttomTextContainer: ViewStyle = {
  position: "absolute",
  bottom: 60,
  alignSelf: "center",
}
const $bottomTextHeader: TextStyle = {
  color: Colors.white,
  fontFamily: typography.fonts.bourtonbase.normal,
  textTransform: "uppercase",
  fontSize: 32,
  marginBottom: 16,
}
const $bottomTextSmall: TextStyle = {
  color: Colors.white,
  fontFamily: typography.fonts.bourtonbase.normal,
  textTransform: "uppercase",
  fontSize: 16,
  lineHeight: 23,
}
const $carouselContainer: ViewStyle = {
  height: "100%",
}
const $buttonLabelStyle: TextStyle = {
  paddingTop: 6,
  paddingBottom: 6,
  paddingRight: 25,
  paddingLeft: 25,
}
