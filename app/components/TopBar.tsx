import * as React from "react"
import { StyleProp, ViewStyle, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { FontAwesome5, AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../models"
import { View, Text, TouchableOpacity } from "react-native-ui-lib"
// import { CopilotStep, walkthroughable } from "react-native-copilot"

export interface TopBarProps {
  style?: StyleProp<ViewStyle>
  navigation: any
  isSearchMode?: boolean
  showSearch?: boolean
  isShowMap?: boolean
}

export const TopBar = observer(function TopBar(props: TopBarProps) {
  const {
    feedsStore: { setMapMode, isMapMode },
  } = useStores()

  const navigation = useNavigation()
  const gotoProfile = () => {
    navigation.navigate("UserProfileScreen")
  }
  const { style, isShowMap } = props
  const $styles = [$container, style]
  const navigateToMap = () => {
    // navigation.navigate('MapScreen')
    setMapMode(!isMapMode)
  }
  const CopilotOpacity = TouchableOpacity
  return (
    <View paddingT-15 paddingB-15 paddingL-4 paddingR-5 style={{ backgroundColor: "white" }}>
      <View style={$styles}>
        {isShowMap && (
          <View center>
            <View text="Discover venues near you via the map" order={1} name="mapButton">
              <CopilotOpacity onPress={navigateToMap}>
                <FontAwesome5 name="map-marker-alt" size={27} color="#000000" />
              </CopilotOpacity>
            </View>
          </View>
        )}
        <View flex-1 center marginL-25={!isShowMap}>
          {/* <Image style={$logo} source={require('../../assets/Logo-full-black.png')} /> */}
          <Text style={{ fontFamily: "Sequel100Black-85", fontWeight: "700", fontSize: 30 }}>
            navenu
          </Text>
        </View>
        <View
          text="Edit your preferences, see lists and get your latest notifications"
          order={2}
          name="user-profile"
        >
          <CopilotOpacity center onPress={gotoProfile}>
            <AntDesign name="user" size={27} color="#000000" />
          </CopilotOpacity>
        </View>
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  // marginTop: Constants.statusBarHeight,
  flexDirection: "row",
  justifyContent: "space-between",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.36,
  shadowRadius: 6.68,
  elevation: 11,
  marginLeft: 10,
  marginRight: 10,
}
const $logo: ImageStyle = {
  alignSelf: "center",
}
