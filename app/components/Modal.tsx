import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, Modal as AppModal } from "react-native"
import { observer } from "mobx-react-lite"

export interface ModalProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  show: boolean,
  onRequestClose?: () => void,
  body: React.ReactNode

}

/**
 * Describe your component here
 */
export const Modal = observer(function Modal(props: ModalProps) {
  const { style, body, show,onRequestClose } = props
  const $styles = [$modalContainer, style]


  return (
    <View style={$styles}>
    <AppModal
      animationType="slide"
      transparent={true}
      visible={show}
      presentationStyle='overFullScreen'
      onRequestClose={onRequestClose}>
     {body}
    </AppModal>
  </View>
  )
})


const $modalContainer:ViewStyle = {
   width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  position: 'relative',
  borderWidth:1,
} 



