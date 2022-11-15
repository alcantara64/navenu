import _ from "lodash"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ViewStyle, Dimensions, ImageBackground, TextStyle } from "react-native"
import { Carousel, View, Text, Button, Image } from "react-native-ui-lib"

import { colors, typography, Colors } from "../theme"

const welcomeLogo = require("../../assets/NavenuWhite.png")

// const slider01 = {
//   uri: "https://media.navenu.com/skins/front/default/images/onboarding/slider/slider01.jpg",
// }
// const slider02 = {
//   uri: "https://media.navenu.com/skins/front/default/images/onboarding/slider/slider02.jpg",
// }
// const slider03 = {
//   uri: "https://media.navenu.com/skins/front/default/images/onboarding/slider/slider03.jpg",
// }
// const slider04 = {
//   uri: "https://media.navenu.com/skins/front/default/images/onboarding/slider/login.jpg",
// }
export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen() {
  const carousel = React.createRef<typeof Carousel>()

  const Pages = () => [
    {
      image: "https://media.navenu.com/skins/front/default/images/onboarding/slider/slider01.jpg",
      bottomTextHeader: "CONNECT",
      bottomTextFirst: "WITH THE VERY BEST LOCATIONS",
      bottomTextSecond: "LIFESTYLES AND COMMUNITY LEADERS.",
      showAuthButtons: false,
    },
    {
      image: "https://media.navenu.com/skins/front/default/images/onboarding/slider/slider02.jpg",
      bottomTextHeader: "DISCOVER",
      bottomTextFirst: "YOUR PICK OF TRUSTED INSIDER",
      bottomTextSecond: "RECOMMENDATIONS, ON-DEMAND..",
      showAuthButtons: false,
    },
    {
      image: "https://media.navenu.com/skins/front/default/images/onboarding/slider/slider03.jpg",
      bottomTextHeader: "TAKE ADVANTAGE",
      bottomTextFirst: "OF DYNAMIC WEEKLY DROPS",
      bottomTextSecond: "EVENTS. EXPERIENCES. ITEMS.",
      showAuthButtons: true,
    },
  ]

  const onPagePress = (index: number) => {
    if (carousel && carousel.current) {
      carousel.current.goToPage(index, true)
    }
  }

  return (
    <View flex-1 style={$container}>
      <View paddingH-page>
        <View style={$sliderContainer}>
          <Carousel
            containerStyle={$carouselContainer}
            loop
            pageControlProps={{
              size: 10,
              containerStyle: {
                alignSelf: "center",
                position: "absolute",
                bottom: 30,
              },
            }}
            pageControlPosition={Carousel.pageControlPositions.OVER}
          >
            {Pages().map(
              (
                { image, bottomTextHeader, bottomTextFirst, bottomTextSecond, showAuthButtons },
                i,
              ) => {
                return (
                  <View flex centerV key={i}>
                    <ImageBackground
                      style={{ flex: 1 }}
                      source={{
                        uri: image,
                      }}
                    >
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
                            />
                            <Button
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
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  height: "100%",
}

const $sliderContainer: ViewStyle = {
  position: "absolute",
  bottom: 0,
  top: 0,
  left: 0,
  right: 0,
  zIndex: -1,
}
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
  height: Dimensions.get("window").height,
  position: "absolute",
  zIndex: -1,
}
const $buttonLabelStyle: TextStyle = {
  paddingTop: 6,
  paddingBottom: 6,
  paddingRight: 25,
  paddingLeft: 25,
}
