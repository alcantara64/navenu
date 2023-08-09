import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { useCallback } from "react"
import { View, SegmentedControl } from "react-native-ui-lib"
import { DropLocationSearch } from "./DropLocationSearch"
import { ArticleSearch } from "./ArticleSearch"

export interface SearchButtonsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 *
 */
const segments = {
  first: [{ label: "Articles" }, { label: "Venues" }, { label: "Drops" }],
}
export const SearchButtons = observer(function SearchButtons(props: SearchButtonsProps) {
  const { style } = props
  const $styles = [$container, style]

  const [value, setValue] = React.useState("Articles")

  const onChangeIndex = useCallback((index) => {
    switch (index) {
      case 0:
        setValue("Articles")
        break
      case 1:
        setValue("Venues")
        break
      case 2:
        setValue("Drops")
        break
    }
  }, [])

  return (
    <View flex bottom padding-page>
      <View flex centerV>
        <View center>
          <SegmentedControl
            onChangeIndex={onChangeIndex}
            containerStyle={$styles}
            segments={segments.first}
          />

          {value === "Drops" && <DropLocationSearch />}
          {value === "Venues" && <DropLocationSearch />}
          {value === "Articles" && <ArticleSearch />}
        </View>
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  padding: 10,
}
