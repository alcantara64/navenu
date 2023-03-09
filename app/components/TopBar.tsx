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
import { View, Text, Button } from "react-native-ui-lib"
import { Colors, spacing, typography } from "../theme"
import { FEED_TYPE } from "../interface/feed"
import { horizontalScale } from "../utils/metrics"

export interface TopBarProps {
  style?: StyleProp<ViewStyle>
  navigation: any
  isSearchMode?: boolean
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
      setSearchFilterType,
      searchFilterType,
    },
  } = useStores()
  const [DoStateButton, setDoStateButton] = useState(false)
  const [EatStateButton, setEatStateButton] = useState(false)
  const [DrinkStateButton, setDrinkStateButton] = useState(false)
  const [ShopStateButton, setShopStateButton] = useState(false)
  const [StayStateButton, setStayStateButton] = useState(false)
  const [FitStateButton, setFitStateButton] = useState(false)
  const [filtervisible, setFilterVisible] = useState(false)

  const navigation = useNavigation()

  const showFilter = () => {
    setFilterVisible(!filtervisible)
    toggleHeaderState()
  }
  const { style, isSearchMode } = props
  const $styles = [$container, style]
  const navigateToMap = () => {
    // navigation.navigate('MapScreen')
    setMapMode(!isMapMode)
  }
  const toggleDrop = () => {
    if (isSearchMode) {
      setSearchFilterType(FEED_TYPE.drop)
    } else {
      const isToggle = selectedFilterTypes.includes(FEED_TYPE.drop)
      isToggle ? removeFilterType(FEED_TYPE.drop) : addFilterType(FEED_TYPE.drop)
    }
  }
  const toggleVenue = () => {
    if (isSearchMode) {
      setSearchFilterType(FEED_TYPE.location)
    } else {
      const isToggle = selectedFilterTypes.includes(FEED_TYPE.location)
      isToggle ? removeFilterType(FEED_TYPE.location) : addFilterType(FEED_TYPE.location)
    }
  }
  const toggleEditorial = () => {
    if (isSearchMode) {
      setSearchFilterType(FEED_TYPE.article)
    } else {
      const isToggle = selectedFilterTypes.includes(FEED_TYPE.article)
      isToggle ? removeFilterType(FEED_TYPE.article) : addFilterType(FEED_TYPE.article)
    }
  }
  const toggleCurator = () => {
    setSearchFilterType(FEED_TYPE.curator)
  }
  return (
    <View marginT-45 marginB-15 marginL-4 marginR-5>
      {!isSearchMode && (
        <View style={$styles}>
          <TouchableOpacity onPress={navigateToMap}>
            <FontAwesome5 name="map-marker-alt" size={27} color="#000000" />
          </TouchableOpacity>
          <View center>
          <Image source={require("../../assets/icon-navenu.png")} style={$logo} />
          </View>
          <TouchableOpacity onPress={showFilter}>
            <FontAwesome5 name="filter" size={27} color="#000000" />
          </TouchableOpacity>
        </View>
      )}
      {(showHeaderFilter || isSearchMode) && (
        <View padding-5 marginT-5>
          {/* <ScrollView horizontal> */}
          <View marginT-5 row spread>
            <Button
              fullWidth
              backgroundColor={Colors.black}
              onPress={toggleVenue}
              style={[
                $filterType,
                ((!isSearchMode && selectedFilterTypes.includes(FEED_TYPE.location)) ||
                  (isSearchMode && searchFilterType === FEED_TYPE.location)) &&
                  $activeFilter,
                isSearchMode && $searchMode,
              ]}
              size={ isSearchMode? Button.sizes.medium: Button.sizes.large}
              label="VENUES"
              labelStyle={$CardTitles}
            />
            <Button
              fullWidth
              backgroundColor={Colors.black}
              onPress={toggleDrop}
              size={ isSearchMode? Button.sizes.medium: Button.sizes.large}
              style={[
                $filterType,
                ((!isSearchMode && selectedFilterTypes.includes(FEED_TYPE.drop)) ||
                  (isSearchMode && searchFilterType === FEED_TYPE.drop)) &&
                  $activeFilter,
                isSearchMode && $searchMode,
              ]}
              label="DROPS"
              labelStyle={$CardTitles}
            />

            {isSearchMode && (
              <Button
                fullWidth
                backgroundColor={Colors.black}
                onPress={toggleCurator}
                style={[
                  $filterType,
                  searchFilterType === FEED_TYPE.curator && $activeFilter,
                  $searchMode,
                ]}
                label="CURATORS"
                labelStyle={$CardTitles}
                size={ isSearchMode? Button.sizes.medium: Button.sizes.large}
              />
            )}

            <Button
              fullWidth
              backgroundColor={Colors.black}
              onPress={toggleEditorial}
              style={[
                $filterType,
                ((!isSearchMode && selectedFilterTypes.includes(FEED_TYPE.article)) ||
                  (isSearchMode && searchFilterType === FEED_TYPE.article)) &&
                  $activeFilter,
                isSearchMode && $searchMode,
              ]}
              label="EDITORIAL"
              
              labelStyle={$CardTitles}
            />
          </View>
          {/* </ScrollView> */}
          {(!isSearchMode ||
            searchFilterType === FEED_TYPE.location  ||
            searchFilterType === FEED_TYPE.drop) && (
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
  marginLeft:10,
  marginRight:10,
}
const $logo: ImageStyle = {
  marginTop: 12,
  width: horizontalScale(106),
  height: 13,
  alignSelf: 'center',
}
const $filterType: ImageStyle = {
  // paddingRight: 20,
  // paddingTop: 20,
  // paddingLeft: 38,
  // paddingBottom: 10,
  marginBottom: 5,
  opacity: 0.3,
  borderRadius: 8,
  //  flexGrow: 1,
}
const $searchMode: ImageStyle = {
  paddingRight: 16,
  paddingLeft: 10,
}
const $filterTypeImageStyle: ImageStyle = {
  borderRadius: 5,
}
const $activeFilter: ViewStyle = {
  opacity: 1,
  borderRadius: 5,
}
const $CardTitles: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: spacing.medium,
  color: Colors.white,
  fontWeight: "900",
  textAlign: 'center'
}
