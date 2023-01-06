import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { HorizontalLine, NotificationCard, Screen } from "../components"
import { View, Text } from "react-native-ui-lib"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

export const NotificationScreen: FC<StackScreenProps<AppStackScreenProps, "Notification">> =
  observer(function NotificationScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    const notifiCations = [
      {
        title: "Catotaco has a new drop!",
        subTitle: "Buy one get one free",
        imageUri: "https://media.navenu.com/media/venues/790ef2b15452bf457da536559a205877.jpg",
      },
      {
        title: "navenu has New curator",
        subTitle: "Buy one get one free",
        imageUri: "https://media.navenu.com/media/venues/790ef2b15452bf457da536559a205877.jpg",
      },
    ]
    const onNavigationPressed = () => {}
    return (
      <Screen style={$root} preset="scroll">
        <View padding-5>
          <Text header>YOU HAVE 3 New NOTIFICATIONS</Text>
        </View>
        {notifiCations.map((notifiCation) => (
          <View key={notifiCation.title} marginB-15>
            <NotificationCard
              imageUri={notifiCation.imageUri}
              title={notifiCation.title}
              subTitle={notifiCation.subTitle}
              onPress={onNavigationPressed}
            />
            <HorizontalLine color="black" />
          </View>
        ))}
      </Screen>
    )
  })

const $root: ViewStyle = {
  flex: 1,
}
