import * as React from "react"
import { StyleProp, View, Text, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import BottomSheet from "@gorhom/bottom-sheet"
import { useCallback, useMemo, useRef } from "react"

export interface AppBottomsheetProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  children: React.ReactNode
  onClose?: () => void
  expand?: () => void
}

/**
 * Describe your component here
 */
export const AppBottomsheet = observer(function AppBottomsheet(props: AppBottomsheetProps) {
  const { style, children, onClose, expand } = props
  const $styles = [$container, style]

  // ref
   const bottomSheetRef = useRef<BottomSheet>(null)

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], [])

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])
  return (
  
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        onClose={onClose}
        
  
      >
        <View style={$contentContainer}>{children}</View>
      </BottomSheet>
  )
})

const $container: ViewStyle = {
  backgroundColor: 'transparent'

}

const $contentContainer: ViewStyle = {
  flex:1,
  padding:15,
  

}
