import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import {
  CardviewScreen,
  CuratorProfileScreen,
  DropScreen,
  MapScreen,
  VenueDetailScreen,
} from "../screens"
import { TopBar } from "../components"
import { ViewStyle } from "react-native"

export type MainNavigationNavigatorParamList = {
  Demo: undefined
  Home: undefined
  MapScreen: undefined
  DropScreen: undefined
  VenueDetailScreen: undefined
  CuratorProfileScreen: undefined
}

const Stack = createStackNavigator<MainNavigationNavigatorParamList>()
export function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Home"  screenOptions={{ cardStyle: $cardStyle, headerShown: false }}>
      <Stack.Group>
        <Stack.Screen
          name="Home"
          component={CardviewScreen}
          options={{ header: () => <TopBar navigation={""} /> }}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ header: () => <TopBar navigation={""} /> }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="DropScreen" component={DropScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="VenueDetailScreen"
          component={VenueDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CuratorProfileScreen"
          component={CuratorProfileScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

const $cardStyle: ViewStyle = {
  backgroundColor: "transparent",
}
