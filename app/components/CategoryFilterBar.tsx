import * as React from "react"
import { ScrollView, StyleProp, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { View, Text, TouchableOpacity } from "react-native-ui-lib"
import Do from "../../assets/icons/explore/iconDo.svg"
import Eat from "../../assets/icons/explore/iconEat.svg"
import Drink from "../../assets/icons/explore/iconDrink.svg"
import Shop from "../../assets/icons/explore/iconShop.svg"
import Stay from "../../assets/icons/explore/iconStay.svg"
import Fit from "../../assets/icons/explore/iconFit.svg"
import DoOn from "../../assets/icons/explore/iconDoActive.svg"
import EatOn from "../../assets/icons/explore/iconEatActive.svg"
import DrinkOn from "../../assets/icons/explore/iconDrinkActive.svg"
import ShopOn from "../../assets/icons/explore/iconShopActive.svg"
import StayOn from "../../assets/icons/explore/iconStayActive.svg"
import FitOn from "../../assets/icons/explore/iconFitActive.svg"
import { Colors } from "../theme"
import { horizontalScale, moderateScale, verticalScale } from "../utils/metrics"

export interface CategoryFilterBarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  addCat?: (value: any) => void
  removeCat?: (value: any) => void
  DoStateButton?: boolean
  EatStateButton?: boolean
  DrinkStateButton?: boolean
  ShopStateButton?: boolean
  StayStateButton?: boolean
  FitStateButton?: boolean
  setDoStateButton?: (value: boolean) => void
  setEatStateButton?: (value: boolean) => void
  setDrinkStateButton?: (value: boolean) => void
  setShopStateButton?: (value: boolean) => void
  setStayStateButton?: (value: boolean) => void
  setFitStateButton?: (value: boolean) => void
  catFilters?: any
}

/**
 * Describe your component here
 */

export const CategoryFilterBar = observer(function CategoryFilterBar(
  props: CategoryFilterBarProps,
) {
  const {
    catFilters,
    addCat,
    removeCat,
    DoStateButton,
    EatStateButton,
    DrinkStateButton,
    ShopStateButton,
    StayStateButton,
    FitStateButton,
    setDoStateButton,
    setDrinkStateButton,
    setEatStateButton,
    setFitStateButton,
    setShopStateButton,
    setStayStateButton,
  } = props
  return (
    // <ScrollView horizontal >
    <View row style={$container}>
      <TouchableOpacity
        style={[
          catFilters.includes("DO") ? $Dobutton : $button,
          { borderColor: DoStateButton ? Colors.white : Colors.do },
        ]}
        onPress={() => {
          setDoStateButton(!DoStateButton)
          !DoStateButton ? addCat("DO") : removeCat("DO")
        }}
      >
        {DoStateButton ? <DoOn /> : <Do />}
        <Text style={[$label, { color: DoStateButton ? Colors.white : Colors.do }]}>DO</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          catFilters.includes("EAT") ? $Eatbutton : $button,
          { borderColor: EatStateButton ? Colors.white : Colors.eat },
        ]}
        onPress={() => {
          setEatStateButton(!EatStateButton)
          !EatStateButton ? addCat("EAT") : removeCat("EAT")
        }}
      >
        {EatStateButton ? <EatOn /> : <Eat />}
        <Text style={[$label, { color: EatStateButton ? Colors.white : Colors.eat }]}>EAT</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          catFilters.includes("DRINK") ? $Drinkbutton : $button,
          { borderColor: DrinkStateButton ? Colors.white : Colors.drink },
        ]}
        onPress={() => {
          setDrinkStateButton(!DrinkStateButton)
          !DrinkStateButton ? addCat("DRINK") : removeCat("DRINK")
        }}
      >
        {DrinkStateButton ? <DrinkOn /> : <Drink />}
        <Text style={[$label, { color: DrinkStateButton ? Colors.white : Colors.drink }]}>
          DRINK
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[catFilters.includes("SHOP") ? $Shopbutton : $button, { borderColor: ShopStateButton ? Colors.white : Colors.shop }]}
        onPress={() => {
          setShopStateButton(!ShopStateButton)
          !ShopStateButton ? addCat("SHOP") : removeCat("SHOP")
        }}
      >
        {ShopStateButton ? <ShopOn /> : <Shop />}
        <Text style={[$label, { color: ShopStateButton ? Colors.white : Colors.shop }]}>SHOP</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[catFilters.includes("STAY") ? $Staybutton : $button, { borderColor: StayStateButton ? Colors.white : Colors.stay }]}
        onPress={() => {
          setStayStateButton(!StayStateButton)
          !StayStateButton ? addCat("STAY") : removeCat("STAY")
        }}
      >
        {StayStateButton ? <StayOn /> : <Stay />}
        <Text style={[$label, { color: StayStateButton ? Colors.white : Colors.stay }]}>STAY</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[catFilters.includes("FIT") ? $Fitbutton : $button, { borderColor: FitStateButton ? Colors.white : Colors.fit }]}
        onPress={() => {
          setFitStateButton(!FitStateButton)
          !FitStateButton ? addCat("FIT") : removeCat("FIT")
        }}
      >
        {FitStateButton ? <FitOn /> : <Fit />}
        <Text style={[$label,{ color: FitStateButton ? Colors.white : Colors.fit }]}>FIT</Text>
      </TouchableOpacity>
    </View>
    // </ScrollView>
  )
})

const $container: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  overflow: "scroll",
  flexGrow: 1,
  flexShrink: 1,
}
const $button: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 5,
  marginRight: 5,
  padding: moderateScale(8),
  borderWidth: 1,
}
const $Staybutton: ViewStyle = {
  borderRadius: 10,

  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#007CFF",
  elevation: 1,
  marginRight: 5,
  padding: moderateScale(8),
}
const $Fitbutton: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#00BC00",
  elevation: 1,
  borderRadius: moderateScale(10),
  marginRight: 2,
  padding: 8,
}
const $Shopbutton: ViewStyle = {
  borderRadius: moderateScale(10),
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#FF2894",
  elevation: 1,
  marginRight: horizontalScale(5),
  padding: 8,
}
const $Drinkbutton: ViewStyle = {
  borderRadius: moderateScale(10),
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#C849D9",
  elevation: 1,
  marginRight: 5,
  padding: 8,
}
const $Eatbutton: ViewStyle = {
  borderRadius: moderateScale(10),
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#FF6800",
  elevation: 1,
  marginRight: 5,
  padding: 8,
}
const $Dobutton: ViewStyle = {
  borderRadius: moderateScale(10),
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#FFB600",
  elevation: 1,
  marginRight: 5,
  paddingBottom: verticalScale(8),
  paddingTop: verticalScale(8),
  paddingLeft: horizontalScale(8),
  paddingRight: horizontalScale(8),
}
const $label: TextStyle = {
  fontSize: 8,
  fontWeight: "bold",
  color: Colors.white,
  padding: 5,
}
