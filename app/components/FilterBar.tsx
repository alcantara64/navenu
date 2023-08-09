import * as React from "react"
import { StyleProp, Touchable, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { CategoryFilterBar } from "./CategoryFilterBar"
import { useState } from "react"
import { AppInput } from "./AppInput"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity, View } from "react-native-ui-lib"
export interface FilterBarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  showCatFilters: boolean
  onSetCatFilters: (value) => void
  onRemoveCatFilters: (value) => void
  showSearch: boolean
  categoryFilters: Array<string>
  onSearch: (e: string) => void
  searchText: string
  onCloseSearch?: () => void
  searchPlaceholder?: string
}

/**
 * Describe your component here
 */
export const FilterBar = observer(function FilterBar(props: FilterBarProps) {
  const {
    style,
    showCatFilters,
    onSetCatFilters,
    onRemoveCatFilters,
    showSearch,
    categoryFilters,
    onSearch,
    searchText,
    onCloseSearch,
    searchPlaceholder,
  } = props
  const $styles = [$container, style]

  const [DoStateButton, setDoStateButton] = useState(false)
  const [EatStateButton, setEatStateButton] = useState(false)
  const [DrinkStateButton, setDrinkStateButton] = useState(false)
  const [ShopStateButton, setShopStateButton] = useState(false)
  const [StayStateButton, setStayStateButton] = useState(false)
  const [FitStateButton, setFitStateButton] = useState(false)

  return (
    <View style={$styles}>
      {showCatFilters && (
        <CategoryFilterBar
          addCat={onSetCatFilters}
          removeCat={onRemoveCatFilters}
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
          catFilters={categoryFilters}
        />
      )}
      {showSearch && (
        <View marginT-10 marginB-8>
          <AppInput
            onTextChange={onSearch}
            value={searchText}
            placeholder={searchPlaceholder}
            trailingAccessory={
              <TouchableOpacity onPress={onCloseSearch}>
                <Ionicons name="close-sharp" size={24} color="grey" />
              </TouchableOpacity>
            }
          />
        </View>
      )}
    </View>
  )
})

const $container: ViewStyle = {}
