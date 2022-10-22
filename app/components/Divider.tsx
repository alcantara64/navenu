import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"

import { Divider as PaperDivider } from "react-native-paper";

export interface DividerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}


export const Divider = observer(function Divider() {

  return (
    <PaperDivider style={$divider} />
  )
})



const $divider:ViewStyle =  {
  marginLeft: 10,
}
