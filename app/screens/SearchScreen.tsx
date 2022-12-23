import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, ViewStyle } from "react-native"
import { AppStackScreenProps } from "../navigators"
import { AppInput, CardList } from "../components"
import { View, Text, TouchableOpacity, SkeletonView } from "react-native-ui-lib"
import { useSwipe } from "../hooks/useSwipe"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../models"
import { useAutoCompleteFeedsSuggestion, useFeedsSearch } from "../hooks/useFeeds"
import { transformAutoCompleteResponseToASingleArray } from "../utils/transform"
import { Ionicons } from "@expo/vector-icons"


interface SearchScreenProps extends AppStackScreenProps<"Search"> {}
export const SearchScreen: FC<SearchScreenProps> = observer(function SearchScreen() {
  const { feedsStore } = useStores()
  const { catFilters, toggleSaveFeed } = feedsStore
  const [selectedSearchItems, setSelectedSearchItems] = useState([])
  const [searchText, setSearchText] = useState("")
  const [isInputTouched, setIsInputTouched] = useState(false)
  // const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useFeeds(catFilters)
  const {
    data: autoCompleteData,
    error: autoCompleteError,
    isLoading: isLoadingAutocomplete,
  } = useAutoCompleteFeedsSuggestion({
    term: searchText.toLowerCase(),
    type: "Locations",
    selected: catFilters,
  })
  const {
    data: searchResults,
    isLoading,
    isError,
    refetch,
  } = useFeedsSearch({ term: searchText.toLowerCase(), type: "locations", selected: catFilters })

  const onItemSelected = (item: any) => {
    if (!selectedSearchItems.includes(item)) {
      setSelectedSearchItems([...selectedSearchItems, item])
      setIsInputTouched(false)
    }
  }
  const onRemoveSelectedSearchItem = (selectedItem: string) => {
    if (selectedItem) {
      setSelectedSearchItems(selectedSearchItems.filter((item) => item !== selectedItem))
    }
  }
  const { onTouchStart, onTouchEnd } = useSwipe(undefined, undefined, onSwipeUp, onSwipeDown, 6)

  function onSwipeUp() {
    // setTopBarStatus(true)
  }
  function onSwipeDown() {
    //setTopBarStatus(false)
  }
  // const getMoreDate = () => {
  //   hasNextPage && fetchNextPage()
  // }
  const handleTextChange = (text: string) => {
    setSearchText(text)
    setIsInputTouched(true)
  }

  return (
    <View style={$root}>
      <View margin-8>
        <View marginB-10>
          {selectedSearchItems.length > 0 && (
            <View row style={$chipItemContainer}>
              {selectedSearchItems.map((item, i) => (
                <View marginL-5 marginT-5 style={$tagContainer} key={item} row spread>
                  <Text  center red>{item}</Text>
                  <TouchableOpacity onPress={() => {
                    onRemoveSelectedSearchItem(item);
                  }} center key={item}>
                    <Ionicons name="close" size={18} color="black" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        <AppInput
          hasAutoComplete={isInputTouched}
          knowledgeItems={transformAutoCompleteResponseToASingleArray(
            autoCompleteError || isLoadingAutocomplete ? [] : autoCompleteData,
          )}
          onTextChange={handleTextChange}
          onSelectItem={onItemSelected}
          isLoading={isLoadingAutocomplete}
          onBlur={() => {
            setIsInputTouched(false)
          }}
        />

        <View marginT-40>
        <SkeletonView 
          height={110}
          width={Dimensions.get("window").width - 16}
          style={$skeletonViewStyle}
          times={6}
          borderRadius={8}
          renderContent={() => 
          <CardList
            onTouchEnd={onTouchEnd}
            onTouchStart={onTouchStart}
            data={searchResults || []}
            toggleSaveFeed={toggleSaveFeed}
          />}
          showContent={!isLoading}
          />
   
        </View>
      </View>
    </View>
  )
})

const $root: ViewStyle = {
  zIndex: 40,
}
const $chipItemContainer: ViewStyle = {
  flexWrap: "wrap",
}
const $tagContainer: ViewStyle ={
  borderWidth: 1,
  borderRadius: 5,
  padding: 3,
}
const $skeletonViewStyle: ViewStyle = {
  marginVertical: 3
}