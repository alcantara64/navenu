import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import {
  CardviewScreen,
  CuratorProfileScreen,
  DropScreen,
  SearchScreen,
  VenueDetailScreen,
} from "../screens"
import { TopBar } from "../components"
import { ViewStyle } from "react-native"

export type MainNavigationNavigatorParamList = {
  Home: undefined
  MapScreen: undefined
  DropScreen: undefined
  VenueDetailScreen: undefined
  CuratorProfileScreen: undefined
  SearchScreen: undefined
}

const Stack = createStackNavigator<MainNavigationNavigatorParamList>()
// Todo refactor this code to allow params, tried conditional Group but did work
export function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Home"  screenOptions={{ cardStyle: $cardStyle, headerShown: true }}>
      <Stack.Group>
        <Stack.Screen
          name="Home"
          component={CardviewScreen}
          options={{ header: ({navigation}) => <TopBar navigation={navigation} /> }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'card',  }}>
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
// Todo remove this code later for
export function SearchStack() {
  return (
    <Stack.Navigator initialRouteName="SearchScreen"  screenOptions={{ cardStyle: $cardStyle, headerShown: true }}>
      <Stack.Group>
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{ header: ({navigation}) => <TopBar isSearchMode navigation={navigation} /> }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'card',  }}>
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
  height: '100%'
}
