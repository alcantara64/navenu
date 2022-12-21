import * as React from "react"
import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Ionicons } from "@expo/vector-icons"
import { Colors, colors, typography } from "../theme"
import { View, Incubator, Text } from "react-native-ui-lib"
import { TouchableOpacity } from "react-native-gesture-handler"
const { TextField } = Incubator

export interface TextInputProps {
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
export const TextInput = observer(function TextInput(props: TextInputProps) {
  const { style, onSelectItem, knowledgeItems, isLoading, hasAutoComplete, onTextChange, onBlur } = props
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
  // borderWidth: 1,
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
