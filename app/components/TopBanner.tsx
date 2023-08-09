import * as React from "react"
import { StyleProp, TouchableOpacity, ViewStyle, Image, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { View } from "react-native-ui-lib"
import { FontAwesome5 } from "@expo/vector-icons"
import Constants from "expo-constants"
import { CategoryFilterBar } from "./CategoryFilterBar"
export interface TopBannerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  navigation: any
  setCatFilter: any
  catFilter: Array<any>
}

/**
 * Describe your component here
 */
export const TopBanner = observer(function TopBanner(props: TopBannerProps) {
  const { style, catFilter, setCatFilter, navigation } = props
  const $styles = [$container, style]

  const [DoStateButton, setDoStateButton] = useState(false)
  const [EatStateButton, setEatStateButton] = useState(false)
  const [DrinkStateButton, setDrinkStateButton] = useState(false)
  const [ShopStateButton, setShopStateButton] = useState(false)
  const [StayStateButton, setStayStateButton] = useState(false)
  const [FitStateButton, setFitStateButton] = useState(false)
  const [filtervisible, setFilterVisible] = useState(false)

  const removeCat = (index) => {
    setCatFilter(catFilter.filter((item) => item !== index))
  }

  const addCat = (cat) => {
    const array = catFilter
    array.push(cat)
    setCatFilter(array)
  }

  function showFilter() {
    setFilterVisible(!filtervisible)
  }

  return (
    <>
      <View absH top style={$styles}>
        <View style={$flexOne}>
          <TouchableOpacity onPress={() => navigation.navigate("MapScreen")}>
            <FontAwesome5 name="map" size={27} color="#000000" />
          </TouchableOpacity>
        </View>
        <View style={$flexOne}>
          <Image source={require("../../assets/icon-navenu.png")} style={$logo} />
        </View>
        <View style={$flexOne}>
          <TouchableOpacity onPress={showFilter}>
            <FontAwesome5 name="sliders-h" size={27} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
      {filtervisible && (
        <View style={$categoryContainer}>
          <CategoryFilterBar
            addCat={addCat}
            removeCat={removeCat}
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
          />
        </View>
      )}
    </>
  )
})

const $container: ViewStyle = {
  flex: 1,
  justifyContent: "space-between",
  marginTop: Constants.statusBarHeight,
  height: 90,
  flexDirection: "row",
}
const $flexOne: ViewStyle = {
  flex: 1,
}
const $logo: ImageStyle = {
  marginTop: 12,
  width: 106,
  height: 13,
}
const $categoryContainer: ViewStyle = {
  flex: 1,

  height: 90,
  flexDirection: "row",
}
