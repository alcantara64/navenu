import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, TextInput as RNTextInput  } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Colors } from "react-native-ui-lib"
import {MIcon as Icon} from './MIcon'

export interface TextInputProps {
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
  const {  width, leftIconName, rightIcon  } = props
 

  return (
    <View
      style={{...$container, width}}
    >
      {leftIconName ? (
        <Icon
          name={leftIconName}
          size={22}
          color={Colors.mediumGray}
          style={{ marginRight: 10 }}
        />
      ) : null}
      <RNTextInput
        style={{
          flex: 1,
          width: '100%',
          fontSize: 18,
          color: Colors.black
        }}
        placeholderTextColor={Colors.mediumGray}
        {...otherProps}
      />
      {rightIcon ? (
        <Button onPress={handlePasswordVisibility}>
          <Icon
            name={rightIcon}
            size={22}
            color={Colors.mediumGray}
            style={{ marginRight: 10 }}
          />
        </Button>
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

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}
