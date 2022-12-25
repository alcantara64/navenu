import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Colors, } from "../theme"
import { Text } from "./Text"
import { Incubator, TouchableOpacity } from "react-native-ui-lib"
import { Ionicons } from '@expo/vector-icons'; 
const {TextField}  = Incubator;

export interface AppInputProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  onSelectItem?: (item: any) => any
  knowledgeItems?: Array<any>
  isLoading?: boolean
  hasAutoComplete?: boolean
  onTextChange: (text:string) => void
  onBlur?: any
}

/**
 * Describe your component here
 */
export const AppInput = observer(function AppInput(props: AppInputProps) {
  const {onSelectItem, knowledgeItems, isLoading, hasAutoComplete, onTextChange, onBlur } = props
  const $styles = [$container]

  return (
    <View style={$styles}>
      <TextField
        containerStyle={$textInputContainerStyle}
        placeholder="What are you looking for?"
        trailingAccessory={<Ionicons name="search" size={24} color="grey" />}
        onChangeText={onTextChange}
        onBlur={onBlur}
      />
      <View style={$autoCompleteContainer}>
      {hasAutoComplete && (
        <View style={$listContainer}>
          {isLoading && <Text>loading...</Text>}
          {!isLoading &&
            knowledgeItems?.length > 0 &&
            knowledgeItems.map((item) => (
              <TouchableOpacity  onPress={() => onSelectItem(item)} key={item}>
                <Text style={$autoCompleteText}>{item}</Text>
              </TouchableOpacity>
            ))}
        </View> 
      )}
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  zIndex:1
  }
  const $autoCompleteContainer:ViewStyle ={
    position: "relative",
    zIndex:99
  }
  const $textInputContainerStyle: ViewStyle = {
    borderRadius: 5,
    backgroundColor: Colors.white,
    padding: 15,
    
  }
  const $listContainer: ViewStyle = {
    position: "absolute",
    top: 5,
    zIndex:100,
    backgroundColor:Colors.white,
    width: '100%'
  }
  
  const $autoCompleteText: TextStyle ={
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    fontWeight:"500",
    color: '#333333',
    padding: 4,
  }
  
