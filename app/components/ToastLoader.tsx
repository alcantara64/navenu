import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Colors, Incubator } from "react-native-ui-lib"
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
        backgroundColor={Colors.accent}
        message={errorMessage}
        onDismiss={clearError}
        autoDismiss={3500}
        // icon={Assets.icons.demo.add}
        // iconColor={Colors.$backgroundSuccessHeavy}
        // style={{borderWidth: 1, borderColor: Colors.$outlineDisabled}}
        // messageStyle={Typography.text80BO}
      ></Toast>
      <Toast
        visible={isLoading}
        position={"top"}
        backgroundColor={Colors.primary}
        message={"Loading..."}
        showLoader
      />
    </View>
  )
})
