import { useNavigation } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import _ from "lodash"
import { observer } from "mobx-react-lite"
import React, { FC, useMemo } from "react"
import { ViewStyle, ImageBackground, TextStyle, ImageStyle } from "react-native"
import { Carousel, View, Text, Button, Image } from "react-native-ui-lib"

import { typography, Colors } from "../theme"
import { ScrollView } from "react-native-gesture-handler"

const welcomeLogo = require("../../assets/NavenuWhite.png")
const firstPageLogo = require("../../assets/new-front-logo.png")
const CAT_ICONS = require("../../assets/cat-icons.png")

export const WelcomeScreen: FC = observer(function WelcomeScreen() {
  const carousel = React.createRef<typeof Carousel>()
  const navigation = useNavigation()

  const gotoLoginScreen = () => {
    navigation.navigate("Login")
  }

  const goToSignupScreen = () => {
    navigation.navigate("SignUpStart")
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
        image: require("../../assets/images/slides/slide-2.png"),
        bottomTextHeader: "TAKE ADVANTAGE",
        bottomTextFirst: "OF DYNAMIC WEEKLY DROPS",
        bottomTextSecond: "EVENTS. EXPERIENCES. ITEMS.",
        showAuthButtons: true,
      },
    ],
    [],
  )
  const FIRSt_PAGE_CONTENT = [
    {
      icon: require("../../assets/icons/star.png"),
      highlightedText: "Access exclusive drops ",
      content: "for timed promotions, only on Navenu",
    },
    {
      icon: require("../../assets/icons/clock.png"),
      highlightedText: "Save time ",
      content: "by accessing quality venues recommended just for you, on the map or home feed.",
    },
    {
      icon: require("../../assets/icons/note.png"),
      highlightedText: "Create lists ",
      content: "for your favorite recommendations, editorial, and drops.",
    },
    {
      icon: require("../../assets/icons/voice.png"),
      highlightedText: "Share the venues you love ",
      content: " with your friends and family.",
    },
    {
      icon: require("../../assets/icons/people.png"),
      highlightedText: "Discover Curators ",
      content: "and their recommendations in the cities you love ",
    },
    {
      icon: require("../../assets/icons/calendar.png"),
      highlightedText: "No more tab switching ",
      content: "with in-app venue booking, easy-access menus, and more.",
    },
    {
      icon: require("../../assets/icons/book.png"),
      highlightedText: "new experiences and venues to visit.",
      content: "Discover editorials and guides, for ",
    },
  ]

  const onPagePress = (index: number) => {
    if (carousel && carousel.current) {
      carousel.current.goToPage(index, true)
    }
  }
  const FirsPage = () => (
    <ScrollView>
      <View flex-1>
        <View center marginT-50>
          <Text header style={topTitle}>
            WELCOME TO
          </Text>
          <View marginT-10>
            <Image source={firstPageLogo} />
          </View>
          <View marginT-10>
            <Image source={CAT_ICONS} />
          </View>
        </View>
        <View marginL-30 paddingR-50 marginR-20 marginT-40>
          {FIRSt_PAGE_CONTENT.map(({ icon, highlightedText, content }, index) => (
            <View key={highlightedText} row marginB-10 marginT-10>
              <View marginR-15 centerH>
                <Image height={35} width={35} white source={icon} />
              </View>
              <View row>
                <Text>
                  {index !== FIRSt_PAGE_CONTENT.length - 1 && (
                    <>
                      <Text style={$highlightedText}>{highlightedText}</Text>
                      <Text>{content}</Text>
                    </>
                  )}
                  {index === FIRSt_PAGE_CONTENT.length - 1 && (
                    <>
                      <Text>{content}</Text>
                      <Text style={$highlightedText}>{highlightedText}</Text>
                    </>
                  )}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      <View flex-2 bottom marginT-100 center>
        <Button
          marginR-5
          backgroundColor={Colors.ash}
          borderRadius={10}
          labelStyle={$buttonLabelStyle}
          label={"NEXT"}
          onPress={() => {
            onPagePress(1)
          }}
        />
      </View>
    </ScrollView>
  )

  return (
    <View>
      <StatusBar translucent />
      <Carousel
        ref={carousel}
        containerStyle={$carouselContainer}
        loop
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
              <View flex key={i}>
                {i !== 0 && (
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
                )}
                {i === 0 && FirsPage()}
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
const topTitle: TextStyle = {
  fontFamily: "BourtonBase",
  fontSize: 21,
}
const $highlightedText: TextStyle = {
  color: "#333333",
  fontWeight: "700",
}
