import * as React from "react"
import { Animated, Pressable, StyleProp, useWindowDimensions, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"

import { useAnimatedBottom } from "../hooks/useAnimatedBottom"
import { Colors } from "../theme"
import { TouchableOpacity } from "react-native-gesture-handler"

export interface BottomSheetProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  children: React.ReactNode
  show: boolean
  height?: number
  onOuterClick?: () => void
  showBackgroundOverlay?: boolean
  onClose: () => void
}

/**
 * Describe your component here
 */
export const BottomSheet = observer(function BottomSheet(props: BottomSheetProps) {
  const { show, height, onOuterClick, children, showBackgroundOverlay, onClose } = props

  const { height: screenHeight } = useWindowDimensions()

  const bottom = useAnimatedBottom(show, height)
  if (show) {
    return (
      <>
        {showBackgroundOverlay && (
          <Pressable onPress={onOuterClick} style={[$outerOverlay, { height: screenHeight }]}>
            <View />
          </Pressable>
        )}
        <Animated.View style={[$bottomSheet, { height, bottom }]}>
          <TouchableOpacity onPress={onClose}>
            <View style={$closeButton} />
          </TouchableOpacity>
          {children}
        </Animated.View>
      </>
    )
  }
})

const $outerOverlay: ViewStyle = {
  position: "absolute",
  width: "100%",
  zIndex: 1,
  backgroundColor: "black",
  opacity: 0.3,
}
const $bottomSheet: ViewStyle = {
  position: "absolute",
  width: "100%",
  zIndex: 10,
  backgroundColor: Colors.white,
  borderTopRightRadius: 10,
  borderTopLeftRadius: 10,
  paddingTop: 10,
  padding: 10,
  bottom: 0,
}
const $closeButton: ViewStyle = {
  borderWidth: 1,
  width: 100,
  alignSelf: "center",
  marginBottom: 20,
  marginTop: 10,
}
