import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import Lottie from 'lottie-react-native';
import { useEffect, useRef } from "react";

export interface LoadingIndicatorProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

export const LoadingIndicator = observer(function LoadingIndicator(props: LoadingIndicatorProps) {
  const { style } = props
  const $styles = [$container, style]

  const animationRef = useRef<Lottie | null>(); // The <> is for TypeScript, but can be removed for JavaScript

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <View style={$styles}>
     <Lottie ref={(animation) => {
        animationRef.current = animation;
      }} source={require('../../assets/lottie/loader.json')} autoPlay loop />
    </View>
  )
})

const $container: ViewStyle = {
  width:'100%'
}

