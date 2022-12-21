import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "../navigators"
import { CardList, TextInput } from "../components"
import { View, Chip } from "react-native-ui-lib"
import { Colors } from "../theme"
import { useSwipe } from "../hooks/useSwipe"
import { useFeeds } from "../hooks"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../models"
import { useAutoCompleteFeedsSuggestion } from "../hooks/useFeeds"
import { transformAutoCompleteResponseToASingleArray } from "../utils/transform"

interface SearchScreenProps extends AppStackScreenProps<"Search"> {}
export const SearchScreen: FC<SearchScreenProps> = observer(function SearchScreen() {
  const { feedsStore } = useStores()
  const {
    catFilters,

    toggleSaveFeed,
  } = feedsStore
  const [selectedSearchItems, setSelectedSearchItems] = useState([])
  const [searchText, setSearchText] = useState("")
  const [isInputTouched, setIsInputTouched] = useState(false)
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useFeeds(catFilters)
  const {
    data: autoCompleteData,
    error: autoCompleteError,
    isLoading: isLoadingAutocomplete,
  } = useAutoCompleteFeedsSuggestion({
    term: searchText.toLowerCase(),
    type: "Locations",
    selected: catFilters,
  })


  const onItemSelected = (item: any) => {
    if(!selectedSearchItems.includes(item)){
    setSelectedSearchItems([...selectedSearchItems, item])
    setIsInputTouched(false)
    }
  }
  const onRemoveSelectedSearchItem = (selectedItem: string) => {
    if (selectedItem) {
      setSelectedSearchItems(selectedSearchItems.filter((item) => item !==selectedItem ))
    }
  }
  const { onTouchStart, onTouchEnd } = useSwipe(undefined, undefined, onSwipeUp, onSwipeDown, 6)

  function onSwipeUp() {
    // setTopBarStatus(true)
  }
  function onSwipeDown() {
    //setTopBarStatus(false)
  }
  const getMoreDate = () => {
    hasNextPage && fetchNextPage()
  }
const handleTextChange = (text:string) => {
  setSearchText(text);
  setIsInputTouched(true);


}

  return (
    <View style={$root}>
      <View margin-8>
        <View marginB-10>
          {selectedSearchItems.length > 0 && (
            <View flex row marginB-25 style={$chipItemContainer}>
              {selectedSearchItems.map((item) => (
                <Chip
                  borderRadius={5}
                  iconColor={Colors.white}
                  key={item}
                  containerStyle={$chipsMainContainer}
                  label={item}
                  onDismiss={() => {
                    onRemoveSelectedSearchItem(item)
                  }}
                  dismissColor={Colors.blue}
                  dismissIconStyle={$disMissIconStyle}
                />
              ))}
            </View>
          )}
        </View>
        
        <TextInput
          hasAutoComplete={isInputTouched}
          knowledgeItems={transformAutoCompleteResponseToASingleArray(
            autoCompleteError || isLoadingAutocomplete ? [] : autoCompleteData,
          )}
          onTextChange={handleTextChange}
          onSelectItem={onItemSelected}
          isLoading={isLoadingAutocomplete}
          onBlur={() => 
            {
            setIsInputTouched(false)
          }}
        />

        <View marginT-40>
          <CardList
            onTouchEnd={onTouchEnd}
            onTouchStart={onTouchStart}
            data={data?.pages?.flat() || []}
            getMoreData={getMoreDate}
            isFetchingNextPage={isFetchingNextPage}
            toggleSaveFeed={toggleSaveFeed}
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
const $chipsMainContainer: ViewStyle = {}
const $disMissIconStyle: ViewStyle = {
  width: 10,
  height: 10,
}
