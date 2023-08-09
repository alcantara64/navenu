import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import _ from "lodash"
import { CategoryFilterBar } from "./CategoryFilterBar"
import { useState } from "react"

export interface DropLocationSearchProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const DropLocationSearch = observer(function DropLocationSearch() {
  const [DoStateButton, setDoStateButton] = useState(false)
  const [EatStateButton, setEatStateButton] = useState(false)
  const [DrinkStateButton, setDrinkStateButton] = useState(false)
  const [ShopStateButton, setShopStateButton] = useState(false)
  const [StayStateButton, setStayStateButton] = useState(false)
  const [FitStateButton, setFitStateButton] = useState(false)
  const [searchFilter, setSearchFilter] = useState([])
  // const [tagSelected, setTagSelected] = useState([{ name: 'Stag night' }, { name: 'Afterhours' }]);
  const addCat = (cat) => {
    setSearchFilter([...searchFilter, cat])
  }

  const removeCat = (cat) => {
    const newCatFilter = _.without(searchFilter, cat)
    // const newCatFilter = catFilters.filter((x) => x !== cat);

    setSearchFilter(newCatFilter)
  }

  return (
    <View>
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
        catFilters={searchFilter}
      />
      {/* <AutoTags
        suggestions={suggestions}
        tagsSelected={tagSelected}
        handleAddition={handleAddition}
        handleDelete={handleDelete}
        placeholder="Search Filter"
      /> */}
    </View>
  )
})
