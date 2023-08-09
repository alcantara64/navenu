import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, TextStyle, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { CardList, ErrorMessage } from "../components"
import { View, SkeletonView, Text } from "react-native-ui-lib"
import { useNotifications } from "../hooks/useFeeds"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

export const NotificationScreen: FC<StackScreenProps<AppStackScreenProps, "Notification">> =
  observer(function NotificationScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    const { error, data, isLoading } = useNotifications()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    if (error) {
      return <ErrorMessage></ErrorMessage>
    }

    return (
      <View margin-15>
        <View marginB-10>
          <Text header style={$notificationLabelStyle}>
            WHAT'S NEW
          </Text>
        </View>
        <SkeletonView
          height={110}
          width={Dimensions.get("window").width - 16}
          style={$skeletonViewStyle}
          times={6}
          borderRadius={8}
          renderContent={() => <CardList data={data} />}
          showContent={!isLoading}
        />
      </View>
    )
  })

const $notificationLabelStyle: TextStyle = {
  fontSize: 18,
}
const $skeletonViewStyle: ViewStyle = {
  marginVertical: 3,
}
