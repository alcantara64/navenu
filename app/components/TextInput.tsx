import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, TextInput as RNTextInput  } from "react-native"
import { observer } from "mobx-react-lite"
import {MIcon as Icon} from './MIcon'
import { AppButton } from "./AppButton"
import { Colors } from "../theme"

export interface TextInputProps  {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  width?: number | string
  leftIconName: any
  rightIcon : any,
  handlePasswordVisibility,
}

/**
 * Describe your component here
 */
export const TextInput = observer(function TextInput(props: TextInputProps) {
  const {  width, leftIconName, rightIcon, handlePasswordVisibility,   ...otherProps  } = props
 

  return (
    <View
      style={{...$container, width}}
    >
      {leftIconName ? (
        <Icon
          name={leftIconName}
          size={22}
          color={Colors.mediumGray}
          style={$iconStyle}
        />
      ) : null}
      <RNTextInput
        style={$textInputStyle}
        placeholderTextColor={Colors.mediumGray}
        {...otherProps}
      />
      {rightIcon ? (
        <AppButton onPress={handlePasswordVisibility}>
          <Icon
            name={rightIcon}
            size={22}
            color={Colors.mediumGray}
            
            style={$iconStyle}
          />
        </AppButton>
      ) : null}
    </View>
  );
})

const $container: ViewStyle = {
  backgroundColor: Colors.white,
  borderRadius: 8,
  flexDirection: 'row',
  padding: 12,
  marginVertical: 12,
  
  borderWidth: 1,
  borderColor: Colors.mediumGray
}

const $iconStyle:ViewStyle = {
  marginRight: 10
}
const $textInputStyle: TextStyle ={
  flex: 1,
  width: '100%',
  fontSize: 18,
  color: Colors.black
}
