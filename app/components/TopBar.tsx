import * as React from "react"
import { StyleProp, TouchableOpacity, ViewStyle, Image, ImageStyle, ImageBackground, ScrollView } from "react-native"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native"
import { CategoryFilterBar } from "./CategoryFilterBar"
import { useStores } from "../models"
import { View, Text } from "react-native-ui-lib";
import { Colors } from "../theme";
import { FEED_TYPE } from "../interface/feed";

export interface TopBarProps {

  style?: StyleProp<ViewStyle>
  navigation:any,
}


export const TopBar = observer(function TopBar(props: TopBarProps) {

  const {feedsStore:{ addCartFilter, removeCartFilter, catFilters, selectedFilterTypes, addFilterType, removeFilterType}} = useStores();
  const [DoStateButton, setDoStateButton] = useState(false);
  const [EatStateButton, setEatStateButton] = useState(false);
  const [DrinkStateButton, setDrinkStateButton] = useState(false);
  const [ShopStateButton, setShopStateButton] = useState(false);
  const [StayStateButton, setStayStateButton] = useState(false);
  const [FitStateButton, setFitStateButton] = useState(false);
  const [filtervisible, setFilterVisible] = useState(false);
  const [isDrop, setIsDrop] = useState(false);
  const [isVenue, setIsVenue] = useState(false);
  const [isEditorial, setIsEditorial] = useState(false);

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
  const toggleDrop = () => {
    const isToggle = selectedFilterTypes.includes(FEED_TYPE.drop)
    isToggle ? removeFilterType(FEED_TYPE.drop) : addFilterType(FEED_TYPE.drop)
  
  }
  const toggleVenue = () => {
    const isToggle = selectedFilterTypes.includes(FEED_TYPE.location)
    isToggle ? removeFilterType(FEED_TYPE.location) : addFilterType(FEED_TYPE.location);
  }
  const toggleEditorial = () => {
    const isToggle = selectedFilterTypes.includes(FEED_TYPE.article)
    isToggle ? removeFilterType(FEED_TYPE.article) : addFilterType(FEED_TYPE.article);
  }

  return (
    <View marginT-30 marginB-5>
      <View style={$styles}>
        <TouchableOpacity onPress={navigateToMap}>
        <FontAwesome5 name="map-marker-alt" size={27}  color="#000000" />
        </TouchableOpacity>
        <Image source={require('../../assets/icon-navenu.png')} style={$logo} />
        <TouchableOpacity
          onPress={showFilter}
        >
          <FontAwesome5 name="filter" size={27} color="#000000" />
        </TouchableOpacity>
      </View>
      {filtervisible && (<View padding-5 marginT-5>
        
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
        
        <ScrollView horizontal >
      <View marginT-5 row>
      <TouchableOpacity onPress={toggleDrop}>
      <ImageBackground source={require('../../assets/article.png')} style={[$filterType, selectedFilterTypes.includes(FEED_TYPE.drop) && $activeFilter ]} imageStyle={$filterTypeImageStyle} >
        <Text white text70 left>DROPS</Text>
      </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleVenue}>
      <ImageBackground  source={require('../../assets/article.png')} style={[$filterType,  selectedFilterTypes.includes(FEED_TYPE.location) && $activeFilter]} imageStyle={$filterTypeImageStyle} >
        <Text white text70 left>VENUE</Text>
      </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleEditorial}>
      <ImageBackground  source={require('../../assets/article.png')} style={[$filterType, selectedFilterTypes.includes(FEED_TYPE.article) && $activeFilter]} imageStyle={$filterTypeImageStyle} >
        <Text white text70 left>EDITORIAL</Text>
      </ImageBackground>
      </TouchableOpacity>
      </View>
      </ScrollView>
      </View>)}
    </View>
  )
})

const $container: ViewStyle = {
    // marginTop: Constants.statusBarHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    elevation: 20,
    shadowColor: Colors.orange,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
}
const $logo:ImageStyle = {
  marginTop: 12,
    width: 106,
    height: 13,
}
const $filterType: ImageStyle = {
   paddingRight: 30,
   paddingTop: 30,
   paddingLeft: 10,
   paddingBottom: 10,
   margin: 5,
   width: 150
}
const $filterTypeImageStyle: ImageStyle = {
  borderRadius:5
}
const $activeFilter: ViewStyle = {
  borderColor: Colors.black,
  borderWidth: 2,
  borderRadius:5,
}

