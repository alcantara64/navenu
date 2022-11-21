import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import Lottie from "lottie-react-native"
import { useEffect, useRef } from "react"
import { View, LoaderScreen, Colors } from "react-native-ui-lib"

export interface LoadingIndicatorProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

export const LoadingIndicator = observer(function LoadingIndicator(props: LoadingIndicatorProps) {
  const { style } = props
  const $styles = [$container, style]

  const animationRef = useRef<Lottie | null>() // The <> is for TypeScript, but can be removed for JavaScript

  useEffect(() => {
    animationRef.current?.play()
  }, [])

  return (
    <View style={$styles} center>
      {/* <Lottie ref={(animation) => {
        animationRef.current = animation;
      }} source={require('../../assets/lottie/loader.json')} autoPlay loop /> */}
      <LoaderScreen color={Colors.blue30} overlay />
    </View>
  )
})

const $container: ViewStyle = {
  position: 'absolute',
  top: 20,
  left:20,
  right: 20,
  bottom: 20,

}
