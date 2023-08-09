import * as React from "react"
import { ImageBackground, ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text, TouchableOpacity, View } from "react-native-ui-lib"

export interface UserListCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  image: string
  name: string
  onListPress: (value: any) => void
}

/**
 * Describe your component here
 */
export const UserListCard = observer(function UserListCard(props: UserListCardProps) {
  const { image, name, onListPress } = props

  const listPressed = () => {
    onListPress(name)
  }

  return (
    <TouchableOpacity style={$dropCardContainer} onPress={listPressed} activeOpacity={0.1}>
      <ImageBackground
        source={{
          uri:
            image || "https://media.navenu.com/media/venues/790ef2b15452bf457da536559a205877.jpg",
        }}
        imageStyle={$imageBackground}
        resizeMode="cover"
        style={$backgroundImage}
      >
        <View style={$imageFilter} />
        <View flex-7 padding-10>
          <Text numberOfLines={2} style={$belowText}>
            {name}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
})

const $backgroundImage: ImageStyle = {
  flex: 1,
  width: "100%",
  marginBottom: 5,
  justifyContent: "center",
}
const $imageBackground: ImageStyle = {
  borderRadius: 6,
}
const $dropCardContainer: ViewStyle = {
  minHeight: 100,
}
const $belowText: TextStyle = {
  marginBottom: 0,
  color: "#FFFFFF",
  fontFamily: "bourtonbase",
  textTransform: "uppercase",
  fontSize: 22,
  letterSpacing: 1.76,
}
const $imageFilter: ViewStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}
