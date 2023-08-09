import * as React from "react"
import { ImageStyle, StyleProp, Image } from "react-native"
import { observer } from "mobx-react-lite"

export interface LogoProps {
  style?: StyleProp<ImageStyle>
  uri: any
}

export const Logo = observer(function Logo(props: LogoProps) {
  const { uri } = props

  return <Image source={uri} style={$image} />
})

const $image: ImageStyle = {
  marginTop: 175,
  marginBottom: 120,
  width: 136,
  height: 60,
}
