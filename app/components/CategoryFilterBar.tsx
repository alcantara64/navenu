import * as React from "react"
import { StyleProp, TextStyle, ViewStyle } from "react-native"
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
    <View style={$container}>
      <View />
      <TouchableOpacity
        style={catFilters.includes("DO") ? $Dobutton : $button}
        onPress={() => {
          setDoStateButton(!DoStateButton)
          !DoStateButton ? addCat("DO") : removeCat("DO")
        }}
      >
        {DoStateButton ? <DoOn /> : <Do />}
        <Text style={$label}>DO</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={catFilters.includes("EAT") ? $Eatbutton : $button}
        onPress={() => {
          setEatStateButton(!EatStateButton)
          !EatStateButton ? addCat("EAT") : removeCat("EAT")
        }}
      >
        {EatStateButton ? <EatOn /> : <Eat />}
        <Text style={$label}>EAT</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={catFilters.includes("DRINK") ? $Drinkbutton : $button}
        onPress={() => {
          setDrinkStateButton(!DrinkStateButton)
          !DrinkStateButton ? addCat("DRINK") : removeCat("DRINK")
        }}
      >
        {DrinkStateButton ? <DrinkOn /> : <Drink />}
        <Text style={$label}>DRINK</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={catFilters.includes("SHOP") ? $Shopbutton : $button}
        onPress={() => {
          setShopStateButton(!ShopStateButton)
          !ShopStateButton ? addCat("SHOP") : removeCat("SHOP")
        }}
      >
        {ShopStateButton ? <ShopOn /> : <Shop />}
        <Text style={$label}>SHOP</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={catFilters.includes("STAY") ? $Staybutton : $button}
        onPress={() => {
          setStayStateButton(!StayStateButton)
          !StayStateButton ? addCat("STAY") : removeCat("STAY")
        }}
      >
        {StayStateButton ? <StayOn /> : <Stay />}
        <Text style={$label}>STAY</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={catFilters.includes("FIT") ? $Fitbutton : $button}
        onPress={() => {
          setFitStateButton(!FitStateButton)
          !FitStateButton ? addCat("FIT") : removeCat("FIT")
        }}
      >
        {FitStateButton ? <FitOn /> : <Fit />}
        <Text style={$label}>FIT</Text>
      </TouchableOpacity>
      <View />
    </View>
  )
})

const $container: ViewStyle = {
  height: 60,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}
const $button: ViewStyle = {
  width: 50,
  height: 50,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 5,
}
const $Staybutton: ViewStyle = {
  width: 50,
  borderRadius: 5,
  height: 50,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#007CFF",
  elevation: 1,
}
const $Fitbutton: ViewStyle = {
  width: 50,
  height: 50,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#00BC00",
  elevation: 1,
  borderRadius: 5,
}
const $Shopbutton: ViewStyle = {
  width: 50,
  height: 50,
  borderRadius: 5,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#FF2894",
  elevation: 1,
}
const $Drinkbutton: ViewStyle = {
  width: 50,
  height: 50,
  borderRadius: 5,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#C849D9",
  elevation: 1,
}
const $Eatbutton: ViewStyle = {
  width: 50,
  height: 50,
  borderRadius: 5,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#FF6800",
  elevation: 1,
}
const $Dobutton: ViewStyle = {
  width: 50,
  borderRadius: 5,
  height: 50,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#FFB600",
  elevation: 1,
}
const $label: TextStyle = {
  fontSize: 8,
  fontWeight: "bold",
}
