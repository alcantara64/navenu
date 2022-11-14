import * as React from "react"
import { Animated, Pressable, StyleProp, useWindowDimensions, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"

import { useAnimatedBottom } from "../hooks/useAnimatedBottom"

export interface BottomSheetProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  children: React.ReactNode
  show: boolean
  height?: number
  onOuterClick?: () => void
}

/**
 * Describe your component here
 */
export const BottomSheet = observer(function BottomSheet(props: BottomSheetProps) {
  const {  show, height, onOuterClick, children } = props

  const { height: screenHeight } = useWindowDimensions()

  const bottom = useAnimatedBottom(show, height)

  return (
    <>
      {show && (
        <Pressable
          onPress={onOuterClick}
          style={[$outerOverlay, { height: screenHeight }]}
        >
          <View />
        </Pressable>
      )}
      <Animated.View style={[$bottomSheet, { height, bottom }]}>
        {children}
      </Animated.View>
    </>
  )
})


 const $outerOverlay:ViewStyle =  {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    backgroundColor: 'black',
    opacity: 0.3,
  };
 const $bottomSheet:ViewStyle =  {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    backgroundColor: 'blue',
    //borderRadius: 16,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  };