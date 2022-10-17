import * as React from "react"
import { View as RNView } from "react-native"
import { observer } from "mobx-react-lite"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export interface ViewProps {

  style?:  any //StyleProp<ViewStyle>
  isSafe?: boolean
  children: React.ReactNode
}

export const View = observer(function View(props: ViewProps) {
  const { style, children, isSafe } = props
  const $styles = [style]
  const insets = useSafeAreaInsets();

  if (isSafe) {
    return (
      <RNView style={{ paddingTop: insets.top, ...style }}>{children}</RNView>
    );
  }

  return <RNView style={$styles}>{children}</RNView>;
})


