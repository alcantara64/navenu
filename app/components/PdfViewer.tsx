import * as React from "react"
import { Dimensions, StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import Pdf, { Source } from "react-native-pdf"

export interface PdfViewerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  source: Source
}

/**
 * Describe your component here
 */
export const PdfViewer = observer(function PdfViewer(props: PdfViewerProps) {
  const { style, source } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`)
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`)
        }}
        onError={(error) => {
          console.log(error)
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`)
        }}
        style={$pdf}
      />
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $pdf: ViewStyle = {
  flex: 1,
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
}
