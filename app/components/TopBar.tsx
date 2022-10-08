import * as React from "react"
import { StyleProp, TouchableOpacity, View, ViewStyle, Image, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import { useState } from "react"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native"
import { CategoryFilterBar } from "./CategoryFilterBar"
import { useStores } from "../models"

export interface TopBarProps {

  style?: StyleProp<ViewStyle>
  navigation:any,
}


export const TopBar = observer(function TopBar(props: TopBarProps) {

  const {feedsStore:{ addCartFilter, removeCartFilter, catFilters}} = useStores();
  const [DoStateButton, setDoStateButton] = useState(false);
  const [EatStateButton, setEatStateButton] = useState(false);
  const [DrinkStateButton, setDrinkStateButton] = useState(false);
  const [ShopStateButton, setShopStateButton] = useState(false);
  const [StayStateButton, setStayStateButton] = useState(false);
  const [FitStateButton, setFitStateButton] = useState(false);
  const [filtervisible, setFilterVisible] = useState(false);

  const navigation = useNavigation();

  const showFilter = () => {
    setFilterVisible(!filtervisible);
  };
  const { style } = props
  const $styles = [$container, style]
  const navigateToMap = () => {
  // navigation.navigate('MapScreen')
   navigation.navigate()
  }

  return (
    <View>
      <View style={$styles}>
        <TouchableOpacity onPress={navigateToMap}>
          <FontAwesome5 name="map" size={27} color="#000000" />
        </TouchableOpacity>
        <Image source={require('../../assets/icon-navenu.png')} style={$logo} />
        <TouchableOpacity
          onPress={showFilter}
        >
          <FontAwesome5 name="sliders-h" size={27} color="#000000" />
        </TouchableOpacity>
      </View>
      <View>
        {filtervisible && (
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
        )}
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  height: 60,
    // marginTop: Constants.statusBarHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
}
const $logo:ImageStyle = {
  marginTop: 12,
    width: 106,
    height: 13,
}


