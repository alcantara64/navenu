import * as React from "react"
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "./Text"
// @ts-ignore
import Do from '../../assets/icons/explore/iconDo.svg';
// @ts-ignore
import Eat from '../../assets/icons/explore/iconEat.svg';
// @ts-ignore
import Drink from '../../assets/icons/explore/iconDrink.svg';
// @ts-ignore
import Shop from '../../assets/icons/explore/iconShop.svg';
// @ts-ignore
import Stay from '../../assets/icons/explore/iconStay.svg';
// @ts-ignore
import Fit from '../../assets/icons/explore/iconFit.svg';
// @ts-ignore
import DoOn from '../../assets/icons/explore/iconDoActive.svg';
// @ts-ignore
import EatOn from '../../assets/icons/explore/iconEatActive.svg';
// @ts-ignore
import DrinkOn from '../../assets/icons/explore/iconDrinkActive.svg';
// @ts-ignore
import ShopOn from '../../assets/icons/explore/iconShopActive.svg';
// @ts-ignore
import StayOn from '../../assets/icons/explore/iconStayActive.svg';
// @ts-ignore
import FitOn from '../../assets/icons/explore/iconFitActive.svg';


export interface CategoryFilterBarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  addCat: (value:any) => void,
  removeCat: (value: any) => void,
  DoStateButton : boolean,
  EatStateButton : boolean,
  DrinkStateButton : boolean,
  ShopStateButton : boolean,
  StayStateButton : boolean,
  FitStateButton : boolean,
  setDoStateButton : (value:boolean) => void,
  setEatStateButton : (value:boolean) => void,
  setDrinkStateButton : (value:boolean) => void,
  setShopStateButton : (value:boolean) => void,
  setStayStateButton :  (value:boolean) => void,
  setFitStateButton:  (value:boolean) => void,
  catFilters: Array<any>,
}

/**
 * Describe your component here
 */
export const CategoryFilterBar = observer(function CategoryFilterBar(props: CategoryFilterBarProps) {
  const { style, addCat,
    removeCat,
    DoStateButton,
    EatStateButton,
    DrinkStateButton,
    ShopStateButton,
    StayStateButton,
    FitStateButton,
    setDoStateButton,
    setEatStateButton,
    setDrinkStateButton,
    setShopStateButton,
    setStayStateButton,
    setFitStateButton,
    catFilters, } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
    <View />
    <TouchableOpacity
      style={catFilters.includes('DO') ? $doButton : $button}
      onPress={() => {
        setDoStateButton(!DoStateButton);
        !DoStateButton ? addCat('DO') : removeCat('DO');
      }}>
      {DoStateButton ? <DoOn /> : <Do />}
      <Text style={$label}>DO</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={catFilters.includes('EAT') ? $eatbutton : $button}
      onPress={() => {
        setEatStateButton(!EatStateButton);
        !EatStateButton ? addCat('EAT') : removeCat('EAT');
      }}>
      {EatStateButton ? <EatOn /> : <Eat />}
      <Text style={$label}>EAT</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={catFilters.includes('DRINK') ? $drinkButton : $button}
      onPress={() => {
        setDrinkStateButton(!DrinkStateButton);
        !DrinkStateButton ? addCat('DRINK') : removeCat('DRINK');
      }}>
      {DrinkStateButton ? <DrinkOn /> : <Drink />}
      <Text style={$label}>DRINK</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={catFilters.includes('SHOP') ? $shopButton : $button}
      onPress={() => {
        setShopStateButton(!ShopStateButton);
        !ShopStateButton ? addCat('SHOP') : removeCat('SHOP');
      }}>
      {ShopStateButton ? <ShopOn /> : <Shop />}
      <Text style={$label}>SHOP</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={catFilters.includes('STAY') ? $stayButton : $button}
      onPress={() => {
        setStayStateButton(!StayStateButton);
        !StayStateButton ? addCat('STAY') : removeCat('STAY');
      }}>
      {StayStateButton ? <StayOn /> : <Stay />}
      <Text style={$label}>STAY</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={catFilters.includes('FIT') ? $fitButton : $button}
      onPress={() => {
        setFitStateButton(!FitStateButton);
        !FitStateButton ? addCat('FIT') : removeCat('FIT');
      }}>
      {FitStateButton ? <FitOn /> : <Fit />}
      <Text style={$label}>FIT</Text>
    </TouchableOpacity>
    <View />
  </View>
  )
})

const $container: ViewStyle = {
  height: 60,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}
const $button: ViewStyle = {
  width: 50,
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,
};

const $stayButton:ViewStyle = {
  width: 50,
  borderRadius: 5,
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#007CFF',
  elevation: 1,
};

const $fitButton:ViewStyle = {
  width: 50,
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#00BC00',
  elevation: 1,
  borderRadius: 5,
};
const $shopButton:ViewStyle = {
  width: 50,
  height: 50,
  borderRadius: 5,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FF2894',
  elevation: 1,
};
const $drinkButton:ViewStyle = {
  width: 50,
  height: 50,
  borderRadius: 5,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#C849D9',
  elevation: 1,
};
const $eatbutton: ViewStyle ={
  width: 50,
  height: 50,
  borderRadius: 5,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FF6800',
  elevation: 1,
};
const $doButton: ViewStyle ={
  width: 50,
  borderRadius: 5,
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFB600',
  elevation: 1,
};
const $label: TextStyle ={
  fontSize: 8,
  fontWeight: 'bold',
};
