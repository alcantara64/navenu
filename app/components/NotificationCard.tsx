import * as React from "react"
import { StyleProp, TextStyle, ViewStyle, Text, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { TouchableOpacity, View } from "react-native-ui-lib"
import { MaterialIcons, AntDesign } from "@expo/vector-icons"

export interface NotificationCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  imageUri: string
  title: string
  subTitle: string
  onPress: (notification: any) => void
}

/**
 * Describe your component here
 */
export const NotificationCard = observer(function NotificationCard(props: NotificationCardProps) {
  const { style, imageUri, title, subTitle } = props
  const $styles = [$container, style]

  return (
    <View style={$styles} row flex-9 marginB-10>
      <View flex-2>
        <Image source={{ uri: imageUri }} resizeMode="contain" />
      </View>
      <View centerV flex-5>
        <Text>{title}</Text>
        <Text>{subTitle}</Text>
      </View>
      <View spread flex-1>
        <TouchableOpacity marginB-8>
          <MaterialIcons name="ios-share" size={24} color="#black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "space-between",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}
