import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

interface SearchScreenProps extends AppStackScreenProps<"Search"> {}
export const SearchScreen: FC<SearchScreenProps> = observer(function SearchScreen() {

  return (
    <Screen style={$root} preset="scroll">
      <Text text="search" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
