import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import {Incubator } from "react-native-ui-lib"
import { Colors, typography } from "../theme"
const { Toast } = Incubator

export interface ToastLoaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  hasError: boolean
  isLoading: boolean
  position?: Incubator.ToastProps["position"]
  errorMessage: string
  clearError: () => void
}

/**
 * Describe your component here
 */
export const ToastLoader = observer(function ToastLoader(props: ToastLoaderProps) {
  const { position = "top", hasError, isLoading, errorMessage, clearError } = props

  return (
    <View>
      <Toast
        key={`${position}`}
        visible={hasError && !isLoading}
        position={position}
        bg-red30
        backgroundColor={Colors.red}
        message={errorMessage}
        onDismiss={clearError}
        autoDismiss={3500}
        messageStyle={{
          color: Colors.white,
          fontFamily: typography.fonts.bourtonbase.medium
        }}
        // icon={Assets.icons.demo.add}
        // iconColor={Colors.$backgroundSuccessHeavy}
        // style={{borderWidth: 1, borderColor: Colors.$outlineDisabled}}
        // messageStyle={Typography.text80BO}
      ></Toast>
      <Toast
        visible={isLoading}
        position={"top"}
        backgroundColor={Colors.ash}
        centerMessage
        messageStyle={{
          color: Colors.white,
          fontFamily: typography.fonts.bourtonbase.normal
        }}
        message={"Loading..."}
        iconColor={Colors.white}
        showLoader
      />
    </View>
  )
})
