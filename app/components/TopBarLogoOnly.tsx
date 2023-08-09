import * as React from "react"
import { ViewStyle, Image, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { View } from "react-native-ui-lib"

export const TopBarLogoOnly = observer(function TopBarLogoOnly() {
  return (
    <View style={$container}>
      <View flex center>
        <Image source={require("../../assets/icon-navenu.png")} style={$logo} />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  height: 65,
  flexDirection: "row",
  justifyContent: "space-between",

  width: "100%",
}

const $logo: ImageStyle = {
  marginTop: 19,
}
