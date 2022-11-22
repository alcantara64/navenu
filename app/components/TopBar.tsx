import * as React from "react"
import {
  StyleProp,
  TouchableOpacity,
  ViewStyle,
  Image,
  ImageStyle,
  ImageBackground,
  TextStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { FontAwesome5 } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { CategoryFilterBar } from "./CategoryFilterBar"
import { useStores } from "../models"
import { View, Text } from "react-native-ui-lib"
import { Colors, spacing, typography } from "../theme"
import { FEED_TYPE } from "../interface/feed"
import { horizontalScale } from "../utils/metrics"

export interface TopBarProps {
  style?: StyleProp<ViewStyle>
  navigation: any,
}

export const TopBar = observer(function TopBar(props: TopBarProps) {
  const {
    feedsStore: {
      addCartFilter,
      removeCartFilter,
      catFilters,
      selectedFilterTypes,
      addFilterType,
      removeFilterType,
      toggleHeaderState,
      showHeaderFilter,
      setMapMode,
      isMapMode,
    },
  } = useStores()
  const [DoStateButton, setDoStateButton] = useState(false)
  const [EatStateButton, setEatStateButton] = useState(false)
  const [DrinkStateButton, setDrinkStateButton] = useState(false)
  const [ShopStateButton, setShopStateButton] = useState(false)
  const [StayStateButton, setStayStateButton] = useState(false)
  const [FitStateButton, setFitStateButton] = useState(false)
  const [filtervisible, setFilterVisible] = useState(false)
  const [isDrop, setIsDrop] = useState(false)
  const [isVenue, setIsVenue] = useState(false)
  const [isEditorial, setIsEditorial] = useState(false)

  const navigation = useNavigation()

  const showFilter = () => {
    setFilterVisible(!filtervisible)
    toggleHeaderState();
  }
  const { style, } = props
  const $styles = [$container, style]
  const navigateToMap = () => {
    // navigation.navigate('MapScreen')
    setMapMode(!isMapMode);
  }
  const toggleDrop = () => {
    const isToggle = selectedFilterTypes.includes(FEED_TYPE.drop)
    isToggle ? removeFilterType(FEED_TYPE.drop) : addFilterType(FEED_TYPE.drop)
  }
  const toggleVenue = () => {
    const isToggle = selectedFilterTypes.includes(FEED_TYPE.location)
    isToggle ? removeFilterType(FEED_TYPE.location) : addFilterType(FEED_TYPE.location)
  }
  const toggleEditorial = () => {
    const isToggle = selectedFilterTypes.includes(FEED_TYPE.article)
    isToggle ? removeFilterType(FEED_TYPE.article) : addFilterType(FEED_TYPE.article)
  }
  

  return (
    <View marginT-45 marginB-15 marginL-4 marginR-5>
      <View style={$styles}>
        <TouchableOpacity onPress={navigateToMap}>
          <FontAwesome5 name="map-marker-alt" size={27} color="#000000" />
        </TouchableOpacity>
        <Image source={require("../../assets/icon-navenu.png")} style={$logo} />
        <TouchableOpacity onPress={showFilter}>
          <FontAwesome5 name="filter" size={27} color="#000000" />
        </TouchableOpacity>
      </View>
      {showHeaderFilter && (
        <View padding-5 marginT-5>
          {/* <ScrollView horizontal> */}
          <View marginT-5 row  style={{justifyContent:'space-between'}}>
            <TouchableOpacity onPress={toggleDrop} flex-1>
              <ImageBackground
                source={require("../../assets/images/drops-background.jpg")}
                style={[$filterType, selectedFilterTypes.includes(FEED_TYPE.drop) && $activeFilter]}
                imageStyle={$filterTypeImageStyle}
                resizeMode="cover"
              >
                <Text white text70 left style={$CardTitles}>
                  DROPS
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleVenue} >
              <ImageBackground
                source={require("../../assets/images/venue.png")}
                style={[
                  $filterType,
                  selectedFilterTypes.includes(FEED_TYPE.location) && $activeFilter,
                ]}
                imageStyle={$filterTypeImageStyle}
              >
                <Text white text70 left style={$CardTitles}>
                  VENUE
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleEditorial} marginR-5>
              <ImageBackground
                source={require("../../assets/images/editorial.jpg")}
                style={[
                  $filterType,
                  selectedFilterTypes.includes(FEED_TYPE.article) && $activeFilter,
                ]}
                imageStyle={$filterTypeImageStyle}
                resizeMode={'cover'}
              >
                <Text  white center style={$CardTitles}>
                  EDITORIAL
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          {/* </ScrollView> */}

          <CategoryFilterBar
            addCat={addCartFilter}
            removeCat={removeCartFilter}
            DoStateButton={DoStateButton}
            EatStateButton={EatStateButton}
            DrinkStateButton={DrinkStateButton}
            ShopStateButton={ShopStateButton}
            StayStateButton={StayStateButton}
            FitStateButton={FitStateButton}
            setDoStateButton={setDoStateButton}
            setEatStateButton={setEatStateButton}
            setDrinkStateButton={setDrinkStateButton}
            setShopStateButton={setShopStateButton}
            setStayStateButton={setStayStateButton}
            setFitStateButton={setFitStateButton}
            catFilters={catFilters}
          />
        </View>
      )}
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
  //borderBottomColor: Colors.black,
  // borderBottomWidth: 1,
}
const $logo: ImageStyle = {
  marginTop: 12,
  width: horizontalScale(106),
  height: 13,
}
const $filterType: ImageStyle = {
  paddingRight: 10,
  paddingTop: 20,
  paddingLeft: 10,
  paddingBottom: 10,
  marginBottom: 5,
  flexGrow: 1,
  width: 120,
}
const $filterTypeImageStyle: ImageStyle = {
  borderRadius: 5,
}
const $activeFilter: ViewStyle = {
  borderColor: Colors.black,
  borderWidth: 2,
  borderRadius: 5,
}
const $CardTitles: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: spacing.medium,
  color: Colors.white,
  fontWeight: "900",
}
const $middleImage:ImageStyle ={
   marginLeft: '1%',
   marginRight: '1%',
}
