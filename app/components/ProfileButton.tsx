import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Colors } from "../theme"

import { View } from "react-native-ui-lib"
import { Avatar } from "react-native-ui-lib/src/components/avatar"
import { useStores } from "../models"
import { getInitials } from "react-native-ui-lib/src/helpers/AvatarHelper"
import { AntDesign } from "@expo/vector-icons"

export interface ProfileButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const ProfileButton = observer(function ProfileButton(props: ProfileButtonProps) {
  const { style } = props
  const $styles = [$container, style]

  const { userStore } = useStores()

  return (
    <View style={$styles}>
      {userStore.currentUser?.display_name && (
        <Avatar
          label={getInitials(userStore.currentUser?.display_name)}
          size={40}
          labelColor={Colors.white}
          backgroundColor={Colors.orange}
        />
      )}
      {!userStore.currentUser?.display_name && <AntDesign name="user" size={30} color="black" />}
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}
